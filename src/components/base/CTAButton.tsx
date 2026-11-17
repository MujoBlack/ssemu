import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface CTAButtonProps {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "md" | "lg";
  icon?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

/**
 * One button shape for the whole site: 48px tall (44px on mobile),
 * full pill, 15px/600, arrow on primary, press = scale(0.97).
 */
export default function CTAButton({
  to,
  href,
  children,
  variant = "primary",
  icon = "ri-arrow-right-line",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: CTAButtonProps) {
  const variants: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    dark: "btn-dark",
  };
  const base = `group btn ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <i className={`${icon} btn-arrow text-[16px]`}></i>}
    </>
  );
  if (to)
    return (
      <Link to={to} className={base}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {inner}
    </button>
  );
}