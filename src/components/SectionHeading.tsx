interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-medium uppercase tracking-[0.25em] ${
            light ? "text-white/60" : "text-stone-500"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-serif text-4xl leading-tight md:text-5xl ${
          light ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 text-base leading-8 ${
            light ? "text-white/70" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}