import { motion, useReducedMotion } from "framer-motion"
import Reveal from "./Reveal"
import { galleryImages } from "../data/weddingContent"

const MotionDiv = motion.div

const marqueePhotos = galleryImages

function CupidDecor({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left wing */}
      <path
        d="M 72 97 Q 42 72 22 84 Q 32 112 72 112"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(139,69,19,0.06)"
      />
      <path
        d="M 72 102 Q 48 88 32 96 Q 40 114 72 114"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="3 2.5"
      />
      {/* Right wing */}
      <path
        d="M 128 97 Q 158 72 178 84 Q 168 112 128 112"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(139,69,19,0.06)"
      />
      <path
        d="M 128 102 Q 152 88 168 96 Q 160 114 128 114"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="3 2.5"
      />
      {/* Head */}
      <circle cx="100" cy="46" r="22" stroke="currentColor" strokeWidth="1.8" fill="rgba(139,69,19,0.04)" />
      {/* Hair curls */}
      <path
        d="M 83 33 Q 86 22 100 21 Q 114 22 117 33"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 83 33 Q 79 26 82 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M 117 33 Q 121 26 118 21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Eyes */}
      <ellipse cx="93" cy="47" rx="3" ry="4" stroke="currentColor" strokeWidth="1.3" fill="rgba(139,69,19,0.2)" />
      <ellipse cx="107" cy="47" rx="3" ry="4" stroke="currentColor" strokeWidth="1.3" fill="rgba(139,69,19,0.2)" />
      {/* Smile */}
      <path d="M 94 57 Q 100 62 106 57" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Chubby body */}
      <path
        d="M 80 69 C 79 90 78 115 80 137 Q 90 143 100 143 Q 110 143 120 137 C 122 115 121 90 120 69 Q 110 64 100 63 Q 90 64 80 69 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(139,69,19,0.04)"
      />
      {/* Left arm (holding bow) */}
      <path d="M 80 82 Q 60 79 52 92" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Right arm (drawing arrow) */}
      <path d="M 120 82 Q 142 76 158 70" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Bow arc */}
      <path
        d="M 52 74 Q 36 92 52 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bow string */}
      <line x1="52" y1="74" x2="80" y2="90" stroke="currentColor" strokeWidth="1.2" />
      <line x1="52" y1="110" x2="80" y2="90" stroke="currentColor" strokeWidth="1.2" />
      {/* Arrow shaft */}
      <line x1="82" y1="90" x2="162" y2="69" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 156 66 L 164 70 L 156 74 Z" fill="currentColor" />
      {/* Arrow feathers */}
      <path d="M 84 90 L 78 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 84 90 L 80 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Legs */}
      <path d="M 89 137 Q 84 158 82 172" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 111 137 Q 116 158 118 172" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Envelope */}
      <rect x="10" y="184" width="55" height="40" rx="4" stroke="currentColor" strokeWidth="1.8" fill="rgba(139,69,19,0.06)" />
      {/* Envelope flap */}
      <path d="M 10 184 L 37 205 L 64 184" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d="M 10 224 L 29 206" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 64 224 L 45 206" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Heart on envelope */}
      <path
        d="M 37 198 C 33 194 26 195 26 200 C 26 205 37 213 37 213 C 37 213 48 205 48 200 C 48 195 41 194 37 198 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="rgba(139,69,19,0.18)"
      />
      {/* Dashed arc from arrow to envelope */}
      <path
        d="M 160 72 Q 148 120 92 178"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="4 3"
        fill="none"
        opacity="0.55"
      />
    </svg>
  )
}

export default function WelcomeSection({ bride, groom, locationLabel }) {
  const shouldReduce = useReducedMotion()

  return (
    <section id="welcome" className="relative overflow-hidden py-24 md:py-32">
      <style>{`
        @keyframes welcomeMarqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .welcome-marquee-track {
          animation: welcomeMarqueeScroll 36s linear infinite;
        }
        .welcome-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .welcome-marquee-track { animation: none; }
        }
      `}</style>

      {/* Soft radial glow behind text */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-80 bg-[radial-gradient(ellipse_70%_60%_at_50%_10%,rgba(224,201,145,0.18),transparent_80%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_50%_10%,rgba(180,152,93,0.12),transparent_80%)]" aria-hidden="true" />

      {/* ── Text block ───────────────────────────────────────── */}
      <div className="relative z-10 px-6 text-center">
        <Reveal variant="fadeIn">
          <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-700 dark:text-gold-300 mb-4 sm:mb-6">
            {groom} &amp; {bride}
          </p>
        </Reveal>

        <Reveal variant="fadeIn">
          <h2 className="font-['Great_Vibes'] leading-none text-gold-700 dark:text-gold-300" style={{ fontSize: "clamp(4rem, 10vw, 7.5rem)" }}>
            Welcome!
          </h2>
        </Reveal>

        <Reveal variant="fadeUp">
          <p className="mx-auto mt-5 max-w-2xl font-['Cormorant_Garamond'] italic leading-relaxed text-stone-600 dark:text-stone-300" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)" }}>
            We warmly invite you to celebrate the betrothal of{" "}
            <span className="text-gold-700 dark:text-gold-300">{groom} &amp; {bride}</span>
            {" "}
            at the beautiful {locationLabel}. We look forward to sharing this
            unforgettable moment with our most special people.
          </p>
        </Reveal>
      </div>

      {/* ── Infinite photo marquee strip ─────────────────────── */}
      <div className="mt-14 overflow-hidden">
        <div
          className="welcome-marquee-track flex"
          style={{
            width: "max-content",
            gap: "14px",
            animationDuration: shouldReduce ? "0s" : "36s",
          }}
        >
          {[...marqueePhotos, ...marqueePhotos].map((photo, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden rounded-xl"
              style={{
                width: "clamp(210px, 19vw, 340px)",
                height: "clamp(270px, 26vw, 400px)",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                  style={{ objectPosition: photo.position ?? "center" }}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                draggable={false}
                loading="lazy"
              />
              {/* subtle warm overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-gold-700/20 dark:to-stone-800/30" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating cupid decoration ────────────────────────── */}
      <MotionDiv
        className="pointer-events-none absolute bottom-2 right-6 select-none text-gold-700/70 dark:text-gold-300/45 md:right-14"
        animate={shouldReduce ? {} : { y: [0, -11, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <CupidDecor className="opacity-75" style={{ width: "clamp(120px, 13vw, 200px)", height: "auto" }} />
      </MotionDiv>
    </section>
  )
}
