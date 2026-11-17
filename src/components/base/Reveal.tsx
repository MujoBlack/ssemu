import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds (row / grid items use 100ms steps). */
  delay?: number;
  /** Entrance direction. */
  from?: "up" | "right";
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${from === "right" ? "reveal-right" : ""} ${
        inView ? "is-in" : ""
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}