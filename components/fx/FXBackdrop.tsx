"use client";

import { useEffect, useRef } from "react";
import { mountOrbs } from "./fx-orbs";
import { mountStars } from "./fx-stars";
import styles from "./FXBackdrop.module.css";

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
    <div className={styles.root} aria-hidden="true">
      <canvas ref={orbsRef} className={`${styles.canvas} ${styles.orbs}`} aria-hidden="true" />
      <canvas ref={starsRef} className={`${styles.canvas} ${styles.stars}`} aria-hidden="true" />
      <div className={styles.veil} />
      <div className={styles.bgWrap}>
        <div className={`${styles.blob} ${styles.one}`} />
        <div className={`${styles.blob} ${styles.two}`} />
        <div className={`${styles.blob} ${styles.three}`} />
      </div>
    </div>
  );
}
