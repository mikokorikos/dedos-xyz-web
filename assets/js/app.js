(function () {
  'use strict';

  const doc = document;
  const body = doc.body;
  const win = window;

  const HERO_STATS = [
    {
      value: '+55K',
      label: 'Pedidos completados',
      meta: 'Historial verificado',
      icon: 'chart-no-axes-gantt',
      tone: 'violet'
    },
    {
      value: '≈10',
      label: 'Minutos promedio',
      meta: 'Entrega media',
      icon: 'timer',
      tone: 'cyan'
    },
    {
      value: '4.9/5',
      label: 'Satisfacción global',
      meta: 'Clientes felices',
      icon: 'star',
      tone: 'pink'
    }
  ];

  const HERO_FEATURED = [
    {
      title: 'Robux',
      subtitle: 'Carga segura',
      badges: [
        { label: 'Gaming', icon: 'gamepad-2', tone: 'cyan' },
        { label: 'Best seller', icon: 'flame', tone: 'pink' }
      ],
      icon: 'gamepad-2',
      tone: 'cyan'
    },
    {
      title: 'Discord Nitro',
      subtitle: 'Mensual y anual',
      badges: [
        { label: 'Discord', icon: 'discord', tone: 'violet' },
        { label: 'Popular', icon: 'sparkles', tone: 'pink' }
      ],
      icon: 'bolt',
      tone: 'violet'
    },
    {
      title: 'Decoraciones Discord',
      subtitle: 'Banners, iconos y packs para servidores',
      badges: [
        { label: 'Estilo', icon: 'wand-2', tone: 'pink' },
        { label: 'Discord', icon: 'discord', tone: 'violet' }
      ],
      icon: 'palette',
      tone: 'pink'
    },
    {
      title: 'Servicios',
      subtitle: 'ChatGPT, Spotify, YouTube, Crunchyroll',
      badges: [
        { label: 'Digital', icon: 'grid', tone: 'mint' },
        { label: 'Oferta', icon: 'badge-percent', tone: 'pink' }
      ],
      icon: 'grid',
      tone: 'mint'
    },
    {
      title: 'VPNs',
      subtitle: 'Top providers',
      badges: [{ label: 'Privacidad', icon: 'shield-check', tone: 'cyan' }],
      icon: 'shield',
      tone: 'cyan'
    },
    {
      title: 'Boosts',
      subtitle: 'Niveles garantizados',
      badges: [
        { label: 'Discord', icon: 'discord', tone: 'violet' },
        { label: 'Rápido', icon: 'zap', tone: 'cyan' }
      ],
      icon: 'zap',
      tone: 'violet'
    }
  ];

  const CATALOG = [
    {
      title: 'Robux',
      copy: '1,000 Robux desde 125 MXN con seguimiento en vivo, precios centrados y confirmación visual.',
      badges: [
        { label: 'Gaming', icon: 'gamepad-2', tone: 'cyan' },
        { label: 'Best seller', icon: 'flame', tone: 'pink' }
      ],
      cta: 'Ver planes',
      href: 'robux.html',
      icon: 'gamepad-2',
      tone: 'cyan'
    },
    {
      title: 'Discord Nitro',
      copy: 'Nitro, boosts y decoraciones premium con precios en MXN y USD.',
      badges: [
        { label: 'Discord', icon: 'discord', tone: 'violet' },
        { label: 'Popular', icon: 'sparkles', tone: 'pink' }
      ],
      cta: 'Ver catálogo',
      href: 'discord.html',
      icon: 'bolt',
      tone: 'violet'
    },
    {
      title: 'Decoraciones Discord',
      copy: 'Ahorra frente al precio oficial en banners y efectos premium.',
      badges: [
        { label: 'Estilo', icon: 'wand-2', tone: 'pink' },
        { label: 'Discord', icon: 'discord', tone: 'violet' }
      ],
      cta: 'Comparar precios',
      href: 'discord.html#decoraciones',
      icon: 'palette',
      tone: 'pink'
    },
    {
      title: 'Servicios digitales',
      copy: 'Spotify, YouTube, Crunchyroll, ChatGPT Plus y más con activación guiada.',
      badges: [
        { label: 'Digital', icon: 'grid', tone: 'mint' },
        { label: 'Oferta', icon: 'badge-percent', tone: 'pink' }
      ],
      cta: 'Ver servicios',
      href: 'servicios.html',
      icon: 'grid',
      tone: 'mint'
    },
    {
      title: 'VPNs & seguridad',
      copy: 'NordVPN y más proveedores premium con soporte humano.',
      badges: [{ label: 'Privacidad', icon: 'shield-check', tone: 'cyan' }],
      cta: 'Consultar',
      href: 'servicios.html#vpn',
      icon: 'shield-check',
      tone: 'cyan'
    },
    {
      title: 'Boosts de servidor',
      copy: 'Sistema automatizado para subir de nivel tu comunidad en minutos.',
      badges: [
        { label: 'Discord', icon: 'discord', tone: 'violet' },
        { label: 'Rápido', icon: 'zap', tone: 'cyan' }
      ],
      cta: 'Ver paquetes',
      href: 'discord.html',
      icon: 'rocket',
      tone: 'violet'
    }
  ];

  const SERVICES = [
    {
      title: 'Pagos flexibles',
      copy: 'PayPal, transferencia MX, tarjetas digitales y Litecoin listos en tu ticket.',
      icon: 'wallet',
      tone: 'mint'
    },
    {
      title: 'Respuesta inmediata',
      copy: 'Equipo 24/7 con automatizaciones para resolver en minutos.',
      icon: 'zap',
      tone: 'violet'
    },
    {
      title: 'Experiencia premium',
      copy: 'Cards con precios centrados, recordatorios de promos y confirmación visual en cada paso.',
      icon: 'sparkles',
      tone: 'pink'
    }
  ];

  const WHY = [
    {
      title: 'Confianza real',
      copy: '+55K pedidos completados con calificación 4.9/5.',
      icon: 'shield-check',
      tone: 'mint'
    },
    {
      title: 'Precios claros',
      copy: 'Mostramos MXN y USD usando tipo de cambio en vivo.',
      icon: 'wallet',
      tone: 'cyan'
    },
    {
      title: 'Pagos versátiles',
      copy: 'PayPal, transferencia MX y Litecoin en un mismo panel.',
      icon: 'credit-card',
      tone: 'violet'
    },
    {
      title: 'Atención humana',
      copy: 'Acompañamiento 1:1 durante compra, entrega y soporte.',
      icon: 'sparkles',
      tone: 'pink'
    }
  ];

  const FAQ = [
    { q: '¿Cómo compro?', a: 'Entra a Discord, abre un ticket y confirma el método de entrega. Nuestro equipo te guía paso a paso.' },
    { q: '¿Tiempos de entrega?', a: 'La mayoría de los pedidos se completan en minutos. Si se requiere verificación manual, te avisamos.' },
    { q: '¿Reembolsos?', a: 'Analizamos cada caso en tu ticket y te guiamos con la mejor alternativa disponible.' },
    { q: '¿Es seguro?', a: 'Seguimiento visual, staff verificado y confirmaciones en tiempo real para total tranquilidad.' }
  ];

  const createElement = (markup) => {
    const template = doc.createElement('template');
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  };

  const createBadgeMarkup = (badge) => {
    if (!badge) return '';
    if (typeof badge === 'string') {
      return `<span class="badge">${badge}</span>`;
    }
    const toneAttr = badge.tone ? ` data-tone="${badge.tone}"` : '';
    const iconMarkup = badge.icon ? `<i data-lucide="${badge.icon}" aria-hidden="true"></i>` : '';
    return `<span class="badge"${toneAttr}>${iconMarkup}<span>${badge.label}</span></span>`;
  };

  const applyIcons = () => {
    if (win.lucide?.createIcons) {
      win.lucide.createIcons();
    }
  };

  const SHARED_REDIRECT_BENEFITS = [
    {
      icon: 'badge-percent',
      title: 'Precios bajos',
      copy: 'MXN y USD alineados al centro para comparar sin esfuerzo.'
    },
    {
      icon: 'zap',
      title: 'Respuesta rápida',
      copy: 'Soporte humano 24/7 con resolución en minutos.'
    },
    {
      icon: 'coins',
      title: 'Litecoin',
      copy: 'Pagos ágiles con comisiones mínimas y confirmación instantánea.'
    },
    {
      icon: 'banknote',
      title: 'Transferencia MX',
      copy: 'SPEI y depósitos nacionales sin complicaciones.'
    },
    {
      icon: 'credit-card',
      title: 'PayPal',
      copy: 'Protección y recibos automáticos en cada compra.'
    }
  ];

  const REDIRECT_CONTENT = {
    discord: {
      type: 'discord',
      eyebrow: 'Experiencia Dedos.xyz',
      title: 'Listo para entrar a Discord',
      message: 'Mientras abrimos el servidor, conoce los beneficios premium que te esperan en Dedos.xyz.',
      countdownLabel: 'Abriendo Discord…',
      icon: 'message-circle-heart',
      continueLabel: 'Entrar ahora',
      cancelLabel: 'Quedarme aquí',
      benefits: SHARED_REDIRECT_BENEFITS
    },
    roblox: {
      type: 'roblox',
      eyebrow: 'Experiencia Dedos.xyz',
      title: 'Tu salto a Roblox está casi listo',
      message: 'Revisa nuestras ventajas premium antes de entrar al grupo oficial de Roblox.',
      countdownLabel: 'Abriendo Roblox…',
      icon: 'gamepad-2',
      continueLabel: 'Ir a Roblox',
      cancelLabel: 'Quedarme aquí',
      benefits: SHARED_REDIRECT_BENEFITS
    }
  };

  const DEFAULT_REDIRECT_DELAY = 3000;

  let redirectOverlay;
  const redirectState = {
    timer: null,
    interval: null,
    seconds: 0,
    config: null,
    completed: false
  };

  const ensureRedirectOverlay = () => {
    if (redirectOverlay) return redirectOverlay;
    redirectOverlay = createElement(`
      <div class="redirect-overlay" data-redirect-overlay hidden>
        <article class="redirect-modal" role="dialog" aria-modal="true" aria-labelledby="redirect-modal-title">
          <div class="redirect-modal__icon" data-redirect-icon></div>
          <p class="redirect-modal__eyebrow" data-redirect-eyebrow>Experiencia Dedos.xyz</p>
          <h2 class="redirect-modal__title" id="redirect-modal-title" data-redirect-title>Redirigiendo…</h2>
          <p class="redirect-modal__message" data-redirect-message>Preparamos tu destino con beneficios exclusivos.</p>
          <div class="redirect-modal__benefits" data-redirect-benefits></div>
          <div class="redirect-modal__countdown">
            <span class="redirect-modal__countdown-number" data-countdown>3</span>
            <span class="redirect-modal__countdown-label" data-redirect-countdown-label>Redirigiendo…</span>
          </div>
          <div class="redirect-modal__actions">
            <button class="btn btn--primary" type="button" data-redirect-continue>Ir ahora</button>
            <button class="btn btn--ghost" type="button" data-redirect-cancel>Quedarme aquí</button>
          </div>
        </article>
      </div>
    `);
    doc.body.appendChild(redirectOverlay);
    applyIcons();
    return redirectOverlay;
  };

  const updateRedirectOverlayContent = (config) => {
    const overlay = ensureRedirectOverlay();
    const eyebrow = overlay.querySelector('[data-redirect-eyebrow]');
    const title = overlay.querySelector('[data-redirect-title]');
    const message = overlay.querySelector('[data-redirect-message]');
    const label = overlay.querySelector('[data-redirect-countdown-label]');
    const iconHost = overlay.querySelector('[data-redirect-icon]');
    const benefitsHost = overlay.querySelector('[data-redirect-benefits]');
    const continueBtn = overlay.querySelector('[data-redirect-continue]');
    const cancelBtn = overlay.querySelector('[data-redirect-cancel]');

    if (eyebrow) eyebrow.textContent = config.eyebrow ?? 'Experiencia Dedos.xyz';
    if (title) title.textContent = config.title ?? 'Listo para continuar';
    if (message) message.textContent = config.message ?? '';
    if (label) label.textContent = config.countdownLabel ?? 'Redirigiendo…';
    if (iconHost) {
      iconHost.innerHTML = `<i data-lucide="${config.icon ?? 'sparkles'}" aria-hidden="true"></i>`;
    }
    if (benefitsHost) {
      benefitsHost.innerHTML = (config.benefits ?? []).map(
        (benefit) => `
          <div class="redirect-modal__benefit">
            <span class="redirect-modal__benefit-icon" aria-hidden="true"><i data-lucide="${benefit.icon}"></i></span>
            <div class="redirect-modal__benefit-copy">
              <span class="redirect-modal__benefit-title">${benefit.title}</span>
              <span class="redirect-modal__benefit-text">${benefit.copy}</span>
            </div>
          </div>
        `
      ).join('');
    }
    if (continueBtn) continueBtn.textContent = config.continueLabel ?? 'Continuar';
    if (cancelBtn) cancelBtn.textContent = config.cancelLabel ?? 'Cancelar';
    applyIcons();
    return overlay;
  };

  const updateCountdownDisplays = (value) => {
    const safeValue = Math.max(0, value);
    doc.querySelectorAll('[data-countdown]').forEach((el) => {
      el.textContent = String(safeValue);
    });
  };

  const showRedirectOverlay = (config) => {
    const overlay = updateRedirectOverlayContent(config);
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => {
      overlay.dataset.open = 'true';
      body.classList.add('is-redirecting');
    });
    win.setTimeout(() => {
      overlay.querySelector('[data-redirect-continue]')?.focus({ preventScroll: true });
    }, 60);
  };

  const hideRedirectOverlay = () => {
    if (!redirectOverlay) return;
    redirectOverlay.dataset.open = 'false';
    body.classList.remove('is-redirecting');
    const finalize = () => {
      redirectOverlay?.setAttribute('hidden', '');
    };
    redirectOverlay.addEventListener('transitionend', finalize, { once: true });
    win.setTimeout(() => {
      if (redirectOverlay && !redirectOverlay.hasAttribute('hidden')) {
        finalize();
      }
    }, 320);
  };

  const clearRedirectTimers = () => {
    if (redirectState.timer) {
      win.clearTimeout(redirectState.timer);
      redirectState.timer = null;
    }
    if (redirectState.interval) {
      win.clearInterval(redirectState.interval);
      redirectState.interval = null;
    }
  };

  const completePromoRedirect = () => {
    const config = redirectState.config;
    if (!config || redirectState.completed) return;
    redirectState.completed = true;
    clearRedirectTimers();
    hideRedirectOverlay();
    if (config.type === 'discord') {
      openDiscordInvite(config.invite ?? body.dataset.discordInvite ?? 'dedos', config.timeoutMs);
    } else if (config.type === 'roblox') {
      openRobloxDestination(
        config.url ?? body.dataset.robloxUrl ?? 'https://www.roblox.com/',
        config.timeoutMs
      );
    }
    redirectState.config = null;
  };

  const cancelPromoRedirect = () => {
    clearRedirectTimers();
    redirectState.config = null;
    redirectState.completed = false;
    hideRedirectOverlay();
  };

  const beginPromoRedirect = (input) => {
    const base = REDIRECT_CONTENT[input.type] ?? REDIRECT_CONTENT.discord;
    const delayMsRaw = typeof input.delayMs === 'number' ? input.delayMs : Number.NaN;
    const delayMs = Number.isFinite(delayMsRaw) && delayMsRaw > 0 ? delayMsRaw : DEFAULT_REDIRECT_DELAY;
    const config = {
      ...base,
      ...input,
      type: input.type ?? base.type,
      benefits: input.benefits ?? base.benefits,
      delayMs
    };

    clearRedirectTimers();
    redirectState.config = config;
    redirectState.completed = false;
    redirectState.seconds = Math.ceil(delayMs / 1000);

    showRedirectOverlay(config);
    updateCountdownDisplays(redirectState.seconds);

    redirectState.interval = win.setInterval(() => {
      redirectState.seconds = Math.max(0, redirectState.seconds - 1);
      updateCountdownDisplays(redirectState.seconds);
      if (redirectState.seconds <= 0) {
        win.clearInterval(redirectState.interval);
        redirectState.interval = null;
      }
    }, 1000);

    redirectState.timer = win.setTimeout(() => {
      completePromoRedirect();
    }, delayMs);
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
    }, { threshold: 0.22, rootMargin: '0px 0px -10%' });
    observeReveal();
    updateRevealVisibility();
    win.addEventListener('scroll', updateRevealVisibility, { passive: true });
    win.addEventListener('resize', updateRevealVisibility, { passive: true });
    ensureRevealLoop();
  };

  const renderHeroStats = () => {
    const container = doc.getElementById('hero-stats');
    if (!container) return;
    container.innerHTML = '';
    HERO_STATS.forEach((stat, index) => {
      const item = createElement(`
        <article class="stat-card tone--${stat.tone || 'violet'}" data-animate="rise">
          ${stat.icon ? `<span class="stat-card__icon" aria-hidden="true"><i data-lucide="${stat.icon}"></i></span>` : ''}
          <div class="stat-card__content">
            <p class="stat-card__label">${stat.label}</p>
            <div class="stat-card__value">${stat.value}</div>
            ${stat.meta ? `<p class="stat-card__meta">${stat.meta}</p>` : ''}
          </div>
        </article>
      `);
      item.style.setProperty('--reveal-delay', `${index * 0.08}s`);
      container.appendChild(item);
    });
    applyIcons();
    observeReveal();
  };

  const renderHeroFeatured = () => {
    const container = doc.getElementById('hero-featured');
    if (!container) return;
    container.innerHTML = '';
    HERO_FEATURED.forEach((feature, index) => {
      const card = createElement(`
        <article class="feature-card" data-animate="zoom" data-tone="${feature.tone}">
          <span class="feature-card__icon" aria-hidden="true"><i data-lucide="${feature.icon}"></i></span>
          <div>
            <h3 class="feature-card__title">${feature.title}</h3>
            <p class="card__body">${feature.subtitle}</p>
          </div>
          <div class="feature-card__meta">
            ${feature.badges.map((badge) => createBadgeMarkup(badge)).join('')}
          </div>
        </article>
      `);
      card.style.setProperty('--reveal-delay', `${index * 0.06}s`);
      container.appendChild(card);
    });
    applyIcons();
    observeReveal();
  };

  const createCardMarkup = (item, withCta = false) => {
    const badges = item.badges?.length
      ? `<div class="card__meta">${item.badges.map((badge) => createBadgeMarkup(badge)).join('')}</div>`
      : '';
    const footer = withCta && item.cta
      ? `<div class="card__footer">${item.href
          ? `<a class="btn btn--secondary" href="${item.href}">${item.cta}</a>`
          : `<a class="btn btn--secondary" href="https://discord.gg/${body.dataset.discordInvite || 'dedos'}" data-discord-link>${item.cta}</a>`
        }</div>`
      : '';
    const subtitle = item.subtitle ? `<p class="card__subtitle">${item.subtitle}</p>` : '';
    const copy = item.copy ? `<p class="card__body">${item.copy}</p>` : '';

    return `
      <article class="card tone--${item.tone || 'cyan'}" data-animate="rise">
        <div class="card__header">
          <span class="card__icon" aria-hidden="true"><i data-lucide="${item.icon}"></i></span>
          <div>
            <h3 class="card__title">${item.title}</h3>
            ${subtitle}
          </div>
        </div>
        ${copy}
        ${badges}
        ${footer}
      </article>
    `;
  };

  const renderCatalog = () => {
    const container = doc.getElementById('grid-catalog');
    if (!container) return;
    container.innerHTML = '';
    CATALOG.forEach((item, index) => {
      const node = createElement(createCardMarkup(item, true));
      node.style.setProperty('--reveal-delay', `${index * 0.05}s`);
      container.appendChild(node);
    });
    applyIcons();
    observeReveal();
  };

  const renderServices = () => {
    const container = doc.getElementById('grid-services');
    if (!container) return;
    container.innerHTML = '';
    SERVICES.forEach((item, index) => {
      const node = createElement(createCardMarkup(item, false));
      node.style.setProperty('--reveal-delay', `${index * 0.06}s`);
      container.appendChild(node);
    });
    applyIcons();
    observeReveal();
  };

  const renderWhy = () => {
    const container = doc.getElementById('grid-why');
    if (!container) return;
    container.innerHTML = '';
    WHY.forEach((item, index) => {
      const node = createElement(createCardMarkup(item, false));
      node.style.setProperty('--reveal-delay', `${index * 0.06}s`);
      container.appendChild(node);
    });
    applyIcons();
    observeReveal();
  };

  const renderFAQ = () => {
    const container = doc.getElementById('faq-root');
    if (!container) return;
    container.innerHTML = FAQ.map((item, index) => `
      <details class="accordion__item" ${index === 0 ? 'open' : ''}>
        <summary class="accordion__trigger">
          <span>${item.q}</span>
          <span class="accordion__icon" aria-hidden="true">›</span>
        </summary>
        <div class="accordion__content">${item.a}</div>
      </details>
    `).join('');
    observeReveal();
  };

  const renderHomePage = () => {
    renderHeroStats();
    renderHeroFeatured();
    renderCatalog();
    renderServices();
    renderWhy();
    renderFAQ();
  };

  const setupCurrentYear = () => {
    const span = doc.getElementById('year');
    if (span) span.textContent = String(new Date().getFullYear());
    const alt = doc.querySelector('[data-current-year]');
    if (alt) alt.textContent = String(new Date().getFullYear());
  };

  const setupHeaderShadow = () => {
    const header = doc.querySelector('.site-header');
    if (!header) return;
    const toggleShadow = () => {
      header.classList.toggle('site-header--solid', win.scrollY > 12);
    };
    toggleShadow();
    win.addEventListener('scroll', toggleShadow, { passive: true });
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
    const base = body.dataset.page === 'home' ? '' : 'index.html';
    links.forEach((link) => {
      const target = link.getAttribute('data-section-link');
      if (!target) return;
      const hash = `#${target}`;
      link.setAttribute('href', base ? `${base}${hash}` : hash);
    });
  };

  const ensureBrowserEnvironment = () => typeof win !== 'undefined' && typeof doc !== 'undefined';

  const openWithFallback = ({ webUrl }) => {
    if (!ensureBrowserEnvironment()) return;

    const opened = win.open(webUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      win.location.href = webUrl;
    }
  };

  const openDiscordInvite = (invite) => {
    if (!ensureBrowserEnvironment()) return;
    const code = invite.replace(/^https?:\/\/(?:www\.)?discord\.gg\//i, '').trim();
    const webUrl = `https://discord.gg/${code}`;
    openWithFallback({ webUrl });
  };

  const openRobloxDestination = (url) => {
    if (!ensureBrowserEnvironment()) return;
    openWithFallback({ webUrl: url });
  };

  const setupLinkHandlers = () => {
    doc.addEventListener('click', (event) => {
      const continueButton = event.target.closest('[data-redirect-continue]');
      if (continueButton) {
        event.preventDefault();
        completePromoRedirect();
        return;
      }

      const cancelButton = event.target.closest('[data-redirect-cancel]');
      if (cancelButton) {
        event.preventDefault();
        cancelPromoRedirect();
        return;
      }

      const discordLink = event.target.closest('[data-discord-link]');
      if (discordLink) {
        event.preventDefault();
        const href = discordLink.getAttribute('href');
        const invite = href && href.trim() ? href : body.dataset.discordInvite || 'dedos';
        beginPromoRedirect({
          type: 'discord',
          invite,
          delayMs: DEFAULT_REDIRECT_DELAY
        });
        return;
      }

      const robloxLink = event.target.closest('[data-roblox-link]');
      if (robloxLink) {
        event.preventDefault();
        const href = robloxLink.getAttribute('href');
        beginPromoRedirect({
          type: 'roblox',
          url: href && href.trim() ? href : body.dataset.robloxUrl || 'https://www.roblox.com/',
          delayMs: DEFAULT_REDIRECT_DELAY
        });
      }
    });

    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('is-redirecting')) {
        event.preventDefault();
        cancelPromoRedirect();
      }
    });
  };

  const setupFAQInteractions = () => {
    const container = doc.querySelector('[data-faq]');
    if (!container) return;
    container.addEventListener('toggle', (event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement)) return;
      if (!details.open) return;
      container.querySelectorAll('details').forEach((item) => {
        if (item !== details) item.removeAttribute('open');
      });
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
      description: 'Compra tus Robux directamente desde nuestro grupo oficial. Perfecto si recargas con frecuencia y quieres la comisión más baja.',
      requirements: [
        'Unirte al grupo oficial de Dedos.xyz en Roblox.',
        'Esperar 14 días después de haber ingresado al grupo (política Roblox).'
      ],
      delivery: 'Liberamos el pago y recibes los Robux en cuanto Roblox procesa la venta tras el periodo inicial.',
      extras: ['Seguimiento en vivo en tu ticket.', 'Comisiones mínimas.'],
      cta: { label: 'Ir al grupo de Roblox', href: body.dataset.robloxUrl || 'https://www.roblox.com/' }
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
        'Enviar el enlace directo al producto en el ticket de Discord.'
      ],
      delivery: 'Recibes el artículo seleccionado y Roblox acredita los Robux al momento.',
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
      description: 'Publica un gamepass con el monto que necesites y nosotros lo adquirimos. Ideal si ya tienes un catálogo configurado.',
      requirements: [
        'Gamepasses publicados por 500, 100 o 29 Robux (sin precios regionales).',
        'Compartir el enlace al gamepass en el ticket.'
      ],
      delivery: 'La compra se registra de inmediato y Roblox libera los fondos en 5-10 días hábiles.',
      extras: ['Excelente para creadores con catálogo propio.', 'Útil para montos específicos.']
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
      description: 'Grupo, regalo o gamepass según la urgencia de tus Robux y la experiencia que buscas.',
      icon: 'sparkles'
    },
    {
      title: 'Acompañamiento experto',
      description: 'Nuestro staff te guía 1:1 con evidencia de pago y seguimiento en vivo.',
      icon: 'messages-square'
    }
  ];

  const PURCHASE_STEPS = [
    {
      title: 'Abre un ticket en Discord',
      description: 'Ingresa al servidor, elige la categoría de Robux y comparte tu usuario junto al método preferido.',
      icon: '1'
    },
    {
      title: 'Confirma monto y pago',
      description: 'Validamos el tipo de cambio, revisamos disponibilidad y te mostramos las opciones de pago.',
      icon: '2'
    },
    {
      title: 'Recibe tus Robux',
      description: 'Liberamos el pedido apenas Roblox procesa la compra. Te notificamos en el ticket con evidencia.',
      icon: '3'
    }
  ];

  const renderPlanCard = (plan, priceLabels, index) => {
    const highlight = plan.highlight
      ? `<span class="catalog-card__badge" data-tone="${plan.highlight.tone}">${plan.highlight.label}</span>`
      : '';
    const extras = plan.extras?.length
      ? `<section class="catalog-card__section"><h4>Extras incluidos</h4><ul class="catalog-card__bullets">${plan.extras
          .map((extra) => `<li>${extra}</li>`)
          .join('')}</ul></section>`
      : '';
    return createElement(`
      <article class="catalog-card" data-animate="rise" data-tone="${plan.tone}">
        ${highlight}
        <header class="catalog-card__header">
          <div class="catalog-card__identity">
            <span class="catalog-card__icon" aria-hidden="true">${PLAN_ICON_SVGS[plan.icon] || ''}</span>
            <div class="catalog-card__heading">
              <h3 class="catalog-card__title">${plan.title}</h3>
              <p class="catalog-card__subtitle">${plan.tagline}</p>
            </div>
          </div>
          <div class="catalog-card__pricing">
            <p class="catalog-card__eyebrow">${plan.amountLabel}</p>
            <span class="catalog-card__price-mx">${priceLabels.mx}</span>
            <span class="catalog-card__price-usd">${priceLabels.usd}</span>
          </div>
        </header>
        <div class="catalog-card__body">
          <p class="catalog-card__description">${plan.description}</p>
          <section class="catalog-card__section">
            <h4>Entrega</h4>
            <p>${plan.delivery}</p>
          </section>
          <section class="catalog-card__section">
            <h4>Requisitos</h4>
            <ul class="catalog-card__bullets">${plan.requirements.map((req) => `<li>${req}</li>`).join('')}</ul>
          </section>
          ${extras}
        </div>
        ${plan.cta ? `<a class="btn btn--primary catalog-card__cta" href="${plan.cta.href}" target="_blank" rel="noopener" data-roblox-link>${plan.cta.label}</a>` : ''}
      </article>
    `);
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
            <h3 class="card__title">${point.title}</h3>
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
        <article class="card tone--cyan card--step" data-animate="rise">
          <div class="card__header">
            <span class="card__icon" aria-hidden="true">${step.icon}</span>
            <h3 class="card__title">${step.title}</h3>
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
        const node = renderPlanCard(plan, priceLabels, index);
        node.style.setProperty('--reveal-delay', `${index * 0.08}s`);
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

    const fallbackAttr = Number(body.dataset.redirectDelayMs || body.dataset.redirectFallbackMs || DEFAULT_REDIRECT_DELAY);
    const delayMs = Number.isFinite(fallbackAttr) && fallbackAttr > 0 ? fallbackAttr : DEFAULT_REDIRECT_DELAY;
    const timeoutMs = Number.isFinite(fallbackAttr) && fallbackAttr > 0 ? fallbackAttr : undefined;

    updateCountdownDisplays(Math.ceil(delayMs / 1000));

    if (target === 'discord') {
      beginPromoRedirect({
        type: 'discord',
        invite: body.dataset.redirectInvite || body.dataset.discordInvite || 'dedos',
        delayMs,
        timeoutMs
      });
    } else if (target === 'roblox') {
      beginPromoRedirect({
        type: 'roblox',
        url: body.dataset.redirectUrl || body.dataset.robloxUrl || 'https://www.roblox.com/',
        delayMs,
        timeoutMs
      });
    }
  };

  const setupBackdrop = () => {
    const stars = doc.getElementById('fx-stars');
    if (stars) {
      mountStarsCanvas(stars);
    }
  };

  const mountStarsCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const stars = [];
    const BASE_STAR_DENSITY = 7500;

    const resize = () => {
      width = canvas.width = win.innerWidth;
      height = canvas.height = win.innerHeight;
    };

    const seed = () => {
      stars.length = 0;
      const count = Math.max(120, Math.min(220, Math.round((width * height) / BASE_STAR_DENSITY)));
      for (let i = 0; i < count; i += 1) {
        const velocityScale = Math.random() * 0.6 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.2,
          vx: (Math.random() - 0.5) * 0.35 * velocityScale,
          vy: (Math.random() - 0.5) * 0.25 * velocityScale,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        const twinkle = (Math.sin(star.twinkle) + 1) / 2;
        const radius = star.r * (0.7 + twinkle * 0.6);
        ctx.fillStyle = `rgba(255,255,255,${0.55 + twinkle * 0.4})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.vx;
        star.y += star.vy;
        star.twinkle += 0.008 + Math.random() * 0.004;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });
      win.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      seed();
    };

    handleResize();
    draw();
    win.addEventListener('resize', handleResize, { passive: true });
  };

  const setupSmoothScroll = () => {
    if (!win.Lenis) return;
    const lenis = new win.Lenis({ lerp: 0.08 });
    lenis.on('scroll', updateRevealVisibility);
    const raf = (time) => {
      lenis.raf(time);
      win.requestAnimationFrame(raf);
    };
    win.requestAnimationFrame(raf);
  };

  const setupBlobsAnimation = () => {
    if (!win.gsap) return;
    const { gsap, ScrollTrigger } = win;
    if (ScrollTrigger?.pluginInstalled !== true && gsap?.registerPlugin) {
      gsap.registerPlugin(ScrollTrigger);
    }
    gsap.to('.blob--one', { x: 24, y: 10, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob--two', { x: -28, y: -14, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.blob--three', { x: 18, y: -8, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  };

  const initHome = () => {
    renderHomePage();
  };

  const initRobux = () => {
    renderRobuxPage();
  };

  const init = () => {
    setupReveal();
    setupCurrentYear();
    setupHeaderShadow();
    setupNav();
    setupSectionLinks();
    setupLinkHandlers();
    setupFAQInteractions();
    setupBackdrop();
    setupSmoothScroll();
    setupBlobsAnimation();

    const page = body.dataset.page || 'home';
    if (page === 'home') {
      initHome();
    } else if (page === 'robux') {
      initRobux();
    }

    if (page === 'discord' || page === 'roblox') {
      setupRedirectCountdown();
    }

    applyIcons();
    observeReveal();
  };

  doc.addEventListener('DOMContentLoaded', init);
})();
