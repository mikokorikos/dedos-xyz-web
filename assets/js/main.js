import { mountOrbs } from './fx-orbs.js';
import { mountStars } from './fx-stars.js';

const doc = document;
const win = window;
const body = doc.body;
const page = body.dataset.page || 'home';
const discordInvite = body.dataset.discordInvite || 'dedos';
const robloxUrl = body.dataset.robloxUrl || 'https://www.roblox.com/es/communities/12082479/unnamed#!/about';

const createElement = (markup) => {
  const template = doc.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
};

const applyIcons = () => {
  if (win.lucide?.createIcons) {
    win.lucide.createIcons();
  }
};

let revealObserver;

const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  const viewHeight = win.innerHeight || doc.documentElement.clientHeight;
  return rect.top <= viewHeight && rect.bottom >= 0;
};

const updateRevealVisibility = () => {
  doc.querySelectorAll('[data-animate]').forEach((el) => {
    if (!el.classList.contains('is-visible') && isElementInViewport(el)) {
      el.classList.add('is-visible');
    }
  });
};

const ensureRevealLoop = () => {
  if (!body.classList.contains('reveal-ready')) return;
  updateRevealVisibility();
  if (doc.querySelector('[data-animate]:not(.is-visible)')) {
    win.requestAnimationFrame(ensureRevealLoop);
  }
};

const observeReveal = () => {
  const targets = doc.querySelectorAll('[data-animate]:not([data-reveal-bound])');
  targets.forEach((el) => {
    el.dataset.revealBound = 'true';
    if (!revealObserver) {
      el.classList.add('is-visible');
      return;
    }
    revealObserver.observe(el);
    if (isElementInViewport(el)) {
      el.classList.add('is-visible');
    }
  });
  updateRevealVisibility();
};

const setupReveal = () => {
  if (!('IntersectionObserver' in win)) {
    revealObserver = null;
    observeReveal();
    win.addEventListener('scroll', updateRevealVisibility, { passive: true });
    win.addEventListener('resize', updateRevealVisibility, { passive: true });
    ensureRevealLoop();
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10%' });
  observeReveal();
  updateRevealVisibility();
  win.addEventListener('scroll', updateRevealVisibility, { passive: true });
  win.addEventListener('resize', updateRevealVisibility, { passive: true });
  ensureRevealLoop();
};

const setupCurrentYear = () => {
  const spans = doc.querySelectorAll('[data-current-year], #year');
  spans.forEach((span) => {
    span.textContent = String(new Date().getFullYear());
  });
};

const setupHeaderShadow = () => {
  const header = doc.querySelector('.site-header');
  if (!header) return;
  const toggle = () => {
    header.classList.toggle('site-header--solid', win.scrollY > 12);
  };
  toggle();
  win.addEventListener('scroll', toggle, { passive: true });
};

const setupNav = () => {
  const toggle = doc.querySelector('[data-nav-toggle]');
  const panel = doc.querySelector('[data-nav-panel]');
  if (!toggle || !panel) return;

  const openNav = () => {
    panel.hidden = false;
    body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    panel.hidden = true;
    body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  win.addEventListener('resize', () => {
    if (win.innerWidth >= 768) {
      closeNav();
    }
  });
};

const setupSectionLinks = () => {
  const links = doc.querySelectorAll('[data-section-link]');
  const base = page === 'home' ? '' : 'index.html';
  links.forEach((link) => {
    const target = link.getAttribute('data-section-link');
    if (!target) return;
    const hash = `#${target}`;
    link.setAttribute('href', base ? `${base}${hash}` : hash);
  });
};

const ensureBrowserEnvironment = () => typeof win !== 'undefined' && typeof doc !== 'undefined';

const openWithFallback = ({ appUrl, webUrl, timeoutMs = 1200 }) => {
  if (!ensureBrowserEnvironment()) return;

  let cancelled = false;
  const start = Date.now();

  const cancelFallback = () => {
    if (cancelled) return;
    cancelled = true;
    win.clearTimeout(timer);
    doc.removeEventListener('visibilitychange', onVisibilityChange);
    win.removeEventListener('pagehide', cancelFallback);
  };

  const onVisibilityChange = () => {
    if (doc.visibilityState === 'hidden') {
      cancelFallback();
    }
  };

  const timer = win.setTimeout(() => {
    if (cancelled) return;
    if (Date.now() - start < timeoutMs + 80) {
      cancelFallback();
      win.location.href = webUrl;
    }
  }, timeoutMs);

  doc.addEventListener('visibilitychange', onVisibilityChange);
  win.addEventListener('pagehide', cancelFallback);

  try {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isIOS) {
      const iframe = doc.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      doc.body.appendChild(iframe);
      win.setTimeout(() => iframe.remove(), timeoutMs + 220);
    } else {
      win.location.href = appUrl;
    }
  } catch (error) {
    cancelFallback();
    win.location.href = webUrl;
  }
};

const openDiscordInvite = (invite, timeoutMs) => {
  if (!ensureBrowserEnvironment()) return;
  const code = invite.replace(/^https?:\/\/(?:www\.)?discord\.gg\//i, '').trim();
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const webUrl = `https://discord.gg/${code}`;

  if (isAndroid) {
    const intent = `intent://discord.com/invite/${code}#Intent;package=com.discord;scheme=https;end;`;
    openWithFallback({ appUrl: intent, webUrl, timeoutMs: timeoutMs ?? 900 });
    return;
  }

  const appUrl = `discord://-/invite/${code}`;
  const mobile = /Android|iPhone|iPad|iPod/i.test(ua);
  openWithFallback({ appUrl, webUrl, timeoutMs: timeoutMs ?? (mobile ? 900 : 1400) });
};

const openRobloxDestination = (url, timeoutMs) => {
  if (!ensureBrowserEnvironment()) return;
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  if (isAndroid) {
    const fallback = encodeURIComponent(url);
    const intent = `intent://roblox.com/#Intent;scheme=roblox;package=com.roblox.client;S.browser_fallback_url=${fallback};end;`;
    openWithFallback({ appUrl: intent, webUrl: url, timeoutMs: timeoutMs ?? 900 });
    return;
  }

  if (isMobile) {
    openWithFallback({ appUrl: 'roblox://navigation/app', webUrl: url, timeoutMs: timeoutMs ?? 900 });
    return;
  }

  openWithFallback({ appUrl: 'roblox-player://', webUrl: url, timeoutMs: timeoutMs ?? 1500 });
};

const setupLinkHandlers = () => {
  doc.addEventListener('click', (event) => {
    const discordLink = event.target.closest('[data-discord-link]');
    if (discordLink) {
      event.preventDefault();
      openDiscordInvite(discordInvite);
      return;
    }

    const robloxLink = event.target.closest('[data-roblox-link]');
    if (robloxLink) {
      event.preventDefault();
      openRobloxDestination(robloxLink.getAttribute('href') || robloxUrl);
    }
  });
};

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(body.dataset.exchangeEndpoint || 'https://open.er-api.com/v6/latest/MXN', { cache: 'no-store' });
    if (!response.ok) return { rate: null, updatedAt: null };
    const data = await response.json();
    const usd = data?.rates?.USD;
    const updatedAt = data?.time_last_update_utc ?? null;
    return {
      rate: typeof usd === 'number' ? usd : null,
      updatedAt
    };
  } catch (error) {
    console.error('Failed to fetch MXN → USD rate', error);
    return { rate: null, updatedAt: null };
  }
};

const MX_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  currencyDisplay: 'code'
});
const USD_FORMATTER = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'code'
});

const formatUsd = (amount) => {
  if (amount === null) return 'Consulta en Discord';
  return `≈ ${USD_FORMATTER.format(amount)}`;
};

const formatExchangeNotice = (rate, updatedAt) => {
  if (!rate) {
    return 'Tipo de cambio no disponible. Nuestro equipo confirmará el monto final en el ticket.';
  }
  const date = updatedAt ? new Date(updatedAt) : null;
  const formatted = date
    ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(date)
    : null;
  return `Tipo de cambio: 1 MXN = ${rate.toFixed(4)} USD${formatted ? ` · Actualizado ${formatted} (UTC)` : ''}`;
};

const MX_FORMATTER = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
const USD_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const formatPriceLabels = (plan, rate) => {
  if (typeof plan?.priceMXN === 'number') {
    const usdValue = typeof rate === 'number' ? plan.priceMXN * rate : null;
    return {
      mx: MX_FORMATTER.format(plan.priceMXN),
      usd: usdValue ? `≈ ${USD_FORMATTER.format(usdValue)}` : 'Confirmar en ticket'
    };
  }
  if (typeof plan?.priceUSD === 'number') {
    const mxValue = typeof rate === 'number' && rate > 0 ? plan.priceUSD / rate : null;
    return {
      mx: mxValue ? `≈ ${MX_FORMATTER.format(mxValue)}` : 'Confirmar en ticket',
      usd: USD_FORMATTER.format(plan.priceUSD)
    };
  }
  return { mx: 'Consulta en Discord', usd: 'Consulta en Discord' };
};

const createPriceListMarkup = (plans, rate) => {
  if (!Array.isArray(plans) || plans.length === 0) return '';
  const items = plans
    .map((plan) => {
      const labels = formatPriceLabels(plan, rate);
      const note = plan.note ? `<span class="price-list__note">${plan.note}</span>` : '';
      return `
        <li class="price-list__item">
          <div class="price-list__label">
            <span>${plan.label}</span>
            ${note}
          </div>
          <div class="price-list__prices">
            <span class="price-list__mx">${labels.mx}</span>
            <span class="price-list__usd">${labels.usd}</span>
          </div>
        </li>
      `;
    })
    .join('');
  return `<ul class="price-list">${items}</ul>`;
};

const createNotesList = (notes) => {
  if (!Array.isArray(notes) || notes.length === 0) return '';
  return `<ul class="note-list">${notes.map((note) => `<li>${note}</li>`).join('')}</ul>`;
};

const PLAN_ICON_SVGS = {
  group: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-5 9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z" fill="currentColor"></path></svg>',
  gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-.8-1.4-2.4-2-3.8-1.4C6.7 3 6 4.2 6 5.5c0 .2 0 .3.1.5H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1c.1-.2.1-.3.1-.5 0-1.3-.7-2.5-2.2-3C14.4 2 12.8 2.6 12 4Zm2.3.9c.6.2.7.6.7.6 0 .3-.2.5-.4.5H12.7c.3-.6.6-1 .8-1.1.2-.2.4-.1.8 0ZM9 4.9c.4-.1.6-.2.8 0 .2.1.5.5.8 1.1H9.4c-.2 0-.4-.2-.4-.5 0 0 .1-.4.7-.6ZM5 9V8h6v2H5Zm8 9H9a1 1 0 0 1-1-1v-5h5v6Zm2 0v-6h5v5a1 1 0 0 1-1 1h-4ZM19 8v1h-6V8h6Z" fill="currentColor"></path></svg>',
  pass: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7.2 4.1 2.3-2.3a2 2 0 0 1 2.8 0l1.7 1.7 1.2-1.2a2 2 0 0 1 2.8 2.8l-1.2 1.2 1.7 1.7a2 2 0 0 1 0 2.8l-2.3 2.3-9-9Zm-4.2 6a2 2 0 0 1 2.8 0l7 7a2 2 0 0 1 0 2.8l-2.3 2.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8l2.3-2.3Z" fill="currentColor"></path></svg>'
};

const ROBUX_POLICIES = [
  {
    title: 'Métodos de pago disponibles',
    description: 'Aceptamos PayPal, transferencia SPEI, depósitos OXXO y Litecoin. Confirma disponibilidad antes de enviar dinero.',
    icon: 'wallet',
    tone: 'mint'
  },
  {
    title: 'Reembolsos = cortesía',
    description: 'Solo evaluamos reembolso o reentrega si presentas grabación completa, Transaction ID y reclamas dentro de 48 horas.',
    icon: 'shield-alert',
    tone: 'violet'
  },
  {
    title: 'Privacidad operativa',
    description: 'No recabamos datos sensibles automáticamente. Si compartes información adicional en tu ticket, asumes su manejo y difusión.',
    icon: 'lock',
    tone: 'cyan'
  },
  {
    title: 'Sin afiliación con Roblox',
    description: 'Dedos.xyz no es socio ni representante oficial. Los nombres de marca solo identifican el producto que compras.',
    icon: 'badge-alert',
    tone: 'pink'
  }
];

const DIGITAL_SERVICES = [
  {
    id: 'spotify-key',
    title: 'Spotify Premium — Key vitalicia',
    subtitle: 'Upgrade.ac oficial',
    description: 'Te enviamos una clave para redimir Spotify Premium de por vida. Ideal si administras varias cuentas.',
    icon: 'music-4',
    tone: 'mint',
    plans: [{ label: 'Clave vitalicia', priceMXN: 100, note: 'Clave upgrade.ac con instrucciones paso a paso.' }]
  },
  {
    id: 'spotify-account',
    title: 'Spotify Premium en tu cuenta',
    subtitle: 'Cuenta propia o proporcionada',
    description: 'Elegimos la ruta que prefieras: te conseguimos una cuenta nueva o gestionamos tu cuenta actual.',
    icon: 'headphones',
    tone: 'mint',
    plans: [
      { label: '1 mes', priceMXN: 59 },
      { label: '3 meses', priceMXN: 169 },
      { label: '6 meses', priceMXN: 339 },
      { label: '12 meses', priceMXN: 549 }
    ],
    notes: ['Confirma si quieres cuenta nueva o tu usuario actual en el ticket.']
  },
  {
    id: 'youtube-premium',
    title: 'YouTube Premium en tu cuenta',
    subtitle: 'Membresía familiar administrada',
    description: 'Nos encargamos de activarlo en tu cuenta principal o te proporcionamos una alternativa bajo stock.',
    icon: 'youtube',
    tone: 'pink',
    plans: [
      { label: '1 mes', priceMXN: 59 },
      { label: '3 meses', priceMXN: 169 },
      { label: '12 meses', priceMXN: 549 }
    ],
    notes: ['Necesitamos tu Transaction ID y video del proceso para soporte futuro.']
  },
  {
    id: 'crunchyroll-provided',
    title: 'Crunchyroll Megafan — cuenta proporcionada',
    subtitle: 'Acceso inmediato',
    description: 'Recibe credenciales listas para usar durante 1 mes completo con garantía de reposición por cortesía.',
    icon: 'tv',
    tone: 'violet',
    plans: [{ label: '1 mes', priceMXN: 20 }],
    notes: ['Cambiar la contraseña invalida la garantía.']
  },
  {
    id: 'crunchyroll-account',
    title: 'Crunchyroll Megafan en tu cuenta',
    subtitle: 'Control total',
    description: 'Activamos Megafan directamente en tu cuenta. Ideal si quieres mantener tu historial.',
    icon: 'clapperboard',
    tone: 'violet',
    plans: [
      { label: '1 mes', priceMXN: 59 },
      { label: '12 meses', priceMXN: 499 }
    ]
  },
  {
    id: 'chatgpt-plus',
    title: 'ChatGPT Plus',
    subtitle: 'Opciones flexibles',
    description: 'Elige si prefieres una cuenta suministrada por Dedos.xyz o la activación directa en tu perfil.',
    icon: 'bot',
    tone: 'cyan',
    plans: [
      { label: 'Cuenta proporcionada', priceMXN: 59 },
      { label: 'En tu cuenta', priceMXN: 69 }
    ],
    notes: ['Necesitamos correo y contraseña temporales si trabajamos con tu cuenta.']
  },
  {
    id: 'vpn-nord',
    title: 'NordVPN — 6 meses',
    subtitle: 'Seguridad premium',
    description: 'Protege tus dispositivos con 6 meses de NordVPN. Envío manual y asistencia en la activación.',
    icon: 'shield',
    tone: 'cyan',
    plans: [{ label: 'Licencia 6 meses', priceMXN: 79 }]
  }
];

const SERVICE_STEPS = [
  {
    title: 'Abre ticket y selecciona plan',
    description: 'Entra a Discord, abre un ticket y define el servicio y duración. Nuestro staff confirma disponibilidad y tipo de cambio.',
    icon: 'message-circle',
    tone: 'mint'
  },
  {
    title: 'Entrega evidencia y Transaction ID',
    description: 'Comparte grabación en vivo, comprobante de pago y Transaction ID. Sin esos datos no hay soporte.',
    icon: 'camera',
    tone: 'violet'
  },
  {
    title: 'Recibe credenciales y seguimiento',
    description: 'Te entregamos la cuenta, key o activación. Seguimos tu caso hasta confirmar que todo funcione.',
    icon: 'handshake',
    tone: 'pink'
  }
];

const DISCORD_OFFERS = [
  {
    title: 'Server Boost 1 mes',
    subtitle: 'Automatizado e instantáneo',
    description: 'Usamos el enlace de tu servidor para aplicar los boosts en minutos, sin códigos ni llaves.',
    icon: 'zap',
    tone: 'violet',
    plans: [{ label: 'Boost x1 mes', priceMXN: 60 }],
    notes: ['Entrega inmediata tras confirmar pago y enlace.']
  },
  {
    title: 'Discord Nitro mensual',
    subtitle: 'Legal paid — vía gift o tarjeta',
    description: 'Nitro clásico al mejor precio. El método (gift o tarjeta) depende del stock al momento de tu compra.',
    icon: 'bolt',
    tone: 'mint',
    plans: [{ label: '1 mes', priceMXN: 95 }],
    notes: ['Confirma la región de tu cuenta para evitar rechazos.']
  },
  {
    title: 'Decoraciones de perfil',
    subtitle: 'Legal paid por regalo',
    description: 'Selecciona la decoración oficial que quieras. Nosotros la enviamos como regalo con descuento.',
    icon: 'sparkles',
    tone: 'pink',
    plans: [{ label: 'Desde', priceUSD: 3.1 }],
    notes: ['Consulta la tabla para ver cada nivel frente al precio oficial.']
  }
];

const DECORATION_MATRIX = [
  { officialUSD: 4.99, ourUSD: 3.1 },
  { officialUSD: 5.99, ourUSD: 3.3 },
  { officialUSD: 6.99, ourUSD: 3.6 },
  { officialUSD: 7.99, ourUSD: 3.9 },
  { officialUSD: 8.49, ourUSD: 4.05 },
  { officialUSD: 9.99, ourUSD: 5 },
  { officialUSD: 11.99, ourUSD: 5.5 }
];

const DISCORD_POLICIES = [
  {
    title: 'Pagos aceptados',
    description: 'PayPal, transferencia SPEI, depósitos OXXO y Litecoin. Confirma método antes de mandar comprobante.',
    icon: 'wallet',
    tone: 'mint'
  },
  {
    title: 'Reembolsos como cortesía',
    description: 'Solo aplican si cumples con la grabación requerida y reportas dentro de 48 horas desde la entrega.',
    icon: 'alert-triangle',
    tone: 'violet'
  },
  {
    title: 'Privacidad del ticket',
    description: 'No almacenamos datos sensibles por defecto. Si compartes información personal, hazlo bajo tu responsabilidad y de forma controlada.',
    icon: 'lock-keyhole',
    tone: 'cyan'
  },
  {
    title: 'No afiliados a Discord',
    description: 'No representamos a Discord ni a otras marcas. Los nombres se usan para identificar los productos que vendemos.',
    icon: 'shield-off',
    tone: 'pink'
  }
];

const ROBUX_PLANS = [
  {
    id: 'group',
    title: 'Recarga por grupo oficial',
    tagline: 'Ideal para compras recurrentes',
    tone: 'pink',
    priceMXN: 125,
    icon: 'group',
    highlight: { label: 'Recomendado', tone: 'mint' },
    amountLabel: '1,000 Robux',
    description: 'Compra tus Robux directamente desde nuestro grupo oficial. Perfecto si recargas seguido y quieres la comisión más baja.',
    requirements: [
      'Unirte al grupo oficial de Dedos.xyz en Roblox.',
      'Esperar 14 días después de haber ingresado al grupo (política Roblox).'
    ],
    delivery: 'Liberamos el pago y recibes los Robux en cuanto Roblox procesa la venta tras el periodo inicial.',
    extras: ['Seguimiento en vivo dentro del ticket.', 'Comisiones mínimas garantizadas.'],
    cta: { label: 'Ir al grupo de Roblox', href: robloxUrl }
  },
  {
    id: 'gift',
    title: 'Regalo por juego',
    tagline: 'Selecciona tu juego favorito',
    tone: 'cyan',
    priceMXN: 126,
    icon: 'gift',
    highlight: { label: 'Alternativa popular', tone: 'violet' },
    amountLabel: '1,000 Robux',
    description: 'Compramos el gamepass o artículo que elijas para que recibas el valor en Robux al instante. Ideal si no quieres esperar 14 días.',
    requirements: [
      'Contar con un juego o experiencia donde se puedan regalar artículos.',
      'Enviar el enlace directo al producto en tu ticket de Discord.'
    ],
    delivery: 'Recibes el artículo seleccionado y Roblox acredita los Robux inmediatamente.',
    extras: ['No requiere antigüedad en grupos.', 'Funciona con Blox Fruits, Pet Simulator, Adopt Me!']
  },
  {
    id: 'pass',
    title: 'Compra directa de gamepass',
    tagline: 'Opción clásica',
    tone: 'violet',
    priceMXN: 136.99,
    icon: 'pass',
    amountLabel: '1,000 Robux',
    description: 'Publica un gamepass con el monto que necesitas y nosotros lo adquirimos. Perfecto si ya tienes un catálogo configurado.',
    requirements: [
      'Gamepasses publicados por 500, 100 o 29 Robux sin precios regionales.',
      'Compartir el enlace al gamepass en el ticket.'
    ],
    delivery: 'La compra se registra de inmediato y Roblox libera los fondos en 5-10 días hábiles.',
    extras: ['Excelente para creadores con catálogo propio.', 'Ideal cuando buscas montos específicos.']
  }
];

const renderPlanCard = (plan, priceLabels, delay) => {
  const highlight = plan.highlight
    ? `<span class="plan-card__badge" data-tone="${plan.highlight.tone}">${plan.highlight.label}</span>`
    : '';
  const extras = plan.extras?.length
    ? `<section class="plan-card__section"><h4>Extras</h4><ul>${plan.extras.map((extra) => `<li>${extra}</li>`).join('')}</ul></section>`
    : '';
  const node = createElement(`
    <article class="plan-card" data-animate="rise" data-tone="${plan.tone}">
      ${highlight}
      <header class="plan-card__header">
        <span class="plan-card__icon" aria-hidden="true">${PLAN_ICON_SVGS[plan.icon] || ''}</span>
        <div>
          <h3 class="plan-card__title">${plan.title}</h3>
          <p class="plan-card__subtitle">${plan.tagline}</p>
        </div>
      </header>
      <div class="plan-card__pricing">
        <span class="plan-card__label">Total estimado</span>
        <strong class="plan-card__price">${priceLabels.mx}</strong>
        <span class="plan-card__meta">${priceLabels.usd}</span>
      </div>
      <span class="plan-card__chip">${plan.amountLabel}</span>
      <p class="plan-card__description">${plan.description}</p>
      <section class="plan-card__section">
        <h4>Entrega</h4>
        <p>${plan.delivery}</p>
      </section>
      <section class="plan-card__section">
        <h4>Requisitos</h4>
        <ul>${plan.requirements.map((req) => `<li>${req}</li>`).join('')}</ul>
      </section>
      ${extras}
      ${plan.cta ? `<a class="btn btn--primary plan-card__cta" href="${plan.cta.href}" target="_blank" rel="noopener" data-roblox-link>${plan.cta.label}</a>` : ''}
    </article>
  `);
  node.style.setProperty('--reveal-delay', `${delay}s`);
  return node;
};

const renderRobuxPage = async () => {
  const planContainer = doc.querySelector('[data-robux-plans]');
  const notice = doc.querySelector('[data-exchange-notice]');
  let rateInfo = { rate: null, updatedAt: null };

  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  if (planContainer) {
    planContainer.innerHTML = '';
    ROBUX_PLANS.forEach((plan, index) => {
      const usd = rateInfo.rate ? plan.priceMXN * rateInfo.rate : null;
      const priceLabels = {
        mx: MX_FORMATTER.format(plan.priceMXN),
        usd: formatUsd(usd)
      };
      const node = renderPlanCard(plan, priceLabels, index * 0.08);
      planContainer.appendChild(node);
    });
  }

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  applyIcons();
  observeReveal();
};

const renderDigitalServicesPage = async () => {
  const servicesContainer = doc.querySelector('[data-digital-services]');
  const notice = doc.querySelector('[data-exchange-notice]');
  let rateInfo = { rate: null, updatedAt: null };

  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  if (servicesContainer) {
    servicesContainer.innerHTML = '';
    DIGITAL_SERVICES.forEach((service, index) => {
      const priceList = createPriceListMarkup(service.plans, rateInfo.rate);
      const notes = createNotesList(service.notes);
      const node = createElement(`
        <article class="plan-card" data-animate="rise" data-tone="${service.tone ?? 'mint'}">
          <header class="plan-card__header">
            <div class="plan-card__icon" data-plan-icon><i data-lucide="${service.icon}"></i></div>
            <div class="plan-card__headings">
              <h3 class="plan-card__title">${service.title}</h3>
              ${service.subtitle ? `<p class="plan-card__subtitle">${service.subtitle}</p>` : ''}
            </div>
          </header>
          <p class="plan-card__description">${service.description}</p>
          ${priceList}
          ${notes}
        </article>
      `);
      node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
      servicesContainer.appendChild(node);
    });
  }

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  applyIcons();
  observeReveal();
};

const renderDiscordOffers = (rate) => {
  const container = doc.querySelector('[data-discord-offers]');
  if (!container) return;
  container.innerHTML = '';
  DISCORD_OFFERS.forEach((offer, index) => {
    const priceList = createPriceListMarkup(offer.plans, rate);
    const notes = createNotesList(offer.notes);
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${offer.tone ?? 'mint'}">
        <header class="plan-card__header">
          <div class="plan-card__icon" data-plan-icon><i data-lucide="${offer.icon}"></i></div>
          <div class="plan-card__headings">
            <h3 class="plan-card__title">${offer.title}</h3>
            ${offer.subtitle ? `<p class="plan-card__subtitle">${offer.subtitle}</p>` : ''}
          </div>
        </header>
        <p class="plan-card__description">${offer.description}</p>
        ${priceList}
        ${notes}
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderDecorationMatrix = (rate) => {
  const container = doc.querySelector('[data-decoration-matrix]');
  if (!container) return;
  container.innerHTML = '';
  DECORATION_MATRIX.forEach((tier, index) => {
    const officialUsd = USD_FORMATTER.format(tier.officialUSD);
    const ourUsd = USD_FORMATTER.format(tier.ourUSD);
    const ourMx = typeof rate === 'number' && rate > 0 ? `≈ ${MX_FORMATTER.format(tier.ourUSD / rate)}` : 'Confirma MXN en ticket';
    const row = createElement(`
      <div class="matrix__row" data-animate="rise">
        <div class="matrix__cell">
          <span class="matrix__eyebrow">Precio oficial</span>
          <strong>${officialUsd}</strong>
          <span class="matrix__note">Referencia Discord</span>
        </div>
        <div class="matrix__cell matrix__cell--accent">
          <span class="matrix__eyebrow">Dedos.xyz</span>
          <strong>${ourUsd}</strong>
          <span class="matrix__note">${ourMx}</span>
        </div>
      </div>
    `);
    row.style.setProperty('--reveal-delay', `${index * 0.06}s`);
    container.appendChild(row);
  });
  observeReveal();
};

const renderRobuxPolicies = () => {
  const container = doc.querySelector('[data-robux-policies]');
  if (!container) return;
  container.innerHTML = '';
  ROBUX_POLICIES.forEach((policy, index) => {
    const node = createElement(`
      <article class="card tone--${policy.tone ?? 'mint'}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${policy.icon}"></i></span>
          <div>
            <h3 class="card__title">${policy.title}</h3>
          </div>
        </div>
        <p class="card__body">${policy.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
  applyIcons();
  observeReveal();
};

const renderServiceSteps = () => {
  const container = doc.querySelector('[data-service-steps]');
  if (!container) return;
  container.innerHTML = '';
  SERVICE_STEPS.forEach((step, index) => {
    const node = createElement(`
      <article class="card card--step tone--${step.tone ?? 'mint'}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${step.icon}"></i></span>
          <div>
            <h3 class="card__title">${step.title}</h3>
          </div>
        </div>
        <p class="card__body">${step.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
  applyIcons();
  observeReveal();
};

const renderRobuxPage = async () => {
  const planContainer = doc.querySelector('[data-robux-plans]');
  const notice = doc.querySelector('[data-exchange-notice]');
  let rateInfo = { rate: null, updatedAt: null };

  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  renderDiscordOffers(rateInfo.rate);
  renderDecorationMatrix(rateInfo.rate);

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  renderValueHighlights();
  renderPurchaseSteps();
  renderRobuxPolicies();
  applyIcons();
  observeReveal();
};

const renderDigitalServicesPage = async () => {
  const servicesContainer = doc.querySelector('[data-digital-services]');
  const notice = doc.querySelector('[data-exchange-notice]');
  let rateInfo = { rate: null, updatedAt: null };

  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  if (servicesContainer) {
    servicesContainer.innerHTML = '';
    DIGITAL_SERVICES.forEach((service, index) => {
      const priceList = createPriceListMarkup(service.plans, rateInfo.rate);
      const notes = createNotesList(service.notes);
      const node = createElement(`
        <article class="plan-card" data-animate="rise" data-tone="${service.tone ?? 'mint'}">
          <header class="plan-card__header">
            <div class="plan-card__icon" data-plan-icon><i data-lucide="${service.icon}"></i></div>
            <div class="plan-card__headings">
              <h3 class="plan-card__title">${service.title}</h3>
              ${service.subtitle ? `<p class="plan-card__subtitle">${service.subtitle}</p>` : ''}
            </div>
          </header>
          <p class="plan-card__description">${service.description}</p>
          ${priceList}
          ${notes}
        </article>
      `);
      node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
      servicesContainer.appendChild(node);
    });
  }

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  renderServiceSteps();
  applyIcons();
  observeReveal();
};

const renderDiscordOffers = (rate) => {
  const container = doc.querySelector('[data-discord-offers]');
  if (!container) return;
  container.innerHTML = '';
  DISCORD_OFFERS.forEach((offer, index) => {
    const priceList = createPriceListMarkup(offer.plans, rate);
    const notes = createNotesList(offer.notes);
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${offer.tone ?? 'mint'}">
        <header class="plan-card__header">
          <div class="plan-card__icon" data-plan-icon><i data-lucide="${offer.icon}"></i></div>
          <div class="plan-card__headings">
            <h3 class="plan-card__title">${offer.title}</h3>
            ${offer.subtitle ? `<p class="plan-card__subtitle">${offer.subtitle}</p>` : ''}
          </div>
        </header>
        <p class="plan-card__description">${offer.description}</p>
        ${priceList}
        ${notes}
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderDecorationMatrix = (rate) => {
  const container = doc.querySelector('[data-decoration-matrix]');
  if (!container) return;
  container.innerHTML = '';
  DECORATION_MATRIX.forEach((tier, index) => {
    const officialUsd = USD_FORMATTER.format(tier.officialUSD);
    const ourUsd = USD_FORMATTER.format(tier.ourUSD);
    const ourMx = typeof rate === 'number' && rate > 0 ? `≈ ${MX_FORMATTER.format(tier.ourUSD / rate)}` : 'Confirma MXN en ticket';
    const row = createElement(`
      <div class="matrix__row" data-animate="rise">
        <div class="matrix__cell">
          <span class="matrix__eyebrow">Precio oficial</span>
          <strong>${officialUsd}</strong>
          <span class="matrix__note">Referencia Discord</span>
        </div>
        <div class="matrix__cell matrix__cell--accent">
          <span class="matrix__eyebrow">Dedos.xyz</span>
          <strong>${ourUsd}</strong>
          <span class="matrix__note">${ourMx}</span>
        </div>
      </div>
    `);
    row.style.setProperty('--reveal-delay', `${index * 0.06}s`);
    container.appendChild(row);
  });
  observeReveal();
};

const renderDiscordPolicies = () => {
  const container = doc.querySelector('[data-discord-policies]');
  if (!container) return;
  container.innerHTML = '';
  DISCORD_POLICIES.forEach((policy, index) => {
    const node = createElement(`
      <article class="card tone--${policy.tone ?? 'mint'}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${policy.icon}"></i></span>
          <div>
            <h3 class="card__title">${policy.title}</h3>
          </div>
        </div>
        <p class="card__body">${policy.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
  applyIcons();
  observeReveal();
};

const renderDiscordServicesPage = async () => {
  const notice = doc.querySelector('[data-exchange-notice]');
  let rateInfo = { rate: null, updatedAt: null };

  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  renderDiscordOffers(rateInfo.rate);
  renderDecorationMatrix(rateInfo.rate);
  renderDiscordPolicies();

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  applyIcons();
  observeReveal();
};

const setupRedirectCountdown = () => {
  const target = body.dataset.redirectTarget;
  if (!target) return;

  const countdownEl = doc.querySelector('[data-countdown]');
  const fallbackMs = Number(body.dataset.redirectFallbackMs || '2400');
  let seconds = Math.ceil(fallbackMs / 1000);

  if (countdownEl) {
    countdownEl.textContent = String(seconds);
  }

  if (target === 'discord') {
    openDiscordInvite(discordInvite, fallbackMs);
  } else if (target === 'roblox') {
    openRobloxDestination(body.dataset.redirectUrl || robloxUrl, fallbackMs);
  }

  const interval = win.setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    if (countdownEl) countdownEl.textContent = String(seconds);
    if (seconds <= 0) {
      win.clearInterval(interval);
    }
  }, 1000);
};

const setupBackdrop = () => {
  const backdrop = doc.querySelector('[data-fx-backdrop]');
  if (!backdrop) return;
  const orbsCanvas = backdrop.querySelector('[data-fx-orbs]');
  const starsCanvas = backdrop.querySelector('[data-fx-stars]');
  const disposers = [];
  if (orbsCanvas) disposers.push(mountOrbs(orbsCanvas));
  if (starsCanvas) disposers.push(mountStars(starsCanvas));
  win.addEventListener('beforeunload', () => {
    disposers.forEach((dispose) => {
      try {
        dispose?.();
      } catch (error) {
        console.error('Failed to dispose backdrop effect', error);
      }
    });
  });
};

const init = () => {
  setupReveal();
  setupCurrentYear();
  setupHeaderShadow();
  setupNav();
  setupSectionLinks();
  setupLinkHandlers();
  setupBackdrop();

  if (page === 'robux') {
    renderRobuxPage();
  }

  if (page === 'services') {
    renderDigitalServicesPage();
  }

  if (page === 'discord-services') {
    renderDiscordServicesPage();
  }

  if (page === 'discord' || page === 'roblox') {
    setupRedirectCountdown();
  }

  applyIcons();
  observeReveal();
};

doc.addEventListener('DOMContentLoaded', init);
