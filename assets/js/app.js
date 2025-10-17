// Año en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
(function(){
  var btn = document.getElementById('nav-toggle');
  var nav = document.getElementById('mobile-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = !nav.hasAttribute('hidden');
    if(open) nav.setAttribute('hidden',''); else nav.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', String(!open));
  });
})();

// AOS / Lenis / GSAP
window.addEventListener('load', function(){
  if(window.AOS) AOS.init({ duration: 850, once: true, easing: 'ease-out' });
  if(window.lucide) lucide.createIcons();
  if(window.Lenis){
    var lenis = new Lenis({ lerp: 0.08 });
    (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
  }
  if(window.gsap){
    if(gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);
    gsap.to('.blob--one', { x: 24, y: 8,  duration: 8, yoyo: true, repeat: -1, ease:'sine.inOut' });
    gsap.to('.blob--two', { x: -28, y: -14, duration: 9, yoyo: true, repeat: -1, ease:'sine.inOut' });
    gsap.to('.blob--three', { x: 18, y: -8, duration: 7, yoyo: true, repeat: -1, ease:'sine.inOut' });
  }
});

// Canvas estrellas
(function stars(){
  var c = document.getElementById('fx-stars');
  if(!c) return;
  var ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  var S = Array.from({length: 140}, function(){ return {
    x: Math.random()*c.width, y: Math.random()*c.height,
    r: Math.random()*1.2+0.2, s: Math.random()*0.6+0.2
  }});
  (function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    S.forEach(function(st){
      st.x += st.s * 0.08; if (st.x > c.width) st.x = 0;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

// Data
var HERO_FEATURED = [
  { title: 'Robux', subtitle:'Carga segura', badges:['GAMING','BEST SELLER'], icon:'gamepad-2', tone:'cyan' },
  { title: 'Discord Nitro', subtitle:'Mensual y anual', badges:['DISCORD','POPULAR'], icon:'bolt', tone:'violet' },
  { title: 'Decoraciones', subtitle:'Banners, iconos, packs', badges:['ESTILO'], icon:'palette', tone:'pink' },
  { title: 'Streaming', subtitle:'Crunchyroll, Netflix, Disney+', badges:['HD','OFERTA'], icon:'play-circle', tone:'mint' },
  { title: 'VPNs', subtitle:'Top providers', badges:['PRIVACIDAD'], icon:'shield', tone:'cyan' },
  { title: 'Boosts', subtitle:'Niveles garantizados', badges:['DISCORD','RÁPIDO'], icon:'zap', tone:'violet' }
];

var CATALOG = [
  { title:'Robux', copy:'Carga segura', badges:['GAMING','BEST SELLER'], cta:'Consultar', icon:'gamepad-2', tone:'cyan' },
  { title:'Discord Nitro', copy:'Mensual y anual', badges:['DISCORD','POPULAR'], cta:'Consultar', icon:'bolt', tone:'violet' },
  { title:'Decoraciones Discord', copy:'Banners, iconos, packs', badges:['ESTILO'], cta:'Consultar', icon:'palette', tone:'pink' }
];

var SERVICES = [
  { title:'Middleman moderno', copy:'Flujo claro, control y seguridad para ambas partes.', icon:'handshake', tone:'mint' },
  { title:'Soporte 24/7', copy:'Respuesta rápida y seguimiento real de tus pedidos.', icon:'headphones', tone:'cyan' },
  { title:'Entregas ágiles', copy:'Minutos promedio, con feedback visual de cada paso.', icon:'timer', tone:'violet' }
];

var WHY = [
  { title:'Confianza', copy:'+55K pedidos y 4.9/5.', icon:'shield-check', tone:'mint' },
  { title:'Velocidad', copy:'Procesos optimizados y automatización real.', icon:'gauge', tone:'cyan' },
  { title:'Transparencia', copy:'TOS claro y estados visibles.', icon:'badge-check', tone:'violet' },
  { title:'Atención real', copy:'Soporte humano con criterio.', icon:'sparkles', tone:'pink' }
];

const FAQ_ITEMS = [
  { q:'¿Cómo compro?', a:'Entra a Discord, abre ticket, confirma método. Te guiamos paso a paso.' },
  { q:'¿Tiempos de entrega?', a:'La mayoría en minutos. Si hay verificación manual, te avisamos.' },
  { q:'¿Reembolsos?', a:'Depende del caso y del estado del pedido. Todo está en TOS.' },
  { q:'¿Es seguro?', a:'Middleman, comprobantes y verificación 4/4 en transacciones.' }
];

// Helpers
function el(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function card(o){
  var tone = o.tone || 'cyan';
  return el(
    '<article class="card tone--'+tone+'" data-tilt>'+
      '<div class="card__inner">'+
        '<div class="card__head">'+
          '<div class="card__icon"><i data-lucide="'+o.icon+'"></i></div>'+
          '<h3 class="card__title">'+o.title+'</h3>'+
        '</div>'+
        '<div class="card__body">'+ (o.copy || o.subtitle || '') +'</div>'+
        '<div class="card__badges">'+ (o.badges||[]).map(function(b){ return '<span class="badge">'+b+'</span>'; }).join('') +'</div>'+
        '<div class="card__footer">'+ (o.cta?'<a href="#" class="btn btn--outline">'+o.cta+'</a>':'') +'</div>'+
      '</div>'+
    '</article>'
  );
}
function mountList(sel, arr, builder){
  var root=document.querySelector(sel); if(!root) return;
  arr.forEach(function(it){ root.appendChild(builder(it)); });
  if(window.lucide) lucide.createIcons();
}

// Render
mountList('#hero-featured', HERO_FEATURED, function(it){ return card({title:it.title, copy:it.subtitle, badges:it.badges, cta:'Destacado', icon:it.icon, tone:it.tone}); });
mountList('#grid-catalog', CATALOG, card);
mountList('#grid-services', SERVICES, function(it){ return card({title:it.title, copy:it.copy, badges:[], cta:'Más info', icon:it.icon, tone:it.tone}); });
mountList('#grid-why', WHY, function(it){ return card({title:it.title, copy:it.copy, badges:[], cta:'', icon:it.icon, tone:it.tone}); });

// Stats
(function(){
  var stats = [
    { label:'+55K', sub:'pedidos', icon:'chart-no-axes-gantt' },
    { label:'Minutos', sub:'entrega media', icon:'timer' },
    { label:'4.9/5', sub:'satisfacción', icon:'star' }
  ];
  var root = document.getElementById('hero-stats');
  if(!root) return;
  stats.forEach(function(s){
    root.insertAdjacentHTML('beforeend',
      '<div class="glass rounded-2xl p-4 flex items-center gap-3">'+
        '<i data-lucide="'+s.icon+'"></i>'+
        '<div><div class="text-xl font-extrabold">'+s.label+'</div><div class="text-ink-400 text-sm uppercase tracking-wide">'+s.sub+'</div></div>'+
      '</div>');
  });
  if(window.lucide) lucide.createIcons();
})();

// Tilt 3D hiper suave
(function(){
  var max = 2.2;   // grados
  var damp = 0.10; // amortiguación
  var rafId;
  function lerp(a,b,t){ return a+(b-a)*t; }
  document.addEventListener('mousemove', function(e){
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function(){
      Array.prototype.forEach.call(document.querySelectorAll('[data-tilt]'), function(card){
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -max;
        var ry = ((e.clientX - r.left) / r.width - 0.5) *  max;
        var tx = parseFloat(card.dataset.tx||0), ty = parseFloat(card.dataset.ty||0);
        tx = lerp(tx, rx, damp); ty = lerp(ty, ry, damp);
        card.dataset.tx = tx; card.dataset.ty = ty;
        card.style.transform = 'perspective(1000px) rotateX('+tx+'deg) rotateY('+ty+'deg) translateY(-1px)';
      });
    });
  }, {passive:true});
  document.addEventListener('mouseleave', function(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-tilt]'), function(c){ c.style.transform=''; c.dataset.tx=0; c.dataset.ty=0; });
  }, true);
})();

// Glow follow en panel
document.addEventListener('pointermove', function(e){
  Array.prototype.forEach.call(document.querySelectorAll('.panel'), function(el){
    var r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// FAQ
(function(){
  var root = document.getElementById('faq-root'); if(!root) return;
  FAQ_ITEMS.forEach(function(item){
    root.appendChild(el(
      '<details>'+
        '<summary>'+item.q+'<i data-lucide="chevron-down"></i></summary>'+
        '<p>'+item.a+'</p>'+
      '</details>'
    ));
  });
  if(window.lucide) lucide.createIcons();
})();
