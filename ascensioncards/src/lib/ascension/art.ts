import runner from "@/assets/card-runner.jpg";
import meditator from "@/assets/card-meditator.jpg";
import ironbound from "@/assets/card-ironbound.jpg";
import scribe from "@/assets/card-scribe.jpg";
import cartographer from "@/assets/card-cartographer.jpg";
import alchemist from "@/assets/card-alchemist.jpg";
import springbearer from "@/assets/card-springbearer.jpg";

export const CARD_ART: Record<string, string> = {
  runner,
  meditator,
  ironbound,
  scribe,
  cartographer,
  alchemist,
  springbearer,
};

export const ART_KEYS = Object.keys(CARD_ART);

export function artFor(key: string): string {
  return CARD_ART[key] ?? (CARD_ART['meditator'] as string);
}
