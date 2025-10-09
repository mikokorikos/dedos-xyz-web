export function mountOrbs(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!
  let w=0,h=0,t=0,mx:number|null=null,my:number|null=null, orbs:any[]=[]
  const DPR = Math.min(2, window.devicePixelRatio || 1)
  const rand = (a=0,b=1)=> a + Math.random()*(b-a)

  function seed() {
    const n = Math.floor(rand(7,12))
    orbs = Array.from({length:n}).map(()=>({
      x: rand(0,w), y: rand(0,h),
      r: rand(140*DPR, 280*DPR), hue: rand(0,360),
      sp: rand(0.0008, 0.0018), off: rand(0, Math.PI*2), amp: rand(20*DPR, 60*DPR)
    }))
  }
  function resize() {
    w = canvas.width = Math.floor(innerWidth*DPR)
    h = canvas.height= Math.floor(innerHeight*DPR)
    ;(canvas.style as any).width = innerWidth+"px"
    ;(canvas.style as any).height= innerHeight+"px"
    seed()
  }
  function draw() {
    t += 1; ctx.clearRect(0,0,w,h); (ctx as any).globalCompositeOperation = "screen"
    orbs.forEach((o,i)=>{
      const dx = Math.cos(t*o.sp + o.off + i)*o.amp
      const dy = Math.sin(t*o.sp*0.9 + o.off - i)*o.amp
      let x = o.x + dx, y = o.y + dy
      if(mx!==null){ x += (mx*DPR-x)*0.002; y += (my*DPR-y)*0.002 }
      const g = ctx.createRadialGradient(x,y,0,x,y,o.r)
      g.addColorStop(0, `hsla(${(o.hue + t*0.05)%360}, 80%, 60%, 0.10)`)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,o.r,0,Math.PI*2); ctx.fill()
    })
    requestAnimationFrame(draw)
  }

  const mm = (e:MouseEvent)=>{ mx=e.clientX; my=e.clientY }
  const kd = (e:KeyboardEvent)=>{ if(e.key.toLowerCase()==="r") seed() }
  addEventListener("mousemove", mm, {passive:true})
  addEventListener("keydown", kd)
  addEventListener("resize", resize, {passive:true})
  resize(); draw()

  return () => { removeEventListener("mousemove", mm); removeEventListener("keydown", kd); removeEventListener("resize", resize) }
}
