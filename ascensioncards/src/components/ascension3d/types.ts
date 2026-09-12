export type RarityTier = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type QuestId =
  | 'spirituality'
  | 'reflection'
  | 'vitality'
  | 'wisdom'
  | 'creation'
  | 'kinship'
  | 'courage'
  | 'abundance'
  | 'salah'
  | 'scholar'
  | 'athlete'
  | 'creator'
  | 'alchemist';

export interface QuestDefinition {
  id: QuestId;
  name: string;
  subTitle: string;
  coreDiscipline: string;
  description: string;
  temporalWindow?: string;
  iconName: string;
}

export interface QuestStatus {
  questId: QuestId;
  questName: string;
  completed: boolean;
  currentStreak: number;
  tier: RarityTier;
  previousStreak?: number;
}

export interface AscensionLog {
  id: string;
  dayNumber: number;
  date: string;
  score: number; // 0 - 100
  completionCount: number; // 0 - 5
  quests: QuestStatus[];
  formattedOutput: string;
  reflection: string;
  rawInput?: string;
}

export interface ProductionScene {
  timestamp: string;
  visualAction: string;
  audioScript: string;
  onScreenText: string;
}

export interface FacelessScript {
  id: string;
  title: string;
  concept: string;
  duration: string; // e.g. "34s"
  visualHook: string;
  body: string;
  spiritualAnchor: string;
  resolution: string;
  scenes: ProductionScene[];
  cinematographyNotes: string[];
  bRollChecklist: string[];
  createdAt: string;
}

export interface SpiritualTimeAnchor {
  id: 'dawn' | 'midday' | 'afternoon' | 'sunset' | 'night';
  name: string;
  time: string;
  windowDescription: string;
  spiritualTheme: string;
  scheduledRoutine: string;
  focusSymbol?: string;
}

export type PrayerTimeAnchor = SpiritualTimeAnchor;

export interface GuideMessage {
  id: string;
  sender: 'user' | 'guide';
  content: string;
  timestamp: string;
}

export function calculateTier(streak: number): RarityTier {
  if (streak >= 90) return 'Legendary';
  if (streak >= 30) return 'Epic';
  if (streak >= 7) return 'Rare';
  return 'Common';
}

export function getTierColor(tier: RarityTier): { text: string; bg: string; border: string; glow: string } {
  switch (tier) {
    case 'Legendary':
      return {
        text: 'text-amber-300',
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/40',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]',
      };
    case 'Epic':
      return {
        text: 'text-purple-300',
        bg: 'bg-purple-950/40',
        border: 'border-purple-500/40',
        glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
      };
    case 'Rare':
      return {
        text: 'text-sky-300',
        bg: 'bg-sky-950/40',
        border: 'border-sky-500/40',
        glow: 'shadow-[0_0_15px_rgba(14,165,233,0.2)]',
      };
    case 'Common':
    default:
      return {
        text: 'text-zinc-400',
        bg: 'bg-zinc-800/40',
        border: 'border-zinc-700/50',
        glow: '',
      };
  }
}

export const QUEST_DEFINITIONS: QuestDefinition[] = [
  {
    id: 'spirituality',
    name: 'Sanctuary of the Soul',
    subTitle: 'Meditation, Breathwork & Sacred Silence',
    coreDiscipline: 'Inner Serenity & Spiritual Restoration',
    description: 'Nourish your inner sanctuary through daily mindfulness meditation, quiet contemplation, diaphragmatic breathwork, or moments of profound gratitude.',
    temporalWindow: 'Morning or Evening Stillness',
    iconName: 'Compass',
  },
  {
    id: 'reflection',
    name: 'Chamber of Reflection',
    subTitle: 'Self-Audit & Mindful Renewal',
    coreDiscipline: 'Mental Clarity & Letting Go',
    description: 'Evening self-accounting and offline reflection. Reconcile friction, release burdens without guilt, and cultivate a tranquil mind.',
    temporalWindow: 'Evening Contemplation',
    iconName: 'Feather',
  },
  {
    id: 'vitality',
    name: 'Citadel of Vitality',
    subTitle: 'Physical Health & Energy',
    coreDiscipline: 'Movement, Strength & Pure Nutrition',
    description: 'Intentional physical training (calisthenics, strength, endurance) paired with hydration and nourishing nutrition.',
    temporalWindow: 'Daily Movement Block',
    iconName: 'Dumbbell',
  },
  {
    id: 'wisdom',
    name: 'Archive of Wisdom',
    subTitle: 'Deep Study & Focus',
    coreDiscipline: 'Intellectual Growth & Reading',
    description: '30+ minutes of undistracted reading, philosophical contemplation, or high-leverage skill development without phone interruptions.',
    temporalWindow: 'Deep Focus Window',
    iconName: 'BookOpen',
  },
  {
    id: 'creation',
    name: 'Atelier of Creation',
    subTitle: 'Authentic Storytelling & Craft',
    coreDiscipline: 'Creative Expression & Production',
    description: 'Drafting evocative scripts, capturing cinematic B-roll, or honing your craft to share value with the world without vanity.',
    temporalWindow: 'Creative Flow State',
    iconName: 'Video',
  },
];

// Open World & Gamification Types
export type IslandId =
  | 'nexus'
  | 'spirituality'
  | 'reflection'
  | 'vitality'
  | 'wisdom'
  | 'creation'
  | 'kinship'
  | 'courage'
  | 'abundance'
  | 'tidewatch'
  | 'emberfall'
  | 'stillhollow'
  | 'wanderlight'
  | 'saltgate'
  | 'zenith'
  | 'salah'
  | 'scholar'
  | 'athlete'
  | 'creator'
  | 'alchemist';

export type TimeOfDay = 'dawn' | 'midday' | 'golden_hour' | 'twilight' | 'starlight';

export type GearSlot = 'head' | 'chest' | 'weapon' | 'accessory' | 'feet';

export interface GearUpgradeStage {
  tier: RarityTier;
  name: string;
  title: string;
  statBoost: number;
  visualGlow: string;
  lore: string;
}

export interface GearItem {
  id: string;
  slot: GearSlot;
  name: string;
  tier: RarityTier;
  level: number; // 1 (Common), 2 (Rare), 3 (Epic), 4 (Legendary)
  description: string;
  lore: string;
  islandOrigin: IslandId;
  statBonus: {
    statName: 'Serenity' | 'Vitality' | 'Wisdom' | 'Focus' | 'Creativity';
    amount: number;
  };
  icon: string;
  visualColor: string;
  streakRequirementForNext: number;
  unlocked: boolean;
  stages: GearUpgradeStage[];
}

export interface CharacterEquipment {
  head: GearItem | null;
  chest: GearItem | null;
  weapon: GearItem | null;
  accessory: GearItem | null;
  feet: GearItem | null;
}

export interface LocationPicture {
  title: string;
  theme: string;
  accentColor: string;
  atmosphere: string;
  scenicDescription: string;
  imageUrl?: string;
  visualTag: string;
}

export interface WorldArea {
  id: string;
  islandId: IslandId;
  name: string;
  subtitle: string;
  description: string;
  x: number; // World coordinate x
  y: number; // World coordinate y
  icon: string;
  questActionType:
    | 'soul_restoration'
    | 'reflection_chamber'
    | 'vitality_training'
    | 'wisdom_study'
    | 'creative_studio'
    | 'nexus_hub'
    | 'salah_anchor'
    | 'scholar_study'
    | 'athlete_workout'
    | 'creator_studio'
    | 'alchemist_accounting';
  actionPrompt: string;
  loreSnippet: string;
  locationPicture: LocationPicture;
  rewardGearSlot?: GearSlot;
  completedToday?: boolean;
}

export interface HabitIsland {
  id: IslandId;
  name: string;
  conceptTitle: string;
  title: string;
  themeColor: string;
  glowColor: string;
  accentHex: string;
  bgHex: string;
  description: string;
  x: number;
  y: number;
  radius: number;
  areas: WorldArea[];
  questId?: QuestId;
  unlockedTitle: string;
  gearDropSlot: GearSlot;
  defaultGearPiece: {
    id: string;
    name: string;
    slot: GearSlot;
    description: string;
  };
}

export interface CharacterItem {
  id: string;
  name: string;
  type: 'relic' | 'talisman' | 'scroll' | 'cloak';
  description: string;
  rarity: RarityTier;
  icon: string;
  unlockedAtStreak: number;
  islandOrigin: IslandId;
}

export interface CharacterState {
  name: string;
  archetype: 'Wayfarer' | 'Seeker' | 'Philosopher' | 'Creator' | 'Ascetic';
  level: number;
  xp: number;
  nextLevelXp: number;
  energy: number; // 0 - 100
  unlockedTitles: string[];
  activeTitle: string;
  equipment: CharacterEquipment;
  gearInventory: GearItem[];
  relics: CharacterItem[];
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  speed: number;
  currentIsland: IslandId;
  currentAreaId?: string;
  travelHistory: string[];
}


