import { useInView } from "@/hooks/useInView";

interface CheckListProps {
  items: string[];
  /** Two columns from the sm breakpoint up (default) or a single column. */
  columns?: 1 | 2;
  className?: string;
}

/**
 * Sky-blue check list — each line fades up 20px, 100ms after the one before it,
 * once the list comes into view.
 */
export default function CheckList({ items, columns = 2, className = "" }: CheckListProps) {
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <ul
      ref={ref}
      className={`mt-4 grid grid-cols-1 gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className={`stagger-item flex items-start gap-2.5 text-sm text-foreground-800 ${inView ? "is-in" : ""}`}
          style={{ transitionDelay: `${i * 100}ms` }}
        >
          <i className="ri-check-line text-accent-500 mt-0.5 shrink-0"></i>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}