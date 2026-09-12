/**
 * The arena's skill tree. Nothing here is bought — every node opens on the
 * rites you have actually kept, so the arena and the real practice stay one
 * system. Bonuses are derived, never stored, so they can never drift.
 */

export type SkillBranch = "might" | "stillness" | "craft";

export interface SkillNode {
  id: string;
  branch: SkillBranch;
  name: string;
  detail: string;
  /** total rites kept before this node opens */
  at: number;
  effect: Partial<ArenaBonuses>;
}

export interface ArenaBonuses {
  /** flat damage added to every strike */
  damage: number;
  /** extra energy each turn */
  energy: number;
  /** damage removed from a guarded strike */
  guard: number;
  /** health mended when you keep a rite in the arena */
  heal: number;
  /** multiplier on a dormant card's strike */
  dormantMult: number;
  /** multiplier when a card matches the enemy's weakness */
  weaknessMult: number;
  /** extra maximum health */
  maxHp: number;
  /** the strongest card tier your hand can reach */
  cardTier: number;
  /** the strongest gear tier the armoury will forge */
  gearTier: number;
}

const BASE: ArenaBonuses = {
  damage: 0,
  energy: 0,
  guard: 0,
  heal: 8,
  dormantMult: 0.5,
  weaknessMult: 1.4,
  maxHp: 0,
  cardTier: 1,
  gearTier: 1,
};

export const BRANCH_LABEL: Record<SkillBranch, string> = {
  might: "Might — the body that shows up",
  stillness: "Stillness — the mind that holds",
  craft: "Craft — the hand that forges",
};

export const SKILL_NODES: SkillNode[] = [
  // Might: raw striking power
  { id: "first-blow", branch: "might", name: "First Blow", at: 1, detail: "+3 damage on every strike.", effect: { damage: 3 } },
  { id: "steady-arm", branch: "might", name: "Steady Arm", at: 8, detail: "+6 damage, and cards reach Tier II.", effect: { damage: 6, cardTier: 2 } },
  { id: "found-footing", branch: "might", name: "Found Footing", at: 20, detail: "Dormant cards strike at 65% instead of 50%.", effect: { dormantMult: 0.65 } },
  { id: "breaker", branch: "might", name: "Breaker of Patterns", at: 45, detail: "Weakness strikes deal 1.6×, and cards reach Tier III.", effect: { weaknessMult: 1.6, cardTier: 3 } },
  { id: "ascendant-arm", branch: "might", name: "Ascendant Arm", at: 90, detail: "+14 damage; cards reach Tier IV.", effect: { damage: 14, cardTier: 4 } },

  // Stillness: survivability
  { id: "held-breath", branch: "stillness", name: "Held Breath", at: 4, detail: "+10 maximum health.", effect: { maxHp: 10 } },
  { id: "quiet-guard", branch: "stillness", name: "Quiet Guard", at: 14, detail: "Guarding removes 3 more damage.", effect: { guard: 3 } },
  { id: "mended-hour", branch: "stillness", name: "The Mended Hour", at: 30, detail: "Keeping a rite mends 14 health instead of 8.", effect: { heal: 14 } },
  { id: "long-calm", branch: "stillness", name: "The Long Calm", at: 60, detail: "+20 maximum health and 5 more guard.", effect: { maxHp: 20, guard: 5 } },
  { id: "unbroken", branch: "stillness", name: "Unbroken", at: 120, detail: "+30 maximum health; keeping a rite mends 22.", effect: { maxHp: 30, heal: 22 } },

  // Craft: tempo and gear
  { id: "spare-hand", branch: "craft", name: "Spare Hand", at: 6, detail: "+1 energy each turn.", effect: { energy: 1 } },
  { id: "forge-lit", branch: "craft", name: "The Forge Relit", at: 18, detail: "Gear forges to Tier II.", effect: { gearTier: 2 } },
  { id: "double-draw", branch: "craft", name: "Double Draw", at: 40, detail: "+1 energy each turn and gear reaches Tier III.", effect: { energy: 1, gearTier: 3 } },
  { id: "master-smith", branch: "craft", name: "Master Smith", at: 75, detail: "Gear reaches Tier IV; +8 damage.", effect: { gearTier: 4, damage: 8 } },
  { id: "second-chart-hand", branch: "craft", name: "Hand of the Second Chart", at: 150, detail: "+1 energy, gear Tier V, cards Tier V.", effect: { energy: 1, gearTier: 5, cardTier: 5 } },
];

export interface SkillTreeState {
  nodes: (SkillNode & { unlocked: boolean; remaining: number })[];
  bonuses: ArenaBonuses;
  unlockedCount: number;
  next: (SkillNode & { remaining: number }) | null;
}

export function arenaSkills(ritesKept: number): SkillTreeState {
  const bonuses: ArenaBonuses = { ...BASE };
  const nodes = SKILL_NODES.map((node) => {
    const unlocked = ritesKept >= node.at;
    if (unlocked) {
      for (const [key, value] of Object.entries(node.effect) as [keyof ArenaBonuses, number][]) {
        if (key === "dormantMult" || key === "weaknessMult" || key === "cardTier" || key === "gearTier") {
          bonuses[key] = Math.max(bonuses[key], value);
        } else if (key === "heal") {
          bonuses.heal = Math.max(bonuses.heal, value);
        } else {
          bonuses[key] += value;
        }
      }
    }
    return { ...node, unlocked, remaining: Math.max(0, node.at - ritesKept) };
  });
  const nextNode = nodes.find((n) => !n.unlocked) ?? null;
  return {
    nodes,
    bonuses,
    unlockedCount: nodes.filter((n) => n.unlocked).length,
    next: nextNode ? { ...nextNode, remaining: nextNode.remaining } : null,
  };
}

export const TIER_LABEL = ["—", "I", "II", "III", "IV", "V"];

/**
 * Enemies grow with your longest streak, so a two-day streak can win an
 * honest fight and a hundred-day streak still meets something worth fighting.
 */
export interface EnemyScaling {
  hpMul: number;
  attackMul: number;
  rank: string;
}

export function enemyScaling(bestStreak: number): EnemyScaling {
  const step = Math.min(4, Math.floor(bestStreak / 14));
  const rank = ["Waking form", "Roused form", "Hardened form", "Elite form", "Ascended form"][step] as string;
  return { hpMul: 1 + step * 0.45, attackMul: 1 + step * 0.22, rank };
}
