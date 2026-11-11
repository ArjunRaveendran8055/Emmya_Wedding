import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"
import ContentPlaceholder from "./ContentPlaceholder"
import { rsvpDetails, weddingInfo } from "../data/weddingContent"

export default function RSVPSection() {
  const { phone, email } = weddingInfo.contact
  const hasContact = phone || email
  return (
    <section id="rsvp" className="px-4 py-24">
      <Reveal className="mx-auto max-w-2xl rounded-3xl border border-gold-300/60 bg-white/85 p-7 dark:bg-stone-900/85">
        <SectionTitle eyebrow="RSVP" title="Will You Join Us?" subtitle="We look forward to celebrating with you." />
        {rsvpDetails.url ? (
          <a href={rsvpDetails.url} target="_blank" rel="noreferrer" className="mx-auto block w-fit rounded-full bg-gold-200 px-6 py-3 font-semibold text-stone-900">{rsvpDetails.label}</a>
        ) : rsvpDetails.submitUrl ? (
          <form action={rsvpDetails.submitUrl} method="POST" className="space-y-5 text-stone-700 dark:text-stone-200">
            <input type="hidden" name="_subject" value={rsvpDetails.subject} />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="Celebration" value={`${weddingInfo.couple.bride} & ${weddingInfo.couple.groom} — ${weddingInfo.eventLabel}`} />
            <input type="hidden" name="Event date" value={`${weddingInfo.dateLabel}, ${weddingInfo.timeLabel}`} />
            <label className="block text-sm font-medium">
              Your name
              <input name="name" type="text" autoComplete="name" required maxLength={100} className="mt-2 block w-full rounded-xl border border-gold-300/70 bg-ivory-50 px-4 py-3 text-stone-800 focus:outline-gold-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100" />
            </label>
            <label className="block text-sm font-medium">
              Your email
              <input name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2 block w-full rounded-xl border border-gold-300/70 bg-ivory-50 px-4 py-3 text-stone-800 focus:outline-gold-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100" />
            </label>
            <label className="block text-sm font-medium">
              Will you attend?
              <select name="Attendance" required defaultValue="" className="mt-2 block w-full rounded-xl border border-gold-300/70 bg-ivory-50 px-4 py-3 text-stone-800 focus:outline-gold-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100">
                <option value="" disabled>Please choose</option>
                <option value="Joyfully attending">Joyfully attending</option>
                <option value="Unable to attend">Unable to attend</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Number attending, including you
              <input name="Guests" type="number" min="0" step="1" required defaultValue="1" aria-describedby="guest-count-help" className="mt-2 block w-full rounded-xl border border-gold-300/70 bg-ivory-50 px-4 py-3 text-stone-800 focus:outline-gold-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100" />
              <span id="guest-count-help" className="mt-1 block text-xs font-normal text-stone-500 dark:text-stone-400">Enter 0 if you cannot attend.</span>
            </label>
            <label className="block text-sm font-medium">
              Message or wishes <span className="font-normal">(optional)</span>
              <textarea name="Message" rows={4} maxLength={2000} className="mt-2 block w-full rounded-xl border border-gold-300/70 bg-ivory-50 px-4 py-3 text-stone-800 focus:outline-gold-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100" />
            </label>
            <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">Your RSVP details are shared with the family through FormSubmit.</p>
            <button type="submit" className="w-full rounded-full bg-gradient-to-r from-gold-300 to-gold-200 px-6 py-3 font-semibold text-stone-900 transition hover:from-gold-400 focus:outline-gold-500">Send RSVP</button>
          </form>
        ) : hasContact ? (
          <div className="space-y-3 text-center text-gold-700 dark:text-gold-300">
            <p>Please contact the family to confirm your attendance.</p>
            {phone && <a className="block underline" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>}
            {email && <a className="block break-all underline" href={`mailto:${email}`}>{email}</a>}
          </div>
        ) : (
          <ContentPlaceholder label="RSVP contact or response link">A phone number, email, or working RSVP form link will be added here. Online responses are not being collected yet.</ContentPlaceholder>
        )}
      </Reveal>
    </section>
  )
}
