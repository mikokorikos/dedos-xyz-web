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

const formatUsd = (amount) => {
  if (amount === null) return 'Consulta en Discord';
  return `≈ ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}`;
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

const PLAN_ICON_SVGS = {
  group: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-5 9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z" fill="currentColor"></path></svg>',
  gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-.8-1.4-2.4-2-3.8-1.4C6.7 3 6 4.2 6 5.5c0 .2 0 .3.1.5H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1c.1-.2.1-.3.1-.5 0-1.3-.7-2.5-2.2-3C14.4 2 12.8 2.6 12 4Zm2.3.9c.6.2.7.6.7.6 0 .3-.2.5-.4.5H12.7c.3-.6.6-1 .8-1.1.2-.2.4-.1.8 0ZM9 4.9c.4-.1.6-.2.8 0 .2.1.5.5.8 1.1H9.4c-.2 0-.4-.2-.4-.5 0 0 .1-.4.7-.6ZM5 9V8h6v2H5Zm8 9H9a1 1 0 0 1-1-1v-5h5v6Zm2 0v-6h5v5a1 1 0 0 1-1 1h-4ZM19 8v1h-6V8h6Z" fill="currentColor"></path></svg>',
  pass: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7.2 4.1 2.3-2.3a2 2 0 0 1 2.8 0l1.7 1.7 1.2-1.2a2 2 0 0 1 2.8 2.8l-1.2 1.2 1.7 1.7a2 2 0 0 1 0 2.8l-2.3 2.3-9-9Zm-4.2 6a2 2 0 0 1 2.8 0l7 7a2 2 0 0 1 0 2.8l-2.3 2.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8l2.3-2.3Z" fill="currentColor"></path></svg>'
};

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

const VALUE_POINTS = [
  {
    title: 'Comisiones optimizadas',
    description: 'Aprovechamos los precios regionales para que pagues menos sin sacrificar velocidad ni seguridad.',
    icon: 'shield'
  },
  {
    title: 'Recargas versátiles',
    description: 'Grupo, regalo o gamepass según la urgencia de tus Robux y el tipo de compra que necesitas.',
    icon: 'sparkles'
  },
  {
    title: 'Acompañamiento experto',
    description: 'Nuestro staff te guía 1:1 en Discord con evidencia de pago y seguimiento en vivo.',
    icon: 'messages-square'
  }
];

const PURCHASE_STEPS = [
  {
    title: 'Abre un ticket en Discord',
    description: 'Ingresa al servidor, elige la categoría de Robux y comparte tu usuario junto al método preferido.'
  },
  {
    title: 'Confirma monto y pago',
    description: 'Validamos tipo de cambio, revisamos disponibilidad y te mostramos los métodos de pago.'
  },
  {
    title: 'Recibe tus Robux',
    description: 'Liberamos el pedido apenas Roblox procesa la compra y te notificamos con evidencia.'
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

const renderValueHighlights = () => {
  const container = doc.querySelector('[data-robux-values]');
  if (!container) return;
  container.innerHTML = '';
  VALUE_POINTS.forEach((point, index) => {
    const node = createElement(`
      <article class="card tone--mint" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${point.icon}"></i></span>
          <div>
            <h3 class="card__title">${point.title}</h3>
          </div>
        </div>
        <p class="card__body">${point.description}</p>
      </article>
    `);
    node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
    container.appendChild(node);
  });
  applyIcons();
  observeReveal();
};

const renderPurchaseSteps = () => {
  const container = doc.querySelector('[data-robux-steps]');
  if (!container) return;
  container.innerHTML = '';
  PURCHASE_STEPS.forEach((step, index) => {
    const node = createElement(`
      <article class="card card--step tone--cyan" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true">${index + 1}</span>
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
  observeReveal();
};

const renderRobuxPage = async () => {
  const planContainer = doc.querySelector('[data-robux-plans]');
  const notice = doc.querySelector('[data-exchange-notice]');
  const formatterMx = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
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
        mx: formatterMx.format(plan.priceMXN),
        usd: formatUsd(usd)
      };
      const node = renderPlanCard(plan, priceLabels, index * 0.08);
      planContainer.appendChild(node);
    });
  }

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  renderValueHighlights();
  renderPurchaseSteps();
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

  if (page === 'discord' || page === 'roblox') {
    setupRedirectCountdown();
  }

  applyIcons();
  observeReveal();
};

doc.addEventListener('DOMContentLoaded', init);
