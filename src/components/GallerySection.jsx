import { photoSlots } from "../data/weddingContent"
import ContentPlaceholder from "./ContentPlaceholder"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi"
import { useAnimationSystem } from "../animations"
import Reveal from "./Reveal"
import SectionTitle from "./SectionTitle"

const MotionDiv = motion.div
const MotionButton = motion.button

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function GallerySection({ images, bride, groom }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const animations = useAnimationSystem()
  const closeRef = useRef(null)
  useEffect(() => {
    if (selectedIndex === null) return
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null)
      if (event.key === "ArrowLeft") setSelectedIndex((index) => (index + images.length - 1) % images.length)
      if (event.key === "ArrowRight") setSelectedIndex((index) => (index + 1) % images.length)
      if (event.key === "Tab") {
        const buttons = closeRef.current?.closest('[role="dialog"]')?.querySelectorAll("button")
        if (!buttons?.length) return
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [selectedIndex, images.length])


  const showPreviousImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const showNextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="gallery" className="relative overflow-hidden px-4 py-28 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-blush-100/40 blur-[90px]" />
        <div className="absolute -right-40 bottom-16 h-96 w-96 rounded-full bg-gold-100/40 blur-[100px]" />
        <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-ivory-100/45 blur-[95px] dark:bg-stone-800/25" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <FloatingHearts />
          <SectionTitle
            eyebrow="Gallery"
            title="Moments We Hold Dear"
            subtitle={`A collection of precious memories and cherished celebrations for ${groom} and ${bride}.`}
          />
        </div>

        <Reveal variant="scaleIn">
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-lg text-gold-500" aria-hidden="true">
              ✦
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </Reveal>

        <MotionDiv
          className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {images.map((image, index) => {
            const layoutClasses = [
              "md:col-span-2",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
              "md:col-span-1",
            ]
            const aspectClasses = [
              "aspect-[4/3]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
              "aspect-[4/5]",
            ]
            const layoutClass = layoutClasses[index] ?? "md:col-span-1"
            const aspectClass = aspectClasses[index] ?? "aspect-[4/5]"
            return (
            <MotionDiv
              key={image.src}
              variants={itemVariants}
              className={layoutClass}
            >
              <MotionButton
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`group relative w-full overflow-hidden rounded-3xl border border-white/50 backdrop-blur-sm transition-all duration-700 hover:border-gold-300/80 dark:border-stone-700/40 dark:hover:border-gold-500 ${aspectClass}`}
                aria-label={`Open image ${index + 1}`}
                variants={animations.cardHover}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectPosition: image.position ?? "center" }}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <motion.span
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                />

                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">
                    {groom} &amp; {bride}
                  </span>
                  <span className="px-4 text-center text-xl font-light uppercase tracking-widest text-white/90">
                    Explore
                  </span>
                  <div className="h-px w-8 bg-white/60" />
                </motion.div>

                <span
                  className="pointer-events-none absolute inset-0 rounded-3xl border border-white/20"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-1 rounded-3xl border border-white/5"
                  aria-hidden="true"
                />
              </MotionButton>
            </MotionDiv>
            )
          })}
        </MotionDiv>
        {photoSlots.some((slot) => !slot.src) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {photoSlots.filter((slot) => !slot.src).map((slot) => (
              <ContentPlaceholder key={slot.id} label={slot.label}>A new photograph from the couple will be added here.</ContentPlaceholder>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedIndex !== null ? (
          <MotionDiv
            key="gallery-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/65 p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo of ${groom} and ${bride}`}
          >
            <MotionDiv
              initial={{ scale: 0.94, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <div className="relative overflow-hidden rounded-[1.8rem] bg-black/20">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  className="max-h-[85vh] w-full rounded-[1.8rem] object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                aria-label="Close preview"
                ref={closeRef}
              >
                <FiX size={22} />
              </button>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={22} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    {selectedIndex + 1} / {images.length}
                  </div>
                </>
              ) : null}
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>

      {selectedIndex !== null ? <div className="sr-only">Use arrow keys to navigate the gallery for {groom} and {bride}. Press Escape to close the preview.</div> : null}
    </section>
  )
}

export default GallerySection
