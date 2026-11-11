import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const MotionA = motion.a
const EVENT_ICONS = ["♡", "🥂", "⛪", "🍽", "🎶", "✨"]

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

function EventsSection({ events }) {
  const animations = useAnimationSystem()

  return (
    <section id="events" className="relative overflow-hidden px-4 py-28 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-36 top-16 h-80 w-80 rounded-full bg-blush-100/50 blur-[90px]" />
        <div className="absolute -right-36 bottom-8 h-96 w-96 rounded-full bg-gold-100/50 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory-100/55 blur-[90px] dark:bg-stone-800/30" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Betrothal Celebration"
            title="Program Of The Day"
            subtitle="Join us for the betrothal ceremony and share your prayers and blessings."
          />
        </div>

        <Reveal variant="scaleIn">
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-lg text-gold-500" aria-hidden="true">✦</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </Reveal>

        <div className="mt-14">
          <div className="mx-auto max-w-7xl px-2 md:px-6">
            <div className="grid grid-cols-1 gap-6 justify-items-center">
              {events.map((event, index) => (
                <Reveal key={event.name}>
                  <MotionDiv
                    className="group relative w-full max-w-[42rem] overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-8 text-left shadow-[0_35px_100px_-60px_rgba(212,175,106,0.8)] transition duration-500 hover:-translate-y-1 hover:border-gold-200 hover:bg-white dark:border-stone-700/60 dark:bg-stone-900/80 dark:shadow-[0_35px_100px_-60px_rgba(0,0,0,0.6)]"
                    variants={animations.cardHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-white to-amber-50 opacity-90 dark:from-stone-900 dark:to-stone-800"
                      aria-hidden="true"
                    />

                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-gold-300/70 bg-ivory-50 text-2xl text-gold-700 dark:border-stone-600/60 dark:bg-stone-900/85 dark:text-gold-300">
                          <span aria-hidden="true">{EVENT_ICONS[index % EVENT_ICONS.length]}</span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-stone-900 dark:text-ivory-100">
                            {event.name}
                          </p>
                          <p className="mt-1 text-sm uppercase tracking-[0.32em] text-gold-700 dark:text-gold-300">
                            {event.date}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-full bg-gold-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-gold-800 dark:bg-gold-200/10 dark:text-gold-300">
                        {event.time}
                      </div>
                    </div>

                    <p className="mt-8 text-lg font-semibold leading-8 text-stone-800 dark:text-ivory-100">
                      {event.venue}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                      {event.address}
                    </p>

                    <MotionA
                      href={event.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold-200/80 bg-gold-50 px-5 py-3 text-sm font-semibold text-gold-800 transition hover:bg-gold-100 hover:text-gold-900 dark:border-gold-300/30 dark:bg-gold-500/10 dark:text-gold-200 dark:hover:bg-gold-500/20"
                      variants={animations.buttonHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      {event.directionsLabel}
                      <span aria-hidden="true">→</span>
                    </MotionA>
                  </MotionDiv>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
