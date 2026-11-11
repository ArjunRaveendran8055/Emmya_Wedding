import Reveal from "./Reveal"
import ContentPlaceholder from "./ContentPlaceholder"
import { music } from "../data/weddingContent"

export default function FooterSection({ contact, bride, groom }) {
  return (
    <footer id="contact" className="px-4 pb-16 pt-12">
      <Reveal className="mx-auto max-w-6xl rounded-[2rem] border border-gold-200/60 bg-ivory-50/80 p-8 text-center dark:border-stone-700 dark:bg-stone-900/80">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-700 dark:text-gold-300">With love from our friends & families</p>
        <p className="mt-4 font-display text-4xl text-stone-700 dark:text-ivory-100">{groom} &amp; {bride}</p>
        <div className="mx-auto mt-8 max-w-xl">
          {!contact.phone && !contact.email ? <ContentPlaceholder label="Family contact">A contact number or email for guest enquiries will be added here.</ContentPlaceholder> : (
            <div className="flex flex-wrap justify-center gap-4 text-gold-700 dark:text-gold-300">
              {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="underline">{contact.phone}</a>}
              {contact.email && <a href={`mailto:${contact.email}`} className="break-all underline">{contact.email}</a>}
            </div>
          )}
        </div>
        <p className="mt-8 text-sm text-stone-600 dark:text-stone-300">Thank you for your presence and prayers.</p>
        <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-stone-500 dark:text-stone-400">Music: {music.title}. {music.credit} <a className="underline" href={music.licenseUrl} target="_blank" rel="noreferrer">License</a></p>
      </Reveal>
    </footer>
  )
}
