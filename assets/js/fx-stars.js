export function mountStars(canvas) {
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
      twinkleSpeed: 0.02 + Math.random() * 0.03,
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
        meteor.y - meteor.vy * trail,
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
