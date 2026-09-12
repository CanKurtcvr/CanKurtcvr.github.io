import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Check, ChevronRight, Lock, Compass, Gift, Flame } from "lucide-react";
import { useAscension } from "@/lib/ascension/store";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { HabitCalendar } from "@/components/ascension/HabitCalendar";
import { growthLabel } from "@/lib/ascension/world";
import { campaignState, ARC_TWO_NAME, ARC_TWO_LINE } from "@/lib/ascension/campaign";
import { dailyGoals } from "@/lib/ascension/goals";
import { effectiveStreak, isCompletedToday } from "@/lib/ascension/progress";
import { rarityFor } from "@/lib/ascension/rarity";

export const Route = createFileRoute("/campaign")({
  head: () => ({
    meta: [
      { title: "The Campaign Book — Nine Domains, Five Chapters Each" },
      {
        name: "description",
        content:
          "Read the Ascension campaign: nine domain quests of five chapters, unlocked by the rites you keep, plus the isles beyond the chart.",
      },
      { property: "og:title", content: "The Campaign Book — Nine Domains, Five Chapters Each" },
      {
        property: "og:description",
        content:
          "Every rite you keep turns a page, wakes an island and brings its keepers back.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CampaignScreen,
});

function CampaignScreen() {
  const { state, ready } = useAscension();
  const [openArea, setOpenArea] = useState<string | null>("vitality");
  const [showMap, setShowMap] = useState(false);

  if (!ready)
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>
    );

  const campaign = campaignState(state.cards);
  const read = Math.round(campaign.readingProgress * 100);
  const recent = [...campaign.milestones].reverse().slice(0, 6);
  const daily = dailyGoals(state.cards);

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <main className="mx-auto max-w-md space-y-4 px-4 pt-5">
        <header>
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <BookOpen className="size-3.5" aria-hidden="true" />
            The campaign book
          </p>
          <h1 className="mt-1 font-display text-2xl text-primary">
            The Nine Domains and the Isles Beyond
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {campaign.chaptersTotal} chapters — nine domains, three outer isles and a second chart
            beyond them. Each one is written already; each one opens when the rites you keep reach
            it.
          </p>
        </header>

        <section className="rounded-md border border-primary/40 bg-primary/5 px-4 py-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-base text-primary">{campaign.act.name}</h2>
            <span className="font-display text-sm">{read}% read</span>
          </div>
          <div
            className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={read}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Campaign book read"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700"
              style={{ width: `${read}%` }}
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{campaign.act.line}</p>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-sm border border-border/70 py-1.5">
              <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Chapters</dt>
              <dd className="font-display text-sm">
                {campaign.chaptersOpen}/{campaign.chaptersTotal}
              </dd>
            </div>
            <div className="rounded-sm border border-border/70 py-1.5">
              <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Islands</dt>
              <dd className="font-display text-sm">
                {campaign.unlockedIslandIds.length}/
                {campaign.quests.length + campaign.outerIsles.length + campaign.arcTwo.length + 1}
              </dd>
            </div>
            <div className="rounded-sm border border-border/70 py-1.5">
              <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">Rites kept</dt>
              <dd className="font-display text-sm">{campaign.ritesKept}</dd>
            </div>
          </dl>
          {campaign.nextAct && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              {campaign.nextAct.at - campaign.chaptersOpen} more chapters reach{" "}
              {campaign.nextAct.name}
            </p>
          )}
        </section>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="flex items-center gap-1.5 font-display text-sm">
            <Gift className="size-4 text-primary" aria-hidden="true" />
            Today's goals and what they pay
          </h2>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {daily.keptToday}/{daily.total} kept today · {daily.xpToday} XP earned. Each goal names
            the real-world reward and the chapter it unlocks next.
          </p>
          {daily.goals.length === 0 ? (
            <p className="mt-2 text-xs text-muted-foreground">
              No rites yet. Forge one and its daily goal appears here.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {daily.goals.map((g) => (
                <li
                  key={g.card.id}
                  className={`rounded-sm border px-3 py-2 ${
                    g.keptToday ? "border-primary/40 bg-primary/5" : "border-border/70"
                  }`}
                >
                  <Link
                    to="/card/$cardId"
                    params={{ cardId: g.card.id }}
                    className="press-pop flex items-center gap-1.5 font-display text-sm"
                  >
                    {g.keptToday ? (
                      <Check className="size-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <Flame className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    )}
                    {g.card.title}
                    <span className="ml-auto text-[11px] text-muted-foreground">
                      {g.streak}-day · {g.area.name}
                    </span>
                  </Link>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    <span className="text-foreground/80">Today:</span> {g.rite}
                  </p>
                  <p className="text-[11px] text-primary/90">
                    <span className="text-foreground/80">Real reward:</span> {g.realReward}
                  </p>
                  {g.nextChapter ? (
                    <p className="text-[11px] text-muted-foreground">
                      <span className="text-foreground/80">Unlocks:</span> {g.nextChapter.title} —{" "}
                      {g.remaining} kept {g.remaining === 1 ? "day" : "days"} away · {g.nextReward}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Every chapter of {g.quest.name} is open. Keeping it now maintains the domain.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
          {daily.nearest && (
            <p className="mt-2 text-[11px] italic text-muted-foreground">
              Closest unlock: {daily.nearest.card.title} — {daily.nearest.remaining} more kept{" "}
              {daily.nearest.remaining === 1 ? "day" : "days"} opens{" "}
              {daily.nearest.nextChapter?.title}.
            </p>
          )}
        </section>

        <HabitCalendar cards={state.cards.filter((c) => !c.archived)} />

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <button
            type="button"
            onClick={() => setShowMap(!showMap)}
            className="press-pop flex w-full items-center gap-2 text-left"
          >
            <Compass className="size-4 text-primary" aria-hidden="true" />
            <h2 className="font-display text-sm">The chart of the archipelago</h2>
            <ChevronRight
              className={`ml-auto size-4 text-muted-foreground transition-transform ${showMap ? "rotate-90" : ""}`}
              aria-hidden="true"
            />
          </button>
          {showMap && (
            <div className="mt-3 space-y-3">
              {campaign.quests.map(({ area, quest, islandUnlocked }) => (
                <article key={area.id}>
                  <h3 className="font-display text-sm">
                    <span aria-hidden="true" className="text-primary">
                      {area.glyph}
                    </span>{" "}
                    {area.name} — {quest.name}
                    <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {islandUnlocked ? "awake" : "sealed"}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {quest.setting}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Keeper: {quest.keeper}
                    {quest.companions?.length ? ` · ${quest.companions.join(" · ")}` : ""}
                  </p>
                </article>
              ))}
              <h3 className="pt-1 font-display text-sm text-primary">Beyond the nine</h3>
              {campaign.outerIsles.map(({ isle, unlocked, remaining }) => (
                <article key={isle.islandId}>
                  <h4 className="font-display text-sm">
                    {isle.name}
                    <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                      {unlocked ? "surfaced" : `${remaining} rites below the cloud line`}
                    </span>
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {unlocked ? isle.setting : isle.lore}
                  </p>
                  {unlocked && (
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Keeper: {isle.keeper} · Rite: {isle.rite} · Reward: {isle.reward}
                    </p>
                  )}
                </article>
              ))}
              <p className="text-[11px] italic text-muted-foreground">
                The chart is never finished. More shapes drift up as the rites accumulate.
              </p>
              <Link to="/world" className="press-pop inline-block text-[11px] font-semibold text-primary">
                Fly the archipelago →
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="font-display text-sm">Milestones</h2>
          {recent.length === 0 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Nothing written yet. Keep one rite and the first line appears here.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recent.map((m) => (
                <li key={`${m.areaId}-${m.chapterTitle}`} className="text-xs">
                  <span className="text-primary">{m.areaName}</span> · {m.milestone}
                  <span className="block text-[11px] text-muted-foreground">Reward: {m.reward}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <ul className="space-y-3">
          {campaign.quests.map((entry) => {
            const { area, quest, stats, unlocked, locked, current, next, remaining, complete } = entry;
            const isOpen = openArea === area.id;
            return (
              <li key={area.id} className="rounded-md border border-border bg-card/50 px-4 py-3">
                <Link
                  to="/quest/$areaId"
                  params={{ areaId: area.id }}
                  className="press-pop grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-9 place-items-center rounded-sm border border-primary/30 text-primary"
                  >
                    {area.glyph}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-base">{quest.name}</h2>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {area.name} · {growthLabel(stats.growth)} ·{" "}
                      {entry.islandUnlocked ? "island awake" : "island sealed"}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </Link>

                <div
                  className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={unlocked.length}
                  aria-valuemin={0}
                  aria-valuemax={quest.chapters.length}
                  aria-label={`${quest.name} chapters open`}
                >
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-500"
                    style={{ width: `${(unlocked.length / quest.chapters.length) * 100}%` }}
                  />
                </div>

                <p className="mt-2 text-[11px] text-muted-foreground">
                  {complete
                    ? "Quest complete · every chapter open"
                    : current
                      ? `${current.title}${next ? ` · ${remaining} more to open ${next.title}` : ""}`
                      : quest.callToAction}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenArea(isOpen ? null : area.id)}
                  className="press-pop mt-2 text-[11px] font-semibold text-primary"
                >
                  {isOpen ? "Close this quest" : `Read all ${quest.chapters.length} chapters`}
                </button>

                {isOpen && (
                  <>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {quest.prologue}
                    </p>
                    <ol className="mt-2 space-y-2">
                      {quest.chapters.map((c) => {
                        const open = unlocked.includes(c);
                        return (
                          <li
                            key={c.title}
                            className={`rounded-sm border px-3 py-2 ${
                              open ? "border-primary/30 bg-primary/5" : "border-border/60 opacity-70"
                            }`}
                          >
                            <p className="flex items-center gap-1.5 font-display text-sm">
                              {open ? (
                                <Check className="size-3.5 text-primary" aria-hidden="true" />
                              ) : (
                                <Lock className="size-3.5 text-muted-foreground" aria-hidden="true" />
                              )}
                              {c.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {open ? c.body : `Sealed — opens at ${c.at} kept days in ${area.name}.`}
                            </p>
                            {open && c.scene && (
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground/90">
                                {c.scene}
                              </p>
                            )}
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              <span className="text-foreground/80">Rite:</span> {c.rite}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              <span className="text-foreground/80">Reward:</span> {c.reward}
                            </p>
                            {open && (
                              <p className="text-[11px] text-primary/90">Milestone: {c.milestone}</p>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </>
                )}

                {stats.cards.length > 0 ? (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {stats.cards.map((card) => (
                      <li key={card.id}>
                        <Link
                          to="/card/$cardId"
                          params={{ cardId: card.id }}
                          className={`press-pop inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[11px] ${
                            isCompletedToday(card)
                              ? "border-primary/50 text-primary"
                              : "border-border/70"
                          }`}
                        >
                          <span aria-hidden="true">{rarityFor(effectiveStreak(card)).glyph}</span>
                          {card.title}
                          {isCompletedToday(card) ? " · kept" : ""}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    No rites carry this quest yet — forge one and Chapter I opens.
                  </p>
                )}

                {locked.length === 0 && (
                  <p className="mt-2 text-[11px] italic text-muted-foreground">{quest.epilogue}</p>
                )}
              </li>
            );
          })}
        </ul>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="font-display text-base">The isles beyond the nine</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These belong to no domain. They surface on total rites kept anywhere, and each carries
            five chapters of its own.
          </p>
          <ul className="mt-3 space-y-3">
            {campaign.outerIsles.map((o) => (
              <li key={o.isle.islandId} className="rounded-sm border border-border/70 px-3 py-2">
                <h3 className="font-display text-sm">
                  {o.isle.name}
                  <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {o.unlocked
                      ? `surfaced · ${o.chapters.length}/${o.isle.chapters.length} chapters`
                      : `${o.remaining} rites below the cloud line`}
                  </span>
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {o.unlocked ? o.isle.prologue : o.isle.lore}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">Keeper: {o.isle.keeper}</p>
                <ol className="mt-2 space-y-2">
                  {o.isle.chapters.map((c) => {
                    const open = o.chapters.includes(c);
                    return (
                      <li
                        key={c.title}
                        className={`rounded-sm border px-3 py-2 ${
                          open ? "border-primary/30 bg-primary/5" : "border-border/60 opacity-70"
                        }`}
                      >
                        <p className="flex items-center gap-1.5 font-display text-sm">
                          {open ? (
                            <Check className="size-3.5 text-primary" aria-hidden="true" />
                          ) : (
                            <Lock className="size-3.5 text-muted-foreground" aria-hidden="true" />
                          )}
                          {c.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {open ? c.body : `Sealed — opens at ${c.at} rites kept anywhere.`}
                        </p>
                        {open && c.scene && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/90">
                            {c.scene}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          <span className="text-foreground/80">Rite:</span> {c.rite}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          <span className="text-foreground/80">Reward:</span> {c.reward}
                        </p>
                        {open && (
                          <p className="text-[11px] text-primary/90">Milestone: {c.milestone}</p>
                        )}
                      </li>
                    );
                  })}
                </ol>
                {o.complete && (
                  <p className="mt-2 text-[11px] italic text-muted-foreground">{o.isle.epilogue}</p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-md border border-border bg-card/50 px-4 py-3">
          <h2 className="font-display text-base">
            {ARC_TWO_NAME}
            <span className="ml-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              {campaign.arcTwoUnlocked ? "open" : "sealed"}
            </span>
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {campaign.arcTwoUnlocked
              ? ARC_TWO_LINE
              : "Finish all five chapters of the Tidewatch, the Emberfall and the Still Hollow, and the chart continues above the cloud line."}
          </p>
          <ul className="mt-3 space-y-3">
            {campaign.arcTwo.map((a) => (
              <li key={a.isle.islandId} className="rounded-sm border border-border/70 px-3 py-2">
                <h3 className="font-display text-sm">
                  {a.isle.name}
                  <span className="ml-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {a.unlocked
                      ? `drawn · ${a.chapters.length}/${a.isle.chapters.length} chapters`
                      : a.arcUnlocked
                        ? `${a.remaining} rites away`
                        : "not on your chart"}
                  </span>
                </h3>
                {a.arcUnlocked ? (
                  <>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {a.unlocked ? a.isle.prologue : a.isle.setting}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Keeper: {a.isle.keeper}
                    </p>
                    <ol className="mt-2 space-y-2">
                      {a.isle.chapters.map((c) => {
                        const open = a.chapters.includes(c);
                        return (
                          <li
                            key={c.title}
                            className={`rounded-sm border px-3 py-2 ${
                              open ? "border-primary/30 bg-primary/5" : "border-border/60 opacity-70"
                            }`}
                          >
                            <p className="flex items-center gap-1.5 font-display text-sm">
                              {open ? (
                                <Check className="size-3.5 text-primary" aria-hidden="true" />
                              ) : (
                                <Lock className="size-3.5 text-muted-foreground" aria-hidden="true" />
                              )}
                              {c.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {open ? c.body : `Sealed — opens at ${c.at} rites kept anywhere.`}
                            </p>
                            {open && c.scene && (
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground/90">
                                {c.scene}
                              </p>
                            )}
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              <span className="text-foreground/80">Rite:</span> {c.rite}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              <span className="text-foreground/80">Reward:</span> {c.reward}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </>
                ) : (
                  <p className="mt-1 text-xs italic leading-relaxed text-muted-foreground">
                    Rumour only: bells with no island, a lamp that moves, a ring of stone with
                    nothing inside it.
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
