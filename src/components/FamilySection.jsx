import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"
import { weddingInfo } from "../data/weddingContent"

export default function FamilySection() {
  return (
    <section id="families" className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Together with our families" title="With Love and Blessings" />
        <Reveal className="grid gap-6 md:grid-cols-2">
          {weddingInfo.families.map((family) => (
            <article key={family.name} className="rounded-3xl border border-gold-200/60 bg-white/80 p-7 text-center dark:border-stone-700 dark:bg-stone-900/80">
              <h3 className="font-display text-3xl text-gold-700 dark:text-gold-300">{family.name}</h3>
              <p className="mt-4 text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400">{family.relationship}</p>
              <p className="mt-2 text-lg text-stone-800 dark:text-stone-100">{family.parents}</p>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">{family.home}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <blockquote className="font-display text-2xl italic text-stone-700 dark:text-stone-200">“{weddingInfo.verse}”</blockquote>
          <p className="mt-3 text-xs uppercase tracking-widest text-gold-700 dark:text-gold-300">{weddingInfo.verseReference}</p>
        </Reveal>
      </div>
    </section>
  )
}
