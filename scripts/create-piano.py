"""Render 'A Quiet Promise', an original, wordless piano-style instrumental.

Original composition and synthesized recording dedicated to CC0 1.0.
No third-party samples or recordings. Run from the repository root.
"""
from array import array
from pathlib import Path
import math
import sys
import wave

RATE = 22050
BEAT = 60 / 64
DURATION = 40 * BEAT + 6
samples = array('f', [0]) * int(DURATION * RATE)


def note(midi, start, length, velocity):
    frequency = 440 * 2 ** ((midi - 69) / 12)
    begin = int(start * RATE)
    for offset in range(min(int(length * RATE), len(samples) - begin)):
        t = offset / RATE
        attack = min(t / 0.009, 1)
        release = min((length - t) / 0.7, 1)
        # Soft hammer attack, fast-decaying upper harmonics and warm fundamentals.
        tone = sum(gain * math.exp(-t * decay) * math.sin(2 * math.pi * frequency * harmonic * t)
                   for harmonic, gain, decay in [(1, 1, 1.1), (2, .3, 1.8), (3, .12, 2.8), (4, .045, 4)])
        samples[begin + offset] += velocity * attack * release * tone


# Ten spacious bars: Cmaj7, Am7, Fmaj7, G, resolving gently to C.
chords = [(48, 55, 60, 64), (45, 52, 57, 60), (41, 48, 53, 57), (43, 50, 55, 59),
          (48, 55, 60, 64), (45, 52, 57, 60), (41, 48, 53, 57), (43, 50, 55, 59),
          (41, 48, 53, 57), (48, 55, 60, 64)]
melody = [(76, 2), (74, 1), (72, 1), (72, 2), (69, 2), (69, 1), (72, 1),
          (76, 2), (74, 3), (71, 1), (72, 4), (76, 2), (79, 2), (77, 2),
          (76, 2), (74, 2), (71, 2), (69, 2), (72, 2), (72, 4)]
for bar, chord in enumerate(chords):
    for beat, midi in enumerate(chord):
        note(midi, (bar * 4 + beat) * BEAT, 4.2, .12 if beat == 0 else .075)
position = 0
for midi, beats in melody:
    note(midi, position * BEAT, beats * BEAT + 1.6, .09)
    position += beats
# A restrained room tail, then fade to silence before the loop restarts.
for delay, gain in [(.13, .12), (.29, .075), (.43, .04)]:
    shift = int(delay * RATE)
    for i in range(len(samples) - 1, shift - 1, -1):
        samples[i] += samples[i - shift] * gain
peak = max(abs(value) for value in samples)
pcm = array('h', (int(value / peak * 24000 * min(i / RATE / 1.5, 1) * min((len(samples) - i) / RATE / 3, 1)) for i, value in enumerate(samples)))
if sys.byteorder != 'little':
    pcm.byteswap()
Path('public/audio').mkdir(parents=True, exist_ok=True)
with wave.open('public/audio/a-quiet-promise.wav', 'wb') as audio:
    audio.setnchannels(1)
    audio.setsampwidth(2)
    audio.setframerate(RATE)
    audio.writeframes(pcm.tobytes())
