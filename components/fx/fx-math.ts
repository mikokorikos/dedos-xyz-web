export function mountMath(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!
  const DPR = Math.min(2, window.devicePixelRatio || 1)
  let w=0,h=0,t=0
  function resize(){ w=canvas.width=Math.floor(innerWidth*DPR); h=canvas.height=Math.floor(innerHeight*DPR); (canvas.style as any).width=innerWidth+"px"; (canvas.style as any).height=innerHeight+"px" }
  function drawHex(cx:number,cy:number,r:number){ ctx.beginPath(); for(let i=0;i<6;i++){ const ang=Math.PI/3*i; const x=cx+r*Math.cos(ang); const y=cy+r*Math.sin(ang); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y) } ctx.closePath(); ctx.stroke() }
  function hexGrid(spacing:number,hue:number){ ctx.save(); ctx.strokeStyle = `hsla(${hue},80%,70%,.04)`; ctx.lineWidth = 1*DPR; const s=spacing; const hHex=Math.sin(Math.PI/3)*s; for(let y=-h;y<h*2;y+=hHex){ for(let x=-s;x<w*2;x+=s*1.5){ const cx=x+((Math.floor(y/hHex)%2)?s*.75:0); const cy=y; drawHex(cx,cy,s*.5) } } ctx.restore() }
  function rose(k:number, R:number, cx:number, cy:number, rot:number, hue:number){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot); ctx.beginPath(); for(let a=0;a<Math.PI*16;a+=0.01){ const r=R*Math.cos(k*a); const x=r*Math.cos(a); const y=r*Math.sin(a); if(a===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)} ctx.strokeStyle = `hsla(${hue},85%,70%,.08)`; ctx.lineWidth=1*DPR; ctx.stroke(); ctx.restore() }
  function spiral(phi:number, turns:number, R:number, cx:number, cy:number, hue:number){ ctx.save(); ctx.translate(cx,cy); ctx.beginPath(); for(let a=0;a<Math.PI*2*turns;a+=0.02){ const r=R*Math.exp(phi*a/(Math.PI*2*turns)); const x=r*Math.cos(a); const y=r*Math.sin(a); if(a===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)} ctx.strokeStyle=`hsla(${hue},85%,70%,.06)`; ctx.lineWidth=1*DPR; ctx.stroke(); ctx.restore() }
  function spiro(R:number,r:number,O:number,cx:number,cy:number,rot:number,hue:number){ ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot); ctx.beginPath(); for(let a=0;a<Math.PI*12;a+=0.01){ const x=(R-r)*Math.cos(a)+O*Math.cos(((R-r)/r)*a); const y=(R-r)*Math.sin(a)-O*Math.sin(((R-r)/r)*a); if(a===0) ctx.moveTo(x,y); else ctx.lineTo(x,y)} ctx.strokeStyle=`hsla(${hue},85%,70%,.07)`; ctx.lineWidth=1*DPR; ctx.stroke(); ctx.restore() }
  function frame(){ t+=1; ctx.clearRect(0,0,w,h); const cx=w/2, cy=h/2; const hue=(t*.5)%360; hexGrid(120*DPR,hue); rose(5/8,220*DPR,cx,cy,t*.01,(hue+60)%360); rose(3/7,280*DPR,cx,cy,-t*.012,(hue+120)%360); spiral(.02,6,1.2*DPR,cx,cy,(hue+180)%360); spiro(240*DPR,60*DPR,120*DPR,cx,cy,t*.006,(hue+240)%360); requestAnimationFrame(frame) }
  addEventListener("resize", resize, {passive:true})
  resize(); frame()
  return ()=> removeEventListener("resize", resize)
}
