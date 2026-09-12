// @ts-nocheck -- vendored game code, kept as authored
import { useMemo, useState } from 'react';
import { Flame, HeartPulse, Lock, Shield, Sparkles, Swords, TreePine, X, Zap } from 'lucide-react';
import { CharacterState, QuestStatus } from './types';
import type { HabitCard } from '@/lib/ascension/types';
import { effectiveStreak, isCompletedToday } from '@/lib/ascension/progress';
import { rarityFor } from '@/lib/ascension/rarity';
import { artFor } from '@/lib/ascension/art';
import { arenaSkills, enemyScaling, BRANCH_LABEL, TIER_LABEL, type SkillBranch } from '@/lib/ascension/skills';

interface BattleArenaProps {
  character: CharacterState;
  quests: QuestStatus[];
  cards: HabitCard[];
  /** total rites kept, which opens the skill tree */
  ritesKept: number;
  /** keeps the rite for real: returns xp gained, or null if already kept */
  onKeepRite: (cardId: string) => { xpGained: number } | null;
  onAwardXP: (amount: number) => void;
  onClose: () => void;
}

interface Boss {
  id: string;
  name: string;
  trait: string;
  description: string;
  color: string;
  attack: number;
  hp: number;
  weakness: HabitCard['focus'];
  weaknessLine: string;
}

const bosses: Boss[] = [
  {
    id: 'procrastination',
    name: 'The Delay',
    trait: 'Procrastination',
    description: 'Turns every important step into a promise for tomorrow.',
    color: '#f59e0b',
    attack: 8,
    hp: 70,
    weakness: 'body',
    weaknessLine: 'Movement breaks it. Body rites hit hardest.',
  },
  {
    id: 'distraction',
    name: 'The Scattermind',
    trait: 'Distraction',
    description: 'Fills every quiet moment with noise and unfinished tabs.',
    color: '#38bdf8',
    attack: 10,
    hp: 85,
    weakness: 'mind',
    weaknessLine: 'Stillness breaks it. Mind rites hit hardest.',
  },
  {
    id: 'doubt',
    name: 'The Inner Critic',
    trait: 'Self-Doubt',
    description: 'Whispers that imperfect action is not worth attempting.',
    color: '#c084fc',
    attack: 11,
    hp: 100,
    weakness: 'strategy',
    weaknessLine: 'A written plan breaks it. Strategy rites hit hardest.',
  },
  {
    id: 'excess',
    name: 'The Overindulgence',
    trait: 'Overindulgence',
    description: 'Offers comfort now and quietly charges interest later.',
    color: '#fb7185',
    attack: 12,
    hp: 115,
    weakness: 'body',
    weaknessLine: 'Discipline of the body breaks it.',
  },
  {
    id: 'avoidance',
    name: 'The Fog',
    trait: 'Avoidance',
    description: 'Makes the next honest conversation feel impossibly far away.',
    color: '#94a3b8',
    attack: 9,
    hp: 130,
    weakness: 'mind',
    weaknessLine: 'Clear attention burns it off.',
  },
];

const BASE_ENERGY = 3;

const focusLabel: Record<HabitCard['focus'], string> = {
  body: 'Body',
  mind: 'Mind',
  strategy: 'Strategy',
};

/**
 * Diminishing returns: a two-day streak already lands a real blow, and a
 * hundred-day streak is strong without making the arena a formality — the
 * enemies grow alongside it.
 */
function cardPower(card: HabitCard, cardTier: number): number {
  const streak = effectiveStreak(card);
  const tier = rarityFor(card.longestStreak);
  const tierBonus = { common: 0, rare: 3, epic: 6, legendary: 10, ascended: 14 }[tier.id] ?? 0;
  const curve = Math.min(46, Math.round(9 * Math.sqrt(streak)));
  return Math.round((9 + curve + tierBonus) * (1 + (cardTier - 1) * 0.12));
}

export function BattleArena({ character, quests, cards, ritesKept, onKeepRite, onAwardXP, onClose }: BattleArenaProps) {
  const deck = useMemo(() => cards.filter((c) => !c.archived), [cards]);
  const bestStreak = useMemo(() => deck.reduce((n, c) => Math.max(n, c.longestStreak), 0), [deck]);
  const tree = useMemo(() => arenaSkills(ritesKept), [ritesKept]);
  const scale = useMemo(() => enemyScaling(bestStreak), [bestStreak]);
  const bonuses = tree.bonuses;

  const scaled = useMemo(
    () =>
      bosses.map((b) => ({
        ...b,
        hp: Math.round(b.hp * scale.hpMul),
        attack: Math.round(b.attack * scale.attackMul),
      })),
    [scale],
  );

  const [selectedBossId, setSelectedBossId] = useState(scaled[0].id);
  const boss = scaled.find((item) => item.id === selectedBossId) ?? scaled[0];

  const equipped = character.equipment;
  const gearPower = Object.values(equipped).reduce(
    (total, item) => total + (item?.level ?? 0) + Math.floor((item?.statBonus.amount ?? 0) / 10),
    0,
  );
  const gearDamageBonus = Math.min(18, Math.floor(gearPower / 2)) + bonuses.damage;
  const guardReduction = Math.min(4, Math.floor(gearPower / 5)) + bonuses.guard;
  const averageStreak = quests.length
    ? Math.round(quests.reduce((total, quest) => total + quest.currentStreak, 0) / quests.length)
    : 0;
  const momentum = Math.min(10, Math.floor(averageStreak / 4));
  const energyPerTurn = BASE_ENERGY + bonuses.energy;
  const maxHp = 100 + bonuses.maxHp;

  const [playerHp, setPlayerHp] = useState(maxHp);
  const [bossHp, setBossHp] = useState(boss.hp);
  const [energy, setEnergy] = useState(energyPerTurn);
  const [spent, setSpent] = useState<string[]>([]);
  const [guarding, setGuarding] = useState(false);
  const [turn, setTurn] = useState(1);
  const [showTree, setShowTree] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([
    'Your cards are your moves. A rite kept today strikes at full force.',
  ]);
  const [result, setResult] = useState<'won' | 'lost' | null>(null);
  const [surge, setSurge] = useState<string | null>(null);

  const log = (line: string) => setBattleLog((current) => [line, ...current].slice(0, 5));

  const resetBattle = (nextBossId = selectedBossId) => {
    const next = scaled.find((b) => b.id === nextBossId) ?? boss;
    setSelectedBossId(nextBossId);
    setPlayerHp(maxHp);
    setBossHp(next.hp);
    setEnergy(energyPerTurn);
    setSpent([]);
    setGuarding(false);
    setTurn(1);
    setResult(null);
    setSurge(null);
    setBattleLog([`${next.name} (${scale.rank}) steps forward. ${next.weaknessLine}`]);
  };

  const bossTurn = (hpAfterStrike: number, guardActive: boolean) => {
    if (hpAfterStrike <= 0) return;
    const incoming = guardActive
      ? Math.max(1, Math.ceil(boss.attack / 2) - guardReduction)
      : boss.attack + Math.floor(turn / 4);
    const nextPlayerHp = Math.max(0, playerHp - incoming);
    setPlayerHp(nextPlayerHp);
    setGuarding(false);
    setEnergy(energyPerTurn);
    setTurn((t) => t + 1);
    log(`${boss.name} strikes for ${incoming}.`);
    if (nextPlayerHp === 0) setResult('lost');
  };

  const damageFor = (card: HabitCard, kept: boolean) => {
    const base = cardPower(card, bonuses.cardTier);
    const weak = card.focus === boss.weakness ? bonuses.weaknessMult : 1;
    const keptMult = kept ? 1.35 : bonuses.dormantMult;
    return Math.max(1, Math.round((base + momentum + gearDamageBonus) * weak * keptMult));
  };

  const strike = (card: HabitCard, kept: boolean, freeAction = false) => {
    const damage = damageFor(card, kept);
    const weak = card.focus === boss.weakness;
    const nextBossHp = Math.max(0, bossHp - damage);
    setBossHp(nextBossHp);
    setSpent((current) => [...current, card.id]);
    log(
      `${card.title} hits for ${damage}${weak ? ' (weakness)' : ''}${kept ? ' — kept today' : ' — dormant'}.`,
    );
    if (nextBossHp === 0) {
      setResult('won');
      onAwardXP(30 + Math.round(boss.hp / 6));
      return;
    }
    if (freeAction) return;
    const nextEnergy = energy - 1;
    setEnergy(nextEnergy);
    if (nextEnergy <= 0) bossTurn(nextBossHp, guarding);
  };

  const playCard = (card: HabitCard) => {
    if (result || energy <= 0 || spent.includes(card.id)) return;
    strike(card, isCompletedToday(card));
  };

  const keepAndStrike = (card: HabitCard) => {
    if (result || spent.includes(card.id)) return;
    const outcome = onKeepRite(card.id);
    if (!outcome) return;
    setSurge(card.id);
    log(`You kept "${card.title}" for real. It ignites: +${outcome.xpGained} XP.`);
    // keeping a rite for real is a free action — it never costs a turn
    strike(card, true, true);
    setPlayerHp((hp) => Math.min(maxHp, hp + bonuses.heal));
  };

  const guard = () => {
    if (result || energy <= 0) return;
    setGuarding(true);
    log('Stillness Guard is up. The next strike lands softened.');
    const nextEnergy = energy - 1;
    setEnergy(nextEnergy);
    if (nextEnergy <= 0) bossTurn(bossHp, true);
  };

  const keptCount = deck.filter((c) => isCompletedToday(c)).length;
  const branches: SkillBranch[] = ['might', 'stillness', 'craft'];

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-[#070d15]/95 p-4 text-slate-100 backdrop-blur-sm sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">The Inner Arena</p>
            <h2 className="mt-2 text-3xl font-semibold">Fight with the rites you keep</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Every habit card is a move. A two-day streak already lands a real blow; a long streak
              meets a stronger form of the same habit, so the fight stays a fight.
              {' '}Cards Tier {TIER_LABEL[bonuses.cardTier]} · gear Tier {TIER_LABEL[bonuses.gearTier]} ·
              {' '}+{gearDamageBonus} damage · {guardReduction} guard · {momentum} momentum · {maxHp} health.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Close battle arena">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Choose a boss</p>
            <div className="space-y-2">
              {scaled.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => resetBattle(item.id)}
                  className={`w-full rounded-xl border p-3 text-left transition ${item.id === boss.id ? 'border-amber-300/70 bg-amber-400/10' : 'border-slate-700 hover:border-slate-500'}`}
                >
                  <span className="block font-semibold" style={{ color: item.color }}>{item.name}</span>
                  <span className="text-xs text-slate-400">{item.trait} · weak to {focusLabel[item.weakness]}</span>
                  <span className="mt-0.5 block text-[11px] text-slate-500">{item.hp} HP · {item.attack} attack</span>
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-slate-800 bg-black/30 p-3 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">{keptCount}/{deck.length} rites kept today</p>
              <p className="mt-1">Enemies appear in their {scale.rank.toLowerCase()} — matched to your best streak of {bestStreak} days.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowTree(!showTree)}
              className="press-pop mt-3 flex w-full items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200"
            >
              <TreePine className="h-3.5 w-3.5" />
              Skill tree · {tree.unlockedCount}/{tree.nodes.length}
            </button>
            {tree.next && (
              <p className="mt-1 px-1 text-[11px] text-slate-500">
                {tree.next.remaining} more rites open {tree.next.name}.
              </p>
            )}
          </aside>

          <main className="rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-4 sm:p-6">
            {showTree ? (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">The tree of kept rites</h3>
                  <button
                    type="button"
                    onClick={() => setShowTree(false)}
                    className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300"
                  >
                    Back to the fight
                  </button>
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  {ritesKept} rites kept. Nothing is bought here — every branch opens on the days you
                  actually keep, and it strengthens your cards and gear permanently.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {branches.map((branch) => (
                    <div key={branch} className="rounded-xl border border-slate-700 bg-black/20 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {BRANCH_LABEL[branch]}
                      </p>
                      <ul className="mt-2 space-y-2">
                        {tree.nodes
                          .filter((n) => n.branch === branch)
                          .map((node) => (
                            <li
                              key={node.id}
                              className={`rounded-lg border px-3 py-2 ${node.unlocked ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-slate-800 opacity-70'}`}
                            >
                              <p className="flex items-center gap-1.5 text-sm font-semibold">
                                {node.unlocked ? (
                                  <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                                ) : (
                                  <Lock className="h-3.5 w-3.5 text-slate-500" />
                                )}
                                {node.name}
                              </p>
                              <p className="mt-0.5 text-[11px] text-slate-400">{node.detail}</p>
                              <p className="text-[11px] text-slate-500">
                                {node.unlocked ? `Open · ${node.at} rites` : `Sealed · ${node.remaining} more rites`}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border p-5" style={{ borderColor: `${boss.color}66`, background: `linear-gradient(135deg, ${boss.color}18, transparent)` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em]" style={{ color: boss.color }}>{boss.trait} · {scale.rank}</p>
                      <h3 className="mt-1 text-2xl font-semibold">{boss.name}</h3>
                      <p className="mt-2 max-w-xl text-sm text-slate-400">{boss.description}</p>
                      <p className="mt-1 text-xs" style={{ color: boss.color }}>{boss.weaknessLine}</p>
                    </div>
                    <div className="rounded-full border border-slate-600 p-3">
                      <Swords className="h-6 w-6" style={{ color: boss.color }} />
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <HealthBar label="You" value={playerHp} max={maxHp} color="#34d399" />
                    <HealthBar label={boss.name} value={bossHp} max={boss.hp} color={boss.color} />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-slate-600 px-3 py-1">Turn {turn}</span>
                    <span className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-amber-200">
                      <Zap className="h-3 w-3" /> {energy}/{energyPerTurn} energy
                    </span>
                    {guarding && (
                      <span className="flex items-center gap-1 rounded-full border border-sky-300/40 bg-sky-400/10 px-3 py-1 text-sky-200">
                        <Shield className="h-3 w-3" /> guarding
                      </span>
                    )}
                  </div>
                </div>

                {result ? (
                  <div className="mt-5 rounded-xl border border-amber-300/40 bg-amber-300/10 p-5 text-center">
                    <h3 className="text-xl font-semibold">{result === 'won' ? `${boss.trait} yields.` : 'The habit pushed back.'}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {result === 'won'
                        ? 'The rites you kept today did the work. Keep them tomorrow and it stays down.'
                        : 'A setback is information, not identity. Keep one rite for real and try again — it costs no turn.'}
                    </p>
                    <button type="button" onClick={() => resetBattle()} className="mt-4 rounded-lg bg-amber-300 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-200">Fight again</button>
                  </div>
                ) : deck.length === 0 ? (
                  <p className="mt-5 rounded-xl border border-slate-700 p-4 text-sm text-slate-400">
                    You have no habit cards yet. Add one and it becomes a move in this arena.
                  </p>
                ) : (
                  <>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Your hand</p>
                      <button
                        type="button"
                        onClick={guard}
                        disabled={energy <= 0}
                        className="press-pop flex items-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-200 disabled:opacity-40"
                      >
                        <Shield className="h-3.5 w-3.5" /> Stillness Guard
                      </button>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {deck.map((card) => {
                        const kept = isCompletedToday(card);
                        const used = spent.includes(card.id);
                        const tier = rarityFor(card.longestStreak);
                        const weak = card.focus === boss.weakness;
                        const shown = damageFor(card, kept);
                        return (
                          <div
                            key={card.id}
                            className={`overflow-hidden rounded-xl border transition ${used ? 'border-slate-800 opacity-40' : kept ? 'border-emerald-300/50 bg-emerald-400/5' : 'border-slate-700 bg-slate-900/60'}`}
                          >
                            <div className="flex gap-3 p-3">
                              <img
                                src={artFor(card.art)}
                                alt=""
                                className="size-16 shrink-0 rounded-lg object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-100">{card.title}</p>
                                <p className="mt-0.5 text-[11px] text-slate-400">
                                  {tier.glyph} {tier.label} · {focusLabel[card.focus]} · {effectiveStreak(card)}-day streak
                                </p>
                                <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-200">
                                  <Flame className="h-3 w-3" /> {shown} damage {weak && <span className="text-amber-300">· weakness</span>}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2 border-t border-white/5 p-2">
                              <button
                                type="button"
                                onClick={() => playCard(card)}
                                disabled={used || energy <= 0}
                                className="press-pop flex-1 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 disabled:opacity-40"
                              >
                                {used ? 'Spent' : kept ? 'Strike (charged)' : 'Strike (dormant)'}
                              </button>
                              {!kept && (
                                <button
                                  type="button"
                                  onClick={() => keepAndStrike(card)}
                                  disabled={used}
                                  className="press-pop flex-1 rounded-lg bg-emerald-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-emerald-300 disabled:opacity-40"
                                >
                                  <span className="flex items-center justify-center gap-1">
                                    <HeartPulse className="h-3.5 w-3.5" /> I kept this — ignite
                                  </span>
                                </button>
                              )}
                            </div>
                            {surge === card.id && (
                              <p className="flex items-center gap-1 bg-emerald-400/10 px-3 py-1.5 text-[11px] text-emerald-200">
                                <Sparkles className="h-3 w-3" /> Ignited: full force, free action, +{bonuses.heal} health, streak grown.
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="mt-5 rounded-xl border border-slate-800 bg-black/20 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Battle log</p>
                  <div className="space-y-1 text-sm text-slate-400">{battleLog.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}</div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function HealthBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400"><span>{label}</span><span>{value}/{max}</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full transition-all" style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
