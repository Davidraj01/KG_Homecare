"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;        // ms delay before animating
  distance?: number;     // px to travel (default 40)
  duration?: number;     // ms (default 700)
  scaleFrom?: number;    // starting scale, e.g. 0.94 (default: no scale animation)
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  distance = 40,
  duration = 700,
  scaleFrom,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenScale = scaleFrom ? ` scale(${scaleFrom})` : "";

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = `translateY(${distance}px)${hiddenScale}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
          el.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1), transform ${duration}ms cubic-bezier(0.16,1,0.3,1)`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }, delay);
        observer.unobserve(el);
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, distance, duration, scaleFrom]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
