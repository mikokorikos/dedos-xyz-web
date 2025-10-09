export function mountStars(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!
  let w=0,h=0, stars:any[]=[], meteors:any[]=[]
  const DPR = Math.min(2, window.devicePixelRatio || 1)
  function resize(){ w = canvas.width = Math.floor(innerWidth*DPR); h = canvas.height = Math.floor(innerHeight*DPR); (canvas.style as any).width=innerWidth+"px"; (canvas.style as any).height=innerHeight+"px"; gen() }
  function gen(){ const count=Math.min(320, Math.floor((w*h)/(15000*(DPR)))); stars = Array.from({length:count}).map(()=>({ x: Math.random()*w, y: Math.random()*h, r: (Math.random()*1.4 + .2)*DPR, baseA: Math.random()*0.6 + .25, hue: Math.floor(Math.random()*360), tw: Math.random()*Math.PI*2, twS: .02 + Math.random()*.03 })) }
  function spawn(){ const side=Math.floor(Math.random()*4); let x,y,vx,vy; const s=(6+Math.random()*5)*DPR; if(side===0){x=Math.random()*w;y=-20;vx=(Math.random()-.5)*s;vy=s}else if(side===1){x=w+20;y=Math.random()*h;vx=-s;vy=(Math.random()-.5)*s}else if(side===2){x=Math.random()*w;y=h+20;vx=(Math.random()-.5)*s;vy=-s}else {x=-20;y=Math.random()*h;vx=s;vy=(Math.random()-.5)*s} meteors.push({x,y,vx,vy,life:0,max:120+Math.random()*80}) }
  function draw(){ ctx.clearRect(0,0,w,h); stars.forEach(s=>{ s.tw+=s.twS; const a=s.baseA*(.7+.3*Math.sin(s.tw)); s.hue=(s.hue+.03)%360; (ctx as any).globalAlpha=a; ctx.fillStyle=`hsl(${s.hue} 80% 90%)`; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill() }); (ctx as any).globalAlpha=1; meteors=meteors.filter(m=>m.life<m.max); meteors.forEach(m=>{ m.x+=m.vx; m.y+=m.vy; m.life++; const trail=60; const grad=ctx.createLinearGradient(m.x,m.y,m.x-m.vx*trail,m.y-m.vy*trail); grad.addColorStop(0,'rgba(255,255,255,.95)'); grad.addColorStop(.5,'rgba(167,139,250,.5)'); grad.addColorStop(1,'rgba(103,232,249,0)'); ctx.strokeStyle=grad; ctx.lineWidth=2*DPR; ctx.beginPath(); ctx.moveTo(m.x-m.vx*trail,m.y-m.vy*trail); ctx.lineTo(m.x,m.y); ctx.stroke() }) }
  let t=0,last=0; function loop(){ t++; if(t-last>120+Math.random()*160){ spawn(); last=t } draw(); requestAnimationFrame(loop) }
  let lastY=0, parallax=0; const onScroll=()=>{ const y=scrollY||pageYOffset; parallax+=(y-lastY)*-0.03; lastY=y; (canvas.style as any).transform=`translateY(${parallax}px)` }
  addEventListener("resize", resize, {passive:true})
  addEventListener("scroll", onScroll, {passive:true})
  resize(); loop()
  return ()=>{ removeEventListener("resize", resize); removeEventListener("scroll", onScroll) }
}
