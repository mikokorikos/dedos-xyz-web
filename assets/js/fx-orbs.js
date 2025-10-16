export function mountOrbs(canvas) {
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
      amplitude: rand(20 * DPR, 60 * DPR),
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
