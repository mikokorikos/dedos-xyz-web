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

const DIGITAL_SERVICES = [
  {
    id: 'spotify-key',
    title: 'Spotify Premium — Key vitalicia',
    subtitle: 'Upgrade.ac oficial',
    description: 'Te enviamos una clave para redimir Spotify Premium de por vida mediante upgrade.ac. Ideal si administras varias cuentas sin compartir accesos personales.',
    icon: 'music-4',
    tone: 'mint',
    plans: [{ label: 'Clave vitalicia', priceMXN: 100, note: 'Clave upgrade.ac con instrucciones paso a paso.' }],
    notes: ['Incluye guía en video para canjear la key.', 'No solicitamos correo ni contraseña personales.']
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
    notes: ['Confirma si quieres cuenta nueva o tu usuario actual en el ticket.', 'Grabación obligatoria mostrando Transaction ID.']
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
    notes: ['Necesitamos tu Transaction ID y video del proceso para soporte futuro.', 'Método vía gift o tarjeta según stock disponible.']
  },
  {
    id: 'crunchyroll-provided',
    title: 'Crunchyroll Megafan — cuenta proporcionada',
    subtitle: 'Acceso inmediato',
    description: 'Recibe credenciales listas para usar durante 1 mes completo con garantía de reposición por cortesía.',
    icon: 'tv',
    tone: 'violet',
    plans: [{ label: '1 mes', priceMXN: 20 }],
    notes: ['Cambiar la contraseña invalida la garantía.', 'Incluye respaldo de acceso por cortesía.']
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
    ],
    notes: ['Solicitamos correo y código de seguridad temporal solo durante la activación.']
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
    notes: ['Necesitamos correo y contraseña temporales si trabajamos con tu cuenta.', 'Incluye verificación del estado Plus en vivo.']
  },
  {
    id: 'vpn-nord',
    title: 'NordVPN — 6 meses',
    subtitle: 'Seguridad premium',
    description: 'Protege tus dispositivos con 6 meses de NordVPN. Envío manual y asistencia en la activación.',
    icon: 'shield',
    tone: 'cyan',
    plans: [{ label: 'Licencia 6 meses', priceMXN: 79 }],
    notes: ['Entrega de credenciales y pasos para cambiar la contraseña tras activar.']
  }
];

const DISCORD_OFFERS = [
  {
    title: 'Server Boost 1 mes',
    subtitle: 'Sistema totalmente automatizado',
    description: 'Aplicamos los boosts apenas confirmas tu pago. Solo necesitas compartir el enlace del servidor, sin claves ni códigos.',
    icon: 'zap',
    tone: 'violet',
    plans: [{ label: 'Boost x1 mes', priceMXN: 60 }],
    notes: [
      '📌 Fully Automated System: usamos el enlace de tu servidor para entrega instantánea.',
      '⚡ Fast & Instant Delivery: los boosts se aplican minutos después del pago confirmado.'
    ]
  },
  {
    title: 'Discord Nitro mensual',
    subtitle: 'Dedos Shop — mejor precio',
    description: 'Vendemos N17r0 B005tz legales por 95 MXN al mes. Puede ser vía gift o tarjeta según el stock disponible en el momento.',
    icon: 'bolt',
    tone: 'mint',
    plans: [{ label: '1 mes', priceMXN: 95 }],
    notes: ['Confirma la región de tu cuenta para evitar rechazos.', 'Entregamos evidencia en video del canje o activación.']
  },
  {
    title: 'Decoraciones de perfil',
    subtitle: 'Legal paid por regalo',
    description: 'Selecciona la decoración oficial que quieras y la enviamos como regalo con descuento frente al precio de Discord.',
    icon: 'sparkles',
    tone: 'pink',
    plans: [{ label: 'Desde', priceUSD: 3.1 }],
    notes: ['Consulta la tabla para ver cada nivel frente al precio oficial.', 'Mostramos equivalencia en MXN usando el tipo de cambio del día.']
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

const ROBUX_PLANS = [
  {
    id: 'group',
    title: 'Recarga por grupo oficial',
    tagline: 'Recomendado · Popular',
    tone: 'pink',
    priceMXN: 125,
    icon: 'group',
    highlight: { label: 'Recomendado · Popular', tone: 'mint' },
    amountLabel: '1,000 Robux',
    description: 'Compra desde nuestro grupo de Roblox para obtener el mejor precio. Ideal si recargas seguido y puedes esperar la antigüedad requerida.',
    requirements: [
      'Unirte al grupo oficial de Dedos.xyz en Roblox.',
      'Esperar 14 días después de ingresar al grupo (política Roblox).'
    ],
    delivery: 'Una vez cumplidos los 14 días, liberamos el pago y recibes los Robux prácticamente al instante.',
    extras: ['Seguimiento en vivo dentro del ticket.', 'Comisiones más bajas garantizadas.'],
    cta: { label: 'Ir al grupo de Roblox', href: robloxUrl }
  },
  {
    id: 'gift',
    title: 'Regalo por juego',
    tagline: 'Alternativa recomendada',
    tone: 'cyan',
    priceMXN: 126,
    icon: 'gift',
    highlight: { label: 'Alternativa recomendada', tone: 'violet' },
    amountLabel: '1,000 Robux',
    description: 'Elegimos el gamepass o artículo que nos indiques dentro de tu juego favorito. Ideal si no quieres esperar 14 días en el grupo.',
    requirements: [
      'Seleccionar un juego donde se puedan regalar artículos o gamepasses.',
      'Enviar el enlace directo al artículo desde tu ticket en Discord.'
    ],
    delivery: 'Compramos el artículo en cuanto confirmamos el pago y recibes los Robux al instante.',
    extras: ['No requiere antigüedad en grupos.', 'Ejemplo: regalar una fruta perm en Blox Fruits o un gamepass destacado.']
  },
  {
    id: 'pass',
    title: 'Compra directa de gamepass',
    tagline: 'Menos recomendada',
    tone: 'violet',
    priceMXN: 136.99,
    icon: 'pass',
    highlight: { label: 'Menos recomendada', tone: 'pink' },
    amountLabel: '1,000 Robux',
    description: 'Publica un gamepass con los montos permitidos y nosotros lo adquirimos. Perfecto si ya tienes tu catálogo configurado sin precios regionales.',
    requirements: [
      'Gamepasses publicados por 500, 100 o 29 Robux sin precios regionales.',
      'Compartir el enlace al gamepass en el ticket.'
    ],
    delivery: 'Tras confirmar el pago, la compra se procesa en unas horas y Roblox libera los Robux en 5-10 días hábiles.',
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
        <div class="plan-card__identity">
          <span class="plan-card__icon" aria-hidden="true">${PLAN_ICON_SVGS[plan.icon] || ''}</span>
          <div class="plan-card__headings">
            <h3 class="plan-card__title">${plan.title}</h3>
            <p class="plan-card__subtitle">${plan.tagline}</p>
          </div>
        </div>
        <div class="plan-card__pricing">
          <span class="plan-card__label">${plan.amountLabel}</span>
          <span class="plan-card__price">${priceLabels.mx}</span>
          <span class="plan-card__meta">${priceLabels.usd}</span>
        </div>
      </header>
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
      const primaryPlan = Array.isArray(service.plans) && service.plans.length > 0 ? service.plans[0] : null;
      const primaryLabels = primaryPlan ? formatPriceLabels(primaryPlan, rateInfo.rate) : { mx: 'Consulta en Discord', usd: 'Confirma en ticket' };
      const priceList = createPriceListMarkup(service.plans, rateInfo.rate);
      const notes = createNotesList(service.notes);
      const node = createElement(`
        <article class="plan-card" data-animate="rise" data-tone="${service.tone ?? 'mint'}">
          <header class="plan-card__header">
            <div class="plan-card__identity">
              <div class="plan-card__icon" data-plan-icon><i data-lucide="${service.icon}"></i></div>
              <div class="plan-card__headings">
                <h3 class="plan-card__title">${service.title}</h3>
                ${service.subtitle ? `<p class="plan-card__subtitle">${service.subtitle}</p>` : ''}
              </div>
            </div>
            <div class="plan-card__pricing">
              <span class="plan-card__label">${primaryPlan?.label ?? 'Consulta en Discord'}</span>
              <span class="plan-card__price">${primaryLabels.mx}</span>
              <span class="plan-card__meta">${primaryLabels.usd}</span>
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
    const primaryPlan = Array.isArray(offer.plans) && offer.plans.length > 0 ? offer.plans[0] : null;
    const primaryLabels = primaryPlan ? formatPriceLabels(primaryPlan, rate) : { mx: 'Consulta en Discord', usd: 'Confirma en ticket' };
    const priceList = createPriceListMarkup(offer.plans, rate);
    const notes = createNotesList(offer.notes);
    const node = createElement(`
      <article class="plan-card" data-animate="rise" data-tone="${offer.tone ?? 'mint'}">
        <header class="plan-card__header">
          <div class="plan-card__identity">
            <div class="plan-card__icon" data-plan-icon><i data-lucide="${offer.icon}"></i></div>
            <div class="plan-card__headings">
              <h3 class="plan-card__title">${offer.title}</h3>
              ${offer.subtitle ? `<p class="plan-card__subtitle">${offer.subtitle}</p>` : ''}
            </div>
          </div>
          <div class="plan-card__pricing">
            <span class="plan-card__label">${primaryPlan?.label ?? 'Consulta en Discord'}</span>
            <span class="plan-card__price">${primaryLabels.mx}</span>
            <span class="plan-card__meta">${primaryLabels.usd}</span>
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
