import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAscension } from "@/lib/ascension/store";
import { ART_KEYS, artFor } from "@/lib/ascension/art";
import { haptic } from "@/lib/ascension/haptics";
import { cn } from "@/lib/utils";

export function NewCardSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { addCard } = useAscension();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [art, setArt] = useState(ART_KEYS[0] ?? "meditator");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    haptic("thud");
    addCard({
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "A habit of your own making.",
      quote: "What is repeated is what is kept.",
      author: "Ascension",
      focus: "strategy",
      art,
    });
    setTitle("");
    setDescription("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[92vw] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Forge a card</DialogTitle>
          <DialogDescription>Name the habit and choose its portrait.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="card-title" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Title
            </label>
            <input
              id="card-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Early Rising"
              className="mt-1 min-h-12 w-full rounded-md border border-input bg-background px-3 text-base placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label htmlFor="card-desc" className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              What you'll do
            </label>
            <input
              id="card-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Out of bed before six."
              className="mt-1 min-h-12 w-full rounded-md border border-input bg-background px-3 text-base placeholder:text-muted-foreground"
            />
          </div>
          <fieldset>
            <legend className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Portrait</legend>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {ART_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-label={`Use ${key} artwork`}
                  aria-pressed={art === key}
                  onPointerUp={() => setArt(key)}
                  className={cn(
                    "press-pop aspect-[3/4] overflow-hidden rounded-sm border-2",
                    art === key ? "border-primary" : "border-border/60",
                  )}
                >
                  <img src={artFor(key)} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="press-pop min-h-12 w-full rounded-md bg-primary text-sm font-semibold text-primary-foreground"
          >
            Add to collection
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
