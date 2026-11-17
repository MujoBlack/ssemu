import { useInView } from "@/hooks/useInView";

interface RollingNumberProps {
  value: string;
  className?: string;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Odometer: every digit rolls into place once the number comes into view.
 * Non-digit characters (%, +) stay static.
 */
export default function RollingNumber({ value, className = "" }: RollingNumberProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline leading-none ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={value}
    >
      {value.split("").map((ch, i) => {
        if (!/[0-9]/.test(ch)) {
          return (
            <span key={`c-${i}`} aria-hidden="true">
              {ch}
            </span>
          );
        }
        const digit = Number(ch);
        return (
          <span key={`d-${i}`} className="digit-window" aria-hidden="true">
            <span
              className="digit-strip"
              style={{
                transform: inView ? `translateY(-${digit}em)` : "translateY(0em)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {DIGITS.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}