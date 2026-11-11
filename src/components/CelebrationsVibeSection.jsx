import Reveal from "./Reveal"

const DecorativeBotanicals = () => (
  <svg
    viewBox="0 0 1400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute inset-x-0 top-0 w-full text-gold-700/40 opacity-40 dark:text-gold-300/20 dark:opacity-30"
    aria-hidden="true"
  >
    {/* Left botanical foliage */}
    <g stroke="currentColor" strokeWidth="1.5" fill="none" color="currentColor" opacity="0.6">
      {/* Left ferns */}
      <path d="M 40 80 Q 50 120 45 160 M 40 100 L 30 110 M 40 100 L 50 110 M 40 120 L 25 130 M 40 120 L 55 130" />
      <path d="M 120 60 Q 110 100 115 140 M 120 80 L 110 85 M 120 80 L 130 85 M 120 100 L 105 110" />
      <path d="M 200 100 Q 190 140 200 180 M 200 120 L 185 125 M 200 120 L 215 125 M 200 144 L 180 155" />

      {/* Right botanical foliage */}
      <path d="M 1360 90 Q 1350 140 1360 180 M 1360 110 L 1375 120 M 1360 110 L 1345 120 M 1360 135 L 1380 145" />
      <path d="M 1280 70 Q 1290 110 1285 160 M 1280 90 L 1295 100 M 1280 90 L 1265 100 M 1280 120 L 1300 130" />
      <path d="M 1200 110 Q 1210 150 1215 190 M 1200 130 L 1215 140 M 1200 130 L 1185 140" />
    </g>

    {/* Hanging garland/swag */}
    <path
      d="M 100 50 Q 300 200 500 60 Q 700 150 900 50 Q 1100 160 1300 60"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.5"
    />

    {/* Garland decorative drops */}
    <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4">
      <path d="M 200 80 L 200 140 M 350 65 L 350 140 M 500 50 L 500 130 M 650 70 L 650 145 M 800 55 L 800 135" />
      <path d="M 950 75 L 950 150 M 1100 65 L 1100 140 M 1250 80 L 1250 145" />
    </g>

    {/* Decorative leaves on swag */}
    <g fill="currentColor" opacity="0.35">
      <path d="M 195 85 Q 200 80 205 85 Q 200 90 195 85" />
      <path d="M 345 75 Q 350 70 355 75 Q 350 80 345 75" />
      <path d="M 495 60 Q 500 55 505 60 Q 500 65 495 60" />
      <path d="M 645 80 Q 650 75 655 80 Q 650 85 645 80" />
      <path d="M 945 85 Q 950 80 955 85 Q 950 90 945 85" />
      <path d="M 1095 75 Q 1100 70 1105 75 Q 1100 80 1095 75" />
    </g>
  </svg>
)

function CelebrationsVibeSection({ images, bride, groom }) {
  const imageSelection = images?.slice(0, 5) || []

  return (
    <section id="celebrations-vibe" className="relative overflow-hidden px-4 py-32 md:py-40">
      <DecorativeBotanicals />

      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(224,201,145,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(180,152,93,0.10),transparent_70%)]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <Reveal variant="fadeIn">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-700 dark:text-gold-400">
            {groom} &amp; {bride}
          </p>
        </Reveal>

        <Reveal variant="fadeIn">
          <h2 className="text-center font-['Great_Vibes'] leading-none text-gold-700 dark:text-gold-300 mt-6 sm:mt-8" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
            Every Moment Matters
          </h2>
        </Reveal>

        <Reveal variant="fadeUp">
          <p className="mx-auto mt-4 max-w-2xl text-center font-['Cormorant_Garamond'] italic leading-relaxed text-stone-600 dark:text-stone-300" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
            Join {groom} and {bride} for a celebration of love, family, and God’s blessings.
          </p>
        </Reveal>

        <Reveal variant="scaleIn">
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-300" />
            <span className="text-gold-500 text-lg" aria-hidden="true">
              ✦
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-300" />
          </div>
        </Reveal>

        {/* Image showcase grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {imageSelection.map((image, index) => (
            <Reveal key={index} variant="fadeUp">
              <div className="group relative overflow-hidden rounded-2xl">
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                  style={{ objectPosition: image.position ?? "center" }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139,105,20,0.3), rgba(235,192,200,0.2))",
                    }}
                    aria-hidden="true"
                  />

                  {/* Subtle frame border */}
                  <div
                    className="pointer-events-none absolute inset-2 rounded-xl border border-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>

                {/* Index badge */}
                <div className="pointer-events-none absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-xs font-bold text-gold-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm dark:bg-stone-900/80 dark:text-gold-300" aria-hidden="true">
                  {index + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cupid illustration and tagline */}
        <Reveal variant="fadeUp">
          <div className="mt-14 flex flex-col items-center">
            <div className="w-full max-w-xl rounded-3xl border border-gold-300/40 bg-white/60 px-6 py-8 text-center dark:border-stone-700 dark:bg-stone-900/55">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-700 dark:text-gold-300">
                Our Signature
              </p>

              <div className="mt-4 flex items-center justify-center gap-3" aria-hidden="true">
                <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold-300" />
                <span className="text-gold-500">✦</span>
                <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold-300" />
              </div>

              <svg
                viewBox="0 0 90 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mt-5 h-20 w-20"
                aria-hidden="true"
              >
                {/* Heart */}
                <path d="M45 52C43 50 20 36 20 24C20 16 27 10 34 10C38 10 40 14 45 18C50 14 52 10 56 10C63 10 70 16 70 24C70 36 47 50 45 52Z" fill="#e6c77c" stroke="#bfa14a" stroke-width="2"/>
                {/* Laurel left */}
                <path d="M18 38 Q10 48 22 56" stroke="#bfa14a" stroke-width="1.5" fill="none"/>
                <path d="M20 44 Q14 52 26 60" stroke="#bfa14a" stroke-width="1.1" fill="none"/>
                {/* Laurel right */}
                <path d="M72 38 Q80 48 68 56" stroke="#bfa14a" stroke-width="1.5" fill="none"/>
                <path d="M70 44 Q76 52 64 60" stroke="#bfa14a" stroke-width="1.1" fill="none"/>
                {/* Sparkle accent */}
                <g opacity="0.7">
                  <polygon points="45,4 46,7 49,7.3 47,9 47.7,12 45,10.5 42.3,12 43,9 41,7.3 44,7" fill="#e6c77c"/>
                </g>
              </svg>

              <p className="mt-5 text-center font-['Great_Vibes'] leading-relaxed text-gold-700 dark:text-gold-300" style={{ fontSize: "clamp(1.55rem, 3.5vw, 2.25rem)" }}>
                With Love & Prayers
              </p>

              <p className="mt-2 text-center text-sm uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                {groom} &amp; {bride}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CelebrationsVibeSection
