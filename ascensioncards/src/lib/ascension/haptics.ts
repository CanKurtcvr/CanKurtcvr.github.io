type Signature = "tick" | "thud" | "ascend";

const PATTERNS: Record<Signature, number | number[]> = {
  tick: 12,
  thud: [28, 40, 60],
  ascend: [10, 40, 18, 40, 30],
};

/** Vibration API where supported; a silent no-op everywhere else. */
export function haptic(signature: Signature) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(PATTERNS[signature]);
  } catch {
    /* ignore */
  }
}
