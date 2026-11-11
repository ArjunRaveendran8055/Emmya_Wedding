import { motion, useReducedMotion } from "framer-motion"

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionP = motion.p
const MotionH1 = motion.h1

const ORNAMENTS = [
  { top: "9%", left: "6%", size: 64, rotate: -16 },
  { top: "16%", right: "7%", size: 52, rotate: 22 },
  { bottom: "20%", left: "10%", size: 46, rotate: 10 },
  { bottom: "12%", right: "9%", size: 58, rotate: -14 },
]

const FLOATING_ICONS = [
  { icon: "♥", top: "24%", left: "11%", size: "0.85rem" },
  { icon: "♥", top: "32%", right: "12%", size: "1.25rem" },
  { icon: "♥", top: "61%", left: "9%", size: "1.05rem" },
  { icon: "♥", top: "74%", right: "15%", size: "1.4rem" },
]

function RoyalOrnament({ style }) {
  return (
    <div
      className="pointer-events-none absolute rounded-full bg-gradient-to-b from-gold-100/35 to-transparent dark:from-gold-500/10"
      style={{ width: style.size, height: style.size, ...style }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 grid place-items-center text-gold-500/70 dark:text-gold-300/60">✦</span>
    </div>
  )
}

export default function HeroSection({ bride, groom, dateLabel, locationLabel, timeLabel, invitationUrl, heading = "Celebrate Our Betrothal" }) {
  const reduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.3 : 1.2,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.28, // slower stagger
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28, filter: reduceMotion ? undefined : "blur(18px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduceMotion ? 0.35 : 1.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // Unique animation variants for each element
  const introVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(12px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const nameVariants = {
    hidden: { opacity: 0, x: -32, filter: "blur(18px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  };
  const ampersandVariants = {
    hidden: { opacity: 0, scale: 0.7, rotate: -30 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, delay: 0.3, ease: "backOut" } },
  };
  const taglineVariants = {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 18 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 0.9, type: "spring", stiffness: 120 } },
  };

  // Shimmer sweep for names
  const shimmerColor = "from-gold-200/0 via-gold-500/60 to-gold-200/0"

  return (
    <MotionSection
      id="home"
      className="relative isolate flex min-h-screen items-start sm:items-center justify-center overflow-hidden scroll-mt-28 px-2 pb-4 pt-28 sm:px-4 sm:pb-8 sm:pt-6 md:min-h-screen md:pb-12 md:pt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-h-[520px] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-100/30 blur-[90px] dark:bg-gold-300/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 md:opacity-90" aria-hidden="true">
        {ORNAMENTS.map((ornament, index) => (
          <MotionDiv
            key={index}
            className="hidden sm:block"
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, index % 2 === 0 ? -7 : 7, 0],
                    rotate: [ornament.rotate, ornament.rotate + (index % 2 === 0 ? 4 : -4), ornament.rotate],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <RoyalOrnament style={ornament} />
          </MotionDiv>
        ))}

          {FLOATING_ICONS.map((item, index) => (
            <MotionDiv
              key={`${item.icon}-${index}`}
              className="absolute text-gold-500/45 dark:text-gold-300/38"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                fontSize: item.size,
              }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, index % 2 === 0 ? -8 : 8, 0],
                      x: [0, index % 2 === 0 ? 4 : -4, 0],
                      opacity: [0.45, 0.8, 0.45],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 4.8 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              aria-hidden="true"
            >
              {item.icon}
            </MotionDiv>
          ))}

      </div>

      <div className="relative z-10 mx-auto w-full flex items-center justify-center">
        <MotionDiv
          className="flex flex-col space-y-4 md:space-y-5 w-full max-w-7xl mx-auto shadow-none"
          variants={introVariants}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-gold-200/16 to-transparent dark:from-gold-500/6" aria-hidden="true" />

          <MotionP
            className="relative text-center text-[13px] sm:text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.44em] text-gold-600 dark:text-gold-300"
            variants={introVariants}
          >
            {heading}
          </MotionP>

          <MotionP
            className="relative mt-2 text-center font-['Cormorant_Garamond'] text-lg sm:text-lg md:text-xl lg:text-2xl italic text-stone-600 dark:text-stone-200"
            variants={introVariants}
            >
            With the blessings of elders and loved ones
          </MotionP>

          <MotionH1
            className="relative text-center font-['Cormorant_Garamond'] font-bold leading-[1.02] text-stone-700 dark:text-ivory-100 tracking-wide px-2 sm:px-4 md:px-8 mt-3 mb-2 text-[2.1rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.7rem] xl:text-[3rem]"
            style={{ fontSize: "clamp(1.6rem, 6vw, 3rem)", letterSpacing: "0.02em", wordSpacing: "0.08em", maxWidth: "900px", width: "100%", margin: "0 auto" }}
            variants={nameVariants}
            >
            <motion.span className="inline-block tracking-[0.02em] px-1 sm:px-2 md:px-4 relative align-middle" variants={nameVariants}>
              {groom}
            </motion.span>
            <motion.span
              className="mx-2 sm:mx-3 md:mx-4 inline-block align-middle font-['Great_Vibes'] text-gold-500 dark:text-gold-400 relative"
              style={{ fontSize: "1.1em" }}
              variants={ampersandVariants}
            >
              &amp;
              {/* Shimmer sweep */}
              <motion.span
                className={`absolute left-0 top-1/2 w-full h-8 -translate-y-1/2 pointer-events-none bg-gradient-to-r from-gold-200/0 via-gold-500/60 to-gold-200/0 blur-[2px]`}
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: [0, 0.22, 0], x: [0, 40, 80] }}
                transition={{ duration: 1.3, delay: 1.1, repeat: Infinity, repeatDelay: 2.2 }}
                aria-hidden="true"
              />
            </motion.span>
            <motion.span className="inline-block tracking-[0.02em] px-1 sm:px-2 md:px-4 relative align-middle" variants={nameVariants}>
              {bride}
            </motion.span>
          </MotionH1>
          <MotionP
            className="relative mx-auto mt-1 max-w-2xl text-center font-['Cormorant_Garamond'] text-base sm:text-base md:text-lg lg:text-xl italic leading-relaxed text-stone-600 dark:text-stone-200"
            variants={taglineVariants}
            >
            We request the honour of your presence at our betrothal.
            Your presence and prayers will make our special day even more beautiful.
          </MotionP>
          <MotionDiv className="relative mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2" variants={ctaVariants}>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-ivory-100/88 to-ivory-50/80 px-5 py-4 text-center transition-all duration-300 hover:from-ivory-100 hover:to-gold-50/70 dark:from-stone-800/68 dark:to-stone-900/58 dark:hover:from-stone-800/75 dark:hover:to-stone-800/65">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200/40 to-transparent dark:via-gold-500/20" aria-hidden="true" />
              <p className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.34em] text-stone-500 dark:text-stone-400">Betrothal Date</p>
              <p className="mt-2 font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-gold-600 dark:text-gold-300">{dateLabel}</p>
              <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">{timeLabel}</p>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/88 to-ivory-50/85 px-5 py-4 text-center transition-all duration-300 hover:from-white/92 hover:to-ivory-50 dark:from-stone-800/68 dark:to-stone-900/58 dark:hover:from-stone-800/75 dark:hover:to-stone-800/65">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-200/40 to-transparent dark:via-gold-500/20" aria-hidden="true" />
              <p className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.34em] text-stone-500 dark:text-stone-400">Celebration Venue</p>
              <p className="mt-2 font-['Cormorant_Garamond'] text-lg sm:text-xl md:text-2xl font-semibold leading-none text-stone-700 dark:text-stone-100">{locationLabel}</p>
            </div>
          </MotionDiv>
          <MotionDiv className="relative mt-6 flex flex-wrap items-center justify-center gap-3.5" variants={ctaVariants}>
            <a
              href="#events"
              className="inline-flex min-w-[164px] items-center justify-center rounded-full border border-gold-200/70 bg-gradient-to-r from-gold-300 via-gold-200 to-ivory-100 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-stone-700 transition-all duration-300 hover:border-gold-300/80 hover:from-gold-400 hover:via-gold-300 hover:to-ivory-100 hover:text-stone-800 dark:border-gold-500/35 dark:bg-gradient-to-r dark:from-gold-500 dark:via-gold-400 dark:to-gold-300 dark:text-stone-900"
            >
              View Ceremony
            </a>
            <a
              href="#rsvp"
              className="inline-flex min-w-[164px] items-center justify-center rounded-full border border-gold-200/60 bg-white/92 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-700 transition-all duration-300 hover:border-gold-300/75 hover:bg-ivory-50 dark:border-stone-700/55 dark:bg-stone-800/76 dark:text-gold-300 dark:hover:border-gold-500/45 dark:hover:bg-stone-700"
            >
              RSVP Details
            </a>
          </MotionDiv>
          <a href={invitationUrl} download className="mx-auto inline-flex rounded-full border border-gold-300 bg-white/70 px-6 py-3 text-sm font-semibold text-gold-700 dark:bg-stone-800 dark:text-gold-300">Download Invitation (PDF)</a>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}
