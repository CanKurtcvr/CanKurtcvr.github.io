/**
 * Tiny WebAudio synthesiser: every sound is generated, so no audio files ship.
 * All calls are safe before init() and on the server (no-ops).
 */
class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted = false;

  /** ambient pad */
  private musicNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private windGain: GainNode | null = null;
  private windSource: AudioBufferSourceNode | null = null;

  init(): void {
    if (typeof window === "undefined" || this.ctx) return;
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    try {
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.35;
      this.master.connect(this.ctx.destination);
    } catch {
      this.ctx = null;
    }
  }

  private resume(): void {
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  private ready(): boolean {
    if (!this.ctx || !this.master) return false;
    this.resume();
    return true;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.35, this.ctx.currentTime, 0.05);
    }
    return this.muted;
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = "sine",
    peak = 0.25,
    freqTo?: number,
  ): void {
    if (!this.ready() || !this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freqTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqTo), now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain).connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  private noise(duration: number, peak = 0.15, filterHz = 900): void {
    if (!this.ready() || !this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const frames = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterHz;
    const gain = this.ctx.createGain();
    gain.gain.value = peak;
    src.connect(filter).connect(gain).connect(this.master);
    src.start(now);
  }

  playChime(freq = 660): void {
    this.tone(freq, 0.6, "sine", 0.22);
    this.tone(freq * 1.5, 0.9, "sine", 0.1);
  }

  playItemObtain(): void {
    [523, 659, 784, 1047].forEach((f, i) => {
      window.setTimeout(() => this.tone(f, 0.35, "triangle", 0.18), i * 70);
    });
  }

  playDialogueLetter(): void {
    this.tone(1200 + Math.random() * 200, 0.045, "square", 0.035);
  }

  playDialogueAdvance(): void {
    this.tone(520, 0.12, "triangle", 0.12, 780);
  }

  playSpeedBoost(): void {
    this.tone(180, 0.5, "sawtooth", 0.14, 900);
    this.noise(0.4, 0.1, 1600);
  }

  playWingWhoosh(): void {
    this.noise(0.55, 0.16, 500);
  }

  /** 0..1 flight speed drives the wind bed */
  setFlightSpeed(normalized: number): void {
    if (!this.ready() || !this.ctx || !this.master) return;
    const value = Math.max(0, Math.min(1, normalized));
    if (!this.windGain) {
      const frames = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 700;
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      src.connect(filter).connect(gain).connect(this.master);
      src.start();
      this.windSource = src;
      this.windGain = gain;
    }
    this.windGain.gain.setTargetAtTime(value * 0.12, this.ctx.currentTime, 0.2);
  }

  startMusic(): void {
    this.init();
    if (!this.ready() || !this.ctx || !this.master || this.musicNodes.length) return;
    const now = this.ctx.currentTime;
    // slow open fifth pad, deliberately unobtrusive
    [110, 164.81, 220, 329.63].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05 / (i + 1) + 0.01, now + 4);
      const lfo = this.ctx!.createOscillator();
      const lfoGain = this.ctx!.createGain();
      lfo.frequency.value = 0.05 + i * 0.02;
      lfoGain.gain.value = 0.015;
      lfo.connect(lfoGain).connect(gain.gain);
      lfo.start(now);
      osc.connect(gain).connect(this.master!);
      osc.start(now);
      this.musicNodes.push({ osc, gain });
    });
  }

  stopMusic(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const { osc, gain } of this.musicNodes) {
      gain.gain.setTargetAtTime(0.0001, now, 0.5);
      try {
        osc.stop(now + 2);
      } catch {
        /* already stopped */
      }
    }
    this.musicNodes = [];
    if (this.windSource) {
      try {
        this.windSource.stop(now + 0.5);
      } catch {
        /* already stopped */
      }
      this.windSource = null;
      this.windGain = null;
    }
  }
}

export const soundSynth = new SoundSynthesizer();
