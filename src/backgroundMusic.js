// Audible autoplay may be blocked until a real click or key press.
export function startBackgroundMusic(audio, target, volume) {
  let automatic = true
  audio.volume = volume

  function stopAutomaticStart() {
    automatic = false
    target.removeEventListener("click", attempt)
    target.removeEventListener("keydown", attempt)
  }

  async function attempt(event) {
    if (!automatic || event?.target?.closest?.("[data-music-toggle]")) return
    if (event?.type === "keydown" && (event.repeat || event.ctrlKey || event.metaKey || event.altKey)) return
    try {
      await audio.play()
      stopAutomaticStart()
    } catch {
      // A blocked attempt is expected. Keep the interaction fallback available.
    }
  }

  target.addEventListener("click", attempt)
  target.addEventListener("keydown", attempt)
  void attempt()

  return {
    stopAutomaticStart,
    dispose() {
      stopAutomaticStart()
      audio.pause()
    },
  }
}
