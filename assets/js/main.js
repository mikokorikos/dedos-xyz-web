(function () {
  'use strict';

  function mountOrbs(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    let width = 0;
    let height = 0;
    let time = 0;
    let pointerX = null;
    let pointerY = null;
    let orbs = [];
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const rand = (a = 0, b = 1) => a + Math.random() * (b - a);

    function seed() {
      const count = Math.floor(rand(7, 12));
      orbs = Array.from({ length: count }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        radius: rand(140 * DPR, 280 * DPR),
        hue: rand(0, 360),
        speed: rand(0.0008, 0.0018),
        offset: rand(0, Math.PI * 2),
        amplitude: rand(20 * DPR, 60 * DPR)
      }));
    }

    function resize() {
      width = canvas.width = Math.floor(window.innerWidth * DPR);
      height = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      seed();
    }

    function draw() {
      time += 1;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      orbs.forEach((orb, index) => {
        const dx = Math.cos(time * orb.speed + orb.offset + index) * orb.amplitude;
        const dy = Math.sin(time * orb.speed * 0.9 + orb.offset - index) * orb.amplitude;
        let x = orb.x + dx;
        let y = orb.y + dy;

        if (pointerX !== null && pointerY !== null) {
          x += (pointerX * DPR - x) * 0.002;
          y += (pointerY * DPR - y) * 0.002;
        }

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
        gradient.addColorStop(0, `hsla(${(orb.hue + time * 0.05) % 360}, 80%, 60%, 0.10)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    const handleMouseMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'r') {
        seed();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', resize, { passive: true });

    resize();
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', resize);
    };
  }

  function mountStars(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    let width = 0;
    let height = 0;
    let stars = [];
    let meteors = [];
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    function resize() {
      width = canvas.width = Math.floor(window.innerWidth * DPR);
      height = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      generateStars();
    }

    function generateStars() {
      const count = Math.min(320, Math.floor((width * height) / (15000 * DPR)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (Math.random() * 1.4 + 0.2) * DPR,
        baseAlpha: Math.random() * 0.6 + 0.25,
        hue: Math.floor(Math.random() * 360),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03
      }));
    }

    function spawnMeteor() {
      const side = Math.floor(Math.random() * 4);
      const speed = (6 + Math.random() * 5) * DPR;
      let x;
      let y;
      let vx;
      let vy;

      if (side === 0) {
        x = Math.random() * width;
        y = -20;
        vx = (Math.random() - 0.5) * speed;
        vy = speed;
      } else if (side === 1) {
        x = width + 20;
        y = Math.random() * height;
        vx = -speed;
        vy = (Math.random() - 0.5) * speed;
      } else if (side === 2) {
        x = Math.random() * width;
        y = height + 20;
        vx = (Math.random() - 0.5) * speed;
        vy = -speed;
      } else {
        x = -20;
        y = Math.random() * height;
        vx = speed;
        vy = (Math.random() - 0.5) * speed;
      }

      meteors.push({ x, y, vx, vy, life: 0, maxLife: 120 + Math.random() * 80 });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed;
        const alpha = star.baseAlpha * (0.7 + 0.3 * Math.sin(star.twinkle));
        star.hue = (star.hue + 0.03) % 360;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${star.hue} 80% 90%)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      meteors = meteors.filter((meteor) => meteor.life < meteor.maxLife);

      meteors.forEach((meteor) => {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life += 1;
        const trail = 60;
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x - meteor.vx * trail,
          meteor.y - meteor.vy * trail
        );
        gradient.addColorStop(0, 'rgba(255,255,255,.95)');
        gradient.addColorStop(0.5, 'rgba(167,139,250,.5)');
        gradient.addColorStop(1, 'rgba(103,232,249,0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 * DPR;
        ctx.beginPath();
        ctx.moveTo(meteor.x - meteor.vx * trail, meteor.y - meteor.vy * trail);
        ctx.lineTo(meteor.x, meteor.y);
        ctx.stroke();
      });
    }

    let tick = 0;
    let lastSpawn = 0;

    function loop() {
      tick += 1;
      if (tick - lastSpawn > 120 + Math.random() * 160) {
        spawnMeteor();
        lastSpawn = tick;
      }
      draw();
      requestAnimationFrame(loop);
    }

    let lastScrollY = 0;
    let parallax = 0;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      parallax += (currentY - lastScrollY) * -0.03;
      lastScrollY = currentY;
      canvas.style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }

  const doc = document;
  const win = window;
  const body = doc.body;
  const root = doc.documentElement;
  const page = body.dataset.page || 'home';
  const THEME_STORAGE_KEY = 'dedos-theme';

  const getStoredTheme = () => {
    try {
      const value = win.localStorage.getItem(THEME_STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  };

  const storeTheme = (value) => {
    try {
      win.localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch (error) {
      // ignore storage issues
    }
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalized;
    if (persist) {
      storeTheme(normalized);
    }
    const toggle = doc.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', normalized === 'dark' ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        normalized === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
      );
    }
  };

  const setupThemeToggle = () => {
    const toggle = doc.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    const media = win.matchMedia('(prefers-color-scheme: dark)');
    const stored = getStoredTheme();
    const initial = stored || root.dataset.theme || (media.matches ? 'dark' : 'light');
    applyTheme(initial, { persist: false });

    toggle.addEventListener('click', () => {
      const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark', { persist: true });
    });

    media.addEventListener('change', (event) => {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? 'dark' : 'light');
    });
  };

  const discordInvite = body.dataset.discordInvite || 'dedosxyz';
  const robloxUrl = body.dataset.robloxUrl || 'https://www.roblox.com/es/communities/12082479/unnamed#!/about';

  const DISCORD_ICON_PATH =
    'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.309 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z';

  const createElement = (markup) => {
    const template = doc.createElement('template');
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
  };

  const ensureBrandIcons = () => {
    const nodes = doc.querySelectorAll('i[data-lucide="discord"]');
    nodes.forEach((node) => {
      const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('focusable', 'false');
      svg.setAttribute('aria-hidden', node.getAttribute('aria-hidden') ?? 'true');
      const existingClass = node.getAttribute('class');
      const classValue = existingClass ? `${existingClass} lucide lucide-discord` : 'lucide lucide-discord';
      svg.setAttribute('class', classValue);
      const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'currentColor');
      path.setAttribute('stroke', 'none');
      path.setAttribute('d', DISCORD_ICON_PATH);
      svg.appendChild(path);
      node.replaceWith(svg);
    });
  };

  const applyIcons = () => {
    ensureBrandIcons();
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
      openDiscordInvite(config.invite ?? body.dataset.discordInvite ?? 'dedosxyz', config.timeoutMs);
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

const openTransitionPage = (target) => {
  if (!ensureBrowserEnvironment()) return;
  const pageTarget = target === 'roblox' ? 'roblox.html' : 'discord.html';
  const opened = win.open(pageTarget, '_blank', 'noopener,noreferrer');
  if (!opened) {
    win.location.href = pageTarget;
  }
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
        if (page !== 'discord-services' && page !== 'roblox') {
          event.preventDefault();
          openTransitionPage('discord');
          return;
        }
        event.preventDefault();
        const href = discordLink.getAttribute('href');
        const invite = href && href.trim() ? href : discordInvite;
        beginPromoRedirect({
          type: 'discord',
          invite,
          delayMs: DEFAULT_REDIRECT_DELAY
        });
        return;
      }

      const robloxLink = event.target.closest('[data-roblox-link]');
      if (robloxLink) {
        if (page !== 'roblox') {
          event.preventDefault();
          openTransitionPage('roblox');
          return;
        }
        event.preventDefault();
        const href = robloxLink.getAttribute('href');
        beginPromoRedirect({
          type: 'roblox',
          url: href && href.trim() ? href : robloxUrl,
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

const getExchangeInfo = () => {
  const rateAttr = body.dataset.exchangeRate;
  const updatedAttr = body.dataset.exchangeUpdated;
  const parsed = rateAttr ? Number.parseFloat(rateAttr) : Number.NaN;
  const rate = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  return {
    rate,
    updatedAt: updatedAttr || null
  };
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
      const note = plan.note ? `<span class="catalog-card__price-note">${plan.note}</span>` : '';
      return `
        <li class="catalog-card__price-row">
          <div class="catalog-card__price-label">
            <span>${plan.label}</span>
            ${note}
          </div>
          <div class="catalog-card__price-values">
            <span class="catalog-card__price-mx-value">${labels.mx}</span>
            <span class="catalog-card__price-usd-value">${labels.usd}</span>
          </div>
        </li>
      `;
    })
    .join('');
  return `<ul class="catalog-card__price-list">${items}</ul>`;
};

const createNotesList = (notes) => {
  if (!Array.isArray(notes) || notes.length === 0) return '';
  return `<ul class="catalog-card__note-list">${notes.map((note) => `<li>${note}</li>`).join('')}</ul>`;
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
    notes: ['Confirma si quieres cuenta nueva o tu usuario actual en el ticket.', 'Compartimos confirmación visual del pago y la activación.']
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
    notes: ['Registramos tu Transaction ID para futuras renovaciones.', 'Método vía gift o tarjeta según stock disponible.']
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
    notes: ['Confirma la región de tu cuenta para evitar rechazos.', 'Confirmamos el canje contigo en vivo y dejamos captura en el ticket.']
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
    ? `<span class="catalog-card__badge" data-tone="${plan.highlight.tone}">${plan.highlight.label}</span>`
    : '';
  const extras = plan.extras?.length
    ? `<section class="catalog-card__section"><h4>Extras incluidos</h4><ul class="catalog-card__bullets">${plan.extras
        .map((extra) => `<li>${extra}</li>`)
        .join('')}</ul></section>`
    : '';
  const node = createElement(`
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
  node.style.setProperty('--reveal-delay', `${delay}s`);
  return node;
};

const renderRobuxPage = () => {
  const planContainer = doc.querySelector('[data-robux-plans]');
  const notice = doc.querySelector('[data-exchange-notice]');
  const rateInfo = getExchangeInfo();

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

const renderDigitalServicesPage = () => {
  const servicesContainer = doc.querySelector('[data-digital-services]');
  const notice = doc.querySelector('[data-exchange-notice]');
  const rateInfo = getExchangeInfo();

  if (servicesContainer) {
    servicesContainer.innerHTML = '';
    DIGITAL_SERVICES.forEach((service, index) => {
      const primaryPlan = Array.isArray(service.plans) && service.plans.length > 0 ? service.plans[0] : null;
      const primaryLabels = primaryPlan ? formatPriceLabels(primaryPlan, rateInfo.rate) : { mx: 'Consulta en Discord', usd: 'Confirma en ticket' };
      const priceList = createPriceListMarkup(service.plans, rateInfo.rate);
      const notes = createNotesList(service.notes);
      const node = createElement(`
        <article class="catalog-card" data-animate="rise" data-tone="${service.tone ?? 'mint'}">
          <header class="catalog-card__header">
            <div class="catalog-card__identity">
              <div class="catalog-card__icon" data-plan-icon><i data-lucide="${service.icon}"></i></div>
              <div class="catalog-card__heading">
                <h3 class="catalog-card__title">${service.title}</h3>
                ${service.subtitle ? `<p class="catalog-card__subtitle">${service.subtitle}</p>` : ''}
              </div>
            </div>
            <div class="catalog-card__pricing">
              <p class="catalog-card__eyebrow">${primaryPlan?.label ?? 'Consulta en Discord'}</p>
              <span class="catalog-card__price-mx">${primaryLabels.mx}</span>
              <span class="catalog-card__price-usd">${primaryLabels.usd}</span>
            </div>
          </header>
          <div class="catalog-card__body">
            <p class="catalog-card__description">${service.description}</p>
            ${priceList}
            ${notes}
          </div>
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
      <article class="catalog-card" data-animate="rise" data-tone="${offer.tone ?? 'mint'}">
        <header class="catalog-card__header">
          <div class="catalog-card__identity">
            <div class="catalog-card__icon" data-plan-icon><i data-lucide="${offer.icon}"></i></div>
            <div class="catalog-card__heading">
              <h3 class="catalog-card__title">${offer.title}</h3>
              ${offer.subtitle ? `<p class="catalog-card__subtitle">${offer.subtitle}</p>` : ''}
            </div>
          </div>
          <div class="catalog-card__pricing">
            <p class="catalog-card__eyebrow">${primaryPlan?.label ?? 'Consulta en Discord'}</p>
            <span class="catalog-card__price-mx">${primaryLabels.mx}</span>
            <span class="catalog-card__price-usd">${primaryLabels.usd}</span>
          </div>
        </header>
        <div class="catalog-card__body">
          <p class="catalog-card__description">${offer.description}</p>
          ${priceList}
          ${notes}
        </div>
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

const renderDiscordServicesPage = () => {
  const notice = doc.querySelector('[data-exchange-notice]');
  const rateInfo = getExchangeInfo();

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

    const fallbackAttr = Number(body.dataset.redirectDelayMs || body.dataset.redirectFallbackMs || DEFAULT_REDIRECT_DELAY);
    const delayMs = Number.isFinite(fallbackAttr) && fallbackAttr > 0 ? fallbackAttr : DEFAULT_REDIRECT_DELAY;
    const timeoutMs = Number.isFinite(fallbackAttr) && fallbackAttr > 0 ? fallbackAttr : undefined;

    updateCountdownDisplays(Math.ceil(delayMs / 1000));

    if (target === 'discord') {
      beginPromoRedirect({
        type: 'discord',
        invite: body.dataset.redirectInvite || discordInvite,
        delayMs,
        timeoutMs
      });
    } else if (target === 'roblox') {
      beginPromoRedirect({
        type: 'roblox',
        url: body.dataset.redirectUrl || robloxUrl,
        delayMs,
        timeoutMs
      });
    }
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
  setupThemeToggle();
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
})();
