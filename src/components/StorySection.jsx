import ContentPlaceholder from "./ContentPlaceholder"
import { motion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionArticle = motion.article

const STEP_ICONS = ["✦", "❋", "◈"]

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

function StorySection({ moments }) {
  const animations = useAnimationSystem()
  if (!moments.length) return (
    <section id="story" className="px-4 py-20"><Reveal className="mx-auto max-w-4xl">
      <SectionTitle eyebrow="Their story" title="A Story to Share" />
      <ContentPlaceholder label="Their story">How they met, meaningful milestones, and a personal message from Emmya and Manu will be added here.</ContentPlaceholder>
    </Reveal></section>
  )


  return (
    <section id="story" className="relative overflow-hidden px-4 py-28">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blush-100/40 blur-[90px]" />
        <div className="absolute -right-32 bottom-24 h-80 w-80 rounded-full bg-gold-100/40 blur-[80px]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush-100/25 blur-[100px] dark:bg-stone-800/30" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Our Story"
            title="A Journey Written in Love"
            subtitle="From a gentle beginning to a forever promise."
          />
        </div>

        {/* Section ornament divider */}
        <Reveal variant="scaleIn">
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-gold-500 text-lg" aria-hidden="true">✦</span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Central gradient line */}
          <div
            className="pointer-events-none absolute left-[1.1rem] top-4 h-[calc(100%-2rem)] w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #d4af6a 12%, #ebc8d0 55%, #d4af6a 88%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-0">
            {moments.map((moment, index) => {
              const isEven = index % 2 === 0
              return (
                <Reveal
                  key={moment.year}
                  className={`relative flex items-start gap-0 sm:items-center sm:gap-0 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Card — half width on desktop */}
                  <div
                    className={`w-full pl-12 sm:w-[calc(50%-2.25rem)] sm:pl-0 ${
                      isEven ? "sm:pr-10" : "sm:pl-10"
                    }`}
                  >
                    <MotionArticle
                      className="group relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 to-white/80 p-8 sm:p-9 backdrop-blur-md dark:border-stone-700/50 dark:from-stone-900/85 dark:via-stone-900/75 dark:to-stone-800/60"
                      variants={animations.cardHover}
                      initial="rest"
                      whileHover="hover"
                    >
                      {/* Ghost year watermark */}
                      <span
                        className="pointer-events-none absolute right-4 top-3 select-none font-['Cormorant_Garamond'] font-bold leading-none text-gold-300/70 dark:text-stone-600/50"
                        style={{ fontSize: "clamp(4rem, 9vw, 6.5rem)" }}
                        aria-hidden="true"
                      >
                        {moment.year}
                      </span>

                      {/* Step badge + year label */}
                      <div className="relative flex items-center gap-3 mb-5">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-['Cormorant_Garamond'] text-xs font-semibold uppercase tracking-[0.3em] text-gold-700 dark:text-gold-300">
                            {moment.year}
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400">
                            Chapter {index + 1}
                          </p>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="relative font-['Cormorant_Garamond'] font-semibold leading-snug text-stone-800 dark:text-stone-100"
                        style={{ fontSize: "clamp(1.35rem, 2.8vw, 1.9rem)" }}>
                        {moment.title}
                      </h3>

                      {/* Accent underline */}
                      <div className="mt-3 h-[2px] w-10 rounded-full bg-gradient-to-r from-gold-500 to-gold-300" />

                      {/* Description */}
                      <p className="relative mt-4 text-sm leading-relaxed text-stone-400 sm:text-[0.95rem]">
                        {moment.description}
                      </p>

                      {/* Bottom icon ornament */}
                      <span
                        className="absolute bottom-4 right-5 text-xl text-gold-300/60 dark:text-stone-600/50 transition-opacity duration-500 group-hover:text-gold-300/80"
                        aria-hidden="true"
                      >
                        {STEP_ICONS[index % STEP_ICONS.length]}
                      </span>

                      {/* Inner hover glow */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(ellipse at 85% 15%, rgba(224,201,145,0.15), transparent 65%)",
                        }}
                        aria-hidden="true"
                      />
                    </MotionArticle>
                  </div>

                  {/* Spacer for desktop center column */}
                  <div className="hidden sm:flex sm:w-[4.5rem] sm:flex-shrink-0 sm:items-center sm:justify-center">
                    <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300/60 opacity-60" />
                      <span className="relative flex h-4 w-4 rounded-full bg-gold-500" />
                    </span>
                  </div>

                  {/* Mobile dot (absolute on timeline) */}
                  <span
                    className="absolute left-[0.525rem] top-[1.35rem] flex h-4 w-4 items-center justify-center sm:hidden"
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300/50 opacity-50" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-gold-500" />
                  </span>

                  {/* Empty right/left half on desktop for alternating */}
                  <div className="hidden sm:block sm:w-[calc(50%-2.25rem)]" />
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection
