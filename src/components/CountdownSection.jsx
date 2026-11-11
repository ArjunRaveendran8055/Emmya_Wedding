import { getCountdown } from "../data/countdown.js"
import { motion, useReducedMotion } from "framer-motion"
import { useAnimationSystem } from "../animations"
import { useEffect, useMemo, useState } from "react"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div

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


function CountdownSection({ targetDate }) {
  const animations = useAnimationSystem()
  const shouldReduce = useReducedMotion()
  const [timeLeft, setTimeLeft] = useState(() => getCountdown(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const blocks = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ],
    [timeLeft],
  )

  return (
    <section id="countdown" className="relative overflow-hidden px-4 py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-gold-100/35 blur-[90px] dark:bg-gold-400/8" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-ivory-100/40 blur-[100px] dark:bg-gold-300/10" />
      </div>

      <MotionDiv
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-gold-200/45 bg-white/86 p-7 backdrop-blur-sm dark:border-gold-500/20 dark:bg-stone-900/86 md:p-9"
        initial={shouldReduce ? undefined : { opacity: 0, y: 18 }}
        whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: shouldReduce ? 0 : 0.55, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-gold-200/22 to-transparent dark:from-gold-500/10" aria-hidden="true" />

        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="The Big Day"
            title={timeLeft.complete ? "Let Us Celebrate!" : "Countdown to Our Betrothal"}
            subtitle={timeLeft.complete ? "Our betrothal celebration has begun. Thank you for your love and prayers!" : "Counting the moments until our betrothal celebration."}
          />
        </div>

        {!timeLeft.complete && <Reveal className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {blocks.map((item) => (
            <MotionDiv
              key={item.label}
              className="group relative overflow-hidden rounded-[1.15rem] border border-gold-200/45 bg-ivory-50/92 px-4 py-5 text-center transition-all duration-300 dark:border-stone-700/65 dark:bg-stone-800/90"
              variants={animations.cardHover}
              initial="rest"
              whileHover="hover"
              animate={
                shouldReduce
                  ? undefined
                  : {
                      y: [0, -3, 0],
                    }
              }
              transition={
                shouldReduce
                  ? undefined
                  : {
                      duration: 4.5 + blocks.findIndex((block) => block.label === item.label) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/45 to-transparent dark:via-gold-500/25" aria-hidden="true" />

              <motion.p
                key={`${item.label}-${item.value}`}
                className="font-display text-[2.15rem] leading-none text-gold-700 tabular-nums dark:text-gold-300 md:text-[2.3rem]"
                initial={shouldReduce ? undefined : { opacity: 0.45, y: 5, scale: 0.96 }}
                animate={shouldReduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: shouldReduce ? 0 : 0.28, ease: "easeOut" }}
              >
                {String(item.value).padStart(2, "0")}
              </motion.p>

              <div className="mx-auto mt-2 h-px w-12 bg-gradient-to-r from-transparent via-gold-300/55 to-transparent dark:via-gold-500/35" />

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-600 dark:text-stone-300">
                {item.label}
              </p>
            </MotionDiv>
          ))}
        </Reveal>}
      </MotionDiv>
    </section>
  )
}

export default CountdownSection
