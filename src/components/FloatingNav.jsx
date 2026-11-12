import { weddingInfo } from "../data/weddingContent"
import { FiMoon, FiMusic, FiPause, FiSun } from "react-icons/fi"

const links = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#venue", label: "Venue" },
]

function FloatingNav({ isDark, onThemeToggle, isPlaying, onMusicToggle, musicError }) {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[min(95%,64rem)] -translate-x-1/2 rounded-full border border-gold-200/45 bg-gradient-to-r from-ivory-50/90 via-white/88 to-ivory-50/90 px-4 py-2.5 backdrop-blur-md transition-all duration-300 dark:border-gold-500/25 dark:bg-gradient-to-r dark:from-stone-800/75 dark:via-stone-900/72 dark:to-stone-800/75">
      <div className="flex items-center justify-between gap-3">
        <a href="#home" className="font-['Cormorant_Garamond'] text-2xl font-semibold text-gold-600 transition-colors hover:text-gold-700 dark:text-gold-400 dark:hover:text-gold-300">
          {weddingInfo.initials}
        </a>

        <nav aria-label="Main navigation" className="hidden gap-1 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-stone-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-gold-100/60 hover:to-gold-50/50 hover:text-gold-700 dark:text-stone-200 dark:hover:bg-gold-500/18 dark:hover:text-gold-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-music-toggle
            onClick={onMusicToggle}
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-700 transition-all duration-200 hover:bg-gradient-to-br hover:from-gold-100/60 hover:to-gold-50/50 hover:text-gold-700 dark:text-stone-200 dark:hover:bg-gold-500/18 dark:hover:text-gold-300"
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <FiPause size={20} /> : <FiMusic size={20} />}
          </button>

          <button
            type="button"
            onClick={onThemeToggle}
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-700 transition-all duration-200 hover:bg-gradient-to-br hover:from-gold-100/60 hover:to-gold-50/50 hover:text-gold-700 dark:text-stone-200 dark:hover:bg-gold-500/18 dark:hover:text-gold-300"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
      <details className="mt-1 md:hidden">
        <summary className="cursor-pointer px-2 py-1 text-sm text-gold-700 dark:text-gold-300">Explore invitation</summary>
        <nav aria-label="Mobile navigation" className="flex flex-wrap justify-center gap-2 py-3">
          {links.map((item) => <a key={item.href} href={item.href} onClick={(event) => { event.currentTarget.closest("details").open = false }} className="rounded-full px-3 py-2 text-sm text-stone-700 dark:text-stone-200">{item.label}</a>)}
        </nav>
      </details>
      {musicError && <p role="status" className="px-3 py-1 text-center text-xs text-stone-700 dark:text-stone-200">{musicError}</p>}
    </header>
  )
}

export default FloatingNav
