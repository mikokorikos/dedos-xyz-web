import { mountOrbs } from './fx-orbs.js';
import { mountStars } from './fx-stars.js';

const doc = document;
const win = window;
const body = doc.body;
const page = body.dataset.page ?? 'home';
const discordInvite = body.dataset.discordInvite ?? 'dedos';
const robloxUrl = body.dataset.robloxUrl ?? 'https://www.roblox.com/es/communities/12082479/unnamed#!/about';
const exchangeEndpoint = body.dataset.exchangeEndpoint ?? 'https://open.er-api.com/v6/latest/MXN';

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

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  const viewHeight = win.innerHeight || doc.documentElement.clientHeight;
  return rect.top <= viewHeight && rect.bottom >= 0;
};

const markVisible = (element) => {
  element.classList.add('is-visible');
};

const updateRevealVisibility = () => {
  doc.querySelectorAll('[data-animate]').forEach((el) => {
    if (!el.classList.contains('is-visible') && isInViewport(el)) {
      markVisible(el);
    }
  });
};

const observeReveal = (root = doc) => {
  root.querySelectorAll('[data-animate]:not([data-reveal-bound])').forEach((el) => {
    el.dataset.revealBound = 'true';
    if (revealObserver) {
      revealObserver.observe(el);
      if (isInViewport(el)) {
        markVisible(el);
      }
    } else {
      markVisible(el);
    }
  });
};

const setupReveal = () => {
  body.classList.add('reveal-ready');

  if (!('IntersectionObserver' in win)) {
    revealObserver = null;
    observeReveal();
    win.addEventListener('scroll', updateRevealVisibility, { passive: true });
    win.addEventListener('resize', updateRevealVisibility, { passive: true });
    updateRevealVisibility();
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          markVisible(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -10%' }
  );

  observeReveal();
  updateRevealVisibility();
  win.addEventListener('scroll', updateRevealVisibility, { passive: true });
  win.addEventListener('resize', updateRevealVisibility, { passive: true });
};

const setupCurrentYear = () => {
  doc.querySelectorAll('[data-current-year], #year').forEach((span) => {
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
  const base = page === 'home' ? '' : 'index.html';
  doc.querySelectorAll('[data-section-link]').forEach((link) => {
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

const DEFAULT_RATE = 0.05432;

const fetchExchangeRate = async () => {
  try {
    const response = await fetch(exchangeEndpoint, { cache: 'no-store' });
    if (!response.ok) {
      return { rate: DEFAULT_RATE, updatedAt: null, source: 'fallback' };
    }
    const data = await response.json();
    const usd = typeof data?.rates?.USD === 'number' ? data.rates.USD : null;
    const updatedAt = data?.time_last_update_utc ?? null;
    if (!usd) {
      return { rate: DEFAULT_RATE, updatedAt: null, source: 'fallback' };
    }
    return { rate: usd, updatedAt, source: 'api' };
  } catch (error) {
    console.error('Failed to fetch MXN → USD rate', error);
    return { rate: DEFAULT_RATE, updatedAt: null, source: 'fallback' };
  }
};

const MX_FORMATTER = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
const USD_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const formatPriceLabels = (entry, rate) => {
  const mxn = typeof entry?.priceMXN === 'number' ? entry.priceMXN : null;
  const usd = typeof entry?.priceUSD === 'number' ? entry.priceUSD : null;
  if (mxn !== null) {
    const usdValue = typeof rate === 'number' && rate > 0 ? mxn * rate : null;
    return {
      mx: MX_FORMATTER.format(mxn),
      usd: usdValue ? `≈ ${USD_FORMATTER.format(usdValue)}` : 'Confirma en ticket'
    };
  }
  if (usd !== null) {
    const mxValue = typeof rate === 'number' && rate > 0 ? usd / rate : null;
    return {
      mx: mxValue ? `≈ ${MX_FORMATTER.format(mxValue)}` : 'Confirma en ticket',
      usd: USD_FORMATTER.format(usd)
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

const formatExchangeNotice = (info) => {
  const { rate, updatedAt, source } = info ?? {};
  if (!rate) {
    return 'Tipo de cambio no disponible. Nuestro equipo confirmará el monto final en tu ticket.';
  }
  const base = `Tipo de cambio: 1 MXN = ${rate.toFixed(4)} USD`;
  if (source === 'api') {
    const date = updatedAt ? new Date(updatedAt) : null;
    const formatted = date
      ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(date)
      : null;
    return `${base} · Fuente: Open ER API${formatted ? ` (${formatted} UTC)` : ''}`;
  }
  return `${base} · Fuente: referencia manual · Confirma en el ticket.`;
};

const updateExchangeNotices = (info) => {
  doc.querySelectorAll('[data-exchange-notice]').forEach((notice) => {
    notice.textContent = formatExchangeNotice(info);
  });
};

const ROBUX_PLANS = [
  {
    id: 'group',
    title: 'Compra por grupo',
    tagline: 'Entrega instantánea en el grupo Dedos.xyz',
    amountLabel: '1,000 Robux',
    priceMXN: 125,
    tone: 'violet',
    icon: 'users',
    highlight: { label: 'Recomendado · Popular', tone: 'mint' },
    description:
      'Pagas dentro de nuestro grupo oficial y recibes los Robux al instante una vez confirmado el depósito. Ideal si ya cumples los requisitos de Roblox.',
    delivery: 'Validamos el pago, procesamos la compra y liberamos los fondos inmediatamente dentro del grupo.',
    requirements: [
      'Tu cuenta debe tener al menos 14 días de antigüedad para poder recibir pagos por grupo.',
      'Comparte tu usuario de Roblox y confirma que estás en el grupo Dedos.xyz.',
      'Graba evidencia en video del proceso para soporte y garantías.'
    ],
    extras: [
      'Puedes volver a comprar cuando quieras después de cumplir la primera espera de 14 días.',
      'Soporte del staff en vivo durante todo el proceso.'
    ],
    cta: {
      label: 'Ir al grupo oficial',
      href: robloxUrl
    }
  },
  {
    id: 'gift',
    title: 'Regalo por juego',
    tagline: 'Alternativa recomendada sin espera',
    amountLabel: '1,000 Robux',
    priceMXN: 126,
    tone: 'mint',
    icon: 'gift',
    highlight: { label: 'Entrega directa', tone: 'cyan' },
    description:
      'Escoge el gamepass o ítem dentro de tu juego favorito (ejemplo: fruta permanente en Blox Fruits). Nosotros lo compramos y lo recibes en segundos.',
    delivery: 'Compra inmediata dentro del juego elegido, con evidencia en video del regalo enviado.',
    requirements: [
      'Comparte el enlace directo al gamepass o producto que quieres recibir.',
      'El juego debe permitir regalos o compras para terceros.',
      'Mantén abierto tu ticket hasta confirmar que recibiste el ítem.'
    ],
    extras: [
      'No necesitas esperar los 14 días del grupo.',
      'Perfecto para aprovechar tendencias y eventos dentro de Roblox.'
    ]
  },
  {
    id: 'gamepass',
    title: 'Compra de gamepass',
    tagline: 'Opción menos recomendada',
    amountLabel: '1,000 Robux',
    priceMXN: 136.99,
    tone: 'pink',
    icon: 'shopping-bag',
    description:
      'Publica un gamepass con los montos requeridos (500, 100 y 29 Robux). Nosotros los adquirimos para liberar el saldo en tu cuenta.',
    delivery: 'La compra se refleja al instante, pero Roblox tarda de 5 a 10 días en depositar los Robux pendientes.',
    requirements: [
      'Configura gamepasses sin precios regionales con montos de 500, 100 y 29 Robux.',
      'Envía los enlaces directos de cada gamepass dentro del ticket.',
      'Debes mantener los gamepasses publicados hasta que recibas el saldo.'
    ],
    extras: [
      'Útil si manejas un catálogo propio y necesitas montos específicos.',
      'Te avisamos cuando Roblox libere cada desembolso.'
    ]
  }
];

const ROBUX_VALUES = [
  {
    title: 'Seguimiento en vivo',
    description: 'Te acompañamos por Discord durante toda la compra y grabamos evidencia de cada paso.',
    icon: 'radar',
    tone: 'mint'
  },
  {
    title: 'Pagos flexibles',
    description: 'Aceptamos PayPal, SPEI, depósitos OXXO y Litecoin. Siempre confirmamos disponibilidad en el ticket.',
    icon: 'wallet',
    tone: 'violet'
  },
  {
    title: 'Transparencia total',
    description: 'No somos socios de Roblox ni de las marcas mencionadas. Todo es servicio informal con reglas claras.',
    icon: 'shield-off',
    tone: 'pink'
  }
];

const ROBUX_STEPS = [
  {
    title: 'Abre ticket y comparte tu pedido',
    description: 'Entra al Discord, selecciona Robux y detalla el método que prefieres. Adjunta usuario y juego si aplica.',
    icon: 'message-circle',
    tone: 'mint'
  },
  {
    title: 'Verificación de requisitos',
    description: 'Confirmamos antigüedad de la cuenta, disponibilidad del juego y tipo de cambio antes de proceder.',
    icon: 'check-circle',
    tone: 'violet'
  },
  {
    title: 'Pago y entrega con evidencia',
    description: 'Pagas solo cuando apruebas el monto. Compartimos video de la entrega y cerramos el ticket contigo.',
    icon: 'sparkles',
    tone: 'pink'
  }
];

const ROBUX_POLICIES = [
  {
    title: 'Métodos de pago disponibles',
    description: 'PayPal, transferencia SPEI, depósitos OXXO y Litecoin. Confirma disponibilidad antes de enviar dinero.',
    icon: 'wallet',
    tone: 'mint'
  },
  {
    title: 'Reembolsos como cortesía',
    description: 'Solo evaluamos reembolso o reentrega con video completo, Transaction ID y reclamo dentro de 48 horas.',
    icon: 'shield-alert',
    tone: 'violet'
  },
  {
    title: 'Privacidad operativa',
    description: 'No recabamos datos sensibles automáticamente. Todo lo que compartas extra en el ticket es tu responsabilidad.',
    icon: 'lock',
    tone: 'cyan'
  },
  {
    title: 'Sin afiliación con Roblox',
    description: 'Dedos.xyz no representa ni tiene relación oficial con Roblox. Los nombres se usan solo para describir el servicio.',
    icon: 'badge-alert',
    tone: 'pink'
  }
];

const DIGITAL_SERVICES = [
  {
    id: 'spotify-key',
    title: 'Spotify Premium — Key vitalicia',
    subtitle: 'upgrade.ac verificado',
    description: 'Recibe una clave para activar Spotify Premium de por vida con guía paso a paso.',
    icon: 'music-4',
    tone: 'mint',
    plans: [{ label: 'Clave vitalicia', priceMXN: 100, note: 'Entrega manual con instrucciones oficiales.' }]
  },
  {
    id: 'spotify-account',
    title: 'Spotify Premium en tu cuenta',
    subtitle: 'Cuenta proporcionada o la tuya',
    description: 'Elegimos la ruta que prefieras: credenciales nuevas o activación en tu usuario actual.',
    icon: 'headphones',
    tone: 'mint',
    plans: [
      { label: '1 mes', priceMXN: 59 },
      { label: '3 meses', priceMXN: 169 },
      { label: '6 meses', priceMXN: 339 },
      { label: '12 meses', priceMXN: 549 }
    ],
    notes: ['Indica si quieres cuenta nueva o trabajar sobre la tuya en el ticket.']
  },
  {
    id: 'youtube-premium',
    title: 'YouTube Premium en tu cuenta',
    subtitle: 'Membresía administrada',
    description: 'Activamos Premium en tu cuenta principal o te conseguimos una alternativa según stock.',
    icon: 'youtube',
    tone: 'pink',
    plans: [
      { label: '1 mes', priceMXN: 59 },
      { label: '3 meses', priceMXN: 169 },
      { label: '12 meses', priceMXN: 549 }
    ],
    notes: ['Requerimos Transaction ID y video del proceso para soporte.']
  },
  {
    id: 'crunchyroll-provided',
    title: 'Crunchyroll Megafan — cuenta proporcionada',
    subtitle: 'Acceso inmediato',
    description: 'Recibes una cuenta lista para usar durante un mes completo con reposición por cortesía.',
    icon: 'tv',
    tone: 'violet',
    plans: [{ label: '1 mes', priceMXN: 20 }],
    notes: ['Cambiar la contraseña invalida la garantía.']
  },
  {
    id: 'crunchyroll-account',
    title: 'Crunchyroll Megafan en tu cuenta',
    subtitle: 'Control total',
    description: 'Activamos Megafan directamente en tu cuenta para que mantengas historial y listas.',
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
    description: 'Elige una cuenta proporcionada por Dedos.xyz o la activación directa sobre tu perfil.',
    icon: 'bot',
    tone: 'cyan',
    plans: [
      { label: 'Cuenta proporcionada', priceMXN: 59 },
      { label: 'En tu cuenta', priceMXN: 69 }
    ],
    notes: ['Si trabajamos con tu cuenta necesitaremos correo y contraseña temporal.']
  },
  {
    id: 'vpn-nord',
    title: 'NordVPN — 6 meses',
    subtitle: 'Seguridad premium',
    description: 'Protege tus dispositivos con licencia de 6 meses e instalación guiada.',
    icon: 'shield',
    tone: 'cyan',
    plans: [{ label: 'Licencia 6 meses', priceMXN: 79 }]
  }
];

const SERVICE_STEPS = [
  {
    title: 'Abre ticket y selecciona plan',
    description: 'Elige el servicio, duración y método de pago. Confirmamos disponibilidad en minutos.',
    icon: 'message-circle',
    tone: 'mint'
  },
  {
    title: 'Entrega evidencia y Transaction ID',
    description: 'Sin video y comprobante no hay soporte. Guarda todo hasta cerrar el ticket.',
    icon: 'camera',
    tone: 'violet'
  },
  {
    title: 'Recibe credenciales y seguimiento',
    description: 'Te entregamos la cuenta, key o activación y verificamos que funcione antes de finalizar.',
    icon: 'handshake',
    tone: 'pink'
  }
];

const DISCORD_OFFERS = [
  {
    title: 'Server Boost 1 mes',
    subtitle: 'Sistema totalmente automatizado',
    description: 'Usamos el enlace de tu servidor para aplicar los boosts en minutos, sin llaves ni códigos.',
    icon: 'zap',
    tone: 'violet',
    plans: [{ label: 'Boost x1 mes', priceMXN: 60 }],
    notes: ['Entrega inmediata después de confirmar pago y enlace.']
  },
  {
    title: 'Discord Nitro mensual',
    subtitle: 'Legal paid, gift o tarjeta',
    description: 'Nitro clásico al mejor precio. El método depende del stock disponible al momento.',
    icon: 'rocket',
    tone: 'mint',
    plans: [{ label: '1 mes', priceMXN: 95 }],
    notes: ['Confirma región de tu cuenta para evitar rechazos.']
  },
  {
    title: 'Paquete Nitro + Boost',
    subtitle: 'Listo para servidores nuevos',
    description: 'Incluye Nitro mensual y boost aplicado a tu servidor para lanzar tu comunidad con todo.',
    icon: 'sparkles',
    tone: 'pink',
    plans: [
      { label: 'Nitro + 2 boosts', priceMXN: 150, note: 'Incluye evidencia del proceso y ajustes básicos.' }
    ],
    notes: ['Coordina horario con el staff para aplicar los boosts en vivo.']
  }
];

const DECORATION_MATRIX = [
  { label: 'Decoración $4.99', officialUSD: 4.99, ourUSD: 3.1 },
  { label: 'Decoración $5.99', officialUSD: 5.99, ourUSD: 3.3 },
  { label: 'Decoración $6.99', officialUSD: 6.99, ourUSD: 3.6 },
  { label: 'Decoración $7.99', officialUSD: 7.99, ourUSD: 3.9 },
  { label: 'Decoración $8.49', officialUSD: 8.49, ourUSD: 4.05 },
  { label: 'Decoración $9.99', officialUSD: 9.99, ourUSD: 5.0 },
  { label: 'Decoración $11.99', officialUSD: 11.99, ourUSD: 5.5 }
];

const DISCORD_POLICIES = [
  {
    title: 'Pagos confirmados en ticket',
    description: 'Solo iniciamos entrega cuando apruebas el tipo de cambio y compartes Transaction ID.',
    icon: 'clipboard-check',
    tone: 'mint'
  },
  {
    title: 'Garantía con evidencia',
    description: 'Cualquier aclaración requiere video completo y capturas del ticket. Sin pruebas no hay soporte.',
    icon: 'file-warning',
    tone: 'violet'
  },
  {
    title: 'Marcas independientes',
    description: 'No tenemos relación con Discord ni otras marcas. Todos los nombres son descriptivos del servicio ofrecido.',
    icon: 'badge-alert',
    tone: 'pink'
  }
];

const renderRobuxPlans = (rateInfo) => {
  const container = doc.querySelector('[data-robux-plans]');
  if (!container) return;
  container.innerHTML = '';
  ROBUX_PLANS.forEach((plan, index) => {
    const labels = formatPriceLabels({ priceMXN: plan.priceMXN }, rateInfo.rate);
    const highlight = plan.highlight
      ? `<span class="plan-card__badge" data-tone="${plan.highlight.tone}">${plan.highlight.label}</span>`
      : '';
    const extras = Array.isArray(plan.extras) && plan.extras.length
      ? `<section class="plan-card__section"><h4>Extras</h4><ul>${plan.extras.map((extra) => `<li>${extra}</li>`).join('')}</ul></section>`
      : '';
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${plan.tone}">
        ${highlight}
        <header class="plan-card__header">
          <div class="plan-card__icon" data-plan-icon><i data-lucide="${plan.icon}"></i></div>
          <div class="plan-card__headings">
            <h3 class="plan-card__title">${plan.title}</h3>
            <p class="plan-card__subtitle">${plan.tagline}</p>
          </div>
        </header>
        <div class="plan-card__pricing">
          <span class="plan-card__label">Total estimado</span>
          <strong class="plan-card__price">${labels.mx}</strong>
          <span class="plan-card__meta">${labels.usd}</span>
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
        ${plan.cta ? `<a class="btn btn--primary plan-card__cta" href="${plan.cta.href}" data-roblox-link>${plan.cta.label}</a>` : ''}
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderRobuxValues = () => {
  const container = doc.querySelector('[data-robux-values]');
  if (!container) return;
  container.innerHTML = '';
  ROBUX_VALUES.forEach((value, index) => {
    const node = createElement(`
      <article class="card tone--${value.tone}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${value.icon}"></i></span>
          <div><h3 class="card__title">${value.title}</h3></div>
        </div>
        <p class="card__body">${value.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderRobuxSteps = () => {
  const container = doc.querySelector('[data-robux-steps]');
  if (!container) return;
  container.innerHTML = '';
  ROBUX_STEPS.forEach((step, index) => {
    const node = createElement(`
      <article class="card card--step tone--${step.tone}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${step.icon}"></i></span>
          <div><h3 class="card__title">${step.title}</h3></div>
        </div>
        <p class="card__body">${step.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderRobuxPolicies = () => {
  const container = doc.querySelector('[data-robux-policies]');
  if (!container) return;
  container.innerHTML = '';
  ROBUX_POLICIES.forEach((policy, index) => {
    const node = createElement(`
      <article class="card tone--${policy.tone}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${policy.icon}"></i></span>
          <div><h3 class="card__title">${policy.title}</h3></div>
        </div>
        <p class="card__body">${policy.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderDigitalServices = (rateInfo) => {
  const container = doc.querySelector('[data-digital-services]');
  if (!container) return;
  container.innerHTML = '';
  DIGITAL_SERVICES.forEach((service, index) => {
    const priceList = createPriceListMarkup(service.plans, rateInfo.rate);
    const notes = createNotesList(service.notes);
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${service.tone}">
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
    container.appendChild(node);
  });
};

const renderServiceSteps = () => {
  const container = doc.querySelector('[data-service-steps]');
  if (!container) return;
  container.innerHTML = '';
  SERVICE_STEPS.forEach((step, index) => {
    const node = createElement(`
      <article class="card card--step tone--${step.tone}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${step.icon}"></i></span>
          <div><h3 class="card__title">${step.title}</h3></div>
        </div>
        <p class="card__body">${step.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderDiscordOffers = (rateInfo) => {
  const container = doc.querySelector('[data-discord-offers]');
  if (!container) return;
  container.innerHTML = '';
  DISCORD_OFFERS.forEach((offer, index) => {
    const priceList = createPriceListMarkup(offer.plans, rateInfo.rate);
    const notes = createNotesList(offer.notes);
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${offer.tone}">
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

const renderDecorationMatrix = (rateInfo) => {
  const container = doc.querySelector('[data-decoration-matrix]');
  if (!container) return;
  container.innerHTML = '';
  DECORATION_MATRIX.forEach((tier, index) => {
    const officialUsd = USD_FORMATTER.format(tier.officialUSD);
    const ourUsd = USD_FORMATTER.format(tier.ourUSD);
    const mxn = typeof rateInfo.rate === 'number' && rateInfo.rate > 0 ? `≈ ${MX_FORMATTER.format(tier.ourUSD / rateInfo.rate)}` : 'Confirma en ticket';
    const node = createElement(`
      <div class="matrix__row" data-animate="rise">
        <div class="matrix__cell">
          <span class="matrix__eyebrow">Precio oficial</span>
          <strong>${officialUsd}</strong>
          <span class="matrix__note">${tier.label}</span>
        </div>
        <div class="matrix__cell matrix__cell--accent">
          <span class="matrix__eyebrow">Dedos.xyz</span>
          <strong>${ourUsd}</strong>
          <span class="matrix__note">${mxn}</span>
        </div>
      </div>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.06}s`);
    container.appendChild(node);
  });
};

const renderDiscordPolicies = () => {
  const container = doc.querySelector('[data-discord-policies]');
  if (!container) return;
  container.innerHTML = '';
  DISCORD_POLICIES.forEach((policy, index) => {
    const node = createElement(`
      <article class="card tone--${policy.tone}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${policy.icon}"></i></span>
          <div><h3 class="card__title">${policy.title}</h3></div>
        </div>
        <p class="card__body">${policy.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
};

const renderRobuxPage = async () => {
  const rateInfo = await fetchExchangeRate();
  renderRobuxPlans(rateInfo);
  renderRobuxValues();
  renderRobuxSteps();
  renderRobuxPolicies();
  updateExchangeNotices(rateInfo);
  applyIcons();
  observeReveal();
};

const renderDigitalServicesPage = async () => {
  const rateInfo = await fetchExchangeRate();
  renderDigitalServices(rateInfo);
  renderServiceSteps();
  updateExchangeNotices(rateInfo);
  applyIcons();
  observeReveal();
};

const renderDiscordServicesPage = async () => {
  const rateInfo = await fetchExchangeRate();
  renderDiscordOffers(rateInfo);
  renderDecorationMatrix(rateInfo);
  renderDiscordPolicies();
  updateExchangeNotices(rateInfo);
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
    if (countdownEl) {
      countdownEl.textContent = String(seconds);
    }
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
