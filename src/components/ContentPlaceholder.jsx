export default function ContentPlaceholder({ label, children }) {
  return (
    <div className="rounded-2xl border border-dashed border-gold-400/70 bg-ivory-50/80 p-6 text-center dark:bg-stone-800/70">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-300">Details to be added</p>
      <h3 className="mt-3 font-display text-2xl text-stone-800 dark:text-stone-100">{label}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-300">{children}</p>
    </div>
  )
}

