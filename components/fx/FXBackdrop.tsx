"use client";

import { useEffect, useRef } from "react";

export default function FXBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    let t = 0;
    const el = ref.current;
    const loop = () => {
      t += 0.4;
      const hue = t % 360;
      el.style.background = `radial-gradient(1200px 700px at 20% -10%, hsla(${
        (hue + 220) % 360
      },60%,18%,.6), transparent), radial-gradient(1200px 700px at 80% 120%, hsla(${
        (hue + 40) % 360
      },70%,20%,.45), transparent), #020817`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        filter: "saturate(120%)",
        transition: "background 300ms linear",
      }}
    />
  );
}
