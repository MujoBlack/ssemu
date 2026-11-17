import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  scale?: number;
  glow?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  rotation = 10,
  scale = 1.02,
  glow = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * rotation * 2;
    const rotX = -(y - 0.5) * rotation * 2;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    el.style.setProperty("--tilt-x", `${x * 100}%`);
    el.style.setProperty("--tilt-y", `${y * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {glow && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(400px circle at var(--tilt-x, 50%) var(--tilt-y, 50%), oklch(var(--accent-500) / 0.18), transparent 60%)",
          }}
        />
      )}
      {children}
    </div>
  );
}