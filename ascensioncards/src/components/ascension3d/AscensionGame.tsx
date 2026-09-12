import { useEffect, useMemo, useState } from "react";
import { Play, Swords, X, Check, BookOpen, Lock } from "lucide-react";
import {
  FlightWorld3D,
  applyNpcDialogue,
  applyIslandUnlocks,
  ISLAND_NPCS,
  type IslandNPC,
  type PetType,
} from "./FlightWorld3D";
import { campaignState, ARC_TWO_LINE, ARC_TWO_NAME, type QuestProgress } from "@/lib/ascension/campaign";
import { artFor } from "@/lib/ascension/art";
import { BattleArena } from "./BattleArena";
import { HABIT_ISLANDS, INITIAL_CHARACTER_STATE } from "./data/worldData";
import {
  calculateTier,
  type CharacterState,
  type GearSlot,
  type GearItem,
  type HabitIsland,
  type QuestId,
  type QuestStatus,
  type TimeOfDay,
  type WorldArea,
} from "./types";
import { useAscension } from "@/lib/ascension/store";
import { areaForCard, WORLD_AREAS } from "@/lib/ascension/world";
import { effectiveStreak, isCompletedToday } from "@/lib/ascension/progress";
import { rarityFor } from "@/lib/ascension/rarity";
import type { HabitCard } from "@/lib/ascension/types";

/** island / quest id  ->  campaign domain id */
const ISLAND_TO_DOMAIN: Record<string, string> = {
  nexus: "focus",
  spirituality: "serenity",
  reflection: "reflection",
  vitality: "vitality",
  wisdom: "wisdom",
  creation: "creativity",
  kinship: "kinship",
  courage: "courage",
  abundance: "abundance",
};

/** the island light each domain wears, matched to the campaign map */
const DOMAIN_LIGHT: Record<string, string> = {
  focus: "#fbbf24",
  serenity: "#38bdf8",
  reflection: "#fb7185",
  vitality: "#34d399",
  wisdom: "#60a5fa",
  creativity: "#c084fc",
  kinship: "#fdba74",
  courage: "#f87171",
  abundance: "#bef264",
};

const gearLabels: Record<GearSlot, string> = {
  head: "head gear",
  chest: "chest armor",
  weapon: "weapon",
  accessory: "sacred relic",
  feet: "traveler boots",
};

const arenaBenefits: Record<GearSlot, string> = {
  head: "improves the protection from Stillness Guard",
  chest: "increases your resilience against incoming attacks",
  weapon: "adds damage to every offensive arena skill",
  accessory: "sharpens focus damage and defensive control",
  feet: "adds momentum to Focus Strike",
};

interface StoredProgress {
  petType: PetType;
  equipment: CharacterState["equipment"];
  gearInventory: GearItem[];
  activeTitle: string;
}

const STORAGE_KEY = "ascension-flight-progress";

function loadStored(): StoredProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredProgress) : null;
  } catch {
    return null;
  }
}

export function AscensionGame() {
  const { state, complete } = useAscension();
  const [hasStarted, setHasStarted] = useState(false);
  const [stored, setStored] = useState<StoredProgress>(() => ({
    petType: "cat",
    equipment: { ...INITIAL_CHARACTER_STATE.equipment },
    gearInventory: [...INITIAL_CHARACTER_STATE.gearInventory],
    activeTitle: INITIAL_CHARACTER_STATE.activeTitle,
  }));
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("twilight");
  const [selectedArea, setSelectedArea] = useState<{ area: WorldArea; island: HabitIsland } | null>(
    null,
  );
  const [npcChallenge, setNpcChallenge] = useState<{ npc: IslandNPC; cards: HabitCard[] } | null>(
    null,
  );
  const [isArenaOpen, setIsArenaOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [flashIsland, setFlashIsland] = useState<string | null>(null);

  useEffect(() => {
    const saved = loadStored();
    if (saved) setStored((prev) => ({ ...prev, ...saved }));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage unavailable */
    }
  }, [stored]);

  const activeCards = useMemo(() => state.cards.filter((c) => !c.archived), [state.cards]);

  /** cards belonging to an island, through the campaign domains */
  const cardsForIsland = (islandId: string): HabitCard[] => {
    const domain = ISLAND_TO_DOMAIN[islandId];
    if (!domain) return [];
    return activeCards.filter((c) => areaForCard(c).id === domain);
  };

  /** the live campaign, and the chapters each island has opened */
  const campaign = useMemo(() => campaignState(state.cards), [state.cards]);

  const islandsWithCards = useMemo(
    () =>
      HABIT_ISLANDS.map((island) => ({
        island,
        cards: cardsForIsland(island.id),
        light: DOMAIN_LIGHT[ISLAND_TO_DOMAIN[island.id] ?? ""] ?? "#fbbf24",
        progress: campaign.quests.find((q) => q.area.id === ISLAND_TO_DOMAIN[island.id]),
      })).filter((entry) => entry.cards.length > 0),
    [activeCards, campaign],
  );

  const questForIsland = (islandId: string): QuestProgress | undefined =>
    campaign.quests.find((q) => q.area.id === ISLAND_TO_DOMAIN[islandId]);

  /**
   * Campaign gating + keeper dialogue, applied during render so the world reads
   * them as it builds.
   */
  useMemo(() => {
    const unlocks: Record<string, number> = {};
    HABIT_ISLANDS.forEach((island) => {
      // campaign keys domain quests by area id, which differs from island id
      const domainId = ISLAND_TO_DOMAIN[island.id];
      const key = domainId ?? island.id;
      unlocks[island.id] = campaign.islandChapters[key] ?? 0;
    });
    unlocks['nexus'] = 5;
    applyIslandUnlocks(unlocks);


    const lines: Record<string, string[]> = {};
    ISLAND_NPCS.forEach((npc) => {
      const outer = campaign.outerIsles.find((o) => o.isle.islandId === npc.islandId);
      if (outer) {
        lines[npc.islandId] = outer.unlocked
          ? [
              `${outer.isle.name} has surfaced for you — ${outer.isle.theme}.`,
              outer.current
                ? `We stand in ${outer.current.title}. ${outer.current.body}`
                : outer.isle.prologue,
              outer.current?.scene ?? outer.isle.setting,
              `The rite here: ${outer.current?.rite ?? outer.isle.rite}`,
              outer.next
                ? `${outer.remainingToNext} more kept rites, anywhere, opens ${outer.next.title}.`
                : `Every chapter of this isle is open. ${outer.isle.epilogue}`,
            ]
          : [
              `${outer.isle.name} is still below the cloud line.`,
              `${outer.remaining} more kept rites, anywhere in the archipelago, and it surfaces.`,
              outer.isle.lore,
            ];
        return;
      }

      const arc = campaign.arcTwo.find((a) => a.isle.islandId === npc.islandId);
      if (arc) {
        lines[npc.islandId] = !arc.arcUnlocked
          ? [
              `${arc.isle.name} is not on any chart you hold.`,
              `The second chart only opens when the three outer isles are complete — the Tidewatch, the Emberfall and the Still Hollow, all five chapters each.`,
              ARC_TWO_LINE,
            ]
          : arc.unlocked
            ? [
                `${arc.isle.name} — ${arc.isle.theme}. Welcome to the second chart.`,
                arc.current
                  ? `We stand in ${arc.current.title}. ${arc.current.body}`
                  : arc.isle.prologue,
                arc.current?.scene ?? arc.isle.setting,
                `The rite here: ${arc.current?.rite ?? arc.isle.chapters[0]?.rite ?? ""}`,
                arc.next
                  ? `${arc.remainingToNext} more kept rites opens ${arc.next.title}.`
                  : `This island of the second chart is fully read. ${arc.isle.epilogue}`,
              ]
            : [
                `${arc.isle.name} is drawn on the second chart, but not yet reachable.`,
                `${arc.remaining} more kept rites and it firms up out of the cloud.`,
                arc.isle.setting,
              ];
        return;
      }

      const cards = cardsForIsland(npc.islandId);
      const progress = questForIsland(npc.islandId);
      const domainName =
        WORLD_AREAS.find((a) => a.id === ISLAND_TO_DOMAIN[npc.islandId])?.name ?? npc.islandName;
      if (cards.length === 0) {
        lines[npc.islandId] = [
          `${npc.islandName} is sealed, traveler. No rite of yours belongs to ${domainName} yet.`,
          progress
            ? `The quest here is "${progress.quest.name}". ${progress.quest.callToAction}`
            : `Forge a card for this domain and its lanterns will light for you.`,
          progress?.quest.prologue ?? "",
          `Forge one rite for ${domainName} and Chapter I opens — the island wakes with it.`,
        ].filter(Boolean);
        return;
      }
      const kept = cards.filter((c) => isCompletedToday(c));
      const open = cards.filter((c) => !isCompletedToday(c));
      const best = cards.reduce((a, b) => (effectiveStreak(b) > effectiveStreak(a) ? b : a));
      const bestStreak = effectiveStreak(best);
      const roster = cards
        .map((c) => `${c.title} (${effectiveStreak(c)} day${effectiveStreak(c) === 1 ? "" : "s"})`)
        .join(", ");
      const chapter = progress?.current;
      const next = progress?.next;
      lines[npc.islandId] = [
        `Welcome to ${npc.islandName}. This whole island was built out of ${cards
          .map((c) => `"${c.title}"`)
          .join(" and ")} — ${domainName} answers to nothing else.`,
        chapter
          ? `We stand in ${chapter.title} of "${progress?.quest.name}". ${chapter.body}`
          : `The quest here has not turned its first page.`,
        `Your ledger here reads: ${roster}.`,
        bestStreak > 0
          ? `${best.title} carries your longest thread — ${bestStreak} day${
              bestStreak === 1 ? "" : "s"
            }, a ${rarityFor(bestStreak).label} card. The banner over the shrine is its own picture; look up and you will recognise it.`
          : `Nothing is running yet, and that is fine. One kept day is the whole beginning.`,
        next
          ? `${progress?.remaining} more kept day${progress?.remaining === 1 ? "" : "s"} opens ${next.title} — and with it, ${next.boon.toLowerCase()}`
          : `Every chapter here is open. ${progress?.quest.epilogue ?? ""}`,
        open.length > 0
          ? `Today, ${open[0]?.title} is still waiting. Keep it and this shrine brightens.`
          : `Every rite of ${domainName} is kept today. Fly, rest, and return at dawn.`,
        kept.length > 0
          ? `${kept.length} kept already. The light you see over this island is your own.`
          : `The light over this island grows with each day you return.`,
      ];
    });
    applyNpcDialogue(lines);
    return unlocks;
  }, [activeCards, campaign]);

  /** the uploaded quest list, derived live from the habit cards */
  const quests: QuestStatus[] = useMemo(
    () =>
      HABIT_ISLANDS.filter((island) => island.questId).map((island) => {
        const cards = cardsForIsland(island.id);
        const streak = cards.reduce((n, c) => Math.max(n, effectiveStreak(c)), 0);
        return {
          questId: island.questId as QuestId,
          questName: island.name,
          completed: cards.length > 0 && cards.every((c) => isCompletedToday(c)),
          currentStreak: streak,
          tier: calculateTier(streak),
        };
      }),
    [activeCards],
  );

  const character: CharacterState = useMemo(() => {
    const level = Math.max(1, Math.floor(state.xp / 250) + 1);
    return {
      ...INITIAL_CHARACTER_STATE,
      level,
      xp: state.xp,
      nextLevelXp: level * 250,
      activeTitle: stored.activeTitle,
      equipment: stored.equipment,
      gearInventory: stored.gearInventory,
    };
  }, [state.xp, stored]);

  const getChallengeGear = (questId: string) => {
    const item = Object.values(character.equipment).find(
      (g): g is GearItem => !!g && g.islandOrigin === questId,
    );
    if (!item) return null;
    return { item, nextStage: item.stages[item.level] ?? null };
  };

  const ascendGear = (slot: GearSlot) => {
    setStored((current) => {
      const item = current.equipment[slot];
      if (!item) return current;
      const quest = quests.find((entry) => entry.questId === item.islandOrigin);
      const nextLevel = Math.min(item.level + 1, item.stages.length);
      if (nextLevel === item.level || !quest || quest.currentStreak < item.streakRequirementForNext)
        return current;
      const stage = item.stages[nextLevel - 1];
      if (!stage) return current;
      const upgraded: GearItem = {
        ...item,
        level: nextLevel,
        tier: stage.tier,
        name: stage.name,
        statBonus: { ...item.statBonus, amount: stage.statBoost },
        streakRequirementForNext:
          nextLevel < item.stages.length ? ([7, 30, 90][nextLevel - 1] ?? 90) : 90,
      };
      return {
        ...current,
        activeTitle: stage.title,
        equipment: { ...current.equipment, [slot]: upgraded },
        gearInventory: current.gearInventory.map((g) => (g.id === item.id ? upgraded : g)),
      };
    });
  };

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 3400);
  };

  /** keeping one specific card is what lights its island */
  const keepCard = (card: HabitCard, islandId?: string) => {
    if (isCompletedToday(card)) {
      showToast(`${card.title} is already kept today.`);
      return;
    }
    const result = complete(card.id);
    if (islandId) {
      setFlashIsland(islandId);
      window.setTimeout(() => setFlashIsland(null), 1400);
    }
    showToast(result ? `${card.title} kept · +${result.xpGained} XP` : `${card.title} kept.`);
  };

  const keepFirstOpen = (islandId: string) => {
    const cards = cardsForIsland(islandId);
    const target = cards.find((c) => !isCompletedToday(c));
    if (!target) {
      showToast(
        cards.length
          ? "Every rite of this domain is kept today. Return tomorrow."
          : "No rite of yours belongs to this domain yet — forge a card for it.",
      );
      return;
    }
    keepCard(target, islandId);
  };

  if (!hasStarted) {
    return (
      <div className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-[#060d18] p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(251,191,36,0.20), transparent 55%), radial-gradient(90% 70% at 20% 100%, rgba(56,189,248,0.18), transparent 60%), radial-gradient(80% 70% at 85% 90%, rgba(192,132,252,0.16), transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
            Ascension Archipelago
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
            Fly the world your cards restore
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">
            Nine domain sanctuaries, three outer isles that surface on their own, and a second chart
            above the cloud line. An island stays sealed and dark until its quest opens Chapter I —
            then its keepers arrive, and more appear as later chapters open.
          </p>
          <p className="mx-auto mt-2 text-xs text-muted-foreground">
            {campaign.act.name} · {campaign.chaptersOpen}/{campaign.chaptersTotal} chapters open ·{" "}
            {campaign.unlockedIslandIds.length}/
            {campaign.quests.length + campaign.outerIsles.length + campaign.arcTwo.length + 1} islands
            awake · second chart {campaign.arcTwoUnlocked ? "open" : "sealed"}
          </p>

          <div className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
            {islandsWithCards.map(({ island, cards, light, progress }) => (
              <span
                key={island.id}
                className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                style={{ borderColor: `${light}55`, color: light, background: `${light}12` }}
              >
                {island.conceptTitle} · {cards.length} rite{cards.length === 1 ? "" : "s"}
                {progress ? ` · ch ${progress.unlocked.length}/5` : ""}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setHasStarted(true)}
            className="press-pop mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-[0_0_40px_-10px] shadow-primary"
          >
            <Play className="h-4 w-4 fill-current" />
            Enter the archipelago
          </button>
          <div className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-background/40 p-4 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Choose your companion
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["cat", "dog", "turtle"] as PetType[]).map((pet) => (
                <button
                  key={pet}
                  type="button"
                  onClick={() => setStored((s) => ({ ...s, petType: pet }))}
                  className={`press-pop rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                    stored.petType === pet
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {pet}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            WASD or arrow keys to fly · F to land · G for your armory · M to mute.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate overflow-hidden rounded-2xl border border-primary/20 bg-[#07111d] shadow-[0_30px_90px_-40px] shadow-primary/50">
      <div className="relative h-[min(80vh,860px)] min-h-[520px]">
        <FlightWorld3D
          character={character}
          quests={quests}
          petType={stored.petType}
          timeOfDay={timeOfDay}
          onTimeOfDayChange={setTimeOfDay}
          onEnterArea={(area, island) => setSelectedArea({ area, island })}
          onAscendGear={ascendGear}
          onDialogueComplete={(npc) =>
            setNpcChallenge({ npc, cards: cardsForIsland(npc.islandId) })
          }
        />

        {/* cinematic grade: vignette, warm bloom veil and a fine grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 6%, rgba(255,232,196,0.12), transparent 55%), radial-gradient(100% 80% at 50% 112%, rgba(20,36,66,0.45), transparent 62%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            boxShadow: "inset 0 0 140px 40px rgba(3,7,15,0.72)",
            background:
              "radial-gradient(140% 100% at 50% 50%, transparent 55%, rgba(3,7,15,0.55) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <button
          type="button"
          onClick={() => setIsArenaOpen(true)}
          className="press-pop absolute right-3 top-16 z-40 inline-flex items-center gap-2 rounded-xl border border-rose-400/40 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-rose-200 backdrop-blur"
        >
          <Swords className="h-4 w-4" />
          Battle Arena
        </button>

        <button
          type="button"
          onClick={() => setBookOpen(true)}
          className="press-pop absolute right-3 top-28 z-40 inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-slate-950/85 px-3 py-2 text-xs font-semibold text-primary backdrop-blur"
        >
          <BookOpen className="h-4 w-4" />
          Campaign book
        </button>
      </div>

      {/* the rite rail — your cards, island by island, kept from inside the world */}
      <div className="relative z-40 border-t border-primary/15 bg-[#060d18]/95 px-3 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
            Rites of the archipelago
          </p>
          <p className="text-[11px] text-muted-foreground">
            {activeCards.filter((c) => isCompletedToday(c)).length}/{activeCards.length} kept today ·{" "}
            {state.xp} XP
          </p>
        </div>
        {islandsWithCards.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            No cards yet — forge one and its island wakes.
          </p>
        ) : (
          <div className="mt-2 flex gap-3 overflow-x-auto pb-1">
            {islandsWithCards.map(({ island, cards, light, progress }) => (
              <div
                key={island.id}
                className="min-w-[210px] shrink-0 rounded-xl border p-3 transition-shadow"
                style={{
                  borderColor: `${light}44`,
                  background: `linear-gradient(160deg, ${light}14, rgba(6,13,24,0.6))`,
                  boxShadow: flashIsland === island.id ? `0 0 30px ${light}80` : "none",
                }}
              >
                <p className="text-[11px] font-semibold" style={{ color: light }}>
                  {island.conceptTitle}
                </p>
                <p className="text-[10px] text-muted-foreground">{island.name}</p>
                {cards[0] && (
                  <div className="mt-2 overflow-hidden rounded-lg border" style={{ borderColor: `${light}33` }}>
                    <img
                      src={artFor(cards[0].art)}
                      alt={`The art of ${cards[0].title}, the rite this island is built from`}
                      loading="lazy"
                      className="h-16 w-full object-cover"
                      style={{ filter: "saturate(1.1) contrast(1.05)" }}
                    />
                  </div>
                )}
                {progress?.current && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {progress.current.title}
                    {progress.next ? ` · ${progress.remaining} to next chapter` : " · quest complete"}
                  </p>
                )}
                <ul className="mt-2 space-y-1.5">
                  {cards.map((card) => {
                    const kept = isCompletedToday(card);
                    const streak = effectiveStreak(card);
                    const tier = rarityFor(streak);
                    return (
                      <li key={card.id}>
                        <button
                          type="button"
                          onClick={() => keepCard(card, island.id)}
                          disabled={kept}
                          className={`press-pop flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs ${
                            kept
                              ? "border-transparent bg-white/5 text-muted-foreground"
                              : "border-white/10 bg-white/[0.04] text-slate-100"
                          }`}
                        >
                          <span
                            className="grid size-5 shrink-0 place-items-center rounded-full text-[10px]"
                            style={{
                              background: kept ? `${light}33` : "transparent",
                              border: `1px solid ${light}66`,
                              color: light,
                            }}
                            aria-hidden="true"
                          >
                            {kept ? <Check className="size-3" /> : tier.glyph}
                          </span>
                          <img
                            src={artFor(card.art)}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="size-6 shrink-0 rounded object-cover"
                          />
                          <span className="min-w-0 flex-1 truncate">{card.title}</span>
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            {streak}d
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedArea && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-primary/30 bg-slate-950/95 p-6 text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  {selectedArea.island.name}
                </p>
                <h3 className="mt-2 font-display text-2xl">{selectedArea.area.name}</h3>
              </div>
              <button
                type="button"
                aria-label="Close sanctuary details"
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                onClick={() => setSelectedArea(null)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{selectedArea.area.description}</p>
            <p className="mt-4 border-l-2 border-primary/60 pl-3 text-sm italic text-slate-400">
              {selectedArea.area.loreSnippet}
            </p>

            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your rites in this domain
            </p>
            <ul className="mt-2 space-y-2">
              {cardsForIsland(selectedArea.island.id).map((card) => {
                const kept = isCompletedToday(card);
                const streak = effectiveStreak(card);
                return (
                  <li
                    key={card.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{card.title}</p>
                      <p className="text-xs text-slate-400">
                        {rarityFor(streak).label} · {streak} day streak
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={kept}
                      onClick={() => keepCard(card, selectedArea.island.id)}
                      className={`press-pop shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${
                        kept
                          ? "bg-white/10 text-slate-400"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {kept ? "Kept" : "Keep"}
                    </button>
                  </li>
                );
              })}
              {cardsForIsland(selectedArea.island.id).length === 0 && (
                <li className="rounded-xl border border-white/10 p-3 text-xs text-slate-400">
                  No card of yours belongs here yet. Forge one and this shrine wakes.
                </li>
              )}
            </ul>

            <div className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                Shrine rite
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-50">
                {selectedArea.area.actionPrompt}
              </p>
            </div>
            <button
              type="button"
              className="press-pop mt-5 w-full rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300"
              onClick={() => setSelectedArea(null)}
            >
              Back to the sky
            </button>
          </div>
        </div>
      )}

      {npcChallenge && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-amber-300/40 bg-slate-950/95 p-6 text-slate-100">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Challenge from {npcChallenge.npc.name}
            </p>
            <h3 className="mt-2 font-display text-2xl">Keep a rite of this domain</h3>
            {npcChallenge.cards.length === 0 ? (
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {npcChallenge.npc.name} has nothing to ask of you yet — no card of yours belongs to
                this domain. Forge one and return.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {npcChallenge.cards.map((card) => {
                  const kept = isCompletedToday(card);
                  return (
                    <li key={card.id}>
                      <button
                        type="button"
                        disabled={kept}
                        onClick={() => {
                          keepCard(card, npcChallenge.npc.islandId);
                          setNpcChallenge(null);
                        }}
                        className={`press-pop flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left ${
                          kept
                            ? "border-white/10 bg-white/5 text-slate-400"
                            : "border-amber-300/40 bg-amber-300/10"
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{card.title}</span>
                          <span className="text-xs text-slate-400">
                            {effectiveStreak(card)} day streak
                          </span>
                        </span>
                        <span className="shrink-0 text-xs font-semibold">
                          {kept ? "Kept today" : "I kept this"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {(() => {
              const gearInfo = getChallengeGear(npcChallenge.npc.islandId);
              if (!gearInfo) return null;
              const { item, nextStage } = gearInfo;
              return (
                <div className="mt-4 rounded-xl border border-sky-300/30 bg-sky-400/10 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                    Gear progression
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    These rites upgrade your{" "}
                    <span className="font-semibold text-white">{gearLabels[item.slot]}</span> (
                    {item.name}) at a{" "}
                    <span className="font-semibold text-white">
                      {item.streakRequirementForNext}-day streak
                    </span>
                    .
                  </p>
                  {nextStage ? (
                    <p className="mt-2 text-xs leading-5 text-sky-100/80">
                      Next: {nextStage.name} ({nextStage.tier}) — {arenaBenefits[item.slot]}.
                    </p>
                  ) : (
                    <p className="mt-2 text-xs leading-5 text-sky-100/80">
                      This gear is at its final tier; streaks still strengthen your arena power.
                    </p>
                  )}
                </div>
              );
            })()}
            <button
              type="button"
              className="press-pop mt-4 w-full rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300"
              onClick={() => setNpcChallenge(null)}
            >
              Return to flight
            </button>
          </div>
        </div>
      )}

      {isArenaOpen && (
        <BattleArena
          character={character}
          quests={quests}
          cards={state.cards}
          ritesKept={campaign.ritesKept}
          onKeepRite={(cardId) => {
            const card = state.cards.find((c) => c.id === cardId);
            if (!card) return null;
            const result = complete(cardId);
            if (result) showToast(`${card.title} kept · +${result.xpGained} XP`);
            return result ? { xpGained: result.xpGained } : null;
          }}
          onAwardXP={(amount) => showToast(`Victory in the arena · +${amount} XP earned by your rites`)}
          onClose={() => setIsArenaOpen(false)}
        />
      )}

      {bookOpen && (
        <div className="absolute inset-0 z-[120] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-primary/30 bg-slate-950/95 p-5 text-slate-100">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  The campaign book
                </p>
                <h3 className="mt-1 font-display text-xl">{campaign.act.name}</h3>
              </div>
              <button
                type="button"
                aria-label="Close the campaign book"
                onClick={() => setBookOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                {campaign.chaptersOpen}/{campaign.chaptersTotal} chapters open
              </span>
              <span className="font-display text-sm text-slate-100">
                {Math.round(campaign.readingProgress * 100)}% read
              </span>
            </div>
            <div
              className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={Math.round(campaign.readingProgress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Campaign book read"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-700"
                style={{ width: `${Math.round(campaign.readingProgress * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">{campaign.act.line}</p>

            <div className="mt-4 space-y-3">
              {campaign.quests.map((q) => (
                <article key={q.area.id} className="rounded-xl border border-white/10 p-3">
                  <p className="font-display text-sm">
                    {q.quest.name}
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-slate-400">
                      {q.islandUnlocked ? "island awake" : "island sealed"} · ch{" "}
                      {q.unlocked.length}/{q.quest.chapters.length}
                    </span>
                  </p>
                  {q.unlocked.length === 0 ? (
                    <p className="mt-1 text-xs text-slate-400">{q.quest.callToAction}</p>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {q.unlocked.map((c) => (
                        <li key={c.title} className="text-xs text-slate-300">
                          <Check className="mr-1 inline size-3 text-primary" aria-hidden="true" />
                          {c.title} — {c.milestone}
                        </li>
                      ))}
                    </ul>
                  )}
                  {q.next && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      <Lock className="mr-1 inline size-3" aria-hidden="true" />
                      {q.remaining} more kept days opens {q.next.title}
                    </p>
                  )}
                </article>
              ))}

              <h4 className="pt-1 font-display text-sm text-primary">The isles beyond the nine</h4>
              {campaign.outerIsles.map((o) => (
                <article key={o.isle.islandId} className="rounded-xl border border-white/10 p-3">
                  <p className="font-display text-sm">
                    {o.isle.name}
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-slate-400">
                      {o.unlocked
                        ? `surfaced · ch ${o.chapters.length}/${o.isle.chapters.length}`
                        : `${o.remaining} rites below the cloud line`}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {o.unlocked ? (o.current?.body ?? o.isle.setting) : o.isle.lore}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">Keeper: {o.isle.keeper}</p>
                </article>
              ))}

              <h4 className="pt-1 font-display text-sm text-primary">
                {ARC_TWO_NAME} · {campaign.arcTwoUnlocked ? "open" : "sealed"}
              </h4>
              <p className="text-[11px] text-slate-400">
                {campaign.arcTwoUnlocked
                  ? ARC_TWO_LINE
                  : "Complete all three outer isles and the chart continues above the cloud line."}
              </p>
              {campaign.arcTwo.map((a) => (
                <article key={a.isle.islandId} className="rounded-xl border border-white/10 p-3">
                  <p className="font-display text-sm">
                    {a.isle.name}
                    <span className="ml-2 text-[10px] uppercase tracking-wide text-slate-400">
                      {a.unlocked
                        ? `drawn · ch ${a.chapters.length}/${a.isle.chapters.length}`
                        : a.arcUnlocked
                          ? `${a.remaining} rites away`
                          : "not on your chart"}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {a.arcUnlocked ? a.isle.setting : "Rumour only: bells with no island, a lamp that moves."}
                  </p>
                  {a.arcUnlocked && (
                    <p className="mt-1 text-[11px] text-slate-400">Keeper: {a.isle.keeper}</p>
                  )}
                </article>
              ))}
            </div>

            <button
              type="button"
              className="press-pop mt-4 w-full rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300"
              onClick={() => setBookOpen(false)}
            >
              Back to the sky
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="pointer-events-none absolute bottom-1/2 left-1/2 z-[110] -translate-x-1/2 rounded-lg border border-primary/30 bg-slate-950/90 px-4 py-2 text-center text-xs text-slate-100 backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
}
