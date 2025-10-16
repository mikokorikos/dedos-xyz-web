import { mountOrbs } from './fx-orbs.js';
import { mountStars } from './fx-stars.js';

const body = document.body;
const page = body.dataset.page || 'home';
const discordInvite = body.dataset.discordInvite || 'dedos';
const robloxUrl = body.dataset.robloxUrl || 'https://www.roblox.com/es/communities/12082479/unnamed#!/about';

const HERO_STATS = [
  { value: '+55K', label: 'Pedidos' },
  { value: 'Minutos', label: 'Entrega media' },
  { value: '4.9/5', label: 'Satisfacción' },
];

const HERO_FEATURED = [
  {
    title: 'Robux',
    subtitle: 'Carga segura',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Gaming', tone: 'green' },
      { label: 'Best seller', tone: 'gold' },
    ],
  },
  {
    title: 'Discord Nitro',
    subtitle: 'Mensual y anual',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec4d1ef?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Discord', tone: 'blue' },
      { label: 'Popular', tone: 'pink' },
    ],
  },
  {
    title: 'Decoraciones',
    subtitle: 'Banners, íconos, packs',
    image: 'https://images.unsplash.com/photo-1563986768817-257bf91c5753?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'Estilo', tone: 'pink' }],
  },
  {
    title: 'Streaming',
    subtitle: 'Crunchyroll, Netflix, Disney+',
    image: 'https://images.unsplash.com/photo-1598899134739-24b24967b74e?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'HD', tone: 'blue' },
      { label: 'Oferta', tone: 'gold' },
    ],
  },
  {
    title: 'VPNs',
    subtitle: 'Top providers',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'Privacidad', tone: 'green' }],
  },
  {
    title: 'Boosts',
    subtitle: 'Niveles garantizados',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Discord', tone: 'blue' },
      { label: 'Rápido', tone: 'gold' },
    ],
  },
];

const CATALOG_ITEMS = [
  {
    title: 'Robux',
    subtitle: 'Carga segura',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Gaming', tone: 'green' },
      { label: 'Best seller', tone: 'gold' },
    ],
    blurb: 'Escríbenos por Discord y cotiza en segundos con nuestro equipo.',
  },
  {
    title: 'Discord Nitro',
    subtitle: 'Mensual y anual',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec4d1ef?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Discord', tone: 'blue' },
      { label: 'Popular', tone: 'pink' },
    ],
    blurb: 'Planes mensuales o anuales con renovaciones automáticas y soporte inmediato.',
  },
  {
    title: 'Decoraciones Discord',
    subtitle: 'Banners, íconos, packs',
    image: 'https://images.unsplash.com/photo-1563986768817-257bf91c5753?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'Estilo', tone: 'pink' }],
    blurb: 'Diseños únicos con estética neon glassmorphism listos para tu servidor.',
  },
  {
    title: 'Spotify',
    subtitle: 'Planes individuales',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'Música', tone: 'green' }],
    blurb: 'Planes regionales y familiares para que escuches sin límites.',
  },
  {
    title: 'Streaming',
    subtitle: 'Crunchyroll, Netflix, Disney+',
    image: 'https://images.unsplash.com/photo-1598899134739-24b24967b74e?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'HD', tone: 'blue' },
      { label: 'Oferta', tone: 'gold' },
    ],
    blurb: 'Accesos premium para tus plataformas favoritas sin sorpresas.',
  },
  {
    title: 'VPNs',
    subtitle: 'Top providers',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'Privacidad', tone: 'green' }],
    blurb: 'Protege tu identidad con proveedores verificados y soporte 24/7.',
  },
  {
    title: 'Boosts de Servidor',
    subtitle: 'Niveles garantizados',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=600&auto=format&fit=crop',
    chips: [
      { label: 'Discord', tone: 'blue' },
      { label: 'Rápido', tone: 'gold' },
    ],
    blurb: 'Niveles garantizados con evidencias en tiempo real.',
  },
  {
    title: 'ChatGPT Premium',
    subtitle: 'Planes disponibles',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop',
    chips: [{ label: 'IA', tone: 'pink' }],
    blurb: 'Accede a las versiones premium de la mejor IA con configuración incluida.',
  },
];

const SERVICES = [
  {
    title: '🤝 Sistema de Middleman moderno',
    copy: 'Escrow seguro, verificación de ambas partes y liberación de fondos tras confirmación. Logs y auditoría interna.',
  },
  {
    title: '⏱️ Trades 24/7',
    copy: 'Cobertura continua con rotación de staff y automatizaciones. Soporte express en Discord.',
  },
];

const WHY_POINTS = [
  { title: 'Pagos 100% seguros', copy: 'Protección y verificación en cada pedido.' },
  { title: 'Entregas rápidas', copy: 'Automatizadas o asistidas por nuestro staff.' },
  { title: 'Diseño + experiencia', copy: 'UI de alto impacto con animaciones y glassmorphism.' },
  { title: 'Soporte dedicado', copy: 'Estamos en Discord para ayudarte 24/7.' },
];

const FAQ_ITEMS = [
  {
    question: '¿Cómo compro?',
    answer: 'Haz clic en “Entrar a Discord” y abre un ticket. Nuestro bot te guiará paso a paso.',
  },
  {
    question: '¿Es legal?',
    answer: 'Solo vendemos suscripciones y servicios legítimos conforme a sus términos. Nada robado ni ilícito.',
  },
  {
    question: '¿En cuánto tiempo entregan?',
    answer: 'La mayoría de pedidos se entregan entre minutos y pocas horas, según el producto y stock.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Consulta en el servidor: aceptamos múltiples opciones según tu país.',
  },
];

const CHIP_TONE_CLASSES = {
  pink: 'bg-gradient-to-r from-pink-400/25 to-violet-500/25',
  blue: 'bg-gradient-to-r from-sky-400/25 to-cyan-400/25',
  green: 'bg-gradient-to-r from-emerald-400/25 to-teal-500/25',
  gold: 'bg-gradient-to-r from-amber-400/30 to-rose-500/20',
};

const PLAN_ICON_SVGS = {
  group: '<svg class="plan-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-5 9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Z" fill="currentColor"></path></svg>',
  gift: '<svg class="plan-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-.8-1.4-2.4-2-3.8-1.4C6.7 3 6 4.2 6 5.5c0 .2 0 .3.1.5H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1c.1-.2.1-.3.1-.5 0-1.3-.7-2.5-2.2-3C14.4 2 12.8 2.6 12 4Zm2.3.9c.6.2.7.6.7.6 0 .3-.2.5-.4.5H12.7c.3-.6.6-1 .8-1.1.2-.2.4-.1.8 0ZM9 4.9c.4-.1.6-.2.8 0 .2.1.5.5.8 1.1H9.4c-.2 0-.4-.2-.4-.5 0 0 .1-.4.7-.6ZM5 9V8h6v2H5Zm8 9H9a1 1 0 0 1-1-1v-5h5v6Zm2 0v-6h5v5a1 1 0 0 1-1 1h-4ZM19 8v1h-6V8h6Z" fill="currentColor"></path></svg>',
  pass: '<svg class="plan-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="m7.2 4.1 2.3-2.3a2 2 0 0 1 2.8 0l1.7 1.7 1.2-1.2a2 2 0 0 1 2.8 2.8l-1.2 1.2 1.7 1.7a2 2 0 0 1 0 2.8l-2.3 2.3-9-9Zm-4.2 6a2 2 0 0 1 2.8 0l7 7a2 2 0 0 1 0 2.8l-2.3 2.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8l2.3-2.3Z" fill="currentColor"></path></svg>',
};

const PLAN_ICON_TONES = {
  pink: 'from-pink-400/25 via-fuchsia-400/20 to-violet-500/25',
  blue: 'from-sky-400/25 via-cyan-300/20 to-cyan-500/25',
  green: 'from-emerald-400/25 via-teal-300/20 to-teal-500/25',
  gold: 'from-amber-400/30 via-orange-300/20 to-rose-500/25',
};

const PLAN_HIGHLIGHT_SHADOW = {
  pink: 'shadow-[0_0_28px_rgba(244,114,182,0.45)]',
  blue: 'shadow-[0_0_28px_rgba(56,189,248,0.45)]',
  green: 'shadow-[0_0_28px_rgba(74,222,128,0.45)]',
  gold: 'shadow-[0_0_28px_rgba(251,191,36,0.45)]',
};

const PLAN_HIGHLIGHT_HOVER = {
  pink: 'border-white/25 hover:shadow-[0_0_40px_rgba(244,114,182,0.35)] transition-shadow duration-500',
  blue: 'border-white/25 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] transition-shadow duration-500',
  green: 'border-white/25 hover:shadow-[0_0_40px_rgba(74,222,128,0.35)] transition-shadow duration-500',
  gold: 'border-white/25 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-shadow duration-500',
};

const VALUE_POINTS = [
  {
    id: 'fees',
    title: 'Comisiones optimizadas',
    description:
      'Aprovechamos los precios regionales de Roblox para que pagues menos sin sacrificar velocidad ni seguridad en la entrega.',
    icon: 'shield',
  },
  {
    id: 'boost',
    title: 'Recargas versátiles',
    description:
      'Elige entre grupo oficial, regalo directo o compra de gamepass según la urgencia de tus Robux y el tipo de compra que buscas.',
    icon: 'spark',
  },
  {
    id: 'support',
    title: 'Acompañamiento experto',
    description:
      'Nuestro staff te guía 1:1 por Discord con evidencia de pago y seguimiento en vivo para que tengas control total del proceso.',
    icon: 'chat',
  },
];

const VALUE_ICONS = {
  shield:
    '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path d="M12 3 5 6v6c0 4.4 2.8 8.6 7 9 4.2-.4 7-4.6 7-9V6l-7-3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="m9 12 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  spark:
    '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path d="m12 3 1.9 5.7H20l-4.5 3.3 1.8 5.7L12 15.4 6.7 17.7 8.5 12 4 8.7h6.1L12 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  chat:
    '<svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path d="M5 5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H12l-4.5 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.5 9.5h7M8.5 13h4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
};

const PURCHASE_STEPS = [
  {
    id: 'ticket',
    title: 'Abre un ticket en Discord',
    description: 'Ingresa a nuestro servidor, elige la categoría de Robux y comparte el método que prefieres junto con tu usuario.',
  },
  {
    id: 'confirma',
    title: 'Confirma monto y pago',
    description: 'Validamos el tipo de cambio, te mostramos las opciones de pago disponibles y recibes instrucciones claras al instante.',
  },
  {
    id: 'recibe',
    title: 'Recibe tus Robux',
    description: 'Liberamos el pedido apenas Roblox lo procesa. Dependiendo del plan, puede ser inmediato o tras el periodo requerido.',
  },
];

const ROBUX_PLANS = [
  {
    id: 'group',
    title: 'Recarga por grupo oficial',
    tagline: 'Ideal para compras recurrentes',
    tone: 'pink',
    priceMXN: 125,
    icon: 'group',
    highlight: { label: 'Recomendado', tone: 'gold' },
    amountLabel: '1,000 Robux',
    description:
      'Compra tus Robux directamente desde nuestro grupo de Roblox. Perfecto si planeas recargar con frecuencia y quieres la comisión más baja.',
    requirements: [
      'Unirte al grupo oficial de Dedos.xyz en Roblox.',
      'Esperar 14 días después de haber ingresado al grupo (requisito de Roblox).',
    ],
    delivery:
      'Después de cada compra liberamos el pago y recibes los Robux en cuanto Roblox procesa la venta (generalmente al instante tras el periodo de espera inicial).',
    extras: ['Seguimiento en vivo dentro del ticket de Discord.', 'Comisiones mínimas.'],
    cta: { label: 'Ir al grupo de Roblox', href: robloxUrl },
  },
  {
    id: 'gift',
    title: 'Regalo por juego',
    tagline: 'Selecciona tu juego favorito',
    tone: 'blue',
    priceMXN: 126,
    icon: 'gift',
    highlight: { label: 'Alternativa popular', tone: 'green' },
    amountLabel: '1,000 Robux',
    description:
      'Compramos el gamepass o artículo que elijas dentro del juego para que recibas el valor en Robux al momento. Ideal si quieres un ítem específico o no quieres esperar los 14 días del grupo.',
    requirements: [
      'Contar con un juego o experiencia donde se puedan regalar artículos o gamepasses.',
      'Enviar el enlace directo al producto dentro del ticket de Discord.',
    ],
    delivery: 'Te regalamos el artículo seleccionado al instante y Roblox acredita los Robux inmediatamente.',
    extras: ['No requiere antigüedad en grupos.', 'Funciona con títulos populares como Blox Fruits, Pet Simulator, Adopt Me!'],
  },
  {
    id: 'pass',
    title: 'Compra directa de gamepass',
    tagline: 'Opción clásica',
    tone: 'gold',
    priceMXN: 136.99,
    icon: 'pass',
    amountLabel: '1,000 Robux',
    description:
      'Publica un gamepass con el monto que necesites y nosotros lo adquirimos. Es la vía tradicional, útil si ya tienes gamepasses configurados sin precios regionales.',
    requirements: [
      'Gamepasses publicados por 500, 100 o 29 Robux (sin precios regionales).',
      'Compartir el enlace al gamepass en el ticket.',
    ],
    delivery: 'La compra se registra enseguida, pero Roblox libera los fondos en un plazo de 5 a 10 días hábiles.',
    extras: ['Excelente para creadores con catálogo propio.', 'Ideal cuando necesitas montos específicos.'],
  },
];

const MXN_TO_USD_ENDPOINT = body.dataset.exchangeEndpoint || 'https://open.er-api.com/v6/latest/MXN';

function chipToneClass(tone) {
  return CHIP_TONE_CLASSES[tone] || CHIP_TONE_CLASSES.blue;
}

function renderHeroStats(container) {
  container.innerHTML = HERO_STATS.map(
    (stat) => `
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-inner">
        <div class="text-2xl font-extrabold text-white">${stat.value}</div>
        <div class="text-xs uppercase tracking-[0.14em] text-slate-200/70">${stat.label}</div>
      </div>
    `,
  ).join('');
}

function renderHeroFeatured(container) {
  container.innerHTML = HERO_FEATURED.map(
    (item) => `
      <article class="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)]">
        <div class="flex flex-1 gap-3">
          <img alt="${item.title}" class="h-14 w-14 flex-shrink-0 rounded-xl border border-white/15 object-cover" src="${item.image}" loading="lazy" />
          <div class="flex flex-1 flex-col gap-3">
            <div>
              <h3 class="text-lg font-semibold text-white">${item.title}</h3>
              <div class="text-sm text-slate-200/75">${item.subtitle}</div>
            </div>
            <div class="flex flex-wrap gap-2">
              ${item.chips
                .map(
                  (chip) => `
                    <span class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100 ${chipToneClass(chip.tone)}">${chip.label}</span>
                  `,
                )
                .join('')}
            </div>
            <div class="mt-auto text-sm text-slate-200/70">Destacado</div>
          </div>
        </div>
      </article>
    `,
  ).join('');
}

function renderCatalog(container) {
  container.innerHTML = CATALOG_ITEMS.map(
    (item) => `
      <article class="group relative flex h-full min-h-[620px] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8">
        <div class="flex flex-col gap-6">
          <div class="flex items-start gap-4">
            <img alt="${item.title}" class="h-16 w-16 flex-shrink-0 rounded-xl border border-white/15 object-cover" src="${item.image}" loading="lazy" />
            <div class="space-y-2">
              <h3 class="text-2xl font-semibold text-white">${item.title}</h3>
              <p class="text-sm text-slate-200/75">${item.subtitle}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            ${item.chips
              .map(
                (chip) => `
                  <span class="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100 ${chipToneClass(chip.tone)}">${chip.label}</span>
                `,
              )
              .join('')}
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div class="flex items-center justify-between text-sm text-slate-200/75">
              <span>Desde</span>
              <strong class="text-white">Consultar</strong>
            </div>
          </div>
        </div>
        <div class="mt-auto flex flex-col gap-4 pt-6">
          <p class="text-sm leading-relaxed text-slate-200/75">${item.blurb}</p>
          <a class="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100" href="https://discord.gg/${discordInvite}" data-discord-link>
            Comprar en Discord →
          </a>
        </div>
        <div class="pointer-events-none absolute -left-[10vw] top-[8vh] h-[40vh] w-[40vw] rounded-full bg-gradient-to-br from-fuchsia-400/30 via-violet-400/10 to-transparent blur-[100px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </article>
    `,
  ).join('');
}

function renderServices(container) {
  container.innerHTML = SERVICES.map(
    (service) => `
      <article class="flex h-full w-full max-w-[420px] flex-col gap-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8">
        <h3 class="text-2xl font-semibold text-white">${service.title}</h3>
        <p class="text-base leading-relaxed text-slate-200/80">${service.copy}</p>
      </article>
    `,
  ).join('');
}

function renderWhy(container) {
  container.innerHTML = WHY_POINTS.map(
    (point) => `
      <article class="flex h-full w-full max-w-[320px] flex-col gap-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7">
        <h3 class="text-xl font-semibold text-white">${point.title}</h3>
        <p class="text-base leading-relaxed text-slate-200/80">${point.copy}</p>
      </article>
    `,
  ).join('');
}

function renderFAQ(container) {
  container.innerHTML = FAQ_ITEMS.map(
    (item, index) => `
      <div class="border-b border-white/10 ${index === FAQ_ITEMS.length - 1 ? 'last:border-0' : ''}" data-faq-item>
        <button class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-white transition hover:text-cyan-200" type="button" data-faq-toggle>
          <span>${item.question}</span>
          <svg aria-hidden="true" class="h-5 w-5 transform text-slate-200/80 transition ${index === 0 ? 'rotate-90 text-cyan-200' : ''}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" data-faq-icon>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="px-5 pb-5 text-base leading-relaxed text-slate-200/80 ${index === 0 ? '' : 'hidden'}" data-faq-content>${item.answer}</div>
      </div>
    `,
  ).join('');
}

function renderHomePage() {
  const stats = document.querySelector('[data-hero-stats]');
  if (stats) renderHeroStats(stats);

  const featured = document.querySelector('[data-hero-featured]');
  if (featured) renderHeroFeatured(featured);

  const catalog = document.querySelector('[data-grid="catalog"]');
  if (catalog) renderCatalog(catalog);

  const services = document.querySelector('[data-grid="services"]');
  if (services) renderServices(services);

  const why = document.querySelector('[data-grid="why"]');
  if (why) renderWhy(why);

  const faq = document.querySelector('[data-faq]');
  if (faq) renderFAQ(faq);
}

function setupCurrentYear() {
  const target = document.querySelector('[data-current-year]');
  if (target) {
    target.textContent = String(new Date().getFullYear());
  }
}

function setupBackdrop() {
  const backdrop = document.querySelector('[data-fx-backdrop]');
  if (!backdrop) return;

  const orbsCanvas = backdrop.querySelector('[data-fx-orbs]');
  const starsCanvas = backdrop.querySelector('[data-fx-stars]');
  const disposers = [];

  if (orbsCanvas) disposers.push(mountOrbs(orbsCanvas));
  if (starsCanvas) disposers.push(mountStars(starsCanvas));

  window.addEventListener('beforeunload', () => {
    disposers.forEach((dispose) => {
      try {
        dispose?.();
      } catch (error) {
        console.error('Failed to dispose backdrop effect', error);
      }
    });
  });
}

function setupNav() {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  if (!nav || !toggle) return;

  const closeNav = () => {
    nav.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-open');
  };

  const openNav = () => {
    nav.classList.remove('hidden');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-open');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeNav();
    } else {
      openNav();
    }
  });

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    if (window.innerWidth < 768) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-open');
    } else if (toggle.getAttribute('aria-expanded') !== 'true') {
      nav.classList.add('hidden');
    }
  });
}

function setupSectionLinks() {
  const links = document.querySelectorAll('[data-section-link]');
  const base = page === 'home' ? '' : 'index.html';
  links.forEach((link) => {
    const target = link.dataset.sectionLink;
    if (!target) return;
    link.href = base ? `${base}#${target}` : `#${target}`;
  });
}

function ensureBrowserEnvironment() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function openWithFallback({ appUrl, webUrl, timeoutMs = 1200 }) {
  if (!ensureBrowserEnvironment()) return;

  const started = Date.now();
  const timer = window.setTimeout(() => {
    const elapsed = Date.now() - started;
    if (elapsed < timeoutMs + 80) {
      cancelFallback();
      window.location.href = webUrl;
    }
  }, timeoutMs);

  const cancelFallback = () => {
    window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    window.removeEventListener('pagehide', cancelFallback);
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      cancelFallback();
    }
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('pagehide', cancelFallback);

  try {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    if (isIOS) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      window.setTimeout(() => iframe.remove(), timeoutMs + 200);
    } else {
      window.location.href = appUrl;
    }
  } catch (error) {
    cancelFallback();
    window.location.href = webUrl;
  }
}

function openDiscordInvite(invite, timeoutMs) {
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
}

function openRobloxDestination(url, timeoutMs) {
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
}

function setupLinkHandlers() {
  document.addEventListener('click', (event) => {
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
}

function setupFAQInteractions() {
  const container = document.querySelector('[data-faq]');
  if (!container) return;

  container.addEventListener('click', (event) => {
    const button = event.target.closest('[data-faq-toggle]');
    if (!button) return;

    const item = button.closest('[data-faq-item]');
    if (!item) return;

    const icon = button.querySelector('[data-faq-icon]');
    const content = item.querySelector('[data-faq-content]');
    const isOpen = content && !content.classList.contains('hidden');

    container.querySelectorAll('[data-faq-content]').forEach((panel) => {
      panel.classList.add('hidden');
    });
    container.querySelectorAll('[data-faq-icon]').forEach((ic) => {
      ic.classList.remove('rotate-90', 'text-cyan-200');
    });

    if (!isOpen && content) {
      content.classList.remove('hidden');
      icon?.classList.add('rotate-90', 'text-cyan-200');
    }
  });
}

async function fetchExchangeRate() {
  try {
    const response = await fetch(MXN_TO_USD_ENDPOINT, { cache: 'no-store' });
    if (!response.ok) return { rate: null, updatedAt: null };
    const data = await response.json();
    const usd = data?.rates?.USD;
    const updatedAt = data?.time_last_update_utc ?? null;
    return {
      rate: typeof usd === 'number' ? usd : null,
      updatedAt,
    };
  } catch (error) {
    console.error('Failed to fetch MXN → USD rate', error);
    return { rate: null, updatedAt: null };
  }
}

function formatUsd(amount) {
  if (amount === null) return 'Consulta en Discord';
  return `≈ ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)}`;
}

function formatExchangeNotice(rate, updatedAt) {
  if (!rate) {
    return 'Tipo de cambio no disponible. Nuestro equipo te confirmará el monto final en el ticket.';
  }
  const date = updatedAt ? new Date(updatedAt) : null;
  const formatted = date
    ? new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(date)
    : null;
  return `Tipo de cambio: 1 MXN = ${rate.toFixed(4)} USD${formatted ? ` · Actualizado ${formatted} (UTC)` : ''}`;
}

function renderPlanCard(plan, priceLabels) {
  const highlight = plan.highlight;
  const highlightClasses = highlight
    ? `${chipToneClass(highlight.tone)} ${PLAN_HIGHLIGHT_SHADOW[highlight.tone]}`
    : '';
  const hoverGlow = highlight ? PLAN_HIGHLIGHT_HOVER[highlight.tone] : '';

  return `
    <article class="group relative flex h-full min-h-[620px] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7 lg:p-8 ${hoverGlow}">
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>
        <div class="absolute -top-[12vh] right-[4vw] h-[28vh] w-[28vh] rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-[140px]"></div>
      </div>
      ${highlight
        ? `<span class="absolute right-7 top-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm ${highlightClasses}">${highlight.label}</span>`
        : ''}
      <div class="relative flex h-full flex-col">
        <header class="flex flex-col gap-6 border-b border-white/10 pb-6">
          <div class="flex items-start gap-4">
            <span aria-hidden="true" class="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br text-lg text-white shadow-[0_14px_32px_rgba(8,8,18,0.45)] ${PLAN_ICON_TONES[plan.tone]}">
              ${PLAN_ICON_SVGS[plan.icon] || ''}
            </span>
            <div class="space-y-1.5">
              <h2 class="text-2xl font-semibold text-white">${plan.title}</h2>
              <p class="text-base text-slate-200/75">${plan.tagline}</p>
            </div>
          </div>
          <div class="flex flex-col items-start gap-1 text-left">
            <span class="text-xs uppercase tracking-[0.16em] text-slate-200/60">Total estimado</span>
            <strong class="text-4xl font-extrabold text-white">${priceLabels.mx}</strong>
            <span class="text-sm text-slate-200/70">${priceLabels.usd}</span>
          </div>
        </header>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 ${chipToneClass(plan.tone)}">
            ${plan.amountLabel}
          </span>
        </div>
        <div class="flex flex-1 flex-col gap-6 pt-6">
          <p class="text-base leading-relaxed text-slate-200/85">${plan.description}</p>
          <section class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <h3 class="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Entrega</h3>
            <p class="text-base text-slate-200/85">${plan.delivery}</p>
          </section>
          <section class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
            <h3 class="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Requisitos</h3>
            <ul class="grid gap-3 text-base text-slate-200/85">
              ${plan.requirements
                .map(
                  (req) => `
                    <li class="flex items-start gap-3">
                      <span aria-hidden="true" class="mt-1 text-cyan-200">
                        <svg class="h-4 w-4" viewBox="0 0 24 24"><path d="m5 12 4 4 10-10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                      </span>
                      <span>${req}</span>
                    </li>
                  `,
                )
                .join('')}
            </ul>
          </section>
          ${plan.extras
            ? `<section class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                <h3 class="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-200/70">Extras</h3>
                <ul class="grid gap-3 text-base text-slate-200/85">
                  ${plan.extras
                    .map(
                      (extra) => `
                        <li class="flex items-start gap-3">
                          <span aria-hidden="true" class="mt-1 text-cyan-200">
                            <svg class="h-4 w-4" viewBox="0 0 24 24"><path d="m5 12 4 4 10-10" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                          </span>
                          <span>${extra}</span>
                        </li>
                      `,
                    )
                    .join('')}
                </ul>
              </section>`
            : ''}
        </div>
        ${plan.cta
          ? `<a class="mt-auto inline-flex w-full justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 text-slate-900 shadow-[0_16px_32px_rgba(56,189,248,0.25)] hover:shadow-[0_24px_44px_rgba(56,189,248,0.35)]" href="${plan.cta.href}" target="_blank" rel="noopener noreferrer" data-roblox-link>
              ${plan.cta.label}
            </a>`
          : ''}
      </div>
    </article>
  `;
}

function renderValueHighlights(container) {
  container.innerHTML = VALUE_POINTS.map(
    (point) => `
      <article class="group relative flex h-full w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 text-left shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div class="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>
        </div>
        <div class="relative flex flex-col gap-4">
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-200 shadow-[0_12px_28px_rgba(8,8,18,0.45)]">
            ${VALUE_ICONS[point.icon] || ''}
          </span>
          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-white">${point.title}</h3>
            <p class="text-base leading-relaxed text-slate-200/80">${point.description}</p>
          </div>
        </div>
      </article>
    `,
  ).join('');
}

function renderPurchaseSteps(container) {
  container.innerHTML = PURCHASE_STEPS.map(
    (step, index) => `
      <article class="group relative flex h-full w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_22px_52px_rgba(8,8,18,0.5)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_32px_70px_rgba(8,8,18,0.6)] md:p-7">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10"></div>
        </div>
        <div class="relative flex flex-col gap-4">
          <span class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg font-bold text-cyan-200 shadow-[0_12px_28px_rgba(8,8,18,0.45)]">
            ${index + 1}
          </span>
          <div class="space-y-2">
            <h3 class="text-xl font-semibold text-white">${step.title}</h3>
            <p class="text-base leading-relaxed text-slate-200/80">${step.description}</p>
          </div>
        </div>
      </article>
    `,
  ).join('');
}

async function renderRobuxPage() {
  const planContainer = document.querySelector('[data-robux-plans]');
  const valueContainer = document.querySelector('[data-robux-values]');
  const stepsContainer = document.querySelector('[data-robux-steps]');
  const notice = document.querySelector('[data-exchange-notice]');

  const formatterMx = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

  let rateInfo = { rate: null, updatedAt: null };
  try {
    rateInfo = await fetchExchangeRate();
  } catch (error) {
    console.error('Exchange fetch failed', error);
  }

  if (planContainer) {
    const plansMarkup = ROBUX_PLANS.map((plan) => {
      const usd = rateInfo.rate ? plan.priceMXN * rateInfo.rate : null;
      const priceLabels = {
        mx: formatterMx.format(plan.priceMXN),
        usd: formatUsd(usd),
      };
      return renderPlanCard(plan, priceLabels);
    }).join('');

    planContainer.innerHTML = plansMarkup;
  }

  if (notice) {
    notice.textContent = formatExchangeNotice(rateInfo.rate, rateInfo.updatedAt);
  }

  if (valueContainer) {
    renderValueHighlights(valueContainer);
  }

  if (stepsContainer) {
    renderPurchaseSteps(stepsContainer);
  }
}

function setupRedirectCountdown() {
  const target = body.dataset.redirectTarget;
  if (!target) return;

  const countdownEl = document.querySelector('[data-countdown]');
  const fallbackMs = Number(body.dataset.redirectFallbackMs || '2400');
  let seconds = Math.ceil(fallbackMs / 1000);

  if (countdownEl) {
    countdownEl.textContent = String(seconds);
  }

  if (target === 'discord') {
    openDiscordInvite(discordInvite, fallbackMs);
  } else if (target === 'roblox') {
    const destination = body.dataset.redirectUrl || robloxUrl;
    openRobloxDestination(destination, fallbackMs);
  }

  const interval = window.setInterval(() => {
    seconds = Math.max(0, seconds - 1);
    if (countdownEl) countdownEl.textContent = String(seconds);
    if (seconds <= 0) {
      window.clearInterval(interval);
    }
  }, 1000);
}

function init() {
  if (page === 'home') {
    renderHomePage();
  } else if (page === 'robux') {
    renderRobuxPage();
  }

  setupCurrentYear();
  setupBackdrop();
  setupNav();
  setupSectionLinks();
  setupLinkHandlers();
  setupFAQInteractions();

  if (page === 'discord' || page === 'roblox') {
    setupRedirectCountdown();
  }
}

document.addEventListener('DOMContentLoaded', init);
