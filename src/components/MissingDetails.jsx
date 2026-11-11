import Reveal from "./Reveal"
import { missingDetails } from "../data/weddingContent"


export default function MissingDetails() {
  if (!missingDetails.length) return null
  return (
    <section id="still-to-add" className="px-4 py-12">
      <Reveal className="mx-auto max-w-5xl rounded-3xl border border-gold-300/60 bg-white/80 p-6 dark:bg-stone-900/80 md:p-9">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-700 dark:text-gold-300">Invitation in progress</p>
        <h2 className="mt-2 font-display text-3xl text-stone-800 dark:text-stone-100">Still to add</h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">These details will be filled in as the couple shares them.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {missingDetails.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="block h-full rounded-2xl border border-gold-200/70 p-4 transition hover:bg-gold-100/40 dark:border-stone-700 dark:hover:bg-stone-800">
                <span className="font-semibold text-gold-700 dark:text-gold-300">○ {item.label}</span>
                <span className="mt-1 block text-sm text-stone-600 dark:text-stone-300">{item.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
