interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignClasses} ${className}`}>
      {eyebrow && (
        <div className="t-label stack-label inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-100 border border-background-200 text-foreground-700">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
          {eyebrow}
        </div>
      )}
      <h2 className="t-h2 text-foreground-950 max-w-3xl">{title}</h2>
      {intro && (
        <p className="t-intro stack-sub text-foreground-600">{intro}</p>
      )}
    </div>
  );
}