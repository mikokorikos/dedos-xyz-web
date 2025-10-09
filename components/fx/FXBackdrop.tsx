"use client";

import { useEffect, useRef } from "react";
import { mountOrbs } from "./fx-orbs";
import { mountStars } from "./fx-stars";

export default function FXBackdrop() {
  const orbsRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const orbsCanvas = orbsRef.current;
    const starsCanvas = starsRef.current;

    const disposeOrbs = orbsCanvas ? mountOrbs(orbsCanvas) : undefined;
    const disposeStars = starsCanvas ? mountStars(starsCanvas) : undefined;

    return () => {
      disposeOrbs?.();
      disposeStars?.();
    };
  }, []);

  return (
    <div className="fx-root" aria-hidden="true">
      <canvas ref={orbsRef} className="fx-canvas orbs" aria-hidden="true" />
      <canvas ref={starsRef} className="fx-canvas stars" aria-hidden="true" />
      <div className="veil" />
      <div className="bg-wrap">
        <div className="blob one" />
        <div className="blob two" />
        <div className="blob three" />
      </div>
    </div>
  );
}
