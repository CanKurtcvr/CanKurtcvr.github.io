export interface IslandNPC {
  id: string;
  name: string;
  title: string;
  islandId: string;
  islandName: string;
  role: string;
  themeColor: string;
  accentHex: string;
  avatarIcon: 'Compass' | 'Sparkles' | 'Flame' | 'Shield' | 'BookOpen' | 'Feather';
  avatarEmoji: string;
  dialogueLines: string[];
  localPos: { x: number; y: number; z: number };
  /** chapters that must be open in this domain before the keeper appears */
  requiresChapter?: number;
}

export const ISLAND_NPCS: IslandNPC[] = [
  {
    id: 'npc-elyon',
    name: 'Sage Elyon',
    title: 'Grand Arbiter of the Crossroads',
    islandId: 'nexus',
    islandName: "The Wayfarer's Nexus",
    role: 'Keeper of Equilibrium & Universal Mastery',
    themeColor: 'amber',
    accentHex: '#f59e0b',
    avatarIcon: 'Compass',
    avatarEmoji: '✨',
    dialogueLines: [
      'Greetings, noble Wayfarer! You stand at the Crossroads of Ascension, where all five virtues converge.',
      'Across these boundless skies float five sacred sanctuaries, each protecting an essential pillar of human mastery.',
      'A scattered mind attempts all things at once and finishes none. True ascension is forged through the quiet, deliberate rhythm of each day.',
      'Spread your wings (Space) and seek the guardians of each shrine. Let consistency be your anchor among the clouds!',
    ],
    // Place the guide directly on the player's opening approach from the south.
    localPos: { x: 0, y: 6.0, z: -18 },
  },
  {
    id: 'npc-zahra',
    name: 'Sister Zahra',
    title: 'Guardian of Stillness & Morning Light',
    islandId: 'spirituality',
    islandName: 'Sanctuary of the Soul',
    role: 'Mentor of Sincere Prayer & Mindfulness',
    themeColor: 'cyan',
    accentHex: '#38bdf8',
    avatarIcon: 'Sparkles',
    avatarEmoji: '🕊️',
    dialogueLines: [
      'Peace be upon your heart, seeker. You have arrived at the Sanctuary of the Soul.',
      'Before the world awakes with clamor and endless demands, the morning belongs purely to your spirit.',
      'Even ten quiet breaths in the pre-dawn silence can calm a storm that would otherwise drown your entire day.',
      'Anchor your soul here each morning. Stillness is not inaction—it is supreme clarity.',
    ],
    localPos: { x: 18, y: 6.0, z: 14 },
  },
  {
    id: 'npc-tariq',
    name: 'Hermit Tariq',
    title: 'Warden of the Hearth of Release',
    islandId: 'reflection',
    islandName: 'Chamber of Reflection',
    role: 'Guide to Honest Self-Audit & Guilt-Free Renewal',
    themeColor: 'rose',
    accentHex: '#f43f5e',
    avatarIcon: 'Flame',
    avatarEmoji: '🔥',
    dialogueLines: [
      'Welcome to the Hearth, weary traveler. Sit beside the fire and rest your wings.',
      'Did you stumble today? Did you break a habit streak or let procrastination steal your daylight?',
      'Cast the guilt into these glowing embers. Shame is heavy lead that will only drag down your flight.',
      'An honest evening audit is not about self-punishment—it is about gentle correction. Tomorrow’s dawn arrives clean.',
    ],
    localPos: { x: -16, y: 6.0, z: 15 },
  },
  {
    id: 'npc-rayan',
    name: 'Captain Rayan',
    title: 'Paragon of Physical Discipline',
    islandId: 'vitality',
    islandName: 'Citadel of Vitality',
    role: 'Champion of Physical Health & Unbreakable Vigor',
    themeColor: 'emerald',
    accentHex: '#10b981',
    avatarIcon: 'Shield',
    avatarEmoji: '⚡',
    dialogueLines: [
      'Stand tall, Wayfarer! Look at these high cliffs—conquered only through strength and relentless endurance!',
      'The physical vessel is the sacred engine of all spiritual and creative energy. If the temple crumbles, the mind falters.',
      'Never wait for motivation. Motivation is a fickle breeze. Discipline is iron forged on the days you least feel like moving.',
      'Move your body with vigor today! Conquer inertia and command your vitality!',
    ],
    localPos: { x: 18, y: 6.0, z: -14 },
  },
  {
    id: 'npc-idris',
    name: 'Archivist Idris',
    title: 'Master of the Deep Scriptorium',
    islandId: 'wisdom',
    islandName: 'Archive of Wisdom',
    role: 'Philosopher of 30-Minute Undisturbed Focus',
    themeColor: 'blue',
    accentHex: '#60a5fa',
    avatarIcon: 'BookOpen',
    avatarEmoji: '📜',
    dialogueLines: [
      'Step softly, seeker of timeless truths... within these carved stone arches rest the thoughts of ancient sages.',
      'In your world, endless fleeting feeds fight relentlessly to fracture your attention into a thousand brittle pieces.',
      'To sit with an analog book for thirty uninterrupted minutes is an act of supreme courage.',
      'Feed your mind from deep, quiet wells of timeless wisdom every day. The quality of your thoughts shapes your destiny.',
    ],
    localPos: { x: -18, y: 6.0, z: 14 },
  },
  {
    id: 'npc-layla',
    name: 'Artisan Layla',
    title: 'Architect of Faceless Storytelling',
    islandId: 'creation',
    islandName: 'Atelier of Creation',
    role: 'Creative Director of Egoless Storytelling',
    themeColor: 'purple',
    accentHex: '#c084fc',
    avatarIcon: 'Feather',
    avatarEmoji: '✒️',
    dialogueLines: [
      'Welcome to the Atelier of Creation! Here, we craft with devotion and humility, far from the noise of the ego.',
      'When you hide your face in your art, you make the work about the idea, the truth, and the beauty—not yourself.',
      'Do not chase shallow vanity or algorithmic applause. Work quietly and tactilely in your studio.',
      'Let your craftsmanship speak in a voice so pure and deliberate that it outlasts all fleeting trends.',
    ],
    localPos: { x: 16, y: 6.0, z: -16 },
  },
  {
    id: 'npc-hana',
    name: 'Wayfarer Hana',
    title: 'Companion of the Long Switchbacks',
    islandId: 'vitality',
    islandName: 'Citadel of Vitality',
    role: 'Walker of the rhythm nobody writes songs about',
    themeColor: 'emerald',
    accentHex: '#34d399',
    avatarIcon: 'Compass',
    avatarEmoji: '🥾',
    dialogueLines: [
      'You kept walking, so I came back. The beacon started flickering and I wanted to see who lit it.',
      'The middle of a road is the loneliest part. That is exactly where company belongs.',
      'Walk with me. We can be quiet — the mountain prefers it.',
    ],
    localPos: { x: 8, y: 6.0, z: -22 },
    requiresChapter: 3,
  },
  {
    id: 'npc-noor',
    name: 'Ferrywoman Noor',
    title: 'Warden of the Long Bridges',
    islandId: 'kinship',
    islandName: 'Bridges of Kinship',
    role: 'Keeper of the hearth at the centre of the span',
    themeColor: 'orange',
    accentHex: '#fb923c',
    avatarIcon: 'Flame',
    avatarEmoji: '🪢',
    dialogueLines: [
      'Careful on the planking, traveller. It holds — it just likes to be noticed.',
      'Bridges fray because nobody crosses, not because the rope is weak.',
      'Throw one rope today. A message, a call, an hour with someone. That is the whole rite.',
      'When somebody crosses back towards you unasked, the bridge has become a road.',
    ],
    localPos: { x: -14, y: 6.0, z: -16 },
  },
  {
    id: 'npc-sable',
    name: 'Knight Sable',
    title: 'Watcher at the Threshold',
    islandId: 'courage',
    islandName: 'Threshold of Small Fears',
    role: 'Guardian of the doorways everyone walks around',
    themeColor: 'red',
    accentHex: '#ef4444',
    avatarIcon: 'Shield',
    avatarEmoji: '🗝️',
    dialogueLines: [
      'Stand there a moment. See how ordinary the door is once you are close to it?',
      'Everyone who ever avoided something left it here. The plaza is built out of postponement.',
      'Do not storm it. Step through one small one, today, and be disappointed by how little happens.',
      'Fear still visits me. It simply stopped deciding.',
    ],
    localPos: { x: 0, y: 6.0, z: -20 },
  },
  {
    id: 'npc-amara',
    name: 'Steward Amara',
    title: 'Mistress of the Honest Ledger',
    islandId: 'abundance',
    islandName: 'Granary of Small Sums',
    role: 'Counter of margins, keeper of chalk lines',
    themeColor: 'lime',
    accentHex: '#a3e635',
    avatarIcon: 'BookOpen',
    avatarEmoji: '🌾',
    dialogueLines: [
      'The book is open. Read the true number — that is the first chapter, and it is enough.',
      'Granaries do not fill heroically. They fill in small sums, at chalk lines nobody applauds.',
      'Tend one thing you steward today: coin, home, or order.',
      'Abundance, it turns out, means margin. Not more.',
    ],
    localPos: { x: -16, y: 6.0, z: 14 },
  },
  {
    id: 'npc-sesh',
    name: 'Tidewarden Sesh',
    title: 'Keeper of the Drifting Clocks',
    islandId: 'tidewatch',
    islandName: 'The Tidewatch',
    role: 'Measurer of the gaps between kept things',
    themeColor: 'teal',
    accentHex: '#2dd4bf',
    avatarIcon: 'Clock',
    avatarEmoji: '⏳',
    dialogueLines: [
      'This isle drifts, so nothing here is ever quite where the chart says. You get used to it.',
      'I do not measure hours. I measure the gaps between the things you keep.',
      'Two rites in one day is the rite here. Not more — two, in the same daylight.',
      'The tide never hurries and it never skips. Be more like the tide than like a storm.',
    ],
    localPos: { x: 0, y: 6.0, z: -24 },
  },
  {
    id: 'npc-kova',
    name: 'Ashwright Kova',
    title: 'Smith of the Forge of Returns',
    islandId: 'emberfall',
    islandName: 'The Emberfall',
    role: 'Relighter of fires that went out',
    themeColor: 'ember',
    accentHex: '#f97316',
    avatarIcon: 'Flame',
    avatarEmoji: '🔥',
    dialogueLines: [
      'Every cold hearth on this floor belonged to somebody who stopped. Most of them came back.',
      'I do not ask where you were. Nobody here does. Only whether you are here now.',
      'The rite is the return: pick up the rite you dropped, and do not settle any debt for it.',
      'Ash is not failure, traveller. Ash is proof there was a fire.',
    ],
    localPos: { x: -18, y: 6.0, z: 18 },
  },
  {
    id: 'npc-ilm',
    name: 'Cantor Ilm',
    title: 'Voice of the Choir of Rest',
    islandId: 'stillhollow',
    islandName: 'The Still Hollow',
    role: 'Singer of what you already kept',
    themeColor: 'indigo',
    accentHex: '#818cf8',
    avatarIcon: 'Moon',
    avatarEmoji: '🌙',
    dialogueLines: [
      'Listen. The hollow is singing your streaks back to you, a half-beat late.',
      'The choir only sings for travellers who learned to stop without quitting.',
      'Rest is a kept rite too. Take a day on purpose and let the work stand without you.',
      'You came here loud. You will leave here quiet. That is the whole liturgy.',
    ],
    localPos: { x: 14, y: 6.0, z: -18 },
  },
  {
    id: 'npc-ovid',
    name: 'Lampwright Ovid',
    title: 'Bearer of the Wanderlight',
    islandId: 'wanderlight',
    islandName: 'The Wanderlight',
    role: 'Carrier of the lamp that lights other islands',
    themeColor: 'zinc',
    accentHex: '#e2e8f0',
    avatarIcon: 'Compass',
    avatarEmoji: '🏮',
    dialogueLines: [
      'Take it. No ceremony — the lamp is always carried by whoever is currently keeping something.',
      'It lights every island except this one. That is the trade, and nobody warns you about it beforehand.',
      'Somebody down there sets their week by your hours. Try not to be a bad clock.',
      'The day you hand it on is the day the second chart gets longer.',
    ],
    localPos: { x: 0, y: 6.0, z: -20 },
  },
  {
    id: 'npc-dain',
    name: 'Harbourmaster Dain',
    title: 'Keeper of the Register of Endings',
    islandId: 'saltgate',
    islandName: 'The Saltgate',
    role: 'Moors the rites that finished their work',
    themeColor: 'slate',
    accentHex: '#94a3b8',
    avatarIcon: 'BookOpen',
    avatarEmoji: '⚓',
    dialogueLines: [
      'Every boat here is a rite somebody kept until it was done. None of them are wrecks.',
      'You are good at continuing. Have you ever ended anything on purpose?',
      'We use the same knot for coming in as for going out. Everyone assumes we would not.',
      'Finish one thing properly and the berth beside it stays open for whatever you choose next.',
    ],
    localPos: { x: -16, y: 6.0, z: 16 },
  },
  {
    id: 'npc-vela',
    name: 'Vela, the Cartographer',
    title: 'She Who Stopped Drawing',
    islandId: 'zenith',
    islandName: 'The Zenith Ring',
    role: 'Watches the chart extend itself in your handwriting',
    themeColor: 'white',
    accentHex: '#f8fafc',
    avatarIcon: 'Feather',
    avatarEmoji: '🖋️',
    dialogueLines: [
      'There is no island inside this ring. Only the view, and the table, and the pen.',
      'I stopped drawing when the chart began drawing itself. It writes in your hand now.',
      'Those shapes north of everything have no names. They firmed up when you learned to rest.',
      'There is more chart above us. There always is. That was never the bad news.',
    ],
    localPos: { x: 0, y: 6.0, z: -22 },
  },
];

/**
 * Lets the app rewrite each keeper's dialogue so they speak about the player's
 * own habit cards. Called before the world mounts.
 */
export function applyNpcDialogue(lines: Record<string, string[]>): void {
  ISLAND_NPCS.forEach((npc) => {
    const custom = lines[npc.islandId];
    if (custom && custom.length > 0) npc.dialogueLines = custom;
  });
}

/** islandId -> chapters open in its campaign domain. Empty means "show everything". */
let islandChapterMap: Record<string, number> = {};

/**
 * Campaign gating: an island wakes when its domain quest opens its first
 * chapter, and its keepers arrive as further chapters open.
 */
export function applyIslandUnlocks(map: Record<string, number>): void {
  islandChapterMap = map;
}

export function chaptersOpenForIsland(islandId: string): number {
  if (islandId === 'nexus') return 5;
  if (Object.keys(islandChapterMap).length === 0) return 5;
  return islandChapterMap[islandId] ?? 0;
}
