"use client";

export default function AccordionItem({ index, activeIndex, onToggle, title, children }) {
  const isOpen = activeIndex === index;

  return (
    <article className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface-2) shadow-[0_8px_24px_var(--surface-shadow)] backdrop-blur-sm transition hover:shadow-[0_10px_30px_var(--surface-shadow)]">
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-(--text-primary) md:text-lg">{title}</span>
        <span
          className={`grid h-8 w-8 place-items-center rounded-full border border-(--border) bg-(--surface-1) text-sm text-(--text-primary) transition-transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▶
        </span>
      </button>
      {isOpen ? <div className="border-t border-(--border) px-5 py-5">{children}</div> : null}
    </article>
  );
}
