import type { RefObject } from "react";
import { useInView } from "@/hooks/useInView";

export interface WordLine {
  text: string;
  /** Every word in the line gets the highlight colour. */
  accent?: boolean;
  /** Only these words get the highlight colour. */
  accentWords?: string[];
}

interface WordsProps {
  lines: WordLine[];
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
  accentClassName?: string;
  startDelay?: number;
}

export default function Words({
  lines,
  as = "h2",
  className = "",
  accentClassName = "text-accent-600",
  startDelay = 0,
}: WordsProps) {
  const { ref, inView } = useInView<HTMLElement>();

  let wordIndex = 0;

  const content = lines.map((line, lineIndex) => {
    const words = line.text.split(" ").filter(Boolean);
    return (
      <span key={`line-${lineIndex}`} className="word-line">
        {words.map((word, wi) => {
          const idx = wordIndex;
          wordIndex += 1;
          const isAccent =
            line.accent === true ||
            (line.accentWords ? line.accentWords.includes(word) : false);
          return (
            <span key={`w-${lineIndex}-${wi}`}>
              <span className="word-mask">
                <span
                  className={`word ${isAccent ? accentClassName : ""}`}
                  style={{ transitionDelay: `${startDelay + idx * 0.1}s` }}
                >
                  {word}
                </span>
              </span>
              {wi < words.length - 1 ? " " : null}
            </span>
          );
        })}
      </span>
    );
  });

  const cls = `${className} ${inView ? "is-in" : ""}`;

  if (as === "h1") {
    return (
      <h1 ref={ref as RefObject<HTMLHeadingElement>} className={cls}>
        {content}
      </h1>
    );
  }

  if (as === "h3") {
    return (
      <h3 ref={ref as RefObject<HTMLHeadingElement>} className={cls}>
        {content}
      </h3>
    );
  }

  if (as === "div") {
    return (
      <div ref={ref as RefObject<HTMLDivElement>} className={cls}>
        {content}
      </div>
    );
  }

  return (
    <h2 ref={ref as RefObject<HTMLHeadingElement>} className={cls}>
      {content}
    </h2>
  );
}