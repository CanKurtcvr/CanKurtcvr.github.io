import type { HabitCard } from "./types";
import { areaStats, WORLD_AREAS, type AreaStats, type WorldArea } from "./world";

export interface Chapter {
  /** completions within the domain needed to open this chapter */
  at: number;
  title: string;
  /** the narrative beat, written in second person */
  body: string;
  /** the practice the chapter asks of you, in the real world */
  rite: string;
  /** what the domain gives back once the chapter is open */
  boon: string;
  /** the tangible reward carried out of the chapter */
  reward: string;
  /** the milestone line remembered in the quest log */
  milestone: string;
  /** optional longer scene, for fully written quests */
  scene?: string;
}

export interface Quest {
  areaId: string;
  /** the quest's name, shown as the arc title */
  name: string;
  /** who or what calls you into this domain */
  callToAction: string;
  /** the long opening of the quest */
  prologue: string;
  /** the island's setting, for the campaign world map */
  setting: string;
  /** the keeper who holds this domain */
  keeper: string;
  /** the other keepers who arrive as chapters open */
  companions?: string[];
  chapters: Chapter[];
  /** the closing beat once every chapter is open */
  epilogue: string;
}

const THRESHOLDS = [0, 5, 14, 30, 60] as const;

/** Nine-domain arc. Each quest is five beats: call, threshold, trial, turn, return. */
export const QUESTS: Quest[] = [
  {
    areaId: "vitality",
    name: "The Roads That Climb",
    keeper: "Captain Rayan, Paragon of the Switchbacks",
    callToAction:
      "The mountain roads above the training grounds have gone quiet. Someone has to walk them again.",
    companions: ["Wayfarer Hana, who returns at Chapter III"],
    setting:
      "A green mountain sheared off the sea and hung in the sky: nine switchbacks of pale stone, terraces stepped into the slope like a staircase for giants, and a ridge beacon of blackened rock at the top. The air is bright and thin, the wind smells of cut grass and wet stone, and every path is wide enough for one walker at a time.",
    prologue:
      "Vitality was the first domain to fall, and it fell politely. No siege, no fire — only a season where nobody walked the roads, then another, until the terraces forgot they were terraces and the ridge beacon went out for want of somebody climbing to it. Captain Rayan stayed. He sweeps the lower gate each morning for a traveller who has not come in years. Today the gate is unbarred, the dust is undisturbed, and he is watching you decide whether to step through. He will not hurry you. He knows the mountain does that job by itself.",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · The First Gate",
        body: "You find the lower gate unbarred and the dust undisturbed. Nothing here asks you to be strong yet — only present.",
        scene:
          "Rayan hands you a waterskin without a speech. 'The road is nine turns to the first terrace,' he says. 'People fail it by starting at turn four.' You start at turn one. It is unimpressive and it counts.",
        rite: "Keep one body rite once. Any size. The gate only checks that you came.",
        boon: "The gate stays open for you.",
        reward: "Traveller's waterskin · Rayan learns your name",
        milestone: "You walked through the lower gate.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · Breath in Thin Air",
        body: "The road steepens. Your body complains and then, quietly, adjusts. The terraces below look smaller than they did.",
        scene:
          "Halfway up, the air thins enough to notice. Rayan calls it the honest altitude — the height where enthusiasm ends and the practice begins. Below you, one terrace has gone faintly green, and nobody planted it but the walking.",
        rite: "Five days kept in this domain, in any order. Missed days are allowed; abandoned roads are not.",
        boon: "The terraces begin to green again.",
        reward: "Ironwill training vest (Common → Rare path opens)",
        milestone: "You climbed past the honest altitude.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Long Switchbacks",
        body: "Days blur into a rhythm. You stop counting the turns and start noticing the view between them.",
        scene:
          "This is the stretch nobody writes songs about. The same turn, fourteen times, each one slightly higher. Somewhere in here a second figure appears on the road — Hana, the wayfarer who came back because the beacon started flickering again. She walks with you and says almost nothing, which is the highest compliment the mountain gives.",
        rite: "Fourteen kept days. The rhythm matters more than any single climb.",
        boon: "Wayfarers return to the road.",
        reward: "Hana joins the road · a second keeper on the island",
        milestone: "The switchbacks became a rhythm instead of a fight.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · Where the Wind Turns",
        body: "Near the ridge the wind changes direction and, for the first time, it is at your back. Strength stopped being a performance a while ago.",
        scene:
          "The ridge beacon is a stone bowl full of old ash. You are the one who lights it, and it takes three tries, and nobody records the first two. From up here the whole archipelago is visible: eight other domains, most of them still dark, all of them reachable by roads exactly like this one.",
        rite: "Thirty kept days. Enough that a bad week can no longer erase the shape of it.",
        boon: "The ridge beacon is lit.",
        reward: "Bulwark of Vitality · title: Ironwill",
        milestone: "You lit the ridge beacon yourself.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · The Summit Road",
        body: "You arrive without ceremony. The road is walked; that is the whole of it. Tomorrow you will walk it anyway.",
        scene:
          "At the summit there is no monument, only a bench and a view and Rayan, arriving an hour behind you because he stopped to fix a step. 'This is the part they misunderstand,' he says. 'You don't get to stop. You get to stop dreading it.' You sit. The mountain is yours in the only sense that matters: you keep it.",
        rite: "Sixty kept days. The road is now yours to maintain.",
        boon: "Vitality is restored.",
        reward: "Aegis of the Ascendant · title: The Ascendant",
        milestone: "Vitality restored — the first domain of nine.",
      },
    ],
    epilogue: "The roads that climb are open, and they stay open because you keep them.",
  },
  {
    areaId: "serenity",
    name: "The Water That Remembers",
    keeper: "Sister Zahra, Guardian of Stillness",
    callToAction: "The still gardens have clouded over. The water has forgotten how to hold the sky.",
    companions: ["Acolyte Wren, who arrives at Chapter III"],
    setting:
      "A low white island of stepped pools, each one a shallow mirror rimmed in pale marble. Colonnades run between them, hung with stone lanterns; hedges grow in unhurried squares; a bell tower stands sealed at the far end. Nothing on this island moves quickly. Even the waterfalls at its edge fall as mist rather than water.",
    prologue:
      "Serenity did not break — it clouded. The gardens were built so that still water could hold the whole sky, and stillness is the one thing that cannot be kept by force. When the visitors grew hurried, the pools took on silt, then algae, then a grey skin that reflected nothing at all. Sister Zahra sweeps the same six flagstones every morning, not because they are dirty but because it is the only rite left that the island still recognises. She hears you before she sees you and does not turn around. 'Sit first,' she says. 'The water has to decide you are not weather.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · Silt and Silence",
        body: "You sit at the edge of a grey pool. Nothing clears at once. You stay a moment longer than is comfortable.",
        scene:
          "Zahra sets a single dark stone upright at the pool's rim. 'One,' she says. 'There were nine hundred.' The water does not clear, but the silt stops swirling, which is the first thing stillness ever does.",
        rite: "Sit once with a calm rite — breath, prayer, stillness. Once is a beginning.",
        boon: "One stone is set straight.",
        reward: "Circlet of Quiet",
        milestone: "You sat at the grey pool without leaving early.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · The First Reflection",
        body: "A shape appears on the surface — a cloud, maybe your own face. The garden is beginning to pay attention.",
        scene:
          "You notice the reflection before you notice the change: a single cloud, whole, upside down in water that was opaque a week ago. Zahra lights the near colonnade one lantern at a time, as though anything faster would frighten it.",
        rite: "Five kept days of stillness.",
        boon: "The near pool clears.",
        reward: "Veil of Stillness · the near colonnade relights",
        milestone: "The near pool cleared enough to hold a cloud.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · Rain Without Ripple",
        body: "It rains, and the water takes it without breaking. You understand this is what calm actually looks like: absorbing, not avoiding.",
        scene:
          "The storm arrives at midday and you stay seated through it. Somewhere behind the hedges a young acolyte named Wren is doing the same thing badly, flinching at every gust, and staying — which is how everyone here starts. Afterwards the pools are fuller and just as clear.",
        rite: "Fourteen kept days, including at least one difficult one.",
        boon: "The stone lanterns relight.",
        reward: "Zahra's rain-glass · Wren keeps the far pools",
        milestone: "You stayed still through weather.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · The Quiet Bell",
        body: "A bell rings somewhere behind the hedges and you notice you are no longer braced against sound.",
        scene:
          "The tower unseals itself the way old doors do — one hinge at a time, over days. Zahra rings the bell once, watches you not startle, and says the only compliment she has: 'Good. The garden can be loud again.'",
        rite: "Thirty kept days. Calm has stopped being an emergency measure.",
        boon: "The bell tower is unsealed.",
        reward: "Crown of Sacred Silence · title: Warden of Silence",
        milestone: "The bell rang and you did not flinch.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Holding the Sky",
        body: "Every pool holds the sky whole. The garden does not need you now — which is exactly why you return.",
        scene:
          "From the tower steps the island reads as one long mirror, sky above and sky below, and you in the seam between them. Zahra has gone to sweep her six flagstones. They were never dirty. They were a promise that somebody was still here.",
        rite: "Sixty kept days. The garden keeps itself between your visits.",
        boon: "Serenity is restored.",
        reward: "Halo of the Unshaken · title: The Unshaken",
        milestone: "Serenity restored — the water holds the whole sky.",
      },
    ],
    epilogue: "The water remembers, and it remembers you as someone who came back gently.",
  },
  {
    areaId: "reflection",
    name: "The Lantern Halls",
    keeper: "Hermit Tariq, Warden of the Hearth of Release",
    callToAction:
      "In the halls of lanterns every flame has gone out. They are lit by attention, not by fire.",
    companions: ["Scribe Odile, who copies the true version, from Chapter III"],
    setting:
      "A rose-lit warren of stone corridors sunk into a single tilted crag, roofed over with dark glass. Thousands of paper lanterns hang at head height on wires; a hearth of grey embers burns at the centre; the walls are covered in the handwriting of everyone who ever stopped to be honest here. The deepest hall holds a mirror that shows effort instead of outcome.",
    prologue:
      "Reflection is the domain nobody flees — they simply stop entering. Its lanterns are not lit by fire but by attention, and attention was the first thing the world ran short of. Hermit Tariq keeps the hearth of release: a bowl of embers where visitors used to name a thing they were carrying and set it down. He has not heard a name spoken aloud in years, so he has taken to reading the walls instead, other people's honesty, over and over. When you step into the dark corridor he does not offer you a light. 'Your eyes will do it,' he says. 'They always do, if you stand still in the dark long enough to let them.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · Dark Corridor",
        body: "You walk in without a light and let your eyes adjust. Honesty starts as discomfort.",
        scene:
          "Ten paces in, the darkness becomes shapes, and the shapes become handwriting. One lantern above you catches without being touched. Tariq, somewhere behind: 'That one is yours. Don't guard it. Just come back.'",
        rite: "One honest look at your day, written down or spoken plainly.",
        boon: "One lantern catches.",
        reward: "Reflecting stone",
        milestone: "You entered the dark corridor without a light.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · What You Actually Did",
        body: "The walls carry your own words back to you, unedited. You read them without flinching, mostly.",
        scene:
          "The east corridor lights as you read a week of your own sentences, none of them flattering, all of them accurate. Tariq marks nothing down. 'The hall keeps the record,' he says. 'My job is only to keep you from improving it.'",
        rite: "Five reviews kept. Accuracy over flattery.",
        boon: "The east corridor brightens.",
        reward: "Lantern relic · the east corridor opens",
        milestone: "You read your own week back without editing it.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Kind Mirror",
        body: "A mirror here shows effort instead of outcome. It is a harder thing to look at, and a truer one.",
        scene:
          "The mirror hall opens on a hinge that has not moved in a decade. In the glass you are unfinished and trying, which is worse to look at than failure and truer than either. A scribe named Odile begins copying the true version onto the wall beside you, in a hand steadier than yours.",
        rite: "Fourteen reviews. Count effort, not results.",
        boon: "The mirror hall opens.",
        reward: "Mirror of Renewal · Odile keeps the record",
        milestone: "You looked in the kind mirror and stayed.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · Naming the Weight",
        body: "You set something down that you had been carrying without naming it. The hall feels wider afterwards.",
        scene:
          "At the hearth of release you say a true sentence out loud for the first time in this domain. The embers take it without drama. Tariq exhales like a man who has been holding a door open for years and can finally let it swing.",
        rite: "Thirty reviews, and one thing named out loud and released.",
        boon: "The inner sanctum unlocks.",
        reward: "Heart of Clear Water · title: The Renewed",
        milestone: "You named the weight and set it down.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Lantern Keeper",
        body: "The halls are lit end to end. You have become the person who tends them, which was always the quest.",
        scene:
          "Every corridor burns low and warm, and Tariq hands you the long brass wick-trimmer without comment, the way a man hands over a job rather than a trophy. You start at the far end, where the light is thinnest.",
        rite: "Sixty reviews. The lanterns are your charge now.",
        boon: "Reflection is restored.",
        reward: "Title: Lantern Keeper",
        milestone: "Reflection restored — the halls are lit end to end.",
      },
    ],
    epilogue:
      "The lanterns burn low and steady, the way attention does when it stops being a performance.",
  },
  {
    areaId: "wisdom",
    name: "The Patient Archive",
    keeper: "Archivist Idris, Master of the Deep Scriptorium",
    callToAction: "The long archive has been closed so long the catalogue itself is lost.",
    companions: ["Apprentice Bo, who shelves badly and often, from Chapter III"],
    setting:
      "A blue-lit citadel of shelves built into a stepped island, deeper than it is wide. Aisles run down into the rock, lamps hang on chains at every landing, and a brass astrolabe the size of a cart sits stalled in the upper gallery. Dust falls upward here, caught in the island's own draught, so the air glitters faintly over every open book.",
    prologue:
      "Wisdom was not burned or looted. It was closed for a season, and nobody wrote down where the catalogue went. Without the catalogue the archive is only a very large amount of paper, and Archivist Idris has spent years rebuilding it one shelf at a time, from memory, out loud, to nobody. He is not lonely — he is behind. When you take the first book off the unread shelf he does not tell you which one to pick. 'Any page,' he says. 'The archive has no opinion about speed. Only about returning.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · The Unread Shelf",
        body: "You open one book to one page. The archive does not care how fast you go.",
        scene:
          "The lamp above your table lights when the spine cracks — some old arrangement between the island and anyone reading. Idris writes one line in a new catalogue: the shelf, the page, the date. The first entry in years.",
        rite: "Study, read, or learn once — one page is a page.",
        boon: "The reading lamp is lit.",
        reward: "Reader's boots",
        milestone: "One lamp lit over one open page.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · Margins",
        body: "You start writing in the margins. Knowledge becomes yours only when you argue with it.",
        scene:
          "Your first margin note is 'no — not always.' Idris reads it over your shoulder and looks genuinely delighted. 'There,' he says. 'Now it's a conversation. Aisle one can reopen.'",
        rite: "Five sessions kept, each leaving a mark in the margin.",
        boon: "The first aisle is catalogued.",
        reward: "Wanderer's treads · the first aisle reopens",
        milestone: "You began arguing with the books.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Cross-Reference",
        body: "Two unrelated shelves speak to each other and something clicks into place that you cannot unlearn.",
        scene:
          "A treatise on tides and a book of bread recipes turn out to be the same book about patience. The astrolabe turns one notch, all by itself. An apprentice called Bo appears to reshelve behind you, badly, cheerfully, which is how apprentices are supposed to arrive.",
        rite: "Fourteen sessions. Long enough for ideas to find each other.",
        boon: "The upper gallery opens.",
        reward: "Boots of the Archive · Bo joins the aisles",
        milestone: "Two shelves finally spoke to each other.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · The Missing Volume",
        body: "You find the gap in the catalogue — the book nobody wrote. It is the one you are living.",
        scene:
          "The gap is real: a slot the width of a hand, in an aisle that indexes practices nobody kept long enough to describe. Idris hands you a blank volume and a pen and leaves the room, which is the most generous thing he knows how to do.",
        rite: "Thirty sessions, and one idea recorded in your own words.",
        boon: "A blank volume is shelved in your name.",
        reward: "Striders of the Long Study · title: Archivist",
        milestone: "A volume shelved under your own name.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Keeper of the Catalogue",
        body: "The archive is ordered. Not finished — ordered. There is a difference and you now prefer it.",
        scene:
          "The catalogue is current as of this morning and will be out of date by evening, and Idris explains that this is what a living archive feels like. He gives you the key to the deep scriptorium, then keeps reading, because there is always one more aisle.",
        rite: "Sixty sessions. The catalogue is yours to keep current.",
        boon: "Wisdom is restored.",
        reward: "Title: The Long Study",
        milestone: "Wisdom restored — the catalogue is current.",
      },
    ],
    epilogue: "Shelf after patient shelf, and your name in the catalogue among them.",
  },
  {
    areaId: "creativity",
    name: "The Unfinished Workshops",
    keeper: "Artisan Layla, Architect of Quiet Making",
    callToAction: "The open workshops are full of half-made things and no one left to finish them.",
    companions: ["The apprentices at the benches, from Chapter III"],
    setting:
      "A violet island of open-sided workshops under long tiled roofs, connected by ramps and washing lines of drying paper. Every bench holds something half-made; the tool walls have empty pegs in the shape of tools; a display hall at the summit stands with its shutters closed. When a forge lights, coloured smoke drifts off the island's edge and hangs in the sky like a signal.",
    prologue:
      "Creativity fell the strangest way of all: not by ruin, but by taste. The makers grew too good to be bad at anything, and since everything begins badly, they began nothing. Artisan Layla kept the last unfinished thing on the island — a chair with three legs, on purpose — and refuses to complete it until someone else makes something worse. The workshops still stand open on every side. There were never any doors to lock. 'Make me a bad one,' she says, before you have said hello. 'That's the toll.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · Cold Forge",
        body: "You light a fire in one workshop and make something bad on purpose. The building exhales.",
        scene:
          "What you make is lopsided and slightly wrong and finished within the hour. Layla turns it over twice, sets it on the empty shelf of first attempts, and lights the forge beside you. 'There,' she says. 'The island's breathing.'",
        rite: "Make one thing, badly, once.",
        boon: "One forge burns again.",
        reward: "Apprentice quill",
        milestone: "One forge lit with one deliberately bad attempt.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · The Ugly Draft",
        body: "A second attempt, worse in places, better in one. That one place is the whole point.",
        scene:
          "You want to hide the second one. Layla nails it to the wall at eye height. 'Keep the ugly drafts where you have to walk past them,' she says. 'That's a tool wall too.' Real tools begin reappearing on the empty pegs.",
        rite: "Five making sessions. Keep the ugly ones.",
        boon: "The tool wall refills.",
        reward: "Chisel of Making · the tool wall refills",
        milestone: "You kept the ugly draft instead of hiding it.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · Hands That Know",
        body: "Your hands begin moving before you decide to. The work stops needing inspiration to start.",
        scene:
          "One morning you are working before you notice you decided to. Coloured smoke goes up off the island, and by afternoon three apprentices have flown in to see who is making things again. They take the far benches and start badly, loudly, which is the correct way.",
        rite: "Fourteen sessions. Start before you feel ready.",
        boon: "Apprentices arrive.",
        reward: "Apprentices at the benches",
        milestone: "Your hands started before your mood did.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · Finishing Something",
        body: "You finish one thing all the way. It is smaller than you imagined and it is real, which imagination never is.",
        scene:
          "The display hall shutters come down and the first thing inside is yours — modest, complete, unmistakably a real object. Layla finally puts a fourth leg on her chair and sits in it, testing whether the island will allow such a thing. It does.",
        rite: "Thirty sessions, and one thing finished completely.",
        boon: "The display hall opens.",
        reward: "Brand of the Atelier · title: Master of the Atelier",
        milestone: "You finished one thing all the way.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · The Open Doors",
        body: "The workshops run without ceremony, half-finished and alive — the way you like them.",
        scene:
          "Every roof has smoke over it and every bench has something mid-make. Nobody is waiting for inspiration; they are waiting for glue to dry. Layla finds you at the shelf of first attempts, still keeping the bad one. 'Good,' she says. 'That's the whole museum.'",
        rite: "Sixty sessions. The doors no longer need locking.",
        boon: "Creativity is restored.",
        reward: "Instrument of Creation · title: The Creator",
        milestone: "Creativity restored — the doors stay open.",
      },
    ],
    epilogue: "The doors stay open. Something is always mid-make, and that is the health of the place.",
  },
  {
    areaId: "focus",
    name: "The Map Rooms at Dusk",
    keeper: "Sage Elyon, Grand Arbiter of the Crossroads",
    callToAction:
      "In the map rooms, tomorrow is drawn each evening. The tables have sat blank for years.",
    companions: ["Runner Tem, who carries the inked route, from Chapter III"],
    setting:
      "The amber crossroads at the heart of the archipelago: a broad island of lantern-lit halls where every wall is a map and every table is for drawing tomorrow. Roads of packed gold stone radiate outward to the flight platforms. A great weather glass hangs cracked above the main table, and the light here is always the last hour of the day.",
    prologue:
      "Focus is not a distant domain — it is the crossroads everyone passes through, which is why its collapse went unnoticed longest. The map rooms exist for one purpose: each dusk, someone draws tomorrow. When nobody drew, the roads stayed usable and led nowhere in particular, and travellers wandered the archipelago for years without arriving. Sage Elyon has kept the largest table clean and blank ever since, refusing to draw another person's day for them. He greets you with a stick of charcoal instead of a hand. 'One line,' he says. 'Not the whole map. One.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · The Blank Table",
        body: "You draw one line for tomorrow. One. The room accepts it as a beginning.",
        scene:
          "The line is short and slightly crooked. Elyon sets a lit candle at its end, which is the map rooms' oldest gesture: a plan is a place someone intends to be.",
        rite: "Choose one priority for tomorrow, once.",
        boon: "A candle is set on the table.",
        reward: "Wayfarer's candle",
        milestone: "One line drawn on a blank table.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · Fewer Roads",
        body: "You erase more than you draw and the map becomes readable. Focus is mostly subtraction.",
        scene:
          "Elyon hands you the eraser stone before the charcoal, every evening, until you understand the order. By the fifth dusk the table shows four roads instead of forty, and for the first time it is possible to read.",
        rite: "Five plans kept. Erase more than you add.",
        boon: "The clutter is cleared.",
        reward: "Elyon's eraser stone",
        milestone: "You erased more than you drew.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Chosen Route",
        body: "One route is inked in. The others stay possible, but they stop shouting.",
        scene:
          "Ink is a commitment charcoal never was. When the line dries, the compass in the floor swings and settles, and a runner named Tem arrives to carry the day's route out to the platforms — a job that has had no work in it for years.",
        rite: "Fourteen plans. One route inked at a time.",
        boon: "The compass is recalibrated.",
        reward: "Recalibrated compass · Tem runs the roads",
        milestone: "One route inked while the rest went quiet.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · Weather on the Map",
        body: "A plan survives contact with a bad day. You redraw instead of abandoning.",
        scene:
          "The day breaks the plan by noon. You come back at dusk and redraw it rather than declaring the table cursed, and the crack in the great weather glass seals itself with a sound like a held breath released.",
        rite: "Thirty plans, including one redrawn after it broke.",
        boon: "The weather glass is repaired.",
        reward: "Repaired weather glass · title: Wayfinder",
        milestone: "A plan survived a bad day by being redrawn.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Cartographer at Dusk",
        body: "Each dusk the map gets drawn. Not perfectly. Reliably, which turned out to matter more.",
        scene:
          "The halls are full of lantern light and people leaning over tables, and Elyon has finally stopped guarding the big one. 'You misunderstand the crossroads,' he tells you, pleased. 'It was never about choosing well. It was about choosing at all, every dusk, out loud.'",
        rite: "Sixty plans. Dusk belongs to the table now.",
        boon: "Focus is restored.",
        reward: "Title: Cartographer at Dusk",
        milestone: "Focus restored — the map is drawn every dusk.",
      },
    ],
    epilogue: "Dusk after dusk, the map is drawn, and the roads all lead somewhere you chose.",
  },
  {
    areaId: "kinship",
    name: "The Hearth Bridges",
    keeper: "Ferrywoman Noor, Warden of the Long Bridges",
    callToAction:
      "The rope bridges between the islands have frayed. Nobody crosses, so nobody repairs them.",
    companions: ["Old Bram, who crosses towards you at Chapter III"],
    setting:
      "Not one island but four small ones, strung together by rope bridges over open sky, each anchored by a stone hearth that burns orange day and night. Signal lanterns hang at every post; the planking is patched in a dozen different woods by a dozen different hands. Wind moves constantly here, and the bridges answer it with a sound like breathing.",
    prologue:
      "Kinship failed by arithmetic. A bridge needs two ends and two people willing to be at them, and when one side stopped crossing, the other stopped repairing, and the ropes did the rest quietly over several winters. Ferrywoman Noor kept her hearth burning on the far anchor the entire time — a light nobody was coming towards, tended anyway. She has coiled rope enough for every span in the domain and cannot throw a single one alone. 'Take the end,' she calls across the gap, as if you had been expected all week. 'I've had the other end for years.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · One Rope Across",
        body: "You throw a single rope to the far post. It is not a bridge yet. It is a message that one is coming.",
        scene:
          "The throw goes badly twice, then catches. Noor makes it fast and hangs a signal lantern on it, so that in the dark the gap now reads as a place somebody intends to cross.",
        rite: "Reach out to one person once.",
        boon: "One rope holds.",
        reward: "Noor's signal lantern",
        milestone: "One rope thrown across the gap.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · The Small Crossing",
        body: "The first plank goes down and holds your weight. Contact is unglamorous engineering.",
        scene:
          "Five planks, five days, no ceremony. Noor tests each one with her own weight before she lets you on it, which is her way of saying something she would never say aloud.",
        rite: "Five kept days of reaching out.",
        boon: "The near bridge is walkable.",
        reward: "Bridge-walker's gloves",
        milestone: "The near bridge held your weight.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · Two-Way Traffic",
        body: "Someone crosses towards you without being asked. That is the moment a bridge becomes a road.",
        scene:
          "Halfway through the fortnight an old man called Bram walks out of the mist from the far anchor, carrying bread and complaining about the wind, having seen the lanterns lit from his island. Noor lights the hearth on the span. Two ends, both occupied: the domain's whole doctrine, in one afternoon.",
        rite: "Fourteen kept days. Let the traffic go both ways.",
        boon: "The hearth on the span is lit.",
        reward: "Hearthstone of the Span · Bram keeps the far anchor",
        milestone: "Someone crossed towards you unasked.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · Weathering the Gap",
        body: "A storm takes half the planking and you rebuild it in the rain, unimpressively, with company.",
        scene:
          "The storm is loud and the repair is boring: three of you on your knees in the wet, replacing boards by lantern light. Nobody says the bridge nearly went. Everybody knows which planks are new.",
        rite: "Thirty kept days, including one repair after a silence.",
        boon: "The bridge survives weather.",
        reward: "Storm-tested cordage · title: Bridgewright",
        milestone: "You rebuilt a bridge after it broke.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · The Bridges Hold",
        body: "All the spans hold. People cross them without thinking about you, which is the finest thing a builder gets.",
        scene:
          "You stand at the middle hearth and watch strangers cross in both directions, unaware that these ropes were once a single throw. Noor hands you a coil to carry. There is always another gap somewhere.",
        rite: "Sixty kept days. The bridges are maintained, not finished.",
        boon: "Kinship is restored.",
        reward: "Title: Keeper of the Bridges",
        milestone: "Kinship restored — every span holds.",
      },
    ],
    epilogue: "The bridges hold, and the archipelago stops being a scatter of lonely rocks.",
  },
  {
    areaId: "courage",
    name: "The Doorway of Small Fears",
    keeper: "Knight Sable, Watcher at the Threshold",
    callToAction:
      "A single black doorway stands on a bare rock. Everyone who ever avoided something left it here.",
    companions: ["Squire Ode, who guards the corridor from Chapter III"],
    setting:
      "A bare red-black rock with nothing on it but doorways: one tall black arch at the centre, then a corridor of progressively smaller ones running to the cliff edge. No walls, no roof — the doors stand alone, so you can always see there is nothing behind them. Wind comes straight through. At night the arches edge themselves in dull red light.",
    prologue:
      "Courage is the youngest domain and the only one built on purpose. Every traveller who ever avoided something small left it here, and the leavings accreted into architecture: a door for each thing undone, the largest at the front. Knight Sable was posted to guard the threshold and long ago realised her job is the opposite — she is here to point out that the doors are only doors, and that they grow when nobody walks through them. She does not draw her sword when you arrive. 'Don't cross yet,' she says. 'Stand near it. You'll see how ordinary it is from here.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · Standing at the Door",
        body: "You do not go through. You stand close enough to feel how ordinary it is up close.",
        scene:
          "Close up, the great black arch is chipped, and slightly smaller than it looked from the landing. Sable presses a plain iron token into your palm. 'It stops growing today,' she says. 'That's all standing near it does, and it's most of the work.'",
        rite: "Do one small thing you have been avoiding.",
        boon: "The doorway stops growing.",
        reward: "Sable's plain token",
        milestone: "You stood at the door instead of turning around.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · The First Threshold",
        body: "You step through and nothing legendary happens. The disappointment is the lesson.",
        scene:
          "You cross. There is no flash, no trumpet, no monster — just the same rock on the other side and wind in your ears. Sable watches your face fall and grins for the first time. 'Yes,' she says. 'That's the secret. Write it down.'",
        rite: "Five brave-small days.",
        boon: "The first arch opens.",
        reward: "Threshold band",
        milestone: "You crossed and nothing terrible happened.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Corridor of Doors",
        body: "Beyond the first door is a corridor of smaller ones. You realise fear was mostly architecture.",
        scene:
          "Two weeks in, the corridor lights along its length, each arch shorter than the last, and a squire called Ode takes up post at the far end — sent by nobody, arrived because the lights came on. Sable hands you her second sword, the plain one, the one she actually uses.",
        rite: "Fourteen days of doing the uncomfortable thing.",
        boon: "The corridor lights.",
        reward: "Sable's second sword · Ode holds the corridor",
        milestone: "Fear turned out to be mostly architecture.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · The Door You Chose",
        body: "You pick a hard one deliberately, in daylight, unhurried. Nobody makes you.",
        scene:
          "Nobody sends you at the high gate. You walk to it at midday, unbarred it yourself, and go through at a normal pace. Sable does not follow. This one was never hers.",
        rite: "Thirty days, including one fear chosen on purpose.",
        boon: "The high gate unbars.",
        reward: "Unbarred gate key · title: The Unflinching",
        milestone: "You chose the hard door yourself.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Nothing Left Unopened",
        body: "The rock is a plaza of open arches. Fear still visits; it just stops deciding.",
        scene:
          "The rock has become a plaza: dozens of arches, all standing open, none of them guarding anything. Fear still arrives on the wind here. It simply no longer gets a vote about where you walk.",
        rite: "Sixty days. Courage is a habit of motion, not a feeling.",
        boon: "Courage is restored.",
        reward: "Title: Watcher at the Threshold",
        milestone: "Courage restored — every arch stands open.",
      },
    ],
    epilogue: "The doorway is only a doorway now, and you walk through it on the way to somewhere else.",
  },
  {
    areaId: "abundance",
    name: "The Granary of Small Sums",
    keeper: "Steward Amara, Mistress of the Ledger",
    callToAction:
      "The granary stands full of empty bins and an honest ledger nobody has dared open.",
    companions: ["Tallyboy Fen, who chalks the measures from Chapter III"],
    setting:
      "A pale green terrace island of round granaries with conical roofs, ringed by empty threshing floors and a set of brass scales tall as a door. Chalk lines mark every bin from the inside. The ledger house stands at the centre, a single room with one book on one lectern, and light that always looks like late summer.",
    prologue:
      "Abundance is the domain people expect to be about gold, and it is actually about margin. Its granaries were built for small sums arriving steadily, and small sums are the easiest thing to stop doing, because stopping costs nothing today. The bins emptied a handful at a time over years. Steward Amara has kept the ledger honest throughout — every true number, including the humiliating ones — and has been waiting for someone brave enough to read it rather than someone rich enough to fix it. 'Open the book,' she says. 'Not to fix anything. Just read the real number out loud once.'",
    chapters: [
      {
        at: THRESHOLDS[0],
        title: "I · Opening the Ledger",
        body: "You open the book and read the true number. That is the entire task, and it is enough.",
        scene:
          "The number is worse than you guessed and smaller than your dread. Amara writes today's date beneath it and hands you a counting stone. 'Now it's a record with a live edge,' she says. 'Records with live edges get better.'",
        rite: "Tend one thing you steward — money, home, order — once.",
        boon: "The ledger is open.",
        reward: "Amara's counting stone",
        milestone: "You read the true number.",
      },
      {
        at: THRESHOLDS[1],
        title: "II · The First Measure",
        body: "One bin gets filled to a line drawn in chalk. Small sums are how granaries actually work.",
        scene:
          "Five days, five handfuls, one chalk line reached. Standing in a granary the size of a chapel with one bin barely started, you understand why this domain fell: it never looks like enough on any given day.",
        rite: "Five kept days of stewarding.",
        boon: "One bin is stocked.",
        reward: "Chalked measure",
        milestone: "One bin filled to the chalk line.",
      },
      {
        at: THRESHOLDS[2],
        title: "III · The Slow Surplus",
        body: "There is more in the granary than last month and you cannot point to the day it happened.",
        scene:
          "The brass scales come level for the first time in years, and neither of you can name the day it happened. A tallyboy called Fen starts chalking fresh measures on bins nobody has used since his grandmother's time.",
        rite: "Fourteen kept days. Let the surplus be boring.",
        boon: "The scales are balanced.",
        reward: "Balanced scales · Fen keeps the measures",
        milestone: "A surplus appeared without a single dramatic day.",
      },
      {
        at: THRESHOLDS[3],
        title: "IV · The Lean Month",
        body: "A hard month comes and the granary absorbs it. This is the only reason granaries exist.",
        scene:
          "The lean month arrives and nothing dramatic happens: the store takes it, the ledger dips, the doors stay open. Amara seals a reserve jar and sets it high on the shelf. 'That is what all of this was for,' she says. 'A month you barely remember.'",
        rite: "Thirty kept days, including one lean stretch survived.",
        boon: "The store outlasts a bad month.",
        reward: "Sealed reserve jar · title: Steward",
        milestone: "The store carried you through a lean month.",
      },
      {
        at: THRESHOLDS[4],
        title: "V · Enough, and Some to Give",
        body: "The bins are full and the doors are unlocked. Abundance turned out to mean margin, not more.",
        scene:
          "Full bins, unlocked doors, and a queue of travellers from three domains taking what they need while Fen writes it all down. The ledger still records the true number. It is simply a comfortable one now.",
        rite: "Sixty kept days. Keep the ledger honest and the doors open.",
        boon: "Abundance is restored.",
        reward: "Title: Keeper of the Granary",
        milestone: "Abundance restored — enough, and some to give.",
      },
    ],
    epilogue: "The granary is full of small sums, and none of them arrived heroically.",
  },
];

export function questFor(areaId: string): Quest {
  return QUESTS.find((q) => q.areaId === areaId) ?? (QUESTS[0] as Quest);
}

export interface QuestProgress {
  area: WorldArea;
  quest: Quest;
  stats: AreaStats;
  /** chapters already open, in order */
  unlocked: Chapter[];
  /** chapters still sealed */
  locked: Chapter[];
  /** the newest open chapter */
  current: Chapter | null;
  /** the chapter still ahead, if any */
  next: Chapter | null;
  /** completions still needed for the next chapter */
  remaining: number;
  complete: boolean;
  /** the domain's island is walkable once the quest has begun */
  islandUnlocked: boolean;
}

export function questProgress(cards: HabitCard[]): QuestProgress[] {
  const stats = areaStats(cards);
  return WORLD_AREAS.map((area) => {
    const stat = stats.find((s) => s.area.id === area.id) as AreaStats;
    const quest = questFor(area.id);
    const started = stat.cards.length > 0;
    const unlocked = started ? quest.chapters.filter((c) => stat.completions >= c.at) : [];
    const locked = quest.chapters.filter((c) => !unlocked.includes(c));
    const next = locked[0] ?? null;
    return {
      area,
      quest,
      stats: stat,
      unlocked,
      locked,
      current: unlocked.length ? (unlocked[unlocked.length - 1] as Chapter) : null,
      next,
      remaining: next ? Math.max(0, next.at - stat.completions) : 0,
      complete: unlocked.length === quest.chapters.length,
      islandUnlocked: unlocked.length > 0,
    };
  });
}

export interface CampaignAct {
  at: number;
  name: string;
  line: string;
}

/** The overarching arc, measured in chapters opened across every domain. */
export const ACTS: CampaignAct[] = [
  { at: 0, name: "Act I — The Waking", line: "Nine domains lie dormant. You are the first to walk them." },
  { at: 5, name: "Act II — The Threshold", line: "Word spreads between the domains. Something is being kept again." },
  { at: 14, name: "Act III — The Long Middle", line: "The work is unglamorous now, and it is working." },
  { at: 26, name: "Act IV — The Turning", line: "The world holds its own shape between your visits." },
  { at: 38, name: "Act V — The Ascension", line: "Nothing here needs saving. You return because you belong to it." },
];

export interface LoggedMilestone {
  areaId: string;
  areaName: string;
  chapterTitle: string;
  milestone: string;
  reward: string;
}

/**
 * Isles beyond the nine domains. They belong to no domain: they surface once
 * enough rites have been kept anywhere in the archipelago, and each one carries
 * a full five-chapter quest of its own, measured in total rites kept.
 */
export interface OuterIsle {
  /** matching island id in the 3D archipelago */
  islandId: string;
  name: string;
  keeper: string;
  companions?: string[];
  theme: string;
  setting: string;
  lore: string;
  prologue: string;
  rite: string;
  reward: string;
  /** total rites kept, anywhere, before the isle surfaces */
  at: number;
  chapters: Chapter[];
  epilogue: string;
}

export const OUTER_ISLES: OuterIsle[] = [
  {
    islandId: "tidewatch",
    name: "The Tidewatch",
    keeper: "Tidewarden Sesh",
    companions: ["Bellringer Ana, who arrives at Chapter III"],
    theme: "Rhythm — the isle that drifts",
    setting:
      "A slowly turning isle of tiered water basins and hanging bronze bells, teal in every light. Nothing here measures hours; the clocks measure the gaps between the things you keep, and the isle drifts far enough each week that no chart of it stays true.",
    lore: "Sesh has never given the isle a fixed position. 'A rhythm you can pin down,' he says, 'is a rhythm somebody is faking.'",
    prologue:
      "Twenty kept rites and the cloud line thins in the north-west. What comes up through it is not land so much as a machine made of water: basins pouring into basins, bells strung between them, the whole isle turning a half-degree an hour. Tidewarden Sesh waves you down without surprise. He has been expecting somebody for a while, in the loose way tides expect things. 'You have kept enough to have a rhythm,' he says. 'Now learn what yours actually sounds like.'",
    rite: "Keep two different rites within the same day.",
    reward: "Tide-glass pendant · title: Tidewarden",
    at: 20,
    chapters: [
      {
        at: 20,
        title: "I · The Isle That Moved",
        body: "You find the Tidewatch where no chart puts it. Sesh does not correct your bearings; he corrects your expectations.",
        scene:
          "The first basin is chest-high and full to the brim. 'Watch,' says Sesh, and does nothing at all. The water leaves by itself, one drop at a time, and refills from above at exactly the same rate. 'That is you on a good month. Nothing dramatic happens and the level holds.'",
        rite: "Keep any two different rites within the same day.",
        boon: "The nearest bells begin to ring for you.",
        reward: "Tide-glass shard · Sesh charts your rhythm",
        milestone: "You stood on an island nobody can map.",
      },
      {
        at: 26,
        title: "II · Two Bells in One Day",
        body: "Sesh teaches the only lesson the isle has: rhythm is not intensity. Two small kept things in one day outrank one enormous one.",
        scene:
          "He hands you two ropes. Ring either bell and nothing much happens. Ring both, within the same daylight, and the basins below shift audibly, as if the isle had turned to face you.",
        rite: "Keep two rites in the same day, three separate times.",
        boon: "The clock terrace opens to you.",
        reward: "Twin-bell cord",
        milestone: "You rang two bells in one day.",
      },
      {
        at: 34,
        title: "III · The Gap Between",
        body: "The clocks here do not count hours. They count the spaces between your kept days, and yours are narrowing.",
        scene:
          "Bellringer Ana arrives from a lower terrace with a slate covered in your own gaps, written as small marks. 'They used to be wide,' she says, not unkindly. 'Look how close they sit now.' Nobody says the word streak. It would be too coarse for this room.",
        rite: "Keep rites on fourteen days where the gap never grows past two.",
        boon: "Ana joins the terrace and reads your gaps aloud.",
        reward: "Gap-slate · a second keeper on the isle",
        milestone: "Your gaps narrowed enough to be worth measuring.",
      },
      {
        at: 44,
        title: "IV · The Drift",
        body: "The isle moves under you all week and your rhythm holds anyway. That, Sesh says, is the entire point of building one.",
        scene:
          "A storm shoves the Tidewatch a full league east. The bells keep their time regardless. 'Everything about your week will move,' Sesh says. 'The rhythm is what you keep when the ground does not cooperate.'",
        rite: "Hold your rhythm through a week that goes badly.",
        boon: "The drifting clocks keep your time even in your absence.",
        reward: "Tide-glass pendant · title: Tidewarden",
        milestone: "You kept your rhythm through a moving week.",
      },
      {
        at: 56,
        title: "V · The Long Tide",
        body: "You stop asking where the isle is. You can hear it now, which is a better way of knowing.",
        scene:
          "On your last night Sesh lets every bell go at once, and it is not noise — it is a chord, and it is made of your record. 'The tide does not hurry,' he says, 'and it never skips. You are close enough now that I will stop saying it.'",
        rite: "Keep two rites in one day until it stops feeling like effort.",
        boon: "The Tidewatch is yours to find at will.",
        reward: "Chart of the Drifting Clocks",
        milestone: "The Tidewatch answers to your rhythm.",
      },
    ],
    epilogue: "The isle still drifts. You simply always know roughly where it is.",
  },
  {
    islandId: "emberfall",
    name: "The Emberfall",
    keeper: "Ashwright Kova",
    companions: ["The Returned, who gather at Chapter IV"],
    theme: "Return — the isle for broken streaks",
    setting:
      "A cracked volcanic shard streaming orange light upward, ringed by cold hearths. Each dead hearth belonged to a traveller who stopped. Kova relights one every time somebody resumes, so the floor is a record of returns rather than of failures.",
    lore: "The Emberfall only surfaces for travellers who have already lost something and come back anyway. It cannot be reached on a perfect record.",
    prologue:
      "The Emberfall comes up out of the cloud like something being remembered. It is not a beautiful island: black rock, split down the middle, orange light pouring upward out of the crack. The floor is covered in hearths and almost all of them are cold. Ashwright Kova is on her knees at one of them with a handful of tinder. She does not ask where you have been. Nobody on this island ever asks where anyone has been. 'You dropped something once,' she says. 'Good. That is the entry fee.'",
    rite: "Resume a rite you missed, without settling any debt for the gap.",
    reward: "Relit ember brand · title: Ashwright",
    at: 45,
    chapters: [
      {
        at: 45,
        title: "I · The Cold Hearth",
        body: "Kova gives you a dead hearth and no lecture. Every fire on this floor went out. Every fire on this floor can be relit.",
        scene:
          "The hearth she chooses for you is cold and old and someone's. 'Relight it,' she says. It takes three attempts and she counts none of them out loud.",
        rite: "Resume one rite you had let go, starting from today.",
        boon: "One hearth on the floor is burning again.",
        reward: "Handful of live tinder",
        milestone: "You relit a fire that had gone out.",
      },
      {
        at: 52,
        title: "II · No Debt Settled",
        body: "The island forbids catching up. You may not do three days at once to pay for the two you missed.",
        scene:
          "You try to over-deliver, out of guilt, and Kova takes the extra work off you. 'That is not payment, that is punishment wearing a good coat. Do today's. Only today's.'",
        rite: "Return to a missed rite and do exactly one day of it.",
        boon: "The ledger of debts is burned, publicly.",
        reward: "Ash-mark of the unpunished return",
        milestone: "You returned without paying a penalty.",
      },
      {
        at: 62,
        title: "III · The Forge of Returns",
        body: "You start working the forge instead of the hearths. What Kova makes here is made out of interrupted things.",
        scene:
          "She shows you the brand she is beating flat: a streak that broke four times, folded back on itself each time, now the strongest thing on the bench. 'Unbroken metal is brittle,' she says. 'Folded metal holds an edge.'",
        rite: "Break, return, and keep going three separate times.",
        boon: "The forge accepts your work.",
        reward: "Folded ember blade",
        milestone: "Your record broke, folded, and got stronger.",
      },
      {
        at: 74,
        title: "IV · The Returned",
        body: "Others arrive, all of them people who stopped once. It is the least judgemental crowd in the archipelago.",
        scene:
          "They come up the rock at dusk and relight hearths without ceremony — one apiece, no speeches. You realise you have been counted among them for a while.",
        rite: "Keep going long enough that a broken week is unremarkable.",
        boon: "The Returned relight the outer ring with you.",
        reward: "Relit ember brand · title: Ashwright",
        milestone: "You joined the Returned.",
      },
      {
        at: 88,
        title: "V · The Fire That Stays",
        body: "The crack in the island is still there. The fire is fed from it. Nothing here pretends the break did not happen.",
        scene:
          "'People want the crack to close,' Kova says, at the last hearth of the night. 'It never closes. It is where the heat comes from.' The floor is nearly all alight. Most of them are yours.",
        rite: "Return, one more time, from whatever the next gap is.",
        boon: "The Emberfall burns without your tending.",
        reward: "Ashwright's ledger of returns",
        milestone: "The Emberfall stays lit.",
      },
    ],
    epilogue: "Ash is not failure. It is the only proof there was ever a fire.",
  },
  {
    islandId: "stillhollow",
    name: "The Still Hollow",
    keeper: "Cantor Ilm",
    companions: ["The Choir of Rest, who answer at Chapter III"],
    theme: "Rest — the isle that sings back",
    setting:
      "A vast indigo shell of stone, open to the sky, ringed with standing echo stones. It repeats every rite you have kept back to you a half-beat late, in a chord that grows as your record does. It is the only island in the archipelago that asks you to stop.",
    lore: "Ilm sings for people who rested on purpose. Nobody has heard the choir at full strength; it is not clear the archipelago has an end.",
    prologue:
      "The last isle of the outer chart is the quietest thing in the sky: a bowl of pale indigo stone, open at the top, ringed with standing stones that hum on their own. Cantor Ilm is sitting in the middle of it doing nothing whatsoever, with great attention. 'You have kept eighty rites,' he says. 'You are very good at continuing. Now we find out whether you can stop on purpose — which is a different skill, and the one that decides whether any of this lasts.'",
    rite: "Take a deliberate rest day and let the streaks stand without you.",
    reward: "Hollow-song circlet · title: Cantor of the Hollow",
    at: 80,
    chapters: [
      {
        at: 80,
        title: "I · The Bowl of Echoes",
        body: "You step into the hollow and hear your own record come back at you, a half-beat late and larger than you expected.",
        scene:
          "Ilm strikes nothing. He simply waits, and the stones begin repeating: every rite, faintly, layered. It is not a monument. It is a sound, and it is unmistakably yours.",
        rite: "Sit in one full day of rest without abandoning anything.",
        boon: "The echo stones learn your chord.",
        reward: "Echo-stone token",
        milestone: "You heard your own record sung back to you.",
      },
      {
        at: 90,
        title: "II · Stopping on Purpose",
        body: "Rest is a kept rite here, filed alongside the others. Quitting sounds nothing like it.",
        scene:
          "'Say the difference out loud,' Ilm insists. You try twice. The third attempt is: quitting is leaving, resting is staying and being still. The stones repeat only the third one.",
        rite: "Take a planned rest day, decided in advance rather than in defeat.",
        boon: "The hollow counts rest among your kept things.",
        reward: "Circlet of the deliberate pause",
        milestone: "You rested on purpose and kept everything.",
      },
      {
        at: 102,
        title: "III · The Choir Answers",
        body: "The stones stop echoing and start harmonising. Something in the hollow is singing with you rather than after you.",
        scene:
          "The Choir of Rest are not people, exactly. They are the sound the island makes for anyone whose record survived their days off. Ilm conducts them with one finger and looks faintly embarrassed about how beautiful it is.",
        rite: "Keep your rites through a month that contained real rest.",
        boon: "The Choir of Rest sings for you.",
        reward: "Choir's second voice",
        milestone: "The Choir of Rest answered you.",
      },
      {
        at: 116,
        title: "IV · The Half-Beat Late",
        body: "You stop trying to catch the echo. Being a half-beat behind the sound is, it turns out, the correct place to stand.",
        scene:
          "'Everyone chases it at first,' says Ilm. 'You cannot arrive before your own life. Stand still and it comes to you late, which is on time.'",
        rite: "Let a rest day pass without checking anything.",
        boon: "The hollow holds your chord while you sleep.",
        reward: "Hollow-song circlet · title: Cantor of the Hollow",
        milestone: "You stood still and let it arrive.",
      },
      {
        at: 132,
        title: "V · The Chord That Continues",
        body: "The chord does not resolve. Ilm has never heard it resolve. He is fairly sure that is the good news.",
        scene:
          "On the last night the hollow is very loud and completely calm. 'It does not finish,' Ilm says. 'There is more chart above the cloud line. I have only ever heard rumours of it — bells with no island, a lamp that moves.' He looks up. So do you.",
        rite: "Keep the whole shape of it: work, rest, return.",
        boon: "The outer chart is complete — and something above it stirs.",
        reward: "The unresolved chord · the second chart begins",
        milestone: "The outer isles are complete. Something above the cloud line answered.",
      },
    ],
    epilogue: "The choir sings for people who stopped without quitting. It has not stopped singing since.",
  },
];

export interface OuterIsleProgress {
  isle: OuterIsle;
  unlocked: boolean;
  /** rites still needed for the isle to surface */
  remaining: number;
  chapters: Chapter[];
  locked: Chapter[];
  current: Chapter | null;
  next: Chapter | null;
  /** rites still needed for the next chapter */
  remainingToNext: number;
  complete: boolean;
}

/**
 * The second chart: an arc that only exists once the outer isles are complete.
 * Its islands are drawn above the cloud line and measured in total rites kept.
 */
export interface ArcIsle {
  islandId: string;
  name: string;
  keeper: string;
  companions?: string[];
  theme: string;
  setting: string;
  prologue: string;
  chapters: Chapter[];
  epilogue: string;
  /** total rites kept before this island of the second chart is drawn */
  at: number;
}

export const ARC_TWO_NAME = "The Second Chart";
export const ARC_TWO_LINE =
  "Above the cloud line the archipelago keeps going. It was always going to: a practice this old outgrows the person keeping it.";

export const ARC_TWO_ISLES: ArcIsle[] = [
  {
    islandId: "wanderlight",
    name: "The Wanderlight",
    keeper: "Lampwright Ovid",
    companions: ["Whoever follows your light, from Chapter III"],
    theme: "Carrying it — the lamp that moves",
    setting:
      "A small pale isle with no fixed hearth, only a lamp on a pole that is carried from edge to edge by whoever is keeping something. Its light falls on other islands, not on itself, so the Wanderlight is always the darkest place on its own chart.",
    prologue:
      "The first island of the second chart is barely an island: a slab of white stone, a pole, and a lamp that somebody is always carrying. Lampwright Ovid hands it to you the moment you land, the way you hand a stranger a baby — no ceremony, total confidence. 'You have kept enough that people can see you doing it,' he says. 'That is a responsibility now, whether you asked for one or not.'",
    at: 150,
    chapters: [
      {
        at: 150,
        title: "I · The Lamp Passed On",
        body: "The lamp is heavier than it looks and it lights everything except the ground you stand on.",
        scene:
          "Ovid walks you the length of the slab. Every other island in view brightens slightly as you pass. Yours stays dim. 'That is the trade,' he says. 'You will not feel it. Everyone else will.'",
        rite: "Keep your rites where somebody can see you keep them.",
        boon: "Your record becomes visible from other islands.",
        reward: "Wanderlight lamp",
        milestone: "You carried the lamp for the first time.",
      },
      {
        at: 168,
        title: "II · Somebody Is Watching",
        body: "You discover a stranger has been pacing their week against yours, without ever saying so.",
        scene:
          "Ovid points at a low island where a single window has started lighting at the same hour as your rites. 'They are not copying you,' he says. 'They are using you as a clock. Try not to be a bad one.'",
        rite: "Tell one person what you are keeping, plainly, without advice.",
        boon: "The window on the low island lights nightly.",
        reward: "Paired-flame token",
        milestone: "Somebody set their week by yours.",
      },
      {
        at: 190,
        title: "III · The Second Lamp",
        body: "Someone follows you up. They are worse at this than you and much better at it than you were.",
        scene:
          "They arrive with a bad system and enormous enthusiasm, which is exactly how you arrived. Ovid says nothing at all and lets you be the one to hand over a lamp for the first time.",
        rite: "Help one person start, then leave them to keep it.",
        boon: "A second lamp joins the isle.",
        reward: "Lampwright's spare wick · a companion on the isle",
        milestone: "You handed the lamp to somebody else.",
      },
      {
        at: 215,
        title: "IV · Light Without the Carrier",
        body: "You take a week off the isle and the light does not go out. That stings, and then it is the best news you have had.",
        scene:
          "'You wanted to be necessary,' Ovid says. 'Being necessary is a small ambition. Being unnecessary is how a thing survives you.'",
        rite: "Let the practice run without your supervision.",
        boon: "The Wanderlight burns without its lampwright.",
        reward: "Unattended flame",
        milestone: "The light stayed lit without you.",
      },
      {
        at: 245,
        title: "V · The Wandering Chart",
        body: "The lamp moves on. So do you. The chart of the second arc is drawn by carrying things, not by claiming them.",
        scene:
          "You leave the lamp with someone whose name you barely know. Ovid watches the whole handover with his arms folded and says, at the end, 'Right,' which from him is a ballad.",
        rite: "Keep carrying it, and keep passing it on.",
        boon: "The Wanderlight follows the chart.",
        reward: "Title: Lampwright",
        milestone: "The Wanderlight went on without you, still lit.",
      },
    ],
    epilogue: "The darkest island on the chart is the one holding the lamp. It does not seem to mind.",
  },
  {
    islandId: "saltgate",
    name: "The Saltgate",
    keeper: "Harbourmaster Dain",
    companions: ["The Retired Rites, moored from Chapter II"],
    theme: "Endings — the harbour where rites retire",
    setting:
      "A grey-green harbour cut into a low cliff, full of moored, unmanned boats. Each boat is a rite somebody kept until it had done its work. Nothing here is wrecked; everything is tied up properly, sails folded, waiting to be remembered rather than resumed.",
    prologue:
      "The Saltgate is the only island in the archipelago that smells of the sea. It is a harbour of retired practices: rows of small boats, each one a rite that somebody kept faithfully until it was finished. Harbourmaster Dain keeps the register. 'You have kept a great deal,' he says, running a thumb down the page. 'Have you ever ended anything on purpose? No? Then you have been hoarding, not practising.'",
    at: 200,
    chapters: [
      {
        at: 200,
        title: "I · The Register of Endings",
        body: "Dain opens a book of rites that were completed rather than abandoned. It is longer than you expected and nothing in it is sad.",
        scene:
          "'This one ran nine years and then the man could swim,' Dain says. 'So it stopped. That is not a broken streak. That is an arrival.'",
        rite: "Name one rite of yours that has already done its work.",
        boon: "The register opens to your hand.",
        reward: "Harbour ledger page",
        milestone: "You read the register of endings.",
      },
      {
        at: 222,
        title: "II · Moored, Not Wrecked",
        body: "You tie up your first finished rite yourself, and it is nothing like quitting.",
        scene:
          "Dain shows you the knot. It is the same knot used for boats going out. 'We do not have a different one for ending,' he says. 'Everyone assumes we would.'",
        rite: "Retire one rite deliberately, with the reason written down.",
        boon: "Your first retired rite is moored.",
        reward: "Saltgate mooring knot",
        milestone: "You retired a rite instead of dropping it.",
      },
      {
        at: 248,
        title: "III · The Empty Berth",
        body: "An ending leaves room. You feel the space before you know what belongs in it.",
        scene:
          "The berth beside your moored boat stays empty for weeks and Dain refuses to let you fill it in a hurry. 'A harbour that is always full is a harbour that never sails.'",
        rite: "Leave the space open, then choose what fills it.",
        boon: "A berth is kept open in your name.",
        reward: "Berth-right at the Saltgate",
        milestone: "You held an empty space without panic.",
      },
      {
        at: 275,
        title: "IV · Sailing Out Again",
        body: "You start something new, out of surplus rather than shame. It is the first rite you have begun without a wound.",
        scene:
          "The new boat is small and rigged badly and you launch it anyway. Dain writes it in the register under a heading you have not seen before: chosen.",
        rite: "Begin one new rite for a reason you actually like.",
        boon: "Your new rite is entered as chosen.",
        reward: "Chosen-rite pennant",
        milestone: "You began something out of surplus.",
      },
      {
        at: 310,
        title: "V · The Tide Book Closes",
        body: "Dain shuts the register for the night. Beginning and ending, it turns out, are the same craft practised at opposite ends.",
        scene:
          "'You came here afraid of stopping,' he says, locking the book in its box. 'You will leave able to finish. That is worth more than any streak in my harbour.'",
        rite: "Keep, finish, and begin — in that order, on purpose.",
        boon: "The Saltgate keeps your record whether you sail or not.",
        reward: "Title: Harbourwright",
        milestone: "You learned to finish things.",
      },
    ],
    epilogue: "Nothing in this harbour is wrecked. Everything in it is tied up properly.",
  },
  {
    islandId: "zenith",
    name: "The Zenith Ring",
    keeper: "Vela, the Cartographer Who Stopped Drawing",
    companions: ["Every keeper you have met, at Chapter V"],
    theme: "Authorship — the chart that draws itself",
    setting:
      "A ring of white stone hanging at the top of the sky, with no island inside it — only air, and a drafting table bolted to the rim. From here every other island is visible at once, and the chart on the table redraws itself as you keep things, in handwriting that is slowly becoming yours.",
    prologue:
      "The last island of the second chart is not an island. It is a ring of white stone at the very top of the sky with nothing inside it, and a drafting table bolted to the rim. Vela has been up here for a long time. Her hands are stained with ink she has not used in years. 'I stopped drawing when the chart started drawing itself,' she says. 'It uses your handwriting now. I thought you should see that before you decide what happens next.'",
    at: 260,
    chapters: [
      {
        at: 260,
        title: "I · The Ring With No Island",
        body: "You arrive at the top of the sky and find nothing there but a view of everywhere you have been.",
        scene:
          "Vela stands aside so you can see the table. Twelve islands, each one lit to the exact degree that you keep it. Nothing is invented. It is a report.",
        rite: "Look honestly at everything you are keeping at once.",
        boon: "The chart shows you the whole archipelago.",
        reward: "Zenith sightline",
        milestone: "You saw the whole chart at once.",
      },
      {
        at: 285,
        title: "II · Your Own Handwriting",
        body: "The chart is being extended in a hand you recognise, because it is yours.",
        scene:
          "Vela holds two pages side by side: her old lettering, and this week's. They are not the same. 'I did not teach it that,' she says. 'You did, by keeping things.'",
        rite: "Write down, in your own words, what your practice is for.",
        boon: "The chart adopts your hand.",
        reward: "Cartographer's second pen",
        milestone: "The chart began writing in your hand.",
      },
      {
        at: 320,
        title: "III · The Unnamed Shapes",
        body: "There are islands on the table that have no names yet. Vela has decided they are not hers to name.",
        scene:
          "Three faint shapes, north of everything. 'They have been there for months,' she says. 'They firmed up around the time you learned to rest. Name one, or leave them. Both are allowed.'",
        rite: "Give one part of your practice a name of your own.",
        boon: "An unnamed shape takes your name.",
        reward: "Naming-right on the second chart",
        milestone: "You named a place on the chart.",
      },
      {
        at: 360,
        title: "IV · The Table Is Yours",
        body: "Vela stops correcting you. She starts asking questions instead, which is worse and much better.",
        scene:
          "She sits down for the first time since you arrived, and lets you draw the week. You get a coastline wrong. She lets you notice it yourself, an hour later.",
        rite: "Run the whole practice without asking permission for it.",
        boon: "The drafting table answers to you.",
        reward: "Zenith drafting table",
        milestone: "You took the drafting table.",
      },
      {
        at: 420,
        title: "V · The Chart Keeps Going",
        body: "Every keeper you ever met is standing on the rim. Nobody makes a speech, which is the highest honour the archipelago has.",
        scene:
          "Rayan is late, because he stopped to fix a step. Kova brings fire. Ilm brings the chord, still unresolved. Vela hands you the pen, walks to the edge of the ring, and looks north at the shapes with no names. 'There is more,' she says. 'There always is. That was never the bad news.'",
        rite: "Keep going, because it is yours now.",
        boon: "The second chart is open, and unfinished on purpose.",
        reward: "Title: Cartographer of the Second Chart",
        milestone: "The chart is in your handwriting, and it is still being drawn.",
      },
    ],
    epilogue:
      "The archipelago has no edge. The chart is unfinished in your own hand, and that is the ending it was always going to have.",
  },
];

export interface ArcIsleProgress {
  isle: ArcIsle;
  /** the whole second arc is sealed until the outer isles are complete */
  arcUnlocked: boolean;
  unlocked: boolean;
  remaining: number;
  chapters: Chapter[];
  locked: Chapter[];
  current: Chapter | null;
  next: Chapter | null;
  remainingToNext: number;
  complete: boolean;
}

export interface CampaignState {
  act: CampaignAct;
  nextAct: CampaignAct | null;
  chaptersOpen: number;
  chaptersTotal: number;
  quests: QuestProgress[];
  /** the domain closest to its next chapter, to point the player somewhere */
  focusQuest: QuestProgress | null;
  /** islands the archipelago has woken, by domain id */
  unlockedAreaIds: string[];
  /** every milestone earned so far, newest domains last */
  milestones: LoggedMilestone[];
  ritesKept: number;
  /** the isles beyond the nine domains */
  outerIsles: OuterIsleProgress[];
  /** true once every outer isle has opened all five chapters */
  outerComplete: boolean;
  /** the second story arc, sealed until the outer isles are complete */
  arcTwo: ArcIsleProgress[];
  arcTwoUnlocked: boolean;
  /** every 3D island id the archipelago has woken */
  unlockedIslandIds: string[];
  /** chapters open per island id, for the archipelago's keeper gating */
  islandChapters: Record<string, number>;
  /** fraction of the whole book read, 0 – 1 */
  readingProgress: number;
}

function chaptersByRites(chapters: Chapter[], rites: number, gate: boolean) {
  const unlocked = gate ? chapters.filter((c) => rites >= c.at) : [];
  const locked = chapters.filter((c) => !unlocked.includes(c));
  const next = locked[0] ?? null;
  return {
    chapters: unlocked,
    locked,
    current: unlocked.length ? (unlocked[unlocked.length - 1] as Chapter) : null,
    next,
    remainingToNext: next ? Math.max(0, next.at - rites) : 0,
    complete: unlocked.length === chapters.length,
  };
}

export function campaignState(cards: HabitCard[]): CampaignState {
  const quests = questProgress(cards);
  const domainChaptersOpen = quests.reduce((n, q) => n + q.unlocked.length, 0);
  const act =
    [...ACTS].reverse().find((a) => domainChaptersOpen >= a.at) ?? (ACTS[0] as CampaignAct);
  const nextAct = ACTS.find((a) => a.at > act.at) ?? null;
  const open = quests.filter((q) => !q.complete && q.stats.cards.length > 0);
  const focusQuest =
    open.sort((a, b) => a.remaining - b.remaining)[0] ?? quests.find((q) => !q.complete) ?? null;
  const milestones: LoggedMilestone[] = quests.flatMap((q) =>
    q.unlocked.map((c) => ({
      areaId: q.area.id,
      areaName: q.area.name,
      chapterTitle: c.title,
      milestone: c.milestone,
      reward: c.reward,
    })),
  );
  const ritesKept = quests.reduce((n, q) => n + q.stats.completions, 0);

  const outerIsles: OuterIsleProgress[] = OUTER_ISLES.map((isle) => {
    const unlocked = ritesKept >= isle.at;
    return {
      isle,
      unlocked,
      remaining: Math.max(0, isle.at - ritesKept),
      ...chaptersByRites(isle.chapters, ritesKept, unlocked),
    };
  });
  const outerComplete = outerIsles.every((o) => o.complete);

  const arcTwo: ArcIsleProgress[] = ARC_TWO_ISLES.map((isle) => {
    const unlocked = outerComplete && ritesKept >= isle.at;
    return {
      isle,
      arcUnlocked: outerComplete,
      unlocked,
      remaining: outerComplete ? Math.max(0, isle.at - ritesKept) : isle.at,
      ...chaptersByRites(isle.chapters, ritesKept, unlocked),
    };
  });

  const domainIslandIds = quests.filter((q) => q.islandUnlocked).map((q) => q.area.id);
  const islandChapters: Record<string, number> = { nexus: 5 };
  quests.forEach((q) => {
    islandChapters[q.area.id] = q.unlocked.length;
  });
  outerIsles.forEach((o) => {
    islandChapters[o.isle.islandId] = o.chapters.length;
  });
  arcTwo.forEach((a) => {
    islandChapters[a.isle.islandId] = a.chapters.length;
  });

  const chaptersOpen =
    domainChaptersOpen +
    outerIsles.reduce((n, o) => n + o.chapters.length, 0) +
    arcTwo.reduce((n, a) => n + a.chapters.length, 0);
  const chaptersTotal =
    quests.reduce((n, q) => n + q.quest.chapters.length, 0) +
    OUTER_ISLES.reduce((n, i) => n + i.chapters.length, 0) +
    ARC_TWO_ISLES.reduce((n, i) => n + i.chapters.length, 0);

  return {
    act,
    nextAct,
    chaptersOpen,
    chaptersTotal,
    quests,
    focusQuest,
    unlockedAreaIds: domainIslandIds,
    milestones,
    ritesKept,
    outerIsles,
    outerComplete,
    arcTwo,
    arcTwoUnlocked: outerComplete,
    unlockedIslandIds: [
      "nexus",
      ...domainIslandIds,
      ...outerIsles.filter((o) => o.unlocked).map((o) => o.isle.islandId),
      ...arcTwo.filter((a) => a.unlocked).map((a) => a.isle.islandId),
    ],
    islandChapters,
    readingProgress: chaptersTotal === 0 ? 0 : chaptersOpen / chaptersTotal,
  };
}
