"""Render 'Always, With You', an original romantic piano instrumental.

Original melody and synthesized recording dedicated to CC0 1.0.
No third-party samples or recordings. Run from the repository root.
"""
from array import array
from pathlib import Path
import math
import sys
import wave

RATE = 22050
BEAT = 60 / 72  # Dotted-quarter pulse; each bar has two groups of three.
EIGHTH = BEAT / 3
BARS = 24
DURATION = BARS * 2 * BEAT + 5
samples = array('f', [0]) * int(DURATION * RATE)


def note(midi, start, length, velocity):
    frequency = 440 * 2 ** ((midi - 69) / 12)
    begin = int(start * RATE)
    # Slightly inharmonic partials and a soft hammer give the piano body.
    partials = [(1, 1, 1.25), (2.002, .24, 2.1), (3.009, .08, 3.2),
                (4.02, .025, 4.5)]
    for offset in range(min(int(length * RATE), len(samples) - begin)):
        t = offset / RATE
        attack = min(t / .014, 1)
        release = min((length - t) / .45, 1)
        tone = sum(gain * math.exp(-t * decay) * math.sin(math.tau * frequency * harmonic * t)
                   for harmonic, gain, decay in partials)
        samples[begin + offset] += velocity * attack * release * tone


# Original D-major harmony with suspended and major-seventh colors.
progression = [(50, 57, 61, 66), (47, 54, 57, 62),
               (43, 50, 57, 59), (45, 52, 57, 62),
               (42, 49, 57, 61), (43, 50, 54, 59),
               (45, 52, 55, 61), (50, 57, 61, 66)]
# Each phrase occupies six eighth notes. None quotes a reference song.
phrases = [
    [(69, 1), (73, 2), (74, 2), (78, 1)],
    [(76, 2), (74, 1), (73, 1), (71, 2)],
    [(71, 1), (74, 2), (78, 1), (76, 2)],
    [(73, 3), (69, 2), (None, 1)],
    [(73, 1), (76, 1), (78, 2), (76, 2)],
    [(74, 2), (71, 1), (69, 1), (67, 2)],
    [(69, 1), (71, 1), (73, 2), (76, 2)],
    [(74, 4), (None, 2)],
]
for bar in range(BARS):
    chord = progression[bar % 8]
    start = bar * 2 * BEAT
    # Quiet opening, a fuller middle, then a gentle closing phrase.
    intensity = .82 if bar < 8 else (1 if bar < 16 else .88)
    note(chord[0], start, 2.8, .13 * intensity)
    for step, index in enumerate([1, 2, 3, 1, 3, 2]):
        note(chord[index], start + step * EIGHTH + .012, 1.9,
             (.065 if step % 3 == 0 else .047) * intensity)
    position = 0
    for midi, count in phrases[bar % 8]:
        if midi is not None:
            note(midi, start + position * EIGHTH + .025,
                 count * EIGHTH + .65, .105 * intensity)
        position += count
# Resolve into a soft tonic and let its room tail decay before looping.
end = BARS * 2 * BEAT
for midi, velocity in [(38, .09), (57, .045), (62, .07), (66, .05), (74, .075)]:
    note(midi, end, 4.7, velocity)
for delay, gain in [(.073, .10), (.151, .075), (.263, .055), (.419, .035)]:
    shift = int(delay * RATE)
    for i in range(len(samples) - 1, shift - 1, -1):
        samples[i] += samples[i - shift] * gain
peak = max(abs(value) for value in samples)
pcm = array('h', (int(value / peak * 24000 * min(i / RATE / .8, 1)
                      * min((len(samples) - i) / RATE / 2, 1))
                  for i, value in enumerate(samples)))
if sys.byteorder != 'little':
    pcm.byteswap()
Path('public/audio').mkdir(parents=True, exist_ok=True)
with wave.open('public/audio/always-with-you.wav', 'wb') as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(RATE)
    audio.writeframes(pcm.tobytes())
print(f'Rendered Always, With You ({DURATION:.1f}s)')
