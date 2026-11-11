// Ambient Space & Ocean Musical Soundtrack Engine (Web Audio API)
// Soulful, atmospheric cinema soundtrack with evolving warm chord progressions,
// delicate celestial piano/harp arpeggio notes, stereo echo, and gentle ocean waves
// (Zero static buzzer or harsh drone tones)

import { ThemeMode } from '../types';

interface ChordVoicing {
  bass: number;
  pad: number[];
  melodyPool: number[];
}

// Soulful, emotional cinematic chord progression: Am9 -> Fmaj9 -> Cmaj9 -> G6(add9)
const GALAXY_PROGRESSION: ChordVoicing[] = [
  {
    bass: 55.0, // A1
    pad: [110.0, 164.81, 196.0, 246.94, 261.63], // Am9
    melodyPool: [329.63, 392.0, 440.0, 493.88, 523.25, 659.25], // E4, G4, A4, B4, C5, E5
  },
  {
    bass: 43.65, // F1
    pad: [87.31, 130.81, 164.81, 196.0, 220.0], // Fmaj9
    melodyPool: [261.63, 329.63, 392.0, 440.0, 523.25, 587.33], // C4, E4, G4, A4, C5, D5
  },
  {
    bass: 65.41, // C2
    pad: [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
    melodyPool: [293.66, 329.63, 392.0, 493.88, 587.33, 659.25], // D4, E4, G4, B4, D5, E5
  },
  {
    bass: 49.0, // G1
    pad: [98.0, 146.83, 196.0, 220.0, 246.94], // G6(add9)
    melodyPool: [293.66, 392.0, 440.0, 493.88, 587.33, 783.99], // D4, G4, A4, B4, D5, G5
  },
];

// Serene underwater harmonic progression: Ebmaj9 -> Abmaj9 -> Fm9 -> Bb13
const SEA_PROGRESSION: ChordVoicing[] = [
  {
    bass: 77.78, // Eb2
    pad: [155.56, 196.0, 233.08, 293.66, 349.23],
    melodyPool: [311.13, 392.0, 466.16, 587.33, 698.46],
  },
  {
    bass: 51.91, // Ab1
    pad: [103.83, 155.56, 196.0, 233.08, 261.63],
    melodyPool: [311.13, 392.0, 466.16, 523.25, 622.25],
  },
  {
    bass: 43.65, // F1
    pad: [87.31, 130.81, 155.56, 196.0, 261.63],
    melodyPool: [261.63, 311.13, 392.0, 466.16, 523.25],
  },
  {
    bass: 58.27, // Bb1
    pad: [116.54, 174.61, 220.0, 261.63, 349.23],
    melodyPool: [293.66, 349.23, 440.0, 523.25, 587.33],
  },
];

class AmbientSpaceAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private mode: ThemeMode = 'galaxy';
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private chordTimer: number | null = null;
  private melodyTimer: number | null = null;
  private chordIndex: number = 0;
  private melodyStep: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (!this.masterGain && this.ctx) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.34, this.ctx.currentTime);

      // Warm stereo-style space echo / reverb tail for melodic notes & pads
      this.delayNode = this.ctx.createDelay(2.0);
      this.delayNode.delayTime.setValueAtTime(0.42, this.ctx.currentTime);

      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.setValueAtTime(0.36, this.ctx.currentTime);

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);

      this.delayNode.connect(delayFilter);
      delayFilter.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      this.delayNode.connect(this.masterGain);

      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setMode(newMode: ThemeMode) {
    if (this.mode === newMode) return;
    this.mode = newMode;
    if (this.isPlaying) {
      this.stopNodes();
      this.startNodes();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public isActive(): boolean {
    return this.isPlaying;
  }

  public start() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlaying) return;
    this.isPlaying = true;
    this.startNodes();
  }

  public stop() {
    this.isPlaying = false;
    this.stopNodes();
  }

  // Trigger a single breathing cinematic chord swell (7.2 seconds long with silky crossfade)
  private triggerChordSwell(voicing: ChordVoicing) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const duration = 7.4;

    // 1. Deep Warm Sub-Bass Foundation
    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(voicing.bass, now);

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.linearRampToValueAtTime(0.11, now + 2.2);
    bassGain.gain.setValueAtTime(0.11, now + 4.4);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    bassOsc.connect(bassGain);
    bassGain.connect(this.masterGain);
    bassOsc.start(now);
    bassOsc.stop(now + duration + 0.1);
    this.activeNodes.push(bassOsc, bassGain);

    // 2. Warm Lush Strings / Pad Voices (slightly detuned chorus pairs so it never sounds like a buzzer)
    voicing.pad.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const detunes = [-4.5, 4.5];
      detunes.forEach((detuneCents) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detuneCents, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, now);
        filter.frequency.exponentialRampToValueAtTime(
          620 + idx * 65,
          now + 3.2
        );
        filter.frequency.exponentialRampToValueAtTime(240, now + duration);

        const peak = idx === 0 ? 0.026 : 0.016;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(peak, now + 2.4 + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        if (this.delayNode && idx >= 2) {
          gain.connect(this.delayNode);
        }

        osc.start(now);
        osc.stop(now + duration + 0.1);
        this.activeNodes.push(osc, filter, gain);
      });
    });
  }

  // Trigger a delicate, soulful felt-piano / celestial harp note with warm echo
  private triggerMelodyNote(voicing: ChordVoicing) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    const pool = voicing.melodyPool;
    const patternIndices = [0, 2, 4, 3, 1, 5, 2, 4];
    const noteIdx =
      patternIndices[this.melodyStep % patternIndices.length] % pool.length;
    this.melodyStep++;

    const freq = pool[noteIdx];

    // Fundamental + soft octave harmonic for felt-piano / harp warmth
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.14, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1450, now);
    filter.frequency.exponentialRampToValueAtTime(380, now + 2.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.042, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(gain);

    gain.connect(this.masterGain);
    if (this.delayNode) {
      gain.connect(this.delayNode);
    }

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.6);
    osc2.stop(now + 2.6);

    this.activeNodes.push(osc1, osc2, osc2Gain, filter, gain);
  }

  private startNodes() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // If in Sea mode, add a gentle, soothing ocean wave wash layer underneath the music
    if (this.mode === 'sea') {
      const bufferSize = this.ctx.sampleRate * 4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0,
        b1 = 0,
        b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + white * 0.029;
        b1 = 0.985 * b1 + white * 0.032;
        b2 = 0.95 * b2 + white * 0.048;
        data[i] = (b0 + b1 + b2) * 0.25;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.12, now);
      lfoGain.gain.setValueAtTime(160, now);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 2.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      lfo.start(now);
      this.activeNodes.push(noise, filter, lfo, lfoGain, gain);
    }

    const progression =
      this.mode === 'sea' ? SEA_PROGRESSION : GALAXY_PROGRESSION;
    this.chordIndex = 0;
    this.melodyStep = 0;

    // Immediately play the first chord & first delicate melody note
    this.triggerChordSwell(progression[this.chordIndex]);
    this.triggerMelodyNote(progression[this.chordIndex]);

    // Cycle to the next lush chord every 5.6 seconds (overlapping the 7.4s release for seamless crossfade)
    this.chordTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      const prog = this.mode === 'sea' ? SEA_PROGRESSION : GALAXY_PROGRESSION;
      this.chordIndex = (this.chordIndex + 1) % prog.length;
      this.triggerChordSwell(prog[this.chordIndex]);
    }, 5600);

    // Play delicate celestial arpeggio / piano notes every 1.4 seconds
    this.melodyTimer = window.setInterval(() => {
      if (!this.isPlaying) return;
      const prog = this.mode === 'sea' ? SEA_PROGRESSION : GALAXY_PROGRESSION;
      const currentChord = prog[this.chordIndex % prog.length];
      this.triggerMelodyNote(currentChord);
    }, 1400);
  }

  private stopNodes() {
    if (this.chordTimer !== null) {
      window.clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    if (this.melodyTimer !== null) {
      window.clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        if (
          'stop' in node &&
          typeof (node as AudioScheduledSourceNode).stop === 'function'
        ) {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }
}

export const spaceAudio = new AmbientSpaceAudioEngine();

