import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useAnimationSystem } from "./animations"
import FamilySection from "./components/FamilySection"
import MissingDetails from "./components/MissingDetails"
import BackgroundHearts from "./components/BackgroundHearts"
import CountdownSection from "./components/CountdownSection"
import DressCodeSection from "./components/DressCodeSection"
import EventsSection from "./components/EventsSection"
import FloatingNav from "./components/FloatingNav"
import FooterSection from "./components/FooterSection"
import CelebrationsVibeSection from "./components/CelebrationsVibeSection"
import GallerySection from "./components/GallerySection"
import HeroSection from "./components/HeroSection"
import Loader from "./components/Loader"
import WelcomeSection from "./components/WelcomeSection"
import RSVPSection from "./components/RSVPSection"
import StorySection from "./components/StorySection"
import VenueSection from "./components/VenueSection"
import {
  dressDetails,
  events,
  galleryImages,
  storyMoments,
  weddingInfo,
  music,
} from "./data/weddingContent"

const MotionMain = motion.main

function App() {
  const animations = useAnimationSystem()
  const [isLoading, setIsLoading] = useState(true)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const savedTheme = window.localStorage.getItem("theme")
    if (savedTheme) return savedTheme === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicError, setMusicError] = useState("")
  const audioRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    window.localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const onThemeToggle = () => setIsDark((value) => !value)
  const onMusicToggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    setMusicError("")
    if (!audio.paused) {
      audio.pause()
      return
    }
    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
      setMusicError("Music could not play. Please try again.")
    }
  }

  const { bride, groom } = weddingInfo.couple

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="none"
        onPlay={(event) => { event.currentTarget.volume = music.volume; setIsPlaying(true) }}
        onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)}
        onError={() => { setIsPlaying(false); setMusicError("Music is unavailable. Please try again later.") }} />
      <AnimatePresence>
        {isLoading ? (
          <Loader bride={bride} groom={groom} isDark={isDark} onFinish={() => setIsLoading(false)} />
        ) : (
          <div className="relative isolate overflow-x-hidden bg-[linear-gradient(180deg,rgba(249,241,224,0.98)_0%,rgba(255,252,246,1)_38%,rgba(247,235,213,0.96)_100%)] dark:bg-[linear-gradient(180deg,rgba(22,19,15,0.98)_0%,rgba(28,24,18,1)_40%,rgba(24,21,16,0.98)_100%)]">
            <BackgroundHearts />
            <span className="ornament left-[-5rem] top-[8rem] h-60 w-60 bg-blush-300" aria-hidden="true" />
            <span className="ornament bottom-[15rem] right-[-6rem] h-72 w-72 bg-gold-200" aria-hidden="true" />

            <FloatingNav
              isDark={isDark}
              onThemeToggle={onThemeToggle}
              isPlaying={isPlaying}
              onMusicToggle={onMusicToggle}
              musicError={musicError}
            />

            <MotionMain className="relative z-10 pt-12 md:pt-12" variants={animations.pageTransition} initial="hidden" animate="visible" exit="exit">
              <HeroSection
                bride={bride}
                groom={groom}
                dateLabel={weddingInfo.dateLabel}
                locationLabel={weddingInfo.locationLabel}
                heading="Celebrate Our Betrothal"
                timeLabel={weddingInfo.timeLabel}
                invitationUrl={weddingInfo.invitationUrl}
              />
              <WelcomeSection
                bride={bride}
                groom={groom}
                locationLabel={weddingInfo.locationLabel}
              />
              <FamilySection />
              <MissingDetails />
              <CountdownSection targetDate={weddingInfo.targetDate} />
              <StorySection moments={storyMoments} />
              <EventsSection events={events} />
              <GallerySection images={galleryImages} bride={bride} groom={groom} />
              <CelebrationsVibeSection images={galleryImages} bride={bride} groom={groom} />
              <RSVPSection />
              <VenueSection venues={weddingInfo.venues} />
              <DressCodeSection details={dressDetails} />
            </MotionMain>

            <FooterSection contact={weddingInfo.contact} bride={bride} groom={groom} />
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
