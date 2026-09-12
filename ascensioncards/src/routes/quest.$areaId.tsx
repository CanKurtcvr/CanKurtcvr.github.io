import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { useAscension } from "@/lib/ascension/store";
import { XpHeader } from "@/components/ascension/XpHeader";
import { BottomNav } from "@/components/ascension/BottomNav";
import { campaignState } from "@/lib/ascension/campaign";
import { WORLD_AREAS } from "@/lib/ascension/world";
import { rarityFor } from "@/lib/ascension/rarity";
import { effectiveStreak } from "@/lib/ascension/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quest/$areaId")({
  loader: ({ params }) => {
    const area = WORLD_AREAS.find((a) => a.id === params.areaId);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Quest unavailable" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.area.name} Quest — Ascension`;
    const description = `Follow the ${loaderData.area.name} quest chapter by chapter as the habits you keep restore the domain.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: QuestScreen,
});

function QuestScreen() {
  const { areaId } = Route.useParams();
  const { state, ready } = useAscension();

  if (!ready)
    return (
      <div className="grid min-h-dvh place-items-center text-sm text-muted-foreground">Loading…</div>
    );

  const campaign = campaignState(state.cards);
  const entry = campaign.quests.find((q) => q.area.id === areaId);
  if (!entry) return null;
  const { area, quest, stats, unlocked, next, remaining, complete } = entry;

  return (
    <div className="min-h-dvh pb-24">
      <XpHeader xp={state.xp} freezes={state.freezes} />
      <main className="mx-auto max-w-md space-y-4 px-4 pt-5">
        <Link
          to="/campaign"
          className="press-pop inline-flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          The campaign
        </Link>

        <header>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {area.glyph} {area.name} · kept by {quest.keeper}
          </p>
          <h1 className="mt-1 font-display text-2xl text-primary">{quest.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{quest.callToAction}</p>
          {quest.prologue && (
            <p className="mt-3 rounded-md border border-border/60 bg-card/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              {quest.prologue}
            </p>
          )}
        </header>

        <p className="text-[11px] text-muted-foreground">
          {unlocked.length} of {quest.chapters.length} chapters open ·{" "}
          {stats.completions} completion{stats.completions === 1 ? "" : "s"} in this domain ·{" "}
          {entry.islandUnlocked ? "island awake in the archipelago" : "island still sealed"}
        </p>

        <ol className="space-y-3">
          {quest.chapters.map((chapter) => {
            const open = unlocked.includes(chapter);
            const isNext = next === chapter;
            return (
              <li
                key={chapter.title}
                className={cn(
                  "rounded-md border px-4 py-3",
                  open ? "border-primary/40 bg-card/60" : "border-border/60 bg-card/25",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2
                    className={cn(
                      "font-display text-base leading-tight",
                      open ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {chapter.title}
                  </h2>
                  {!open && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Lock className="size-3" aria-hidden="true" />
                      {isNext && stats.cards.length === 0
                        ? "Awaiting a rite"
                        : isNext
                          ? `${remaining} to open`
                          : `at ${chapter.at}`}
                    </span>
                  )}
                </div>
                {open ? (
                  <>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {chapter.body}
                    </p>
                    {chapter.scene && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90">
                        {chapter.scene}
                      </p>
                    )}
                    <p className="mt-2 text-[11px] text-primary">{chapter.boon}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Reward: {chapter.reward}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Milestone: {chapter.milestone}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {stats.cards.length === 0
                      ? "Sealed until a rite of this domain is forged."
                      : `Sealed until this domain reaches ${chapter.at} completion${chapter.at === 1 ? "" : "s"}.`}
                  </p>
                )}
                <p className="mt-2 text-[11px] text-muted-foreground">
                  <span className="text-foreground/80">Rite:</span> {chapter.rite}
                </p>
              </li>
            );
          })}
        </ol>

        {complete && (
          <p className="rounded-md border border-primary/40 bg-primary/5 px-4 py-3 text-sm italic leading-relaxed">
            {quest.epilogue}
          </p>
        )}

        <section>
          <h2 className="font-display text-base">Rites of this quest</h2>
          {stats.cards.length === 0 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              No rites carry this quest yet. Forge a card and the first chapter opens.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {stats.cards.map((card) => (
                <li key={card.id}>
                  <Link
                    to="/card/$cardId"
                    params={{ cardId: card.id }}
                    className="press-pop flex items-center gap-2 rounded-sm border border-border/70 px-3 py-2 text-sm"
                  >
                    <span aria-hidden="true" className="text-primary">
                      {rarityFor(effectiveStreak(card)).glyph}
                    </span>
                    <span className="truncate">{card.title}</span>
                    <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                      {card.totalCompletions} kept
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
