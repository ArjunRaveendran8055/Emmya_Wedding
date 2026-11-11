import { motion } from "framer-motion"
import { useState } from "react"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const MotionA = motion.a

const FloatingHearts = () => {
  const heartVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`heart-${i}`}
          custom={i}
          variants={heartVariants}
          animate="animate"
          className="pointer-events-none absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${-40 + i * 20}px`,
          }}
          aria-hidden="true"
        >
          <span className="inline-block text-2xl text-gold-500/60 dark:text-gold-300/50">
            ♥
          </span>
        </motion.div>
      ))}
    </>
  )
}

function VenueSection({ venues }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeVenue = venues[activeIndex]
  const animations = useAnimationSystem()

  return (
    <section id="venue" className="px-4 pt-12 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Venue"
            title="Where We Gather"
            subtitle={activeVenue.title}
          />
        </div>

        <Reveal className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="mb-6 flex flex-wrap gap-3 rounded-3xl bg-ivory-50/90 p-2 dark:bg-stone-900/80">
              {venues.map((venue, index) => (
                <button
                  key={venue.label}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    index === activeIndex
                      ? "bg-gold-200 text-stone-900 shadow-lg shadow-gold-200/30 dark:bg-gold-300/20 dark:text-ivory-100"
                      : "bg-white/80 text-stone-700 hover:bg-gold-100/80 dark:bg-stone-800/85 dark:text-stone-300 dark:hover:bg-stone-700/80"
                  }`}
                  aria-pressed={index === activeIndex}
                >
                  {venue.label}
                </button>
              ))}
            </div>

            <iframe
              title={`${activeVenue.label} map`}
              src={activeVenue.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full rounded-3xl border border-gold-200 dark:border-stone-700"
            />
          </div>

          <MotionDiv
            className="relative rounded-3xl border border-gold-300/60 bg-white/85 p-7 dark:border-stone-700 dark:bg-stone-900/80"
            variants={animations.cardHover}
            initial="rest"
            whileHover="hover"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-700 dark:text-gold-300">
              {activeVenue.title}
            </p>
            <h3 className="mt-2 font-display text-3xl text-stone-800 dark:text-stone-100">
              Address
            </h3>

            <div className="mt-4 flex items-center gap-3" aria-hidden="true">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300" />
              <span className="text-gold-500">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300" />
            </div>

            <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-300">{activeVenue.address}</p>
            <MotionA
              href={activeVenue.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-ivory-50 px-5 py-2.5 text-sm font-semibold tracking-[0.08em] text-gold-700 transition-colors hover:text-blush-700 dark:border-stone-700 dark:bg-stone-800 dark:text-gold-300"
              variants={animations.buttonHover}
              initial="rest"
              whileHover="hover"
              aria-label={activeVenue.directionsLabel}
            >
              {activeVenue.directionsLabel}
              <span aria-hidden="true">→</span>
            </MotionA>
          </MotionDiv>
        </Reveal>
      </div>
    </section>
  )
}

export default VenueSection
