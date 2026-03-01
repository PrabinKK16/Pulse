export default function Button({
  children,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`
        group inline-flex items-center gap-2 justify-center
        px-4 py-2 rounded-full
        text-sm font-medium
        bg-[linear-gradient(180deg,var(--bg-muted),var(--bg-card))]
        shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_20px_rgba(0,0,0,0.35)]
        transition-all duration-200
        hover:-translate-y-[1px]
        hover:shadow-[0_2px_0_rgba(255,255,255,0.08),0_12px_28px_rgba(0,0,0,0.45)]
        active:translate-y-0
        active:shadow-[0_1px_0_rgba(255,255,255,0.04),0_6px_14px_rgba(0,0,0,0.4)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]
        ${className}
      `}
    >
      {children}
    </button>
  );
}
