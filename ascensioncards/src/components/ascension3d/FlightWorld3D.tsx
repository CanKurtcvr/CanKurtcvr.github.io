// @ts-nocheck -- vendored game code, kept as authored
import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {
  Compass,
  Wind,
  Volume2,
  VolumeX,
  Eye,
  Sparkles,
  ChevronRight,
  Maximize2,
  Minimize2,
  Shield,
  HelpCircle,
  X,
  Crosshair,
  Layers,
  MapPin,
  Focus,
  Feather,
  MessageSquare,
  MessageCircle,
  BookOpen,
  Flame,
  RotateCcw,
} from 'lucide-react';
import { HabitIsland, CharacterState, QuestStatus, TimeOfDay, WorldArea, GearSlot } from './types';
import { HABIT_ISLANDS } from './data/worldData';
import { soundSynth } from './audio/soundSynthesizer';
import { CharacterGearPanel } from './CharacterGearPanel';

interface FlightWorld3DProps {
  character: CharacterState;
  quests: QuestStatus[];
  petType: PetType;
  timeOfDay: TimeOfDay;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  onEnterArea: (area: WorldArea, island: HabitIsland) => void;
  onAwardXP?: (amount: number) => void;
  onDialogueComplete?: (npc: IslandNPC) => void;
  onOpenGuideTab?: () => void;
  onOpenArmoryModal?: () => void;
  onAscendGear?: (slot: GearSlot) => void;
}

export type PetType = 'cat' | 'dog' | 'turtle';

// 3D coordinate mapping for islands
interface Island3DConfig {
  island: HabitIsland;
  pos: THREE.Vector3;
  radius: number;
  color: number;
  accentColor: number;
  beaconColor: number;
  height: number;
  /** true while the domain's quest has not opened its first chapter */
  sealed?: boolean;
}

// Talkable NPC on the Islands
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



// Helper: Canvas Texture Billboard Sprite for NPC Nametags
function createNPCLabelSprite(name: string, title: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Draw stylish glassmorphic pill background
    ctx.fillStyle = 'rgba(10, 15, 22, 0.88)';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(16, 20, 480, 120, 24) : ctx.rect(16, 20, 480, 120);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = colorHex;
    ctx.stroke();

    // Name text
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(name, 256, 70);

    // Title / "[E / T] Talk" text
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = colorHex;
    ctx.fillText(`💬 [E / T] Talk • ${title}`, 256, 110);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(7.5, 2.3, 1.0);
  sprite.position.set(0, 4.8, 0);
  return sprite;
}

// Helper: Create 3D Stylized Character Model for Island NPCs
// A hand-built low-poly "keeper": lathe-turned robe, open cowl with glowing eyes,
// sleeved arms, a staff cradling the relic, orbiting motes and a soft ground glow.
function createNPCEntity(npc: IslandNPC): {
  group: THREE.Group;
  beaconRune: THREE.Mesh;
  relicMesh: THREE.Mesh;
  halo: THREE.Mesh;
} {
  const npcGroup = new THREE.Group();
  npcGroup.name = `npc-${npc.id}`;

  const themeHex = parseInt(npc.accentHex.replace('#', '0x'), 16);
  const theme = new THREE.Color(themeHex);
  const clothDeep = theme.clone().lerp(new THREE.Color(0x0a1120), 0.82);
  const clothMid = theme.clone().lerp(new THREE.Color(0x121b2e), 0.62);

  // ---------- 1. Sacred stepped pedestal ----------
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x1b2536,
    roughness: 0.92,
    metalness: 0.06,
    flatShading: true,
  });
  const stepA = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 3.0, 0.22, 9), stoneMat);
  stepA.position.y = 0.11;
  stepA.receiveShadow = true;
  npcGroup.add(stepA);

  const stepB = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.5, 0.24, 9), stoneMat);
  stepB.position.y = 0.34;
  stepB.receiveShadow = true;
  npcGroup.add(stepB);

  // Glowing inner circular rune
  const runeCircle = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.0, 0.05, 36),
    new THREE.MeshStandardMaterial({
      color: themeHex,
      emissive: themeHex,
      emissiveIntensity: 0.75,
      transparent: true,
      opacity: 0.55,
    })
  );
  runeCircle.position.y = 0.47;
  npcGroup.add(runeCircle);

  // Soft ground glow disc
  const groundGlow = new THREE.Mesh(
    new THREE.CircleGeometry(2.9, 36),
    new THREE.MeshBasicMaterial({
      color: themeHex,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  groundGlow.rotation.x = -Math.PI / 2;
  groundGlow.position.y = 0.5;
  npcGroup.add(groundGlow);

  // ---------- 2. Materials ----------
  const robeMat = new THREE.MeshStandardMaterial({
    color: clothDeep,
    roughness: 0.78,
    metalness: 0.06,
    flatShading: true,
  });
  const robeLining = new THREE.MeshStandardMaterial({
    color: clothMid,
    roughness: 0.6,
    metalness: 0.12,
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: themeHex,
    roughness: 0.35,
    metalness: 0.35,
    emissive: themeHex,
    emissiveIntensity: 0.35,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xd9c08a,
    roughness: 0.3,
    metalness: 0.7,
  });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0x2a3348, roughness: 0.85 });

  // ---------- 3. Flowing robe (lathe silhouette) ----------
  const robeProfile: THREE.Vector2[] = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(0.62, 0.02),
    new THREE.Vector2(0.7, 0.16),
    new THREE.Vector2(0.6, 0.62),
    new THREE.Vector2(0.5, 1.18),
    new THREE.Vector2(0.44, 1.6),
    new THREE.Vector2(0.42, 1.85),
    new THREE.Vector2(0.42, 2.04),
  ];
  const robeMesh = new THREE.Mesh(new THREE.LatheGeometry(robeProfile, 16), robeMat);
  robeMesh.position.y = 0.5;
  robeMesh.castShadow = true;
  npcGroup.add(robeMesh);

  // Hem trim ring
  const hemTrim = new THREE.Mesh(new THREE.TorusGeometry(0.67, 0.04, 6, 24), accentMat);
  hemTrim.rotation.x = Math.PI / 2;
  hemTrim.position.y = 0.64;
  npcGroup.add(hemTrim);

  // ---------- 4. Cloak shell behind the shoulders ----------
  const cloak = new THREE.Mesh(
    new THREE.SphereGeometry(0.92, 18, 14, Math.PI * 0.28, Math.PI * 1.44, 0, Math.PI * 0.62),
    robeLining
  );
  cloak.scale.set(0.86, 1.4, 0.72);
  cloak.position.set(0, 2.28, -0.06);
  cloak.castShadow = true;
  npcGroup.add(cloak);

  // ---------- 5. Chest, stole and belt ----------
  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.44, 0.72, 14), robeMat);
  chest.position.y = 2.36;
  chest.castShadow = true;
  npcGroup.add(chest);

  const stoleL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 1.25, 0.08), accentMat);
  stoleL.position.set(-0.15, 1.95, 0.38);
  stoleL.rotation.z = 0.06;
  npcGroup.add(stoleL);
  const stoleR = stoleL.clone();
  stoleR.position.x = 0.17;
  stoleR.rotation.z = -0.06;
  npcGroup.add(stoleR);

  const belt = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.045, 6, 20), trimMat);
  belt.rotation.x = Math.PI / 2;
  belt.position.y = 2.02;
  npcGroup.add(belt);

  const clasp = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), accentMat);
  clasp.position.set(0, 2.02, 0.44);
  npcGroup.add(clasp);

  // ---------- 6. Shoulder mantle ----------
  const mantle = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
    robeLining
  );
  mantle.scale.set(0.9, 0.58, 0.86);
  mantle.position.y = 2.62;
  mantle.castShadow = true;
  npcGroup.add(mantle);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 6, 18), trimMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 2.74;
  npcGroup.add(collar);

  // ---------- 7. Sleeved arms ----------
  const makeArm = (side: 1 | -1) => {
    const arm = new THREE.Group();
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.24, 0.86, 10), robeMat);
    sleeve.position.y = -0.4;
    sleeve.castShadow = true;
    arm.add(sleeve);
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 6, 14), accentMat);
    cuff.rotation.x = Math.PI / 2;
    cuff.position.y = -0.8;
    arm.add(cuff);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), skinMat);
    hand.position.y = -0.92;
    arm.add(hand);
    arm.position.set(side * 0.42, 2.56, 0.04);
    arm.rotation.z = side * 0.22;
    arm.rotation.x = -0.18;
    return arm;
  };
  npcGroup.add(makeArm(1));
  npcGroup.add(makeArm(-1));

  // ---------- 8. Hood, cowl shadow and glowing eyes ----------
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.33, 16, 14), skinMat);
  head.position.set(0, 3.02, 0.02);
  npcGroup.add(head);

  const hood = new THREE.Mesh(
    new THREE.SphereGeometry(0.46, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.78),
    robeMat
  );
  hood.scale.set(1.0, 1.12, 1.06);
  hood.position.y = 3.06;
  hood.rotation.x = -0.16;
  hood.castShadow = true;
  npcGroup.add(hood);

  const cowlShadow = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 14, 12),
    new THREE.MeshBasicMaterial({ color: 0x05070d })
  );
  cowlShadow.scale.set(1.0, 0.9, 0.6);
  cowlShadow.position.set(0, 3.0, 0.19);
  npcGroup.add(cowlShadow);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfff3c4 });
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), eyeMat);
  eyeL.position.set(-0.11, 3.03, 0.33);
  npcGroup.add(eyeL);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.11;
  npcGroup.add(eyeR);

  const hoodPeak = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.42, 10), robeMat);
  hoodPeak.position.set(0, 3.5, -0.16);
  hoodPeak.rotation.x = 0.5;
  npcGroup.add(hoodPeak);

  // ---------- 9. Staff cradling the relic ----------
  const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 3.3, 8), trimMat);
  staff.position.set(1.0, 1.9, 0.3);
  staff.rotation.z = -0.06;
  staff.castShadow = true;
  npcGroup.add(staff);

  const socket = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 6, 20), accentMat);
  socket.position.set(1.0, 1.7, 0.3);
  socket.rotation.y = Math.PI / 2;
  npcGroup.add(socket);

  // ---------- 10. Unique floating sacred relic ----------
  let relicMesh: THREE.Mesh;
  if (npc.id === 'npc-zahra') {
    relicMesh = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.22, 0.06, 48, 8),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.8, roughness: 0.3 })
    );
  } else if (npc.id === 'npc-tariq') {
    relicMesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 1.0, roughness: 0.25, flatShading: true })
    );
  } else if (npc.id === 'npc-rayan') {
    relicMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.8, roughness: 0.3, flatShading: true })
    );
  } else if (npc.id === 'npc-idris') {
    relicMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.1, 0.32),
      new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.7, roughness: 0.35 })
    );
  } else if (npc.id === 'npc-layla') {
    relicMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.32, 0),
      new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0xc084fc, emissiveIntensity: 0.9, roughness: 0.2, flatShading: true })
    );
  } else {
    relicMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.05, 8, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.9, roughness: 0.3 })
    );
  }
  relicMesh.position.set(1.0, 1.7, 0.3);
  npcGroup.add(relicMesh);

  const relicAura = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 12, 10),
    new THREE.MeshBasicMaterial({
      color: themeHex,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  relicMesh.add(relicAura);

  // ---------- 11. Overhead halo + orbiting motes (motes ride the halo spin) ----------
  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.03, 8, 28),
    new THREE.MeshBasicMaterial({ color: themeHex, transparent: true, opacity: 0.9 })
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, 3.72, 0);
  npcGroup.add(halo);

  const moteMat = new THREE.MeshBasicMaterial({
    color: themeHex,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const moteGeo = new THREE.SphereGeometry(0.05, 6, 6);
  for (let i = 0; i < 7; i += 1) {
    const mote = new THREE.Mesh(moteGeo, moteMat);
    const a = (i / 7) * Math.PI * 2;
    const r = 0.85 + (i % 3) * 0.16;
    // halo is rotated flat, so local z becomes world height
    mote.position.set(Math.cos(a) * r, Math.sin(a) * r, (i % 2 === 0 ? 0.35 : -0.5) - i * 0.05);
    halo.add(mote);
  }

  // ---------- 12. Overhead rotating dialogue beacon rune ----------
  const beaconRune = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.34, 0),
    new THREE.MeshBasicMaterial({ color: themeHex })
  );
  beaconRune.position.set(0, 4.3, 0);
  npcGroup.add(beaconRune);

  // Overhead Canvas Billboard Sprite
  const nametagSprite = createNPCLabelSprite(npc.name, npc.title, npc.accentHex);
  nametagSprite.position.y = Math.max(nametagSprite.position.y, 5.1);
  npcGroup.add(nametagSprite);
  npcGroup.scale.setScalar(1.45);

  return { group: npcGroup, beaconRune, relicMesh, halo };
}

export const FlightWorld3D: React.FC<FlightWorld3DProps> = ({
  character,
  quests,
  petType,
  timeOfDay,
  onTimeOfDayChange,
  onEnterArea,
  onAwardXP,
  onDialogueComplete,
  onOpenGuideTab,
  onOpenArmoryModal,
  onAscendGear,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current?.parentElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // UI States
  const [speedKnots, setSpeedKnots] = useState(0);
  const [altitudeMeters, setAltitudeMeters] = useState(36);
  const [currentIsland, setCurrentIsland] = useState<HabitIsland | null>(null);
  const [nearSanctuary, setNearSanctuary] = useState<WorldArea | null>(null);
  const [nearSanctuaryIsland, setNearSanctuaryIsland] = useState<HabitIsland | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraMode, setCameraMode] = useState<'chase' | 'cinematic' | 'firstPerson'>('chase');
  const [flightState, setFlightState] = useState<'SOARING' | 'GLIDING' | 'DIVING' | 'BOOSTING' | 'PERCHED'>('PERCHED');
  const [isDofEnabled, setIsDofEnabled] = useState(false);
  const [bloomEnabled, setBloomEnabled] = useState(true);
  const [invertPitch, setInvertPitch] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [headingDegrees, setHeadingDegrees] = useState(0);

  // Character & Gear Panel States (Land Transformation Feature)
  const [isGearPanelOpen, setIsGearPanelOpen] = useState(false);
  const [isGroundedUI, setIsGroundedUI] = useState(true);
  const [transformToast, setTransformToast] = useState<string | null>(null);
  const transformToastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerTransformToast = useCallback((msg: string) => {
    setTransformToast(msg);
    if (transformToastTimeoutRef.current) clearTimeout(transformToastTimeoutRef.current);
    transformToastTimeoutRef.current = setTimeout(() => {
      setTransformToast(null);
    }, 4500);
  }, []);

  const triggerTransformToastRef = useRef(triggerTransformToast);
  triggerTransformToastRef.current = triggerTransformToast;

  // Pokemon-style NPC Interaction and Dialogue States
  const [nearNPC, setNearNPC] = useState<IslandNPC | null>(null);
  const [dialogueNPC, setDialogueNPC] = useState<IslandNPC | null>(null);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [dialogueLineIndex, setDialogueLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    soundSynth.init();
    soundSynth.startMusic();
    return () => soundSynth.stopMusic();
  }, []);

  // Interaction Refs for loop access
  const nearSanctuaryRef = useRef<WorldArea | null>(null);
  const nearSanctuaryIslandRef = useRef<HabitIsland | null>(null);
  nearSanctuaryRef.current = nearSanctuary;
  nearSanctuaryIslandRef.current = nearSanctuaryIsland;

  const nearNPCRef = useRef<IslandNPC | null>(null);
  nearNPCRef.current = nearNPC;

  const isDialogueOpenRef = useRef(false);
  isDialogueOpenRef.current = isDialogueOpen;

  const dialogueNPCRef = useRef<IslandNPC | null>(null);
  dialogueNPCRef.current = dialogueNPC;

  const dialogueLineIndexRef = useRef(0);
  dialogueLineIndexRef.current = dialogueLineIndex;

  const isTypingRef = useRef(false);
  isTypingRef.current = isTyping;

  const typewriterTimerRef = useRef<any>(null);

  const isDofEnabledRef = useRef(isDofEnabled);
  isDofEnabledRef.current = isDofEnabled;

  const invertPitchRef = useRef(invertPitch);
  invertPitchRef.current = invertPitch;

  const bloomEnabledRef = useRef(bloomEnabled);
  bloomEnabledRef.current = bloomEnabled;

  const bloomPassRef = useRef<UnrealBloomPass | null>(null);

  const wasGroundedRef = useRef(true);

  // Typewriter effect to display a line character by character like a classic Pokemon NPC
  const startTypewriter = useCallback((line: string) => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    setDisplayedText('');
    setIsTyping(true);
    isTypingRef.current = true;

    let charIdx = 0;
    typewriterTimerRef.current = setInterval(() => {
      charIdx++;
      if (charIdx <= line.length) {
        setDisplayedText(line.slice(0, charIdx));
        if (charIdx % 3 === 0) {
          soundSynth.playDialogueLetter();
        }
      } else {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
        setIsTyping(false);
        isTypingRef.current = false;
      }
    }, 22);
  }, []);

  // Open Pokemon-style Dialogue with specific NPC
  const handleOpenNPCDialogue = useCallback(
    (npc: IslandNPC) => {
      setDialogueNPC(npc);
      dialogueNPCRef.current = npc;
      setDialogueLineIndex(0);
      dialogueLineIndexRef.current = 0;
      setIsDialogueOpen(true);
      isDialogueOpenRef.current = true;
      soundSynth.playDialogueAdvance();

      if (npc.dialogueLines.length > 0) {
        startTypewriter(npc.dialogueLines[0]);
      }
    },
    [startTypewriter]
  );

  // Close Dialogue Box
  const handleCloseDialogue = useCallback(() => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    setIsDialogueOpen(false);
    isDialogueOpenRef.current = false;
    setIsTyping(false);
    isTypingRef.current = false;
    setDialogueNPC(null);
    dialogueNPCRef.current = null;
  }, []);

  const handleCloseDialogueRef = useRef(handleCloseDialogue);
  handleCloseDialogueRef.current = handleCloseDialogue;

  // Advance dialogue to next line on click/Space/Enter (or finish if on last line)
  const handleAdvanceDialogue = useCallback(() => {
    const npc = dialogueNPCRef.current;
    if (!npc) return;

    // If currently typing, immediately display full line so player can read without waiting!
    if (isTypingRef.current) {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      setIsTyping(false);
      isTypingRef.current = false;
      const fullLine = npc.dialogueLines[dialogueLineIndexRef.current];
      setDisplayedText(fullLine);
      return;
    }

    // If current line finished typing, proceed to next line or close
    const nextIdx = dialogueLineIndexRef.current + 1;
    if (nextIdx < npc.dialogueLines.length) {
      setDialogueLineIndex(nextIdx);
      dialogueLineIndexRef.current = nextIdx;
      soundSynth.playDialogueAdvance();
      startTypewriter(npc.dialogueLines[nextIdx]);
    } else {
      // Completed all lines
      onDialogueComplete?.(npc);
      handleCloseDialogue();
      soundSynth.playItemObtain();
    }
  }, [startTypewriter, handleCloseDialogue, onDialogueComplete]);

  const handleAdvanceDialogueRef = useRef(handleAdvanceDialogue);
  handleAdvanceDialogueRef.current = handleAdvanceDialogue;

  // Replay dialogue from beginning
  const handleRestartDialogue = useCallback(() => {
    const npc = dialogueNPCRef.current;
    if (!npc) return;
    setDialogueLineIndex(0);
    dialogueLineIndexRef.current = 0;
    soundSynth.playDialogueAdvance();
    startTypewriter(npc.dialogueLines[0]);
  }, [startTypewriter]);

  // Flight physics state
  const physicsRef = useRef({
    pos: new THREE.Vector3(0, 36, -38),
    vel: new THREE.Vector3(0, 0, 0),
    speed: 0,
    maxSpeed: 48,
    minSpeed: 4,
    boostMultiplier: 1.0,
    pitch: 0,
    yaw: 0,
    roll: 0,
    isGrounded: true,
    flappingWingPhase: 0,
    wingFlapSpeed: 6.0,
    isGliding: false,
    keys: {
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false,
      Space: false,
      ShiftLeft: false,
      ShiftRight: false,
      KeyE: false,
      KeyF: false,
    },
    mouseDrag: false,
    prevMouse: { x: 0, y: 0 },
    orbitOffset: new THREE.Vector2(0, 0),
    camYaw: 0,
    camPitch: 0.18,
  });
  const cameraInputAtRef = useRef(0);
  const petTypeRef = useRef<PetType>(petType);
  petTypeRef.current = petType;
  const [mobilePadPosition, setMobilePadPosition] = useState({ x: 0, y: 0 });

  const setMobileKey = useCallback((key: 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD' | 'Space' | 'KeyF', pressed: boolean) => {
    physicsRef.current.keys[key] = pressed;
    cameraInputAtRef.current = performance.now();
  }, []);

  const pressMobileKey = useCallback((key: 'Space' | 'KeyF') => {
    setMobileKey(key, true);
    window.setTimeout(() => setMobileKey(key, false), 120);
  }, [setMobileKey]);

  const updateMobileJoystick = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    const maxOffset = Math.min(rect.width, rect.height) * 0.34;
    const distance = Math.hypot(x, y);
    const scale = distance > maxOffset ? maxOffset / distance : 1;
    setMobilePadPosition({ x: x * scale, y: y * scale });
    const horizontal = Math.abs(x) > Math.abs(y) * 0.7;
    const keys = physicsRef.current.keys;
    keys.KeyW = !horizontal && y < -10;
    keys.KeyS = !horizontal && y > 10;
    keys.KeyA = horizontal && x < -10;
    keys.KeyD = horizontal && x > 10;
    cameraInputAtRef.current = performance.now();
  }, []);

  const releaseMobileJoystick = useCallback(() => {
    const keys = physicsRef.current.keys;
    keys.KeyW = false;
    keys.KeyS = false;
    keys.KeyA = false;
    keys.KeyD = false;
    setMobilePadPosition({ x: 0, y: 0 });
  }, []);

  // Handle Land & Enter Area
  const handleEnterNearestSanctuary = useCallback(() => {
    if (nearSanctuaryRef.current && nearSanctuaryIslandRef.current) {
      soundSynth.playChime(660);
      onEnterArea(nearSanctuaryRef.current, nearSanctuaryIslandRef.current);
    }
  }, [onEnterArea]);

  // Fast autopilot soar to selected island
  const handleFastSoarToIsland = (targetIsland: HabitIsland) => {
    soundSynth.playSpeedBoost();
    const config = islandConfigs.find((c) => c.island.id === targetIsland.id);
    if (!config) return;

    // Reposition bird 75 units in front of island at high altitude with heading towards it
    const approachDir = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2);
    const targetPos = config.pos.clone().add(approachDir.multiplyScalar(config.radius + 60));
    targetPos.y = config.pos.y + 45;

    physicsRef.current.pos.copy(targetPos);
    physicsRef.current.vel.set(0, 0, 0);
    physicsRef.current.isGrounded = false;
    setFlightState('SOARING');

    // Look at island center
    const toIsland = config.pos.clone().sub(targetPos).normalize();
    physicsRef.current.yaw = Math.atan2(toIsland.x, toIsland.z) + Math.PI;
    physicsRef.current.pitch = -0.15;
    physicsRef.current.speed = 24;
  };

  // Convert HABIT_ISLANDS to 3D Space Coordinates
  const islandConfigs: Island3DConfig[] = React.useMemo(() => {
    return HABIT_ISLANDS.map((island) => {
      const x = (island.x - 1100) * 0.45;
      const z = (island.y - 850) * 0.45;

      let y = 35;
      let col = 0x38bdf8;
      let acc = 0x60a5fa;
      let beacon = 0x38bdf8;

      switch (island.id) {
        case 'nexus':
          y = 30;
          col = 0xf59e0b;
          acc = 0xd97706;
          beacon = 0xfbbf24;
          break;
        case 'spirituality':
          y = 55;
          col = 0x38bdf8;
          acc = 0x0284c7;
          beacon = 0x38bdf8;
          break;
        case 'reflection':
          y = 45;
          col = 0xf43f5e;
          acc = 0xbe123c;
          beacon = 0xfb7185;
          break;
        case 'vitality':
          y = 40;
          col = 0x10b981;
          acc = 0x059669;
          beacon = 0x34d399;
          break;
        case 'wisdom':
          y = 65;
          col = 0x3b82f6;
          acc = 0x1d4ed8;
          beacon = 0x60a5fa;
          break;
        case 'creation':
          y = 50;
          col = 0xa855f7;
          acc = 0x7e22ce;
          beacon = 0xc084fc;
          break;
        case 'kinship':
          y = 34;
          col = 0xfb923c;
          acc = 0xc2410c;
          beacon = 0xfdba74;
          break;
        case 'courage':
          y = 60;
          col = 0xef4444;
          acc = 0x991b1b;
          beacon = 0xf87171;
          break;
        case 'abundance':
          y = 46;
          col = 0xa3e635;
          acc = 0x4d7c0f;
          beacon = 0xbef264;
          break;
        case 'tidewatch':
          y = 72;
          col = 0x2dd4bf;
          acc = 0x0f766e;
          beacon = 0x5eead4;
          break;
        case 'emberfall':
          y = 38;
          col = 0xf97316;
          acc = 0x7c2d12;
          beacon = 0xfdba74;
          break;
        case 'stillhollow':
          y = 82;
          col = 0x818cf8;
          acc = 0x3730a3;
          beacon = 0xa5b4fc;
          break;
        case 'wanderlight':
          y = 96;
          col = 0xe2e8f0;
          acc = 0x475569;
          beacon = 0xffffff;
          break;
        case 'saltgate':
          y = 30;
          col = 0x94a3b8;
          acc = 0x334155;
          beacon = 0xcbd5e1;
          break;
        case 'zenith':
          y = 150;
          col = 0xf8fafc;
          acc = 0x64748b;
          beacon = 0xffffff;
          break;
      }

      const sealed = chaptersOpenForIsland(island.id) === 0;
      if (sealed) {
        col = 0x2a2f38;
        acc = 0x1b1f26;
        beacon = 0x3f4652;
      }

      return {
        island,
        pos: new THREE.Vector3(x, y, z),
        radius: island.radius * 0.4,
        color: col,
        accentColor: acc,
        beaconColor: beacon,
        height: y,
        sealed,
      };
    });
  }, []);

  // Time of Day Palette Presets for Skybox and Environment
  const timeOfDayPalettes = React.useMemo(() => {
    return {
      dawn: {
        skyTop: new THREE.Color(0x1c2b48),
        skyHorizon: new THREE.Color(0xe07a5f),
        skyBottom: new THREE.Color(0x3d2645),
        sunPos: new THREE.Vector3(500, 320, -700).normalize(),
        sunColor: new THREE.Color(0xffd166),
        sunAuraColor: 0xf43f5e,
        ambientColor: new THREE.Color(0xfde2e4),
        ambientIntensity: 0.95,
        dirColor: new THREE.Color(0xffe8d6),
        dirIntensity: 1.8,
        fogColor: new THREE.Color(0x1e202f),
        cloudSeaColor: 0x241e30,
      },
      midday: {
        skyTop: new THREE.Color(0x0ea5e9),
        skyHorizon: new THREE.Color(0xbae6fd),
        skyBottom: new THREE.Color(0x38bdf8),
        sunPos: new THREE.Vector3(200, 900, -300).normalize(),
        sunColor: new THREE.Color(0xffffff),
        sunAuraColor: 0xfef08a,
        ambientColor: new THREE.Color(0xe0f2fe),
        ambientIntensity: 1.1,
        dirColor: new THREE.Color(0xfffbeb),
        dirIntensity: 2.2,
        fogColor: new THREE.Color(0x7dd3fc),
        cloudSeaColor: 0x1e3a5f,
      },
      golden_hour: {
        skyTop: new THREE.Color(0x312e81),
        skyHorizon: new THREE.Color(0xf59e0b),
        skyBottom: new THREE.Color(0x7c2d12),
        sunPos: new THREE.Vector3(450, 260, -750).normalize(),
        sunColor: new THREE.Color(0xfde047),
        sunAuraColor: 0xd97706,
        ambientColor: new THREE.Color(0xfef3c7),
        ambientIntensity: 0.9,
        dirColor: new THREE.Color(0xfbbf24),
        dirIntensity: 2.0,
        fogColor: new THREE.Color(0x2d1f30),
        cloudSeaColor: 0x361f2b,
      },
      twilight: {
        skyTop: new THREE.Color(0x0f172a),
        skyHorizon: new THREE.Color(0xa855f7),
        skyBottom: new THREE.Color(0x3b0764),
        sunPos: new THREE.Vector3(450, 150, -850).normalize(),
        sunColor: new THREE.Color(0xf43f5e),
        sunAuraColor: 0x9333ea,
        ambientColor: new THREE.Color(0xc084fc),
        ambientIntensity: 0.7,
        dirColor: new THREE.Color(0xd946ef),
        dirIntensity: 1.4,
        fogColor: new THREE.Color(0x181028),
        cloudSeaColor: 0x1f1430,
      },
      starlight: {
        skyTop: new THREE.Color(0x030712),
        skyHorizon: new THREE.Color(0x1e1b4b),
        skyBottom: new THREE.Color(0x0f172a),
        sunPos: new THREE.Vector3(300, 600, -700).normalize(),
        sunColor: new THREE.Color(0xe0e7ff),
        sunAuraColor: 0x6366f1,
        ambientColor: new THREE.Color(0x818cf8),
        ambientIntensity: 0.6,
        dirColor: new THREE.Color(0xc7d2fe),
        dirIntensity: 1.2,
        fogColor: new THREE.Color(0x080c16),
        cloudSeaColor: 0x0d131f,
      },
    };
  }, []);

  // Shared refs for dynamic time-of-day updates
  const envRefs = useRef<{
    skyMat?: THREE.ShaderMaterial;
    sunGroup?: THREE.Group;
    sunMeshMat?: THREE.MeshBasicMaterial;
    sunAuraMat?: THREE.MeshBasicMaterial;
    dirLight?: THREE.DirectionalLight;
    ambientLight?: THREE.AmbientLight;
    cloudSeaMat?: THREE.MeshStandardMaterial;
    scene?: THREE.Scene;
  }>({});

  // Main Three.js Setup & Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    envRefs.current.scene = scene;
    const curPalette = timeOfDayPalettes[timeOfDay] || timeOfDayPalettes.dawn;
    scene.fog = new THREE.FogExp2(curPalette.fogColor.getHex(), 0.0016);

    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.5,
      3500
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Beautiful Skybox & Celestial Dome
    const skyGeo = new THREE.SphereGeometry(2400, 32, 24);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: curPalette.skyTop.clone() },
        bottomColor: { value: curPalette.skyBottom.clone() },
        horizonColor: { value: curPalette.skyHorizon.clone() },
        sunPosition: { value: curPalette.sunPos.clone() },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform vec3 horizonColor;
        uniform vec3 sunPosition;
        uniform float time;
        varying vec3 vWorldPosition;

        // cheap value noise for nebula banding
        float hash(vec3 p) {
          return fract(sin(dot(p, vec3(17.13, 41.77, 91.31))) * 43758.5453);
        }
        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float n = mix(
            mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
            f.z);
          return n;
        }
        float fbm(vec3 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
          return v;
        }

        void main() {
          vec3 dir = normalize(vWorldPosition);
          float h = dir.y;

          // Atmospheric gradient with a soft, wide horizon band
          float up = smoothstep(0.0, 0.55, h);
          vec3 sky = mix(horizonColor, topColor, up);
          if (h < 0.0) {
            sky = mix(horizonColor, bottomColor, clamp(pow(-h, 0.6) * 1.7, 0.0, 1.0));
          }

          // Luminous horizon bloom that hugs the skyline
          float band = exp(-abs(h) * 7.0);
          sky += horizonColor * band * 0.32;

          // Drifting nebula veils, brighter high in the dome
          float veil = fbm(dir * 2.6 + vec3(time * 0.012, time * 0.006, -time * 0.009));
          float veilMask = smoothstep(0.02, 0.75, h) * smoothstep(0.35, 0.85, veil);
          sky += mix(topColor, vec3(0.75, 0.82, 1.0), 0.45) * veilMask * 0.22;

          // Fine celestial shimmer
          float shimmer = sin(dir.x * 20.0 + time * 0.2) * cos(dir.z * 20.0 + time * 0.15) * 0.02;
          sky += vec3(shimmer * 0.5, shimmer * 0.7, shimmer);

          // Luminous sun flare & coronal atmosphere
          float sunDot = max(dot(dir, sunPosition), 0.0);
          vec3 sunCore = vec3(1.0, 0.96, 0.85) * pow(sunDot, 220.0) * 3.0;
          vec3 sunHalo = vec3(1.0, 0.82, 0.55) * pow(sunDot, 22.0) * 0.85;
          vec3 sunGlow = horizonColor * pow(sunDot, 3.0) * 0.55;
          // anamorphic streak across the horizon
          float streak = pow(max(0.0, 1.0 - abs(h - sunPosition.y) * 9.0), 3.0) * pow(sunDot, 2.0);
          vec3 sunStreak = vec3(1.0, 0.88, 0.7) * streak * 0.35;

          vec3 col = sky + sunCore + sunHalo + sunGlow + sunStreak;
          // gentle dithering so wide gradients never band
          col += (hash(vec3(gl_FragCoord.xy, 1.0)) - 0.5) * 0.008;
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });
    envRefs.current.skyMat = skyMat;
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    scene.add(skyMesh);

    // Stars Field (3800 twinkling starlight points)
    const starCount = 3800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2100 + Math.random() * 200;
      const sinPhi = Math.sin(phi);
      starPositions[i * 3] = r * sinPhi * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 40;
      starPositions[i * 3 + 2] = r * sinPhi * Math.sin(theta);

      const isGold = Math.random() > 0.82;
      const isCyan = !isGold && Math.random() > 0.75;
      starColors[i * 3] = isGold ? 1.0 : isCyan ? 0.7 : 0.92;
      starColors[i * 3 + 1] = isGold ? 0.88 : isCyan ? 0.9 : 0.96;
      starColors[i * 3 + 2] = isGold ? 0.4 : 1.0;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 3.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Sun disc mesh with radiant coronal lens aura
    const sunGroup = new THREE.Group();
    envRefs.current.sunGroup = sunGroup;
    const sunMeshMat = new THREE.MeshBasicMaterial({ color: curPalette.sunColor });
    envRefs.current.sunMeshMat = sunMeshMat;
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(42, 16, 16), sunMeshMat);
    sunGroup.add(sunMesh);

    const sunAuraMat = new THREE.MeshBasicMaterial({
      color: curPalette.sunAuraColor,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
    });
    envRefs.current.sunAuraMat = sunAuraMat;
    const sunAura = new THREE.Mesh(new THREE.RingGeometry(42, 180, 36), sunAuraMat);
    sunGroup.add(sunAura);
    sunGroup.position.copy(curPalette.sunPos).multiplyScalar(1000);
    sunAura.lookAt(0, 0, 0);
    scene.add(sunGroup);

    // 3. Shimmering Ocean of Clouds beneath islands
    const cloudSeaGeo = new THREE.PlaneGeometry(3800, 3800, 64, 64);
    const cloudSeaMat = new THREE.MeshStandardMaterial({
      color: curPalette.cloudSeaColor,
      roughness: 0.35,
      metalness: 0.2,
      emissive: 0x0c1420,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.88,
    });
    envRefs.current.cloudSeaMat = cloudSeaMat;
    const cloudSea = new THREE.Mesh(cloudSeaGeo, cloudSeaMat);
    cloudSea.rotation.x = -Math.PI / 2;
    cloudSea.position.y = -60;
    scene.add(cloudSea);

    // Floating fluffy cloud clusters
    const cloudGroup = new THREE.Group();
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xe2eaf4,
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: 0.48,
    });
    for (let c = 0; c < 32; c++) {
      const puffCluster = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 5);
      for (let p = 0; p < numPuffs; p++) {
        const radius = 24 + Math.random() * 38;
        const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 1), cloudMat);
        puff.position.set(
          (Math.random() - 0.5) * 70,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 70
        );
        puffCluster.add(puff);
      }
      puffCluster.position.set(
        (Math.random() - 0.5) * 1800,
        -15 + Math.random() * 50,
        (Math.random() - 0.5) * 1800
      );
      cloudGroup.add(puffCluster);
    }
    scene.add(cloudGroup);

    // Atmospheric depth: luminous horizon haze + drifting mist sheets + sun shafts
    const gradientTexture = (stops: [number, string][], vertical = true) => {
      const cv = document.createElement('canvas');
      cv.width = vertical ? 4 : 256;
      cv.height = vertical ? 256 : 4;
      const ctx = cv.getContext('2d');
      const grd = vertical
        ? ctx.createLinearGradient(0, cv.height, 0, 0)
        : ctx.createLinearGradient(0, 0, cv.width, 0);
      stops.forEach(([at, color]) => grd.addColorStop(at, color));
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, cv.width, cv.height);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const radialTexture = () => {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 256;
      const ctx = cv.getContext('2d');
      const grd = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
      grd.addColorStop(0, 'rgba(255,255,255,0.55)');
      grd.addColorStop(0.45, 'rgba(255,255,255,0.16)');
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 256, 256);
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const hazeMat = new THREE.MeshBasicMaterial({
      map: gradientTexture([
        [0, 'rgba(255,255,255,0.55)'],
        [0.35, 'rgba(255,255,255,0.18)'],
        [1, 'rgba(255,255,255,0)'],
      ]),
      color: curPalette.skyHorizon.clone(),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
      fog: false,
    });
    const horizonHaze = new THREE.Mesh(
      new THREE.CylinderGeometry(1900, 1900, 900, 48, 1, true),
      hazeMat
    );
    horizonHaze.position.y = 120;
    scene.add(horizonHaze);
    envRefs.current.hazeMat = hazeMat;

    const mistTex = radialTexture();
    const mistSheets: THREE.Mesh[] = [];
    for (let m = 0; m < 4; m++) {
      const mat = new THREE.MeshBasicMaterial({
        map: mistTex,
        color: 0xdce9ff,
        transparent: true,
        opacity: 0.14 + m * 0.03,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const sheet = new THREE.Mesh(new THREE.PlaneGeometry(2600, 2600), mat);
      sheet.rotation.x = -Math.PI / 2;
      sheet.position.y = -46 + m * 22;
      sheet.rotation.z = Math.random() * Math.PI;
      scene.add(sheet);
      mistSheets.push(sheet);
    }

    // Volumetric sun shafts: soft additive blades aimed down from the sun
    const shaftGroup = new THREE.Group();
    const shaftTex = gradientTexture([
      [0, 'rgba(255,255,255,0)'],
      [0.55, 'rgba(255,255,255,0.35)'],
      [1, 'rgba(255,255,255,0)'],
    ]);
    for (let s = 0; s < 7; s++) {
      const mat = new THREE.MeshBasicMaterial({
        map: shaftTex,
        color: curPalette.sunColor.clone(),
        transparent: true,
        opacity: 0.1 + Math.random() * 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const blade = new THREE.Mesh(new THREE.PlaneGeometry(70 + Math.random() * 120, 1400), mat);
      blade.position.set((Math.random() - 0.5) * 700, 300, (Math.random() - 0.5) * 700);
      blade.rotation.y = Math.random() * Math.PI;
      blade.rotation.z = (Math.random() - 0.5) * 0.25;
      shaftGroup.add(blade);
    }
    scene.add(shaftGroup);
    envRefs.current.shaftGroup = shaftGroup;

    // Ambient floating celestial feathers / dust motes in sky
    const moteCount = 180;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 200;
      motePos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: 0xdbeafe,
      size: 0.9,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const motePoints = new THREE.Points(moteGeo, moteMat);
    scene.add(motePoints);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(curPalette.ambientColor, curPalette.ambientIntensity);
    envRefs.current.ambientLight = ambientLight;
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(curPalette.dirColor, curPalette.dirIntensity);
    dirLight.position.copy(curPalette.sunPos).multiplyScalar(1000);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 100;
    dirLight.shadow.camera.far = 2500;
    const shadowD = 800;
    dirLight.shadow.camera.left = -shadowD;
    dirLight.shadow.camera.right = shadowD;
    dirLight.shadow.camera.top = shadowD;
    dirLight.shadow.camera.bottom = -shadowD;
    envRefs.current.dirLight = dirLight;
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xa9c9ff, 0x2b2338, 1.15);
    scene.add(hemiLight);

    // Cool bounce fill from the opposite side so island faces never read as silhouettes
    const fillLight = new THREE.DirectionalLight(0x9ec5ff, 0.85);
    fillLight.position.copy(curPalette.sunPos).multiplyScalar(-900).setY(320);
    scene.add(fillLight);
    envRefs.current.fillLight = fillLight;

    // Warm rim from below, lifting the underside of every floating rock
    const rimLight = new THREE.DirectionalLight(0xffc98a, 0.45);
    rimLight.position.set(0, -600, 400);
    scene.add(rimLight);

    // 5. Construct 3D Floating Habit Islands
    const islandMeshes: THREE.Group[] = [];
    const islandBeaconRays: THREE.Mesh[] = [];

    islandConfigs.forEach((cfg) => {
      const islandRoot = new THREE.Group();
      islandRoot.position.copy(cfg.pos);

      // Main plateau top
      const topGeo = new THREE.CylinderGeometry(cfg.radius, cfg.radius * 0.85, 12, 32);
      const topMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.65,
        metalness: 0.15,
        flatShading: true,
      });
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.receiveShadow = true;
      islandRoot.add(topMesh);

      // Rugged bottom floating stalactite — tinted rock, lit veins, never a flat silhouette
      const rockTint = new THREE.Color(cfg.color).lerp(new THREE.Color(0x2b3444), 0.66);
      const botGeo = new THREE.ConeGeometry(cfg.radius * 0.85, cfg.radius * 1.4, 24);
      // rough up the cone so light breaks across facets
      {
        const pos = botGeo.attributes.position;
        for (let v = 0; v < pos.count; v++) {
          const y = pos.getY(v);
          if (y > -cfg.radius * 1.3) {
            pos.setX(v, pos.getX(v) * (0.86 + Math.random() * 0.3));
            pos.setZ(v, pos.getZ(v) * (0.86 + Math.random() * 0.3));
          }
        }
        botGeo.computeVertexNormals();
      }
      const botMat = new THREE.MeshStandardMaterial({
        color: rockTint,
        roughness: 0.88,
        metalness: 0.12,
        emissive: new THREE.Color(cfg.beaconColor),
        emissiveIntensity: 0.075,
        flatShading: true,
      });
      const botMesh = new THREE.Mesh(botGeo, botMat);
      botMesh.rotation.x = Math.PI;
      botMesh.position.y = -cfg.radius * 0.7;
      botMesh.castShadow = true;
      islandRoot.add(botMesh);

      // Glowing crystal veins hugging the underside
      const veinMesh = new THREE.Mesh(
        new THREE.ConeGeometry(cfg.radius * 0.9, cfg.radius * 1.5, 12, 1, true),
        new THREE.MeshBasicMaterial({
          color: cfg.beaconColor,
          transparent: true,
          opacity: 0.14,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.BackSide,
          wireframe: true,
        })
      );
      veinMesh.rotation.x = Math.PI;
      veinMesh.position.y = -cfg.radius * 0.72;
      islandRoot.add(veinMesh);

      // Mossy stratum band where plateau meets rock
      const stratum = new THREE.Mesh(
        new THREE.CylinderGeometry(cfg.radius * 0.93, cfg.radius * 0.84, 5, 32),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(cfg.color).lerp(new THREE.Color(0x0b1220), 0.4),
          roughness: 0.95,
          flatShading: true,
        })
      );
      stratum.position.y = -7;
      islandRoot.add(stratum);

      // Outer glowing sanctuary boundary ring
      const ringGeo = new THREE.TorusGeometry(cfg.radius * 1.08, 1.2, 12, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.beaconColor,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 2;
      islandRoot.add(ringMesh);

      // Landmark / Monument structure in center
      const landmarkGroup = new THREE.Group();
      landmarkGroup.position.y = 6;

      if (cfg.island.id === 'spirituality') {
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({
            color: 0xbae6fd,
            roughness: 0.2,
            metalness: 0.8,
            transparent: true,
            opacity: 0.85,
          })
        );
        landmarkGroup.add(dome);
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const spire = new THREE.Mesh(
            new THREE.ConeGeometry(2.5, 28, 6),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1 })
          );
          spire.position.set(Math.cos(angle) * 26, 14, Math.sin(angle) * 26);
          landmarkGroup.add(spire);
        }
      } else if (cfg.island.id === 'reflection') {
        const arch = new THREE.Mesh(
          new THREE.TorusGeometry(20, 3, 12, 32, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.9 })
        );
        arch.position.y = 10;
        landmarkGroup.add(arch);
        const hearth = new THREE.Mesh(
          new THREE.CylinderGeometry(8, 10, 4, 16),
          new THREE.MeshStandardMaterial({ color: 0x27272a })
        );
        hearth.position.y = 2;
        landmarkGroup.add(hearth);
        const fire = new THREE.Mesh(
          new THREE.OctahedronGeometry(6, 2),
          new THREE.MeshBasicMaterial({ color: 0xf43f5e })
        );
        fire.position.y = 8;
        landmarkGroup.add(fire);
      } else if (cfg.island.id === 'vitality') {
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(4, 7, 30, 8),
          new THREE.MeshStandardMaterial({ color: 0x45220c })
        );
        trunk.position.y = 15;
        landmarkGroup.add(trunk);
        const foliage = new THREE.Mesh(
          new THREE.DodecahedronGeometry(22, 1),
          new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.8 })
        );
        foliage.position.y = 36;
        landmarkGroup.add(foliage);
      } else if (cfg.island.id === 'wisdom') {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(18, 22, 12, 16),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0 })
        );
        base.position.y = 6;
        landmarkGroup.add(base);
        const astrolabe = new THREE.Mesh(
          new THREE.TorusGeometry(16, 1.2, 12, 36),
          new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 })
        );
        astrolabe.position.y = 22;
        astrolabe.name = 'astrolabeRing';
        landmarkGroup.add(astrolabe);
      } else if (cfg.island.id === 'creation') {
        const prism = new THREE.Mesh(
          new THREE.OctahedronGeometry(14, 0),
          new THREE.MeshStandardMaterial({
            color: 0xc084fc,
            metalness: 0.6,
            roughness: 0.1,
            transparent: true,
            opacity: 0.9,
          })
        );
        prism.position.y = 20;
        landmarkGroup.add(prism);
      } else if (cfg.island.id === 'kinship') {
        // Rope bridges to nowhere, joined by a hearth on the longest span
        const hearthBowl = new THREE.Mesh(
          new THREE.CylinderGeometry(7, 9, 4, 14),
          new THREE.MeshStandardMaterial({ color: 0x3f2a17, roughness: 0.85 })
        );
        hearthBowl.position.y = 2;
        landmarkGroup.add(hearthBowl);
        const hearthFire = new THREE.Mesh(
          new THREE.IcosahedronGeometry(5, 1),
          new THREE.MeshBasicMaterial({ color: 0xfb923c })
        );
        hearthFire.position.y = 8;
        landmarkGroup.add(hearthFire);
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
          const post = new THREE.Mesh(
            new THREE.CylinderGeometry(1.1, 1.4, 20, 8),
            new THREE.MeshStandardMaterial({ color: 0x51341c, roughness: 0.9 })
          );
          post.position.set(Math.cos(angle) * 24, 10, Math.sin(angle) * 24);
          landmarkGroup.add(post);
          const rope = new THREE.Mesh(
            new THREE.TorusGeometry(24, 0.5, 6, 40, Math.PI / 2),
            new THREE.MeshStandardMaterial({
              color: 0xfdba74,
              emissive: 0xfb923c,
              emissiveIntensity: 0.25,
              roughness: 0.7,
            })
          );
          rope.rotation.x = Math.PI / 2;
          rope.rotation.z = angle;
          rope.position.y = 16;
          landmarkGroup.add(rope);
        }
      } else if (cfg.island.id === 'courage') {
        // A plaza of black arches, each smaller than the last
        for (let i = 0; i < 4; i++) {
          const scale = 1 - i * 0.18;
          const arch = new THREE.Mesh(
            new THREE.TorusGeometry(11 * scale, 1.6 * scale, 10, 26, Math.PI),
            new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6, metalness: 0.35 })
          );
          arch.position.set(0, 1, -20 + i * 14);
          landmarkGroup.add(arch);
          const lintelGlow = new THREE.Mesh(
            new THREE.BoxGeometry(2.2 * scale, 0.6, 0.6),
            new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.75 })
          );
          lintelGlow.position.set(0, 12 * scale, -20 + i * 14);
          landmarkGroup.add(lintelGlow);
        }
      } else if (cfg.island.id === 'abundance') {
        // Round granaries with chalk-line bands and an open ledger stand
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          const silo = new THREE.Mesh(
            new THREE.CylinderGeometry(7, 8.5, 22, 14),
            new THREE.MeshStandardMaterial({ color: 0xd9d2b6, roughness: 0.85 })
          );
          silo.position.set(Math.cos(angle) * 18, 11, Math.sin(angle) * 18);
          landmarkGroup.add(silo);
          const cap = new THREE.Mesh(
            new THREE.ConeGeometry(9.5, 7, 14),
            new THREE.MeshStandardMaterial({ color: 0x4d7c0f, roughness: 0.7 })
          );
          cap.position.set(Math.cos(angle) * 18, 25, Math.sin(angle) * 18);
          landmarkGroup.add(cap);
          const chalk = new THREE.Mesh(
            new THREE.TorusGeometry(8.1, 0.35, 6, 24),
            new THREE.MeshBasicMaterial({ color: 0xbef264, transparent: true, opacity: 0.8 })
          );
          chalk.rotation.x = Math.PI / 2;
          chalk.position.set(Math.cos(angle) * 18, 16, Math.sin(angle) * 18);
          landmarkGroup.add(chalk);
        }
        const ledger = new THREE.Mesh(
          new THREE.BoxGeometry(9, 0.8, 6),
          new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: 0.6 })
        );
        ledger.rotation.x = -0.35;
        ledger.position.y = 6;
        landmarkGroup.add(ledger);
      } else if (cfg.island.id === 'tidewatch') {
        // Tiered water basins and hanging tide bells
        for (let i = 0; i < 4; i++) {
          const basin = new THREE.Mesh(
            new THREE.CylinderGeometry(16 - i * 3.4, 15 - i * 3.4, 2.4, 26),
            new THREE.MeshStandardMaterial({ color: 0x0e7490, roughness: 0.45, metalness: 0.3 })
          );
          basin.position.y = 3 + i * 4.2;
          landmarkGroup.add(basin);
          const water = new THREE.Mesh(
            new THREE.CylinderGeometry(15 - i * 3.4, 15 - i * 3.4, 0.4, 26),
            new THREE.MeshBasicMaterial({ color: 0x5eead4, transparent: true, opacity: 0.55 })
          );
          water.position.y = 4.4 + i * 4.2;
          landmarkGroup.add(water);
        }
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          const bell = new THREE.Mesh(
            new THREE.ConeGeometry(3.2, 5.5, 14, 1, true),
            new THREE.MeshStandardMaterial({
              color: 0x0d9488,
              emissive: 0x2dd4bf,
              emissiveIntensity: 0.3,
              metalness: 0.7,
              roughness: 0.35,
              side: THREE.DoubleSide,
            })
          );
          bell.position.set(Math.cos(angle) * 24, 18, Math.sin(angle) * 24);
          landmarkGroup.add(bell);
        }
      } else if (cfg.island.id === 'emberfall') {
        // A broken cone streaming ember light upward, ringed with cold hearths
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(15, 26, 12, 1, true),
          new THREE.MeshStandardMaterial({
            color: 0x1c1917,
            emissive: 0xf97316,
            emissiveIntensity: 0.35,
            roughness: 0.9,
            side: THREE.DoubleSide,
          })
        );
        cone.position.y = 13;
        landmarkGroup.add(cone);
        const plume = new THREE.Mesh(
          new THREE.CylinderGeometry(3.5, 7, 40, 12, 1, true),
          new THREE.MeshBasicMaterial({ color: 0xfdba74, transparent: true, opacity: 0.22 })
        );
        plume.position.y = 40;
        landmarkGroup.add(plume);
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const hearth = new THREE.Mesh(
            new THREE.TorusGeometry(3.4, 1.1, 8, 18),
            new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.95 })
          );
          hearth.rotation.x = Math.PI / 2;
          hearth.position.set(Math.cos(angle) * 26, 1.4, Math.sin(angle) * 26);
          landmarkGroup.add(hearth);
          const flame = new THREE.Mesh(
            new THREE.SphereGeometry(1.5, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.85 })
          );
          flame.position.set(Math.cos(angle) * 26, 2.6, Math.sin(angle) * 26);
          landmarkGroup.add(flame);
        }
      } else if (cfg.island.id === 'stillhollow') {
        // A vast open shell that hums, with a ring of standing echo stones
        const shell = new THREE.Mesh(
          new THREE.SphereGeometry(22, 30, 20, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({
            color: 0x1e1b4b,
            emissive: 0x818cf8,
            emissiveIntensity: 0.22,
            roughness: 0.5,
            metalness: 0.25,
            side: THREE.DoubleSide,
          })
        );
        shell.position.y = 2;
        landmarkGroup.add(shell);
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const stone = new THREE.Mesh(
            new THREE.BoxGeometry(2.4, 12 + (i % 3) * 3, 2.4),
            new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.75 })
          );
          stone.position.set(Math.cos(angle) * 30, 7, Math.sin(angle) * 30);
          stone.rotation.y = angle;
          landmarkGroup.add(stone);
          const glow = new THREE.Mesh(
            new THREE.SphereGeometry(0.9, 10, 10),
            new THREE.MeshBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.8 })
          );
          glow.position.set(Math.cos(angle) * 30, 15 + (i % 3) * 3, Math.sin(angle) * 30);
          landmarkGroup.add(glow);
        }
      } else if (cfg.island.id === 'wanderlight') {
        // A bare white slab, a lamp pole, and light that falls outward
        const slab = new THREE.Mesh(
          new THREE.CylinderGeometry(26, 24, 1.4, 24),
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6, metalness: 0.1 })
        );
        slab.position.y = 1;
        landmarkGroup.add(slab);
        const pole = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.6, 18, 10),
          new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, metalness: 0.6 })
        );
        pole.position.set(4, 10, -2);
        landmarkGroup.add(pole);
        const lamp = new THREE.Mesh(
          new THREE.SphereGeometry(2.2, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 })
        );
        lamp.position.set(4, 19, -2);
        landmarkGroup.add(lamp);
        const lampLight = new THREE.PointLight(0xfff6e0, 3.2, 220, 2);
        lampLight.position.copy(lamp.position);
        landmarkGroup.add(lampLight);
        for (let i = 0; i < 6; i++) {
          const marker = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 2.4, 1.2),
            new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.7 })
          );
          marker.position.set(-18 + i * 7, 2.4, 12);
          landmarkGroup.add(marker);
        }
      } else if (cfg.island.id === 'saltgate') {
        // A cut harbour of moored boats along two stone quays
        const quayMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 });
        [-14, 14].forEach((z) => {
          const quay = new THREE.Mesh(new THREE.BoxGeometry(52, 2.4, 6), quayMat);
          quay.position.set(0, 1.4, z);
          landmarkGroup.add(quay);
        });
        const water = new THREE.Mesh(
          new THREE.PlaneGeometry(52, 20),
          new THREE.MeshStandardMaterial({
            color: 0x0f2b31,
            emissive: 0x134e4a,
            emissiveIntensity: 0.25,
            roughness: 0.25,
            metalness: 0.5,
          })
        );
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0.7;
        landmarkGroup.add(water);
        for (let i = 0; i < 8; i++) {
          const hull = new THREE.Mesh(
            new THREE.CapsuleGeometry(1.3, 4.4, 6, 10),
            new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 })
          );
          hull.rotation.z = Math.PI / 2;
          hull.position.set(-21 + i * 6, 1.6, i % 2 === 0 ? -8 : 8);
          landmarkGroup.add(hull);
          const mast = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.22, 8, 6),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 })
          );
          mast.position.set(hull.position.x, 5.6, hull.position.z);
          landmarkGroup.add(mast);
        }
      } else if (cfg.island.id === 'zenith') {
        // A ring of white stone with nothing inside it, and a drafting table on the rim
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(30, 2.4, 12, 48),
          new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            emissive: 0xffffff,
            emissiveIntensity: 0.18,
            roughness: 0.35,
            metalness: 0.35,
          })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 3;
        landmarkGroup.add(ring);
        const table = new THREE.Mesh(
          new THREE.BoxGeometry(9, 0.6, 6),
          new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5 })
        );
        table.position.set(0, 5.4, -26);
        table.rotation.z = -0.06;
        landmarkGroup.add(table);
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const spark = new THREE.Mesh(
            new THREE.SphereGeometry(0.6, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
          );
          spark.position.set(Math.cos(angle) * 30, 7 + (i % 4) * 1.6, Math.sin(angle) * 30);
          landmarkGroup.add(spark);
        }
        const rimLight = new THREE.PointLight(0xffffff, 2.4, 260, 2);
        rimLight.position.set(0, 12, 0);
        landmarkGroup.add(rimLight);
      } else {
        // --- THE NEXUS INTRODUCTORY STRAIGHT SANCTUARY WALKWAY ---
        const pathGroup = new THREE.Group();

        // 1. Dark slate paver road base (spanning Z = -44 to +44, exactly aligned with Z axis)
        const paverMesh = new THREE.Mesh(
          new THREE.BoxGeometry(8.0, 0.4, 88),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8, metalness: 0.2 })
        );
        paverMesh.position.set(0, 0.2, 0);
        paverMesh.receiveShadow = true;
        pathGroup.add(paverMesh);

        // Golden Rune Runner down the exact center
        const runeStripMesh = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.45, 88),
          new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            emissive: 0xd97706,
            emissiveIntensity: 0.4,
            roughness: 0.4,
          })
        );
        runeStripMesh.position.set(0, 0.22, 0);
        pathGroup.add(runeStripMesh);

        // Side Stone Border Curbs
        const leftCurb = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.6, 88),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
        );
        leftCurb.position.set(-4.1, 0.3, 0);
        pathGroup.add(leftCurb);

        const rightCurb = leftCurb.clone();
        rightCurb.position.x = 4.1;
        pathGroup.add(rightCurb);

        // 2. Starting Moon Gate / Arch of Intention at Z = -42 (behind the player start)
        const archGroup = new THREE.Group();
        archGroup.position.set(0, 0, -42);

        const pillarLeft = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.75, 8, 16),
          new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
        );
        pillarLeft.position.set(-4.5, 4, 0);
        archGroup.add(pillarLeft);

        const pillarRight = pillarLeft.clone();
        pillarRight.position.x = 4.5;
        archGroup.add(pillarRight);

        const archLintel = new THREE.Mesh(
          new THREE.BoxGeometry(11, 1.2, 1.4),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
        );
        archLintel.position.set(0, 8.2, 0);
        archGroup.add(archLintel);

        const crownJewel = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.8, 0),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.9 })
        );
        crownJewel.position.set(0, 9.4, 0);
        archGroup.add(crownJewel);

        pathGroup.add(archGroup);

        // 3. Runway of Glowing Stone Lantern Pedestals along the straight path
        const lanternZCoords = [-32, -20, -10, 10, 20, 32];
        lanternZCoords.forEach((lz) => {
          [-4.8, 4.8].forEach((lx) => {
            const pedestal = new THREE.Mesh(
              new THREE.CylinderGeometry(0.35, 0.45, 2.4, 8),
              new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
            );
            pedestal.position.set(lx, 1.2, lz);
            pathGroup.add(pedestal);

            const lanternOrb = new THREE.Mesh(
              new THREE.SphereGeometry(0.38, 12, 12),
              new THREE.MeshStandardMaterial({
                color: 0xfbbf24,
                emissive: 0xf59e0b,
                emissiveIntensity: 1.2,
                roughness: 0.2,
              })
            );
            lanternOrb.position.set(lx, 2.6, lz);
            pathGroup.add(lanternOrb);
          });
        });

        // 4. Center Astral Sundial Plaza at Z = 0
        const plazaBase = new THREE.Mesh(
          new THREE.CylinderGeometry(14, 15, 0.45, 32),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
        );
        plazaBase.position.set(0, 0.22, 0);
        pathGroup.add(plazaBase);

        // Gilded Astral Rings Monument (offset to left at X = -7.5, leaving path open for walking straight)
        const sundialBase = new THREE.Mesh(
          new THREE.CylinderGeometry(3, 4, 1.8, 16),
          new THREE.MeshStandardMaterial({ color: 0x334155 })
        );
        sundialBase.position.set(-7.5, 1.0, 0);
        pathGroup.add(sundialBase);

        const sundialRings = new THREE.Mesh(
          new THREE.TorusGeometry(3.5, 0.25, 12, 32),
          new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.2 })
        );
        sundialRings.rotation.x = Math.PI / 4;
        sundialRings.position.set(-7.5, 3.2, 0);
        pathGroup.add(sundialRings);

        const gnomonPillar = new THREE.Mesh(
          new THREE.ConeGeometry(0.5, 6, 8),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7 })
        );
        gnomonPillar.position.set(-7.5, 4.0, 0);
        pathGroup.add(gnomonPillar);

        // 5. Introductory Inscription Steles along the walkway
        const stele1 = new THREE.Mesh(
          new THREE.BoxGeometry(1.0, 2.6, 0.3),
          new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
        );
        stele1.position.set(-4.8, 1.3, -20);
        pathGroup.add(stele1);

        const stele2 = stele1.clone();
        stele2.position.set(-4.8, 1.3, 20);
        pathGroup.add(stele2);

        // 6. The Celestial Flight Overlook Terrace at Z = +42
        const terrace = new THREE.Mesh(
          new THREE.CylinderGeometry(8, 9, 0.5, 24, 1, false, 0, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 })
        );
        terrace.rotation.y = -Math.PI / 2;
        terrace.position.set(0, 0.25, 43);
        pathGroup.add(terrace);

        // Luminous Flight Launchpad Ring at Overlook
        const launchRing = new THREE.Mesh(
          new THREE.TorusGeometry(3.6, 0.2, 12, 32),
          new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            emissive: 0x0284c7,
            emissiveIntensity: 0.9,
          })
        );
        launchRing.rotation.x = Math.PI / 2;
        launchRing.position.set(0, 0.35, 41);
        pathGroup.add(launchRing);

        landmarkGroup.add(pathGroup);
      }

      islandRoot.add(landmarkGroup);

      // Sky Beacon (Vertical Pillar of Light)
      const beaconGeo = new THREE.CylinderGeometry(1.5, 4, 400, 16, 1, true);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: cfg.beaconColor,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = 200;
      islandRoot.add(beacon);
      islandBeaconRays.push(beacon);

      scene.add(islandRoot);
      islandMeshes.push(islandRoot);
    });

    // 5.5. POPULATE TALKABLE SPIRITUAL NPCS ON THE ISLANDS
    const npcEntities: {
      npc: IslandNPC;
      group: THREE.Group;
      beaconRune: THREE.Mesh;
      relicMesh: THREE.Mesh;
      halo: THREE.Mesh;
      worldPos: THREE.Vector3;
    }[] = [];

    ISLAND_NPCS.forEach((npc) => {
      const islandCfg = islandConfigs.find((c) => c.island.id === npc.islandId);
      if (!islandCfg) return;
      // Keepers arrive with the campaign: the island must be awake, and later
      // keepers wait for their chapter to open.
      const chaptersHere = chaptersOpenForIsland(npc.islandId);
      if (chaptersHere < (npc.requiresChapter ?? 1)) return;


      const entity = createNPCEntity(npc);
      const worldX = islandCfg.pos.x + npc.localPos.x;
      const worldY = islandCfg.pos.y + npc.localPos.y;
      const worldZ = islandCfg.pos.z + npc.localPos.z;

      entity.group.position.set(worldX, worldY, worldZ);
      // Face towards approaching fliers
      entity.group.lookAt(islandCfg.pos.x, worldY, islandCfg.pos.z);
      entity.group.rotation.y += Math.PI; // Face outwards toward visitor
      scene.add(entity.group);

      npcEntities.push({
        npc,
        group: entity.group,
        beaconRune: entity.beaconRune,
        relicMesh: entity.relicMesh,
        halo: entity.halo,
        worldPos: new THREE.Vector3(worldX, worldY, worldZ),
      });
    });

    // 6. BUILD THE MAJESTIC SPIRITUAL WHITE BIRD
    const birdRoot = new THREE.Group();
    const birdBody = new THREE.Group();
    birdBody.visible = false; // Initially grounded with Wayfarer character
    birdRoot.add(birdBody);

    // Small companion that follows behind the grounded wayfarer.
    const petRoot = new THREE.Group();
    const petGroups: Record<PetType, THREE.Group> = {
      cat: new THREE.Group(),
      dog: new THREE.Group(),
      turtle: new THREE.Group(),
    };
    const petBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.8 });
    const petDarkMaterial = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.75 });
    const petShellMaterial = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.9 });
    const petEyeMaterial = new THREE.MeshBasicMaterial({ color: 0x111827 });
    const addPetBody = (group: THREE.Group, body: THREE.Mesh, ears: THREE.Mesh[] = []) => {
      body.position.y = 0.45;
      body.castShadow = true;
      group.add(body);
      ears.forEach((ear) => {
        ear.castShadow = true;
        group.add(ear);
      });
    };
    addPetBody(
      petGroups.cat,
      new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), petBodyMaterial),
      [
        new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 4), petBodyMaterial),
        new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.42, 4), petBodyMaterial),
      ],
    );
    petGroups.cat.children[1].position.set(-0.2, 0.85, 0);
    petGroups.cat.children[2].position.set(0.2, 0.85, 0);
    [-0.14, 0.14].forEach((x) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), petEyeMaterial);
      eye.position.set(x, 0.53, 0.38);
      petGroups.cat.add(eye);
    });
    addPetBody(
      petGroups.dog,
      new THREE.Mesh(new THREE.SphereGeometry(0.48, 12, 10), petDarkMaterial),
      [new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), petDarkMaterial)],
    );
    petGroups.dog.children[1].position.set(0, 0.82, 0.28);
    const dogNose = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), petEyeMaterial);
    dogNose.position.set(0, 0.48, 0.48);
    petGroups.dog.add(dogNose);
    addPetBody(petGroups.turtle, new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 8), petShellMaterial));
    petGroups.turtle.children[0].scale.set(1.15, 0.55, 1.25);
    Object.values(petGroups).forEach((group) => {
      group.visible = false;
      group.scale.setScalar(1.35);
      petRoot.add(group);
    });
    scene.add(petRoot);

    // Materials for White Bird
    const whiteFeatherMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.28,
      metalness: 0.08,
      emissive: 0xffffff,
      emissiveIntensity: 0.08,
    });

    const softWingTipMat = new THREE.MeshStandardMaterial({
      color: 0xf0fdf4,
      roughness: 0.2,
      metalness: 0.12,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });

    const amberGoldBeakMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.5,
    });

    const darkEyeMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.1,
      metalness: 0.9,
    });

    const talonGoldMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      metalness: 0.6,
    });

    // Main Torso / Aerodynamic Breast & Body
    const torsoGeo = new THREE.SphereGeometry(1.0, 24, 18);
    const torso = new THREE.Mesh(torsoGeo, whiteFeatherMat);
    torso.scale.set(0.85, 0.72, 1.85);
    torso.position.set(0, 0, 0);
    torso.castShadow = true;
    birdBody.add(torso);

    // Rounded Upper Breast (Keel)
    const breastGeo = new THREE.SphereGeometry(0.75, 16, 16);
    const breast = new THREE.Mesh(breastGeo, whiteFeatherMat);
    breast.scale.set(0.8, 0.85, 0.95);
    breast.position.set(0, -0.1, 0.55);
    breast.castShadow = true;
    birdBody.add(breast);

    // Inner Glowing Soul Crystal / Heart of Light
    const heartGeo = new THREE.OctahedronGeometry(0.32, 1);
    const heartMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.85,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.position.set(0, 0, 0.2);
    birdBody.add(heartMesh);

    // Avian Neck & Sleek Head
    const neckGeo = new THREE.CylinderGeometry(0.38, 0.55, 0.85, 16);
    const neck = new THREE.Mesh(neckGeo, whiteFeatherMat);
    neck.position.set(0, 0.45, 0.85);
    neck.rotation.x = 0.55;
    birdBody.add(neck);

    const headGeo = new THREE.SphereGeometry(0.48, 18, 16);
    const head = new THREE.Mesh(headGeo, whiteFeatherMat);
    head.scale.set(0.78, 0.88, 1.05);
    head.position.set(0, 0.82, 1.18);
    head.castShadow = true;
    birdBody.add(head);

    // Elegant Curved Golden Beak
    const beakGeo = new THREE.ConeGeometry(0.18, 0.72, 10);
    const beak = new THREE.Mesh(beakGeo, amberGoldBeakMat);
    beak.position.set(0, 0.72, 1.74);
    beak.rotation.x = Math.PI / 2 - 0.15;
    beak.castShadow = true;
    birdBody.add(beak);

    // Keen Avian Eyes (Left & Right)
    const eyeGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const leftEye = new THREE.Mesh(eyeGeo, darkEyeMat);
    leftEye.position.set(0.32, 0.88, 1.28);
    birdBody.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, darkEyeMat);
    rightEye.position.set(-0.32, 0.88, 1.28);
    birdBody.add(rightEye);

    // Flowing Feathery Crown Crest
    const crestGroup = new THREE.Group();
    crestGroup.position.set(0, 1.05, 1.0);
    for (let c = 0; c < 4; c++) {
      const plumeGeo = new THREE.ConeGeometry(0.08, 0.65 + c * 0.15, 6);
      const plume = new THREE.Mesh(plumeGeo, softWingTipMat);
      plume.position.set(0, 0.15 + c * 0.05, -c * 0.18);
      plume.rotation.x = -0.55 - c * 0.18;
      crestGroup.add(plume);
    }
    birdBody.add(crestGroup);

    // Celestial Golden Halo hovering over the bird's crown
    const haloGeo = new THREE.TorusGeometry(0.7, 0.038, 8, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.9,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, 1.55, 1.1);
    birdBody.add(halo);

    // ARTICULATED FEATHERED WINGS (Left & Right)
    // Structure: Shoulder -> MidWing -> Primaries & Secondaries
    const createBirdWing = (isLeft: boolean) => {
      const wingRoot = new THREE.Group();
      const mult = isLeft ? 1 : -1;

      // Shoulder / Humerus
      const shoulderJoint = new THREE.Group();
      wingRoot.add(shoulderJoint);

      const shoulderBone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.32, 1.8, 10),
        whiteFeatherMat
      );
      shoulderBone.position.set(mult * 0.9, 0, 0);
      shoulderBone.rotation.z = mult * 1.57;
      shoulderJoint.add(shoulderBone);

      // Mid Wing / Forearm Joint
      const midWingJoint = new THREE.Group();
      midWingJoint.position.set(mult * 1.8, 0, 0);
      shoulderJoint.add(midWingJoint);

      const forearmBone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.24, 2.2, 10),
        whiteFeatherMat
      );
      forearmBone.position.set(mult * 1.1, 0, 0);
      forearmBone.rotation.z = mult * 1.57;
      midWingJoint.add(forearmBone);

      // Primary Flight Feathers (Long sculpted outer feathers)
      const primaryFeathersGroup = new THREE.Group();
      midWingJoint.add(primaryFeathersGroup);

      const numPrimaries = 7;
      for (let i = 0; i < numPrimaries; i++) {
        const length = 2.6 - i * 0.25;
        const width = 0.38;
        const feather = new THREE.Mesh(
          new THREE.BoxGeometry(width, length, 0.05),
          softWingTipMat
        );
        feather.position.set(
          mult * (1.2 + i * 0.45),
          -length * 0.45,
          -0.2 - i * 0.12
        );
        feather.rotation.z = mult * (0.35 + i * 0.08);
        feather.rotation.y = mult * (-0.15 - i * 0.05);
        feather.rotation.x = -0.15;
        feather.castShadow = true;
        primaryFeathersGroup.add(feather);
      }

      // Secondary Flight Feathers (Inner trailing edge)
      const numSecondaries = 6;
      for (let j = 0; j < numSecondaries; j++) {
        const sLength = 1.8 - j * 0.15;
        const sWidth = 0.35;
        const sFeather = new THREE.Mesh(
          new THREE.BoxGeometry(sWidth, sLength, 0.05),
          whiteFeatherMat
        );
        sFeather.position.set(
          mult * (0.3 + j * 0.3),
          -sLength * 0.45,
          -0.45 - j * 0.06
        );
        sFeather.rotation.z = mult * 0.2;
        sFeather.rotation.x = -0.22;
        shoulderJoint.add(sFeather);
      }

      return {
        wingRoot,
        shoulderJoint,
        midWingJoint,
        primaryFeathersGroup,
      };
    };

    const leftWing = createBirdWing(true);
    leftWing.wingRoot.position.set(0.65, 0.2, 0.2);
    birdBody.add(leftWing.wingRoot);

    const rightWing = createBirdWing(false);
    rightWing.wingRoot.position.set(-0.65, 0.2, 0.2);
    birdBody.add(rightWing.wingRoot);

    // Graceful Tiered Fan Tail Feathers
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 0.1, -1.5);
    const numTailFeathers = 7;
    for (let t = 0; t < numTailFeathers; t++) {
      const spread = (t - 3) * 0.16; // -0.48 to +0.48
      const centerDist = Math.abs(t - 3);
      const length = 2.4 - centerDist * 0.25;
      const tFeather = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, length, 0.04),
        whiteFeatherMat
      );
      tFeather.position.set(spread * 1.4, -0.05, -length * 0.48);
      tFeather.rotation.y = spread * 0.45;
      tFeather.rotation.x = -0.15;
      tFeather.castShadow = true;
      tailGroup.add(tFeather);
    }
    birdBody.add(tailGroup);

    // Tucked Flight Talons / Ground Perching Feet
    const feetGroup = new THREE.Group();
    feetGroup.position.set(0, -0.55, -0.3);
    const leftFoot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.6, 6),
      talonGoldMat
    );
    leftFoot.position.set(0.3, 0, 0);
    leftFoot.rotation.x = 0.5;
    feetGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.6, 6),
      talonGoldMat
    );
    rightFoot.position.set(-0.3, 0, 0);
    rightFoot.rotation.x = 0.5;
    feetGroup.add(rightFoot);
    birdBody.add(feetGroup);

    // ==========================================
    // 7B. GROUNDED HUMANOID CHARACTER MODEL
    // Transforms from bird when player touches land!
    // Visible gear: Head Cowl/Circlet, Chest Armor, Equipped Weapon in Hand, Sacred Amulet, Traveler Boots
    // ==========================================
    const humanoidBody = new THREE.Group();
    humanoidBody.position.set(0, 0, 0);
    humanoidBody.visible = true; // Start with character visible
    birdRoot.add(humanoidBody);

    // Gear visual styling from character.equipment
    const eq = character.equipment || {
      head: null,
      chest: null,
      weapon: null,
      accessory: null,
      feet: null,
    };
    const headColor = eq.head?.visualColor ? parseInt(eq.head.visualColor.replace('#', '0x')) : 0x38bdf8;
    const chestColor = eq.chest?.visualColor ? parseInt(eq.chest.visualColor.replace('#', '0x')) : 0x10b981;
    const weaponColor = eq.weapon?.visualColor ? parseInt(eq.weapon.visualColor.replace('#', '0x')) : 0xc084fc;
    const accessoryColor = eq.accessory?.visualColor ? parseInt(eq.accessory.visualColor.replace('#', '0x')) : 0xf43f5e;
    const feetColor = eq.feet?.visualColor ? parseInt(eq.feet.visualColor.replace('#', '0x')) : 0x475569;

    const charSkinMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.45,
      metalness: 0.1,
      emissive: 0xfde047,
      emissiveIntensity: 0.12,
    });

    const charChestMat = new THREE.MeshStandardMaterial({
      color: chestColor,
      roughness: 0.35,
      metalness: 0.4,
      emissive: chestColor,
      emissiveIntensity: 0.22,
    });

    const charHeadGearMat = new THREE.MeshStandardMaterial({
      color: headColor,
      roughness: 0.3,
      metalness: 0.5,
      emissive: headColor,
      emissiveIntensity: 0.28,
    });

    const charWeaponMat = new THREE.MeshStandardMaterial({
      color: weaponColor,
      roughness: 0.2,
      metalness: 0.85,
      emissive: weaponColor,
      emissiveIntensity: 0.65,
    });

    const charAccessoryMat = new THREE.MeshStandardMaterial({
      color: accessoryColor,
      roughness: 0.15,
      metalness: 0.9,
      emissive: accessoryColor,
      emissiveIntensity: 0.8,
    });

    const charBootsMat = new THREE.MeshStandardMaterial({
      color: feetColor,
      roughness: 0.6,
      metalness: 0.25,
    });

    const charGoldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.85,
    });

    // 1. Torso & Discipline Vestment — a proportioned hooded traveler
    const charTorsoGroup = new THREE.Group();
    charTorsoGroup.position.set(0, 1.8, 0);
    humanoidBody.add(charTorsoGroup);

    const charLeatherMat = new THREE.MeshStandardMaterial({
      color: 0x1a2334,
      roughness: 0.82,
      metalness: 0.08,
      flatShading: true,
    });

    // Chest — tapered lathe torso instead of a plain cylinder
    const torsoProfile: THREE.Vector2[] = [
      new THREE.Vector2(0.02, -0.75),
      new THREE.Vector2(0.32, -0.74),
      new THREE.Vector2(0.36, -0.5),
      new THREE.Vector2(0.33, -0.24),
      new THREE.Vector2(0.38, 0.16),
      new THREE.Vector2(0.42, 0.46),
      new THREE.Vector2(0.34, 0.66),
      new THREE.Vector2(0.02, 0.7),
    ];
    const charTorsoMesh = new THREE.Mesh(new THREE.LatheGeometry(torsoProfile, 18), charChestMat);
    charTorsoMesh.scale.z = 0.78;
    charTorsoMesh.castShadow = true;
    charTorsoGroup.add(charTorsoMesh);

    // Layered tunic skirt over the hips
    const charSkirt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.36, 0.56, 0.62, 16, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x16202f,
        roughness: 0.85,
        side: THREE.DoubleSide,
        flatShading: true,
      })
    );
    charSkirt.position.set(0, -0.92, 0);
    charSkirt.castShadow = true;
    charTorsoGroup.add(charSkirt);

    // Chest plate rune
    const charChestRune = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), charAccessoryMat);
    charChestRune.position.set(0, 0.18, 0.32);
    charTorsoGroup.add(charChestRune);

    // Golden Belt Sash & Discipline Buckle
    const charBelt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.37, 0.37, 0.16, 18),
      charGoldAccentMat
    );
    charBelt.position.set(0, -0.62, 0);
    charBelt.scale.z = 0.8;
    charTorsoGroup.add(charBelt);

    const charBuckle = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.18, 0.1),
      charGoldAccentMat
    );
    charBuckle.position.set(0, -0.62, 0.3);
    charTorsoGroup.add(charBuckle);

    // Cross strap over the chest
    const charStrap = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.98, 0.06), charLeatherMat);
    charStrap.position.set(0.05, -0.06, 0.31);
    charStrap.rotation.z = 0.34;
    charTorsoGroup.add(charStrap);

    // Flowing Wayfarer Cloak — pivots at the shoulders so it can sway
    const charCloak = new THREE.Group();
    charCloak.position.set(0, 0.52, -0.2);
    charTorsoGroup.add(charCloak);

    const cloakProfile: THREE.Vector2[] = [
      new THREE.Vector2(0.26, 0),
      new THREE.Vector2(0.34, -0.4),
      new THREE.Vector2(0.4, -0.8),
      new THREE.Vector2(0.44, -1.15),
      new THREE.Vector2(0.4, -1.28),
    ];
    const charCloakMesh = new THREE.Mesh(
      new THREE.LatheGeometry(cloakProfile, 16, Math.PI * 0.42, Math.PI * 1.16),
      new THREE.MeshStandardMaterial({
        color: 0x131c2c,
        roughness: 0.88,
        side: THREE.DoubleSide,
        flatShading: true,
      })
    );
    charCloakMesh.scale.z = 0.62;
    charCloakMesh.castShadow = true;
    charCloak.add(charCloakMesh);

    const charCloakClaspL = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), charGoldAccentMat);
    charCloakClaspL.position.set(-0.24, 0.02, 0.14);
    charCloak.add(charCloakClaspL);
    const charCloakClaspR = charCloakClaspL.clone();
    charCloakClaspR.position.x = 0.3;
    charCloak.add(charCloakClaspR);

    // 2. Head & Cowl / Circlet
    const charHeadGroup = new THREE.Group();
    charHeadGroup.position.set(0, 0.92, 0);
    charTorsoGroup.add(charHeadGroup);

    const charNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.16, 10), charSkinMat);
    charNeck.position.set(0, -0.18, 0);
    charHeadGroup.add(charNeck);

    const charHead = new THREE.Mesh(new THREE.SphereGeometry(0.26, 18, 16), charSkinMat);
    charHead.scale.set(1.0, 1.1, 0.96);
    charHead.castShadow = true;
    charHeadGroup.add(charHead);

    // Head Gear: Cowl / Hood, open at the face
    const charHoodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(headColor).lerp(new THREE.Color(0x0d1524), 0.68),
      roughness: 0.8,
      metalness: 0.1,
      flatShading: true,
    });
    const charCowl = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.66),
      charHoodMat
    );
    charCowl.scale.set(1.04, 1.06, 1.04);
    charCowl.position.set(0, 0.04, -0.03);
    charCowl.rotation.x = -0.14;
    charCowl.castShadow = true;
    charHeadGroup.add(charCowl);

    const charCowlRim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.026, 6, 20), charHeadGearMat);
    charCowlRim.rotation.x = Math.PI / 2 + 0.22;
    charCowlRim.position.set(0, 0.02, 0.02);
    charHeadGroup.add(charCowlRim);

    const charHoodDrape = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.36, 10), charHoodMat);
    charHoodDrape.position.set(0, 0.2, -0.24);
    charHoodDrape.rotation.x = 0.7;
    charHeadGroup.add(charHoodDrape);

    // Eyes so the character reads as a face, not a ball
    const charEyeMat = new THREE.MeshBasicMaterial({ color: 0x1b2130 });
    const charEyeL = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), charEyeMat);
    charEyeL.position.set(-0.09, 0.02, 0.24);
    charHeadGroup.add(charEyeL);
    const charEyeR = charEyeL.clone();
    charEyeR.position.x = 0.09;
    charHeadGroup.add(charEyeR);

    // Head Jewel / Circlet crest
    const charHeadCrest = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.08, 0),
      charGoldAccentMat
    );
    charHeadCrest.position.set(0, 0.22, 0.2);
    charHeadGroup.add(charHeadCrest);

    // Floating Sacred Halo / Starlight Ring above head
    const charHalo = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.022, 8, 32),
      new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.85 })
    );
    charHalo.rotation.x = Math.PI / 2;
    charHalo.position.set(0, 0.5, 0);
    charHeadGroup.add(charHalo);

    // 3. Neck & Sacred Accessory Relic
    const charAmulet = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.1, 0),
      charAccessoryMat
    );
    charAmulet.position.set(0, 0.45, 0.28);
    charTorsoGroup.add(charAmulet);

    // 4. Arms & Equipped Weapon
    const buildArm = (side: 1 | -1) => {
      const group = new THREE.Group();
      group.position.set(side * 0.44, 0.44, 0);
      charTorsoGroup.add(group);

      const pauldron = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 14, 12, 0, Math.PI * 2, 0, Math.PI * 0.62),
        charChestMat
      );
      pauldron.scale.set(1.1, 0.9, 1.0);
      pauldron.rotation.z = side * 0.2;
      pauldron.castShadow = true;
      group.add(pauldron);

      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.075, 0.5, 10), charSkinMat);
      upper.position.set(0, -0.3, 0);
      group.add(upper);

      const bracer = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.078, 0.34, 10), charLeatherMat);
      bracer.position.set(0, -0.68, 0);
      group.add(bracer);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 8), charSkinMat);
      hand.position.set(0, -0.88, 0);
      group.add(hand);

      group.rotation.z = side * 0.1;
      return group;
    };

    const charLeftArmGroup = buildArm(1);
    const charRightArmGroup = buildArm(-1);

    // Equipped Weapon in Right Hand (Scribe Stylus / Sacred Spear)
    const charWeaponGroup = new THREE.Group();
    charWeaponGroup.position.set(0, -0.88, 0.1);
    charWeaponGroup.rotation.x = 0.16;
    charRightArmGroup.add(charWeaponGroup);

    const charStaff = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 2.1, 8),
      charGoldAccentMat
    );
    charWeaponGroup.add(charStaff);

    const charStaffGrip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.042, 0.042, 0.34, 8),
      charLeatherMat
    );
    charWeaponGroup.add(charStaffGrip);

    // 5. Legs & Traveler Boots
    const buildLeg = (side: 1 | -1) => {
      const group = new THREE.Group();
      group.position.set(side * 0.18, -0.72, 0);
      charTorsoGroup.add(group);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.6, 10), charLeatherMat);
      thigh.position.set(0, -0.3, 0);
      thigh.castShadow = true;
      group.add(thigh);

      const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.5, 10), charLeatherMat);
      shin.position.set(0, -0.78, 0);
      group.add(shin);

      const knee = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), charBootsMat);
      knee.position.set(0, -0.55, 0);
      group.add(knee);

      const boot = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.36), charBootsMat);
      boot.position.set(0, -1.02, 0.07);
      boot.castShadow = true;
      group.add(boot);

      const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.14, 10), charBootsMat);
      cuff.position.set(0, -0.9, 0);
      group.add(cuff);

      return group;
    };

    const charLeftLegGroup = buildLeg(1);
    const charRightLegGroup = buildLeg(-1);

    // 6. Ground Sacred Lotus Aura (Rotates under feet)
    const charGroundAura = new THREE.Mesh(
      new THREE.RingGeometry(0.75, 1.7, 40),
      new THREE.MeshBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    charGroundAura.rotation.x = Math.PI / 2;
    charGroundAura.position.set(0, -1.78, 0);
    humanoidBody.add(charGroundAura);

    // 7. Transformation Ring Shockwave FX
    const transformAuraMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 5.0, 36),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      })
    );
    transformAuraMesh.rotation.x = Math.PI / 2;
    transformAuraMesh.position.set(0, -1.0, 0);
    birdRoot.add(transformAuraMesh);

    let walkPhase = 0;
    let idlePhase = 0;
    let transformAnimTime = 0;

    scene.add(birdRoot);

    // Dual Wingtip Starlight Ribbon Particle Trails
    const trailCount = 90;
    const createTrailSystem = (color: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(trailCount * 3);
      for (let i = 0; i < trailCount * 3; i++) pos[i] = 0;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size: 3.5,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return { geo, points, headIdx: 0 };
    };

    const leftTrail = createTrailSystem(0x7dd3fc);
    const rightTrail = createTrailSystem(0xfde047);

    // 8. POST-PROCESSING (EffectComposer + Bloom + Depth of Field)
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight),
      0.42, // strength
      0.62, // radius
      0.88  // threshold
    );
    bloomPassRef.current = bloomPass;
    composer.addPass(bloomPass);

    const bokehPass = new BokehPass(scene, camera, {
      focus: 14.0,
      aperture: 0.00010,
      maxblur: 0.012,
    });
    composer.addPass(bokehPass);

    // Final cinematic grade: vignette, subtle grain, lifted saturation
    const gradePass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec3 col = texture2D(tDiffuse, vUv).rgb;

          // saturation + soft filmic contrast
          float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
          col = mix(vec3(lum), col, 1.14);
          col = clamp((col - 0.5) * 1.06 + 0.5, 0.0, 4.0);

          // cool shadows, warm highlights
          col += vec3(-0.012, 0.0, 0.03) * (1.0 - lum);
          col += vec3(0.03, 0.014, -0.01) * pow(lum, 2.0);

          // vignette
          vec2 d = vUv - 0.5;
          float vig = smoothstep(0.92, 0.28, length(d) * 1.35);
          col *= mix(0.84, 1.0, vig);

          // fine grain
          float g = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
          col += (g - 0.5) * 0.022;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    composer.addPass(gradePass);

    // Dynamic Speedlines / Wind Streak Particle System
    const speedlineCount = 48;
    const speedlineGeo = new THREE.BufferGeometry();
    const speedlinePos = new Float32Array(speedlineCount * 6);
    for (let i = 0; i < speedlineCount; i++) {
      const sx = (Math.random() - 0.5) * 24;
      const sy = (Math.random() - 0.5) * 14;
      const sz = (Math.random() - 0.5) * 36;
      const len = 4.0 + Math.random() * 6.0;
      speedlinePos[i * 6] = sx;
      speedlinePos[i * 6 + 1] = sy;
      speedlinePos[i * 6 + 2] = sz;
      speedlinePos[i * 6 + 3] = sx;
      speedlinePos[i * 6 + 4] = sy;
      speedlinePos[i * 6 + 5] = sz - len;
    }
    speedlineGeo.setAttribute('position', new THREE.BufferAttribute(speedlinePos, 3));
    const speedlineMat = new THREE.LineBasicMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const speedlineMesh = new THREE.LineSegments(speedlineGeo, speedlineMat);
    scene.add(speedlineMesh);

    // Ground Contact Drop Shadow Disc (grounding character & bird cleanly to surface)
    const contactShadowGeo = new THREE.CircleGeometry(1.6, 24);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x070b10,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.05;
    scene.add(contactShadow);

    // 9. Key Listeners for Flight Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      // If NPC Dialogue is active, intercept navigation keys for Pokemon-style line advancing
      if (isDialogueOpenRef.current) {
        if (e.code === 'Escape') {
          handleCloseDialogueRef.current();
          e.preventDefault();
        } else if (
          e.code === 'Space' ||
          e.code === 'Enter' ||
          e.code === 'KeyE' ||
          e.code === 'KeyT'
        ) {
          handleAdvanceDialogueRef.current();
          e.preventDefault();
        }
        return;
      }

      const keys = physicsRef.current.keys;
      // Fullscreen is exited only by the browser's Escape handling. Space remains
      // reserved for takeoff and aerial boost.
      if (e.code === 'Escape' && document.fullscreenElement) {
        return;
      }
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = true;
      }
      if (e.code === 'ArrowUp') keys.KeyW = true;
      if (e.code === 'ArrowDown') keys.KeyS = true;
      if (e.code === 'ArrowLeft') keys.KeyA = true;
      if (e.code === 'ArrowRight') keys.KeyD = true;

      if (e.code === 'KeyT') {
        if (nearNPCRef.current) {
          handleOpenNPCDialogue(nearNPCRef.current);
          e.preventDefault();
        }
      }
      if (e.code === 'KeyE') {
        if (nearNPCRef.current) {
          handleOpenNPCDialogue(nearNPCRef.current);
          e.preventDefault();
        } else {
          handleEnterNearestSanctuary();
        }
      }
      if (e.code === 'KeyC') {
        setCameraMode((prev) => (prev === 'chase' ? 'cinematic' : prev === 'cinematic' ? 'firstPerson' : 'chase'));
      }
      if (e.code === 'KeyM') {
        const muted = soundSynth.toggleMute();
        setIsMuted(muted);
      }
      if (e.code === 'KeyG') {
        setIsGearPanelOpen((prev) => !prev);
        e.preventDefault();
      }
      if (e.code === 'KeyF') {
        // Toggle land/flight
        physicsRef.current.isGrounded = !physicsRef.current.isGrounded;
        if (!physicsRef.current.isGrounded) {
          physicsRef.current.pos.y += 10;
          physicsRef.current.speed = 18;
          soundSynth.playWingWhoosh();
          transformAnimTime = 0.9;
          setIsGroundedUI(false);
          triggerTransformToastRef.current('Ascended to Flight — Transformed to Celestial Bird');
        } else {
          physicsRef.current.vel.set(0, 0, 0);
          soundSynth.playChime(660);
          soundSynth.playItemObtain();
          transformAnimTime = 0.9;
          setIsGroundedUI(true);
          triggerTransformToastRef.current('Landed — Transformed to Wayfarer [Press G for Gear]');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keys = physicsRef.current.keys;
      if (e.code in keys) {
        keys[e.code as keyof typeof keys] = false;
      }
      if (e.code === 'ArrowUp') keys.KeyW = false;
      if (e.code === 'ArrowDown') keys.KeyS = false;
      if (e.code === 'ArrowLeft') keys.KeyA = false;
      if (e.code === 'ArrowRight') keys.KeyD = false;
    };

    // Canvas click: raycast to talkable NPCs
    const handleCanvasClick = (e: MouseEvent) => {
      if (isDialogueOpenRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      for (const item of npcEntities) {
        const hits = raycaster.intersectObjects(item.group.children, true);
        if (hits.length > 0 && hits[0].distance < 85) {
          handleOpenNPCDialogue(item.npc);
          return;
        }
      }
    };

    // Mouse drag for 360 camera orbit (smooth, normal orbit)
    const handleMouseDown = (e: MouseEvent) => {
      physicsRef.current.mouseDrag = true;
      cameraInputAtRef.current = performance.now();
      physicsRef.current.prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!physicsRef.current.mouseDrag) return;
      const dx = e.clientX - physicsRef.current.prevMouse.x;
      const dy = e.clientY - physicsRef.current.prevMouse.y;
      physicsRef.current.prevMouse = { x: e.clientX, y: e.clientY };
      cameraInputAtRef.current = performance.now();

      const sens = 0.0035;
      if (physicsRef.current.isGrounded) {
        physicsRef.current.camYaw -= dx * sens;
        physicsRef.current.camPitch = Math.max(
          -0.25,
          Math.min(0.7, physicsRef.current.camPitch + dy * sens)
        );
      } else {
        physicsRef.current.orbitOffset.x -= dx * sens;
        physicsRef.current.orbitOffset.y = Math.max(
          -0.65,
          Math.min(0.65, physicsRef.current.orbitOffset.y + dy * sens)
        );
      }
    };

    const handleMouseUp = () => {
      physicsRef.current.mouseDrag = false;
    };

    // Touch events for mobile/trackpad touch
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        physicsRef.current.mouseDrag = true;
        cameraInputAtRef.current = performance.now();
        physicsRef.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        cameraInputAtRef.current = performance.now();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!physicsRef.current.mouseDrag || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - physicsRef.current.prevMouse.x;
      const dy = e.touches[0].clientY - physicsRef.current.prevMouse.y;
      physicsRef.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const sens = 0.004;
      if (physicsRef.current.isGrounded) {
        physicsRef.current.camYaw -= dx * sens;
        physicsRef.current.camPitch = Math.max(
          -0.25,
          Math.min(0.7, physicsRef.current.camPitch + dy * sens)
        );
      } else {
        physicsRef.current.orbitOffset.x -= dx * sens;
        physicsRef.current.orbitOffset.y = Math.max(
          -0.65,
          Math.min(0.65, physicsRef.current.orbitOffset.y + dy * sens)
        );
      }
    };

    const handleTouchEnd = () => {
      physicsRef.current.mouseDrag = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 10. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          composer.setSize(width, height);
          bloomPass.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // 11. CAMERA PHYSICS & SWAY ANIMATION STATE
    const camPhysics = {
      pos: new THREE.Vector3(0, 38.8, -46.5),
      lookAt: new THREE.Vector3(0, 37.8, -30),
      roll: 0,
      baseDist: 8.0,
      baseHeight: 2.8,
      swayTime: 0,
    };
    camera.position.copy(camPhysics.pos);
    camera.lookAt(camPhysics.lookAt);

    // 12. REAL TIME ANIMATION & FLIGHT LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let tickCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      tickCount++;

      const p = physicsRef.current;
      const keys = p.keys;

      // Update Skybox shader time
      if (envRefs.current.skyMat) {
        envRefs.current.skyMat.uniforms.time.value = elapsed;
      }

      // --- Flight State & Flight Controls ---
      const isBoosting = keys.Space;
      const isDiving = keys.ShiftLeft || keys.ShiftRight;

      if (p.isGrounded) {
        setFlightState('PERCHED');
        p.isGliding = false;

        // Ground walking physics - responsive, standard 3rd-person controls
        const isSprinting = keys.ShiftLeft || keys.ShiftRight;
        const walkSpeed = isSprinting ? 14.0 : 8.5;

        // Calculate movement vector relative to camera orientation!
        // Camera looks along (sin(camYaw), 0, cos(camYaw)).
        // Screen-right is (-cos(camYaw), 0, sin(camYaw)), screen-left is (cos(camYaw), 0, -sin(camYaw)).
        const camForward = new THREE.Vector3(Math.sin(p.camYaw), 0, Math.cos(p.camYaw));
        const camRight = new THREE.Vector3(-Math.cos(p.camYaw), 0, Math.sin(p.camYaw));

        let moveVector = new THREE.Vector3(0, 0, 0);
        if (keys.KeyW) moveVector.add(camForward);
        if (keys.KeyS) moveVector.sub(camForward);
        if (keys.KeyA) moveVector.sub(camRight); // A goes LEFT
        if (keys.KeyD) moveVector.add(camRight); // D goes RIGHT

        const isMoving = moveVector.lengthSq() > 0.001;
        if (isMoving) {
          moveVector.normalize();
          p.pos.add(moveVector.clone().multiplyScalar(walkSpeed * delta));

          // Smoothly rotate character model to face movement direction
          const targetCharYaw = Math.atan2(moveVector.x, moveVector.z);
          let diff = targetCharYaw - p.yaw;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          p.yaw += diff * Math.min(1.0, 14.0 * delta);
        }

        // Keep character firmly on island plateau surface while grounded
        let onIsland = false;
        islandConfigs.forEach((cfg) => {
          const distXZ = new THREE.Vector2(p.pos.x - cfg.pos.x, p.pos.z - cfg.pos.z).length();
          if (distXZ < cfg.radius * 1.08) {
            onIsland = true;
            p.pos.y = cfg.pos.y + 6; // plateau surface
          }
        });

        // Walking off the island edge into the open sky naturally transitions to flight!
        if (!onIsland && p.pos.y > 10) {
          p.isGrounded = false;
          p.vel.set(Math.sin(p.yaw) * 16, 2, Math.cos(p.yaw) * 16);
          p.speed = 16;
          p.pitch = 0.05;
          soundSynth.playWingWhoosh();
          transformAnimTime = 0.9;
          setIsGroundedUI(false);
          triggerTransformToastRef.current('Stepped into the Sky — Transformed to Celestial Bird');
        }

        // Deliberate takeoff with Space
        if (keys.Space) {
          p.isGrounded = false;
          p.vel.set(Math.sin(p.yaw) * 18, 14, Math.cos(p.yaw) * 18);
          p.speed = 20;
          p.pitch = 0.15;
          soundSynth.playSpeedBoost();
          soundSynth.playWingWhoosh();
          transformAnimTime = 0.9;
          setIsGroundedUI(false);
          triggerTransformToastRef.current('Spread Wings to the Sky — Transformed to Celestial Bird');
        }

        p.pitch = THREE.MathUtils.lerp(p.pitch, 0, 0.15);
        p.roll = THREE.MathUtils.lerp(p.roll, 0, 0.15);
        p.speed = THREE.MathUtils.lerp(p.speed, isMoving ? walkSpeed : 0, 0.2);
      } else {
        // Airborne Aerodynamics - Fly normally, smoothly, and responsively
        if (isBoosting) {
          setFlightState('BOOSTING');
          p.boostMultiplier = THREE.MathUtils.lerp(p.boostMultiplier, 1.65, 0.1);
          p.isGliding = false;
        } else if (isDiving || p.pitch < -0.3) {
          setFlightState('DIVING');
          p.boostMultiplier = THREE.MathUtils.lerp(p.boostMultiplier, 1.45, 0.1);
          p.isGliding = false;
        } else if (Math.abs(p.pitch) < 0.12 && !keys.KeyW && !keys.KeyS) {
          setFlightState('GLIDING');
          p.boostMultiplier = THREE.MathUtils.lerp(p.boostMultiplier, 1.0, 0.1);
          p.isGliding = true;
        } else {
          setFlightState('SOARING');
          p.boostMultiplier = THREE.MathUtils.lerp(p.boostMultiplier, 1.0, 0.1);
          p.isGliding = false;
        }

        // Steer left with A, right with D - smooth turning and natural banking
        let turnRate = 0;
        let rollTarget = 0;
        if (keys.KeyA) {
          turnRate = 1.65; // Turn LEFT
          rollTarget = 0.38; // Bank left
        } else if (keys.KeyD) {
          turnRate = -1.65; // Turn RIGHT
          rollTarget = -0.38; // Bank right
        }
        p.yaw += turnRate * delta;
        p.roll = THREE.MathUtils.lerp(p.roll, rollTarget, 0.12);

        // Pitch input: Normal flight (W dives down, S climbs up) with support for Invert Pitch toggle
        const pitchDirection = invertPitchRef.current ? -1 : 1;
        let pitchTarget = 0;
        if (keys.KeyW) pitchTarget = -0.42 * pitchDirection;
        else if (keys.KeyS) pitchTarget = 0.45 * pitchDirection;
        else if (isDiving) pitchTarget = -0.45 * pitchDirection;
        else pitchTarget = 0.0; // Auto-levels smoothly!

        p.pitch = THREE.MathUtils.lerp(p.pitch, pitchTarget, 0.1);

        // Forward Airspeed
        let targetSpeed = 20 * p.boostMultiplier;
        if (p.pitch < 0) {
          targetSpeed += Math.abs(p.pitch) * 18; // Dive speed gain
        } else if (p.pitch > 0) {
          targetSpeed -= p.pitch * 8; // Climb speed reduction
        }
        p.speed = THREE.MathUtils.lerp(p.speed, Math.max(p.minSpeed, targetSpeed), 0.08);

        // Forward flight vector from Pitch and Yaw
        const forward = new THREE.Vector3(
          Math.sin(p.yaw) * Math.cos(p.pitch),
          Math.sin(p.pitch),
          Math.cos(p.yaw) * Math.cos(p.pitch)
        ).normalize();

        p.vel.copy(forward.multiplyScalar(p.speed));
        if (isBoosting) {
          p.vel.y += 12.0; // Responsive wing thrust lift
        }
        p.pos.add(p.vel.clone().multiplyScalar(delta));

        // Wing flapping speed & phase
        p.wingFlapSpeed = isBoosting
          ? 16.0
          : isDiving
          ? 8.0
          : Math.max(5.5, 4.5 + (p.speed / p.maxSpeed) * 6.5);
        p.flappingWingPhase += p.wingFlapSpeed * delta;

        // Sound update
        soundSynth.setFlightSpeed(p.speed / p.maxSpeed);

        // Cloud ocean boundary floor
        if (p.pos.y < -20) {
          p.pos.y = -20;
          p.vel.y = Math.max(0, p.vel.y);
          p.pitch = 0.35;
        }
      }

      // --- ANIMATE VISUAL AVATAR (AIRBORNE BIRD VS GROUNDED WAYFARER WITH VISIBLE GEAR) ---
      birdRoot.position.copy(p.pos);
      const activePet = petGroups[petTypeRef.current];
      Object.values(petGroups).forEach((group) => {
        group.visible = group === activePet && p.isGrounded;
      });
      if (p.isGrounded) {
        const followDistance = 2.6;
        petRoot.position.set(
          p.pos.x - Math.sin(p.yaw) * followDistance,
          p.pos.y - 0.9 + Math.sin(elapsed * 4) * 0.03,
          p.pos.z - Math.cos(p.yaw) * followDistance,
        );
        petRoot.rotation.y = p.yaw;
      }

      // Synchronize grounded state with UI and trigger transformation if needed
      if (p.isGrounded && !wasGroundedRef.current) {
        wasGroundedRef.current = true;
        setIsGroundedUI(true);
        transformAnimTime = 0.9;
      } else if (!p.isGrounded && wasGroundedRef.current) {
        wasGroundedRef.current = false;
        setIsGroundedUI(false);
        transformAnimTime = 0.9;
      }

      // Update Transformation Shockwave Visual Effect
      if (transformAnimTime > 0) {
        transformAnimTime -= delta * 1.6;
        const progress = 1 - Math.max(0, transformAnimTime / 0.9);
        transformAuraMesh.visible = true;
        (transformAuraMesh.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.9;
        const s = 1 + progress * 2.8;
        transformAuraMesh.scale.set(s, s, s);
      } else {
        transformAuraMesh.visible = false;
      }

      // Switch 3D Appearance: Airborne Celestial Bird vs Grounded Character with Visible Gear
      if (p.isGrounded) {
        birdBody.visible = false;
        humanoidBody.visible = true;

        // Ground Humanoid Pose & Walking Dynamics
        humanoidBody.rotation.set(0, p.yaw, 0);

        // Track intro progress along the straight path
        if (p.pos.z > -16 && p.pos.z < 25) {
        }

        const isWalking = (keys.KeyW || keys.KeyS || keys.KeyA || keys.KeyD);
        const isSprinting = (keys.ShiftLeft || keys.ShiftRight);

        if (isWalking) {
          const moveMultiplier = keys.KeyS && !keys.KeyW ? -1 : 1;
          walkPhase += delta * (isSprinting ? 12.0 : 8.0) * moveMultiplier;
          const legSwing = Math.sin(walkPhase) * 0.65;
          charLeftLegGroup.rotation.x = legSwing;
          charRightLegGroup.rotation.x = -legSwing;
          charLeftArmGroup.rotation.x = -legSwing * 0.55;
          charRightArmGroup.rotation.x = legSwing * 0.35;
          charCloak.rotation.x = 0.22 + Math.abs(Math.sin(walkPhase * 2)) * 0.14;
          charTorsoGroup.position.y = 1.8 + Math.abs(Math.sin(walkPhase * 2)) * 0.08;
        } else {
          idlePhase += delta * 2.2;
          const idleBreath = Math.sin(idlePhase) * 0.04;
          charTorsoGroup.position.y = 1.8 + idleBreath;
          charLeftLegGroup.rotation.x = THREE.MathUtils.lerp(charLeftLegGroup.rotation.x, 0, 0.2);
          charRightLegGroup.rotation.x = THREE.MathUtils.lerp(charRightLegGroup.rotation.x, 0, 0.2);
          charLeftArmGroup.rotation.x = Math.sin(idlePhase) * 0.08;
          charRightArmGroup.rotation.x = 0.15 + Math.sin(idlePhase * 1.2) * 0.06;
          charCloak.rotation.x = 0.05 + Math.sin(idlePhase * 1.5) * 0.04;
        }

        // Floating Sacred Halo & Ground Lotus Aura animation
        charHalo.rotation.z = elapsed * 1.5;
        charGroundAura.rotation.z = -elapsed * 0.8;
        charGroundAura.scale.set(
          1 + Math.sin(elapsed * 3) * 0.06,
          1 + Math.sin(elapsed * 3) * 0.06,
          1
        );
        (charGroundAura.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(elapsed * 4) * 0.2;
      } else {
        birdBody.visible = true;
        humanoidBody.visible = false;

        // Bird naturally points forward along +Z in local space: -p.pitch tilts beak down/up, p.yaw steers heading, p.roll banks
        birdBody.rotation.set(-p.pitch, p.yaw, p.roll, 'YXZ');

        const flapSin = Math.sin(p.flappingWingPhase);
        const flapCos = Math.cos(p.flappingWingPhase);

        // Heart of light breathing pulse
        const pulse = Math.sin(elapsed * 4) * 0.2 + 0.9;
        heartMesh.scale.set(pulse, pulse, pulse);

        // Crown halo rotation & shine
        halo.rotation.z = elapsed * 1.6;

        // Breast & keel aerodynamic breathing heave
        breast.position.y = -0.1 + flapSin * 0.035;

        // Head & neck subtle aerodynamic bob in sync with wing thrust
        head.position.y = 0.82 + flapSin * 0.045;
        head.position.z = 1.18 + flapCos * 0.035;
        neck.position.y = 0.45 + flapSin * 0.025;

        // Crest plumage fluttering in wind
        crestGroup.children.forEach((plume, idx) => {
          plume.rotation.x = -0.55 - idx * 0.18 + Math.sin(elapsed * 12 + idx) * 0.08 + (p.speed / 50) * 0.2;
        });

        // Tail Fan Animation: rudders on bank/yaw, spreads on climb, narrows on dive, undulates with flap
        const tailFanSpread = isDiving ? 0.6 : p.pitch > 0.2 ? 1.4 : 1.0;
        tailGroup.scale.x = THREE.MathUtils.lerp(tailGroup.scale.x, tailFanSpread, 0.1);
        tailGroup.rotation.y = THREE.MathUtils.lerp(tailGroup.rotation.y, (keys.KeyA ? -0.3 : keys.KeyD ? 0.3 : 0), 0.12);
        tailGroup.rotation.x = THREE.MathUtils.lerp(tailGroup.rotation.x, -p.pitch * 0.4 + flapSin * 0.12, 0.1);

        // Perching Feet Animation: tucked back in flight, extended down on ground
        const footAngle = p.isGrounded ? 0.2 : 0.85;
        leftFoot.rotation.x = THREE.MathUtils.lerp(leftFoot.rotation.x, footAngle, 0.1);
        rightFoot.rotation.x = THREE.MathUtils.lerp(rightFoot.rotation.x, footAngle, 0.1);

        // Dynamic Wing Aerodynamic Articulation: CONTINUOUS FLAPPING AS IT FLIES
        if (isDiving) {
          // High-speed falcon dive: swept-back wings with rapid micro-fluttering
          const diveFlutter = Math.sin(p.flappingWingPhase * 1.5) * 0.08;
          leftWing.shoulderJoint.rotation.set(0.4 + diveFlutter * 0.2, 0.95, -0.2 + diveFlutter);
          leftWing.midWingJoint.rotation.set(0, 0.3, -0.6);
          rightWing.shoulderJoint.rotation.set(0.4 + diveFlutter * 0.2, -0.95, 0.2 - diveFlutter);
          rightWing.midWingJoint.rotation.set(0, -0.3, 0.6);
        } else {
          // Dynamic flapping animations as it flies across all soaring / cruising / boosting states
          const flapAmp = isBoosting ? 0.82 : 0.65;
          const shoulderAngle = flapSin * flapAmp;
          const elbowFlex = Math.sin(p.flappingWingPhase - 0.45) * (isBoosting ? 0.45 : 0.35);
          const wingPitchTwist = -flapCos * 0.22; // Aerodynamic angle of attack twist

          leftWing.shoulderJoint.rotation.set(wingPitchTwist, 0.08, shoulderAngle);
          leftWing.midWingJoint.rotation.set(0, 0, elbowFlex);
          leftWing.primaryFeathersGroup.rotation.z = Math.sin(p.flappingWingPhase - 0.7) * 0.24;

          rightWing.shoulderJoint.rotation.set(wingPitchTwist, -0.08, -shoulderAngle);
          rightWing.midWingJoint.rotation.set(0, 0, -elbowFlex);
          rightWing.primaryFeathersGroup.rotation.z = -Math.sin(p.flappingWingPhase - 0.7) * 0.24;
        }
      }

      // Starlight Ribbon Trails from Wingtips
      const leftTipWorld = new THREE.Vector3(4.2, 0, -0.6)
        .applyEuler(birdBody.rotation)
        .add(p.pos);
      const rightTipWorld = new THREE.Vector3(-4.2, 0, -0.6)
        .applyEuler(birdBody.rotation)
        .add(p.pos);

      const lPosArr = leftTrail.geo.attributes.position.array as Float32Array;
      lPosArr[leftTrail.headIdx * 3] = leftTipWorld.x;
      lPosArr[leftTrail.headIdx * 3 + 1] = leftTipWorld.y;
      lPosArr[leftTrail.headIdx * 3 + 2] = leftTipWorld.z;
      leftTrail.headIdx = (leftTrail.headIdx + 1) % trailCount;
      leftTrail.geo.attributes.position.needsUpdate = true;

      const rPosArr = rightTrail.geo.attributes.position.array as Float32Array;
      rPosArr[rightTrail.headIdx * 3] = rightTipWorld.x;
      rPosArr[rightTrail.headIdx * 3 + 1] = rightTipWorld.y;
      rPosArr[rightTrail.headIdx * 3 + 2] = rightTipWorld.z;
      rightTrail.headIdx = (rightTrail.headIdx + 1) % trailCount;
      rightTrail.geo.attributes.position.needsUpdate = true;

      // Celestial motes gentle drift
      const motesArr = moteGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < moteCount; i++) {
        motesArr[i * 3 + 1] -= delta * 3.0;
        if (motesArr[i * 3 + 1] < p.pos.y - 40) {
          motesArr[i * 3 + 1] = p.pos.y + 40;
        }
      }
      moteGeo.attributes.position.needsUpdate = true;

      // Rotate island astrolabes & beacons
      scene.traverse((obj) => {
        if (obj.name === 'astrolabeRing') {
          obj.rotation.y += 0.01;
          obj.rotation.x += 0.005;
        }
      });
      islandBeaconRays.forEach((ray, i) => {
        (ray.material as THREE.MeshBasicMaterial).opacity =
          0.25 + Math.sin(elapsed * 2 + i) * 0.15;
      });

      // Island Landing & Sanctuary Proximity Check
      let activeIsland: HabitIsland | null = null;
      let activeSanctuary: WorldArea | null = null;

      islandConfigs.forEach((cfg) => {
        const distXZ = new THREE.Vector2(p.pos.x - cfg.pos.x, p.pos.z - cfg.pos.z).length();
        if (distXZ < cfg.radius * 1.4) {
          activeIsland = cfg.island;

          const plateauHeight = cfg.pos.y + 6;
          if (distXZ < cfg.radius && Math.abs(p.pos.y - plateauHeight) < 8 && !keys.Space) {
            if (!p.isGrounded && p.vel.y <= 0) {
              p.isGrounded = true;
              p.pos.y = plateauHeight;
              p.vel.set(0, 0, 0);
              soundSynth.playChime(660);
              soundSynth.playItemObtain();
              transformAnimTime = 0.9;
              setIsGroundedUI(true);
              triggerTransformToastRef.current(`Landed at ${cfg.island.name} — Transformed to Wayfarer [Press G for Gear]`);
            }
          }

          if (distXZ < cfg.radius * 0.6) {
            activeSanctuary = cfg.island.areas[0] || null;
          }
        }
      });

      // Island Talkable NPC Animation & Proximity Detection
      let closestNPC: IslandNPC | null = null;
      let minNpcDist = 999999;

      npcEntities.forEach((entity, idx) => {
        // Subtle spiritual floating & breathing
        entity.group.position.y = entity.worldPos.y + Math.sin(elapsed * 2.2 + idx) * 0.12;

        // Relic spinning and vertical hover
        entity.relicMesh.rotation.y += delta * 1.5;
        entity.relicMesh.position.y = 1.7 + Math.sin(elapsed * 3.0 + idx) * 0.14;

        // Beacon Rune rotation and slight tilt
        entity.beaconRune.rotation.y += delta * 2.2;
        entity.beaconRune.rotation.x = Math.sin(elapsed * 1.8 + idx) * 0.18;
        entity.halo.rotation.z = elapsed * 1.4;

        // Distance check to player bird
        const dist = p.pos.distanceTo(entity.worldPos);
        if (dist < minNpcDist) {
          minNpcDist = dist;
          if (dist < 36) {
            closestNPC = entity.npc;
          }
        }
      });

      setNearNPC(closestNPC);
      nearNPCRef.current = closestNPC;

      setCurrentIsland(activeIsland);
      setNearSanctuary(activeSanctuary);
      setNearSanctuaryIsland(activeSanctuary ? activeIsland : null);

      const isWalking = p.isGrounded && (
        keys.KeyW || keys.KeyS || keys.KeyA || keys.KeyD
      );

      // Return the view to the direction of travel only when the player is
      // stationary; movement should never make the camera spin underneath them.
      if (!isWalking && !p.mouseDrag && performance.now() - cameraInputAtRef.current > 1800) {
        p.camYaw = THREE.MathUtils.lerp(p.camYaw, p.yaw, 1 - Math.exp(-2.8 * delta));
        p.camPitch = THREE.MathUtils.lerp(p.camPitch, 0.18, 1 - Math.exp(-2.8 * delta));
        p.orbitOffset.x = THREE.MathUtils.lerp(p.orbitOffset.x, 0, 1 - Math.exp(-2.8 * delta));
        p.orbitOffset.y = THREE.MathUtils.lerp(p.orbitOffset.y, 0, 1 - Math.exp(-2.8 * delta));
      }

      // --- SMOOTH THIRD-PERSON CAMERA WITH GROUND VS FLIGHT PROFILES ---
      if (p.isGrounded) {
        // Ground 3rd-person camera: positions cleanly behind player relative to camYaw & camPitch
        const groundCamDist = cameraMode === 'cinematic' ? 14.0 : cameraMode === 'firstPerson' ? 0.3 : 7.2;
        const groundCamHeight = cameraMode === 'firstPerson' ? 1.6 : 2.2;
        const targetCamPos = new THREE.Vector3(
          p.pos.x - Math.sin(p.camYaw) * Math.cos(p.camPitch) * groundCamDist,
          p.pos.y + groundCamHeight + Math.sin(p.camPitch) * groundCamDist * 0.6,
          p.pos.z - Math.cos(p.camYaw) * Math.cos(p.camPitch) * groundCamDist
        );

        camPhysics.pos.lerp(targetCamPos, 1.0 - Math.exp(-12.0 * delta));
        camera.position.copy(camPhysics.pos);

        const lookTarget = p.pos.clone().add(new THREE.Vector3(0, 1.6, 0));
        camPhysics.lookAt.lerp(lookTarget, 1.0 - Math.exp(-14.0 * delta));
        camera.lookAt(camPhysics.lookAt);
        camera.up.set(0, 1, 0);
      } else {
        // Flight camera: tracks smoothly behind the bird's flight heading with smooth look-ahead
        const speedOffset = (p.speed / p.maxSpeed) * 3.5;
        const totalCamDist = (cameraMode === 'cinematic' ? 24.0 : cameraMode === 'firstPerson' ? 0.3 : 9.5) + speedOffset;
        const baseHeight = cameraMode === 'cinematic' ? 6.0 : cameraMode === 'firstPerson' ? 0.8 : 2.5;

        const effectiveYaw = p.yaw + p.orbitOffset.x;
        const effectivePitch = p.pitch * 0.35 + p.orbitOffset.y;

        const targetCamPos = new THREE.Vector3(
          p.pos.x - Math.sin(effectiveYaw) * Math.cos(effectivePitch) * totalCamDist,
          p.pos.y + baseHeight + Math.sin(effectivePitch) * totalCamDist * 0.5,
          p.pos.z - Math.cos(effectiveYaw) * Math.cos(effectivePitch) * totalCamDist
        );

        camPhysics.pos.lerp(targetCamPos, 1.0 - Math.exp(-9.0 * delta));
        camera.position.copy(camPhysics.pos);

        // Gentle camera roll matching flight bank
        const targetRoll = p.roll * 0.25;
        camPhysics.roll = THREE.MathUtils.lerp(camPhysics.roll, targetRoll, 0.08);
        camera.up.set(Math.sin(-camPhysics.roll), Math.cos(camPhysics.roll), 0);

        // Look-ahead target along flight path
        const lookAheadDist = cameraMode === 'firstPerson' ? 8.0 : 4.5;
        const forwardDir = new THREE.Vector3(
          Math.sin(p.yaw),
          Math.sin(p.pitch) * 0.6,
          Math.cos(p.yaw)
        ).normalize();

        const targetLookAt = p.pos.clone()
          .add(new THREE.Vector3(0, 1.0, 0))
          .add(forwardDir.multiplyScalar(lookAheadDist));

        camPhysics.lookAt.lerp(targetLookAt, 1.0 - Math.exp(-10.0 * delta));
        camera.lookAt(camPhysics.lookAt);
      }

      // Dynamic FOV based on speed (smooth zoom effect)
      const targetFOV = 60 + (p.speed / p.maxSpeed) * 14;
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.06);
      camera.updateProjectionMatrix();

      // --- GRAPHICAL ENHANCEMENTS IN RENDER LOOP ---
      // Speedlines wind streak visibility
      if (!p.isGrounded && (p.speed > 22 || isBoosting)) {
        speedlineMesh.visible = true;
        speedlineMesh.position.copy(p.pos);
        speedlineMesh.rotation.set(-p.pitch, p.yaw, 0, 'YXZ');
        const targetOpacity = Math.min(0.65, (p.speed - 20) / 25 + (isBoosting ? 0.25 : 0));
        speedlineMat.opacity = THREE.MathUtils.lerp(speedlineMat.opacity, targetOpacity, 0.1);
      } else {
        speedlineMesh.visible = false;
        speedlineMat.opacity = 0;
      }

      // Contact Drop Shadow on surface
      if (p.isGrounded) {
        contactShadow.visible = true;
        contactShadow.position.set(p.pos.x, p.pos.y - 0.03, p.pos.z);
      } else {
        contactShadow.visible = false;
      }

      // Animated Cloud Sea Breathing
      if (envRefs.current.cloudSeaMat) {
        envRefs.current.cloudSeaMat.emissiveIntensity = 0.35 + Math.sin(elapsed * 0.8) * 0.12;
      }

      // Drifting mist sheets, breathing sun shafts, grain
      mistSheets.forEach((sheet, i) => {
        sheet.rotation.z += 0.00016 * (i % 2 === 0 ? 1 : -1);
        sheet.position.x = Math.sin(elapsed * 0.03 + i) * 90;
        sheet.position.z = Math.cos(elapsed * 0.025 + i) * 90;
        (sheet.material as THREE.MeshBasicMaterial).opacity =
          0.1 + i * 0.025 + Math.sin(elapsed * 0.35 + i) * 0.035;
      });
      shaftGroup.rotation.y += 0.0004;
      shaftGroup.children.forEach((blade, i) => {
        (blade.material as THREE.MeshBasicMaterial).opacity =
          0.08 + Math.abs(Math.sin(elapsed * 0.22 + i * 0.8)) * 0.09;
      });
      gradePass.uniforms.uTime.value = 1.0 + elapsed;

      // --- DYNAMIC DEPTH OF FIELD CONTINUOUS FOCUS TRACKING ---
      if (isDofEnabledRef.current && bokehPass) {
        // Dynamically lock focus distance to the exact distance between camera and avatar
        const distToAvatar = camera.position.distanceTo(p.pos);
        bokehPass.uniforms['focus'].value = distToAvatar;
        bokehPass.enabled = true;
      } else if (bokehPass) {
        bokehPass.enabled = false;
      }

      // Update HUD stats once every 4 frames
      if (tickCount % 4 === 0) {
        setSpeedKnots(Math.round(p.speed * 1.8));
        setAltitudeMeters(Math.round(Math.max(0, p.pos.y * 3.2)));
        const deg = Math.round(((-p.yaw * 180) / Math.PI) % 360);
        setHeadingDegrees(deg < 0 ? deg + 360 : deg);
      }

      // Render with post-processing (Bloom + Depth of Field) if either is active
      if (bloomPassRef.current) {
        bloomPassRef.current.enabled = bloomEnabledRef.current;
      }
      if (isDofEnabledRef.current || bloomEnabledRef.current) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleCanvasClick);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [islandConfigs, cameraMode, handleEnterNearestSanctuary, onAwardXP, timeOfDayPalettes]);

  // Adjust Sky Colors when TimeOfDay changes
  useEffect(() => {
    const palette = timeOfDayPalettes[timeOfDay];
    if (!palette || !envRefs.current.skyMat) return;

    const skyMat = envRefs.current.skyMat;
    skyMat.uniforms.topColor.value.copy(palette.skyTop);
    skyMat.uniforms.bottomColor.value.copy(palette.skyBottom);
    skyMat.uniforms.horizonColor.value.copy(palette.skyHorizon);
    skyMat.uniforms.sunPosition.value.copy(palette.sunPos);

    if (envRefs.current.sunGroup) {
      envRefs.current.sunGroup.position.copy(palette.sunPos).multiplyScalar(1000);
    }
    if (envRefs.current.sunMeshMat) {
      envRefs.current.sunMeshMat.color.copy(palette.sunColor);
    }
    if (envRefs.current.sunAuraMat) {
      envRefs.current.sunAuraMat.color.setHex(palette.sunAuraColor);
    }
    if (envRefs.current.dirLight) {
      envRefs.current.dirLight.color.copy(palette.dirColor);
      envRefs.current.dirLight.intensity = palette.dirIntensity;
      envRefs.current.dirLight.position.copy(palette.sunPos).multiplyScalar(1000);
    }
    if (envRefs.current.ambientLight) {
      envRefs.current.ambientLight.color.copy(palette.ambientColor);
      envRefs.current.ambientLight.intensity = palette.ambientIntensity;
    }
    if (envRefs.current.cloudSeaMat) {
      envRefs.current.cloudSeaMat.color.setHex(palette.cloudSeaColor);
    }
    if (envRefs.current.hazeMat) {
      envRefs.current.hazeMat.color.copy(palette.skyHorizon);
    }
    if (envRefs.current.shaftGroup) {
      envRefs.current.shaftGroup.children.forEach((blade: THREE.Mesh) => {
        (blade.material as THREE.MeshBasicMaterial).color.copy(palette.sunColor);
      });
    }
    if (envRefs.current.scene && envRefs.current.scene.fog) {
      (envRefs.current.scene.fog as THREE.FogExp2).color.copy(palette.fogColor);
    }
  }, [timeOfDay, timeOfDayPalettes]);

  return (
    <div
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className={`relative w-full overflow-hidden rounded-2xl border border-[#262e36] bg-[#090d12] select-none shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
        isFullscreen ? 'absolute inset-0 z-50 h-full rounded-none' : 'h-[640px] sm:h-[720px]'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* --- HUD TOP HEADER BAR --- */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        {/* Left: Heading Compass & Current Island Banner */}
        <div className="flex items-center gap-3">
          <div className="pointer-events-auto px-3.5 py-2 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] flex items-center gap-2.5 text-xs text-[#f5efe3] shadow-lg">
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span className="font-mono font-bold text-[#c5a059]">{headingDegrees}°</span>
            <span className="text-[#64748b]">|</span>
            <div className="flex items-center gap-1.5 font-semibold truncate max-w-[200px]">
              <Feather className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentIsland ? currentIsland.name : 'Open Skies • White Bird Soaring'}</span>
            </div>
          </div>

        </div>

        {/* Right: Quick Controls & Camera Modes */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Time of Day Switcher */}
          <div className="hidden">
            {(['dawn', 'midday', 'golden_hour', 'twilight', 'starlight'] as TimeOfDay[]).map((tod) => (
              <button
                key={tod}
                onClick={() => onTimeOfDayChange(tod)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                  timeOfDay === tod
                    ? 'bg-[#c5a059] text-[#0c0e10] font-bold shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {tod.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Celestial Bloom Toggle */}
          <button
            onClick={() => setBloomEnabled(!bloomEnabled)}
            className={`hidden p-2.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs ${
              bloomEnabled
                ? 'bg-[#231b2e]/90 border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-[#11161d]/85 border-[#27323f] text-[#94a3b8] hover:text-[#f5efe3]'
            }`}
            title="Toggle Celestial Bloom & Atmospheric Glow"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline text-[11px] font-semibold">Bloom {bloomEnabled ? 'On' : 'Off'}</span>
          </button>

          {/* Depth of Field (DOF Bokeh) Toggle */}
          <button
            onClick={() => setIsDofEnabled(!isDofEnabled)}
            className={`hidden p-2.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs ${
              isDofEnabled
                ? 'bg-[#1b2738]/90 border-sky-500/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-[#11161d]/85 border-[#27323f] text-[#94a3b8] hover:text-[#f5efe3]'
            }`}
            title="Toggle Cinematic Depth of Field Bokeh"
          >
            <Focus className="w-4 h-4 text-sky-400" />
            <span className="hidden lg:inline text-[11px] font-semibold">DOF {isDofEnabled ? 'On' : 'Off'}</span>
          </button>

          {/* Flight Pitch Direction Toggle */}
          <button
            onClick={() => setInvertPitch(!invertPitch)}
            className="hidden p-2.5 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] hover:border-[#c5a059] transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs"
            title={`Flight Pitch: ${invertPitch ? 'Inverted (W: Climb, S: Dive)' : 'Standard (W: Dive, S: Climb)'}. Click to switch.`}
          >
            <Wind className="w-4 h-4 text-amber-300" />
            <span className="hidden xl:inline text-[11px]">
              Pitch: <strong className="text-white font-semibold">{invertPitch ? 'Inverted' : 'Standard'}</strong>
            </span>
          </button>

          {/* Camera View Switcher */}
          <button
            onClick={() =>
              setCameraMode((prev) =>
                prev === 'chase' ? 'cinematic' : prev === 'cinematic' ? 'firstPerson' : 'chase'
              )
            }
            className="hidden p-2.5 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] hover:border-[#38bdf8] transition-all cursor-pointer shadow-lg flex items-center gap-1.5 text-xs"
            title="Switch 3rd Person View (Press C)"
          >
            <Eye className="w-4 h-4 text-[#38bdf8]" />
            <span className="capitalize hidden md:inline">{cameraMode}</span>
          </button>

          {/* Character & Gear Panel Toggle */}
          <button
            onClick={() => setIsGearPanelOpen(!isGearPanelOpen)}
            className={`px-3 py-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-lg flex items-center gap-2 text-xs font-semibold ${
              isGearPanelOpen
                ? 'bg-amber-400 text-[#0c0e10] border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                : isGroundedUI
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-200 animate-pulse'
                : 'bg-[#11161d]/85 border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] hover:border-amber-400/50'
            }`}
            title="Character Gear & Stats (Press G)"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Gear [G]</span>
            {isGroundedUI && (
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/30 text-amber-300 font-mono">
                Landed
              </span>
            )}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              const muted = soundSynth.toggleMute();
              setIsMuted(muted);
            }}
            className="p-2.5 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] transition-all cursor-pointer shadow-lg"
            title="Toggle Flight Sound (Press M)"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Help Controls Modal */}
          <button
            onClick={() => setShowHelp(true)}
            className="p-2.5 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] transition-all cursor-pointer shadow-lg"
            title="Controls & Flight Physics Guide"
          >
            <HelpCircle className="w-4 h-4 text-[#c5a059]" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={async () => {
              if (document.fullscreenElement) {
                await document.exitFullscreen();
              } else {
                await containerRef.current?.parentElement?.requestFullscreen();
              }
            }}
            className="p-2.5 rounded-xl bg-[#11161d]/85 backdrop-blur-md border border-[#27323f] text-[#cbd5e1] hover:text-[#f5efe3] transition-all cursor-pointer shadow-lg"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* --- TRANSFORMATION TOAST BANNER --- */}
      {transformToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="px-5 py-2.5 rounded-2xl bg-[#0c1015]/95 backdrop-blur-xl border border-amber-400/60 shadow-[0_0_35px_rgba(245,158,11,0.4)] flex items-center gap-3 text-xs sm:text-sm text-[#f8fafc]">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-spin" />
            <span className="font-semibold">{transformToast}</span>
          </div>
        </div>
      )}

      {/* --- HUD BOTTOM FLIGHT & GROUND INSTRUMENTS --- */}
      <div className="pointer-events-auto absolute bottom-28 left-4 z-20 flex flex-col items-center gap-1 md:hidden">
        <div
          role="application"
          aria-label="Movement trackpad"
          className="relative h-32 w-32 touch-none rounded-2xl border border-white/25 bg-slate-950/85 shadow-lg backdrop-blur"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            updateMobileJoystick(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) updateMobileJoystick(event);
          }}
          onPointerUp={releaseMobileJoystick}
          onPointerCancel={releaseMobileJoystick}
        >
          <span className="absolute inset-7 rounded-xl border border-white/20 bg-white/10" />
          <span
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sky-200/50 bg-sky-300/25 shadow-[0_0_18px_rgba(125,211,252,0.35)] transition-transform"
            style={{ transform: `translate(calc(-50% + ${mobilePadPosition.x}px), calc(-50% + ${mobilePadPosition.y}px))` }}
          />
          <span className="absolute inset-x-0 bottom-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white/70">Move</span>
        </div>
        <div className="mt-2 flex gap-1">
          <button
            type="button"
            aria-label={isGroundedUI ? 'Take flight' : 'Land'}
            className="rounded-xl border border-sky-300/30 bg-sky-950/85 px-3 py-2 text-xs font-semibold text-sky-100 shadow-lg backdrop-blur"
            onClick={() => pressMobileKey(isGroundedUI ? 'Space' : 'KeyF')}
          >
            {isGroundedUI ? 'Fly' : 'Land'}
          </button>
          <button
            type="button"
            aria-label="Center camera"
            className="rounded-xl border border-amber-300/30 bg-amber-950/85 px-3 py-2 text-xs font-semibold text-amber-100 shadow-lg backdrop-blur"
            onClick={() => {
              physicsRef.current.camYaw = physicsRef.current.yaw;
              physicsRef.current.camPitch = 0.18;
              physicsRef.current.orbitOffset.set(0, 0);
              cameraInputAtRef.current = performance.now();
            }}
          >
            Center
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between pointer-events-none z-10">
        {/* Left: Exploration / Flight Profile */}
        <div className="pointer-events-auto flex items-center gap-3">
          {isGroundedUI ? (
            /* Ground Exploration HUD */
            <div className="px-4 py-3 rounded-2xl bg-[#0f141a]/95 backdrop-blur-md border border-amber-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-200">The Straight Path</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                    Ground Sanctuary
                  </span>
                </div>
                <div className="text-[11px] text-[#94a3b8] mt-0.5 flex items-center gap-2">
                  <span>
                    <strong className="text-white">W / A / S / D</strong> Walk
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">Mouse Drag</strong> Look
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">Shift</strong> Sprint
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-white">Space</strong> Take Flight
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Flight Aviation HUD */
            <>
              {/* Speedometer */}
              <div className="px-4 py-3 rounded-2xl bg-[#0f141a]/90 backdrop-blur-md border border-[#232b36] shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#1b232e] text-[#38bdf8]">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold block">
                    Airspeed
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-[#f8fafc]">{speedKnots}</span>
                    <span className="text-[10px] text-[#94a3b8] font-mono">knots</span>
                  </div>
                </div>
              </div>

              {/* Altitude Meter */}
              <div className="px-4 py-3 rounded-2xl bg-[#0f141a]/90 backdrop-blur-md border border-[#232b36] shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#1b232e] text-[#f59e0b]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#64748b] font-semibold block">
                    Altitude
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-xl font-bold text-[#f8fafc]">{altitudeMeters}</span>
                    <span className="text-[10px] text-[#94a3b8] font-mono">m</span>
                  </div>
                </div>
              </div>

              {/* Flight State Indicator */}
              <div className="hidden sm:flex px-3.5 py-2.5 rounded-xl bg-[#0f141a]/90 backdrop-blur-md border border-[#232b36] items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[#cbd5e1] font-semibold">{flightState}</span>
              </div>
            </>
          )}

          {/* Quick Takeoff button when grounded */}
          {isGroundedUI ? (
            <button
              onClick={() => {
                physicsRef.current.isGrounded = false;
                physicsRef.current.pos.y += 12;
                physicsRef.current.speed = 20;
                physicsRef.current.pitch = 0.15;
                soundSynth.playSpeedBoost();
                soundSynth.playWingWhoosh();
                setIsGroundedUI(false);
                triggerTransformToast('Spread Wings to the Sky — Transformed to Celestial Bird');
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center gap-2 transition-all cursor-pointer border border-sky-300/40 active:scale-95"
            >
              <Feather className="w-4 h-4" />
              <span>Take Flight [Space]</span>
            </button>
          ) : (
            /* Quick Land button when flying */
            <button
              onClick={() => {
                physicsRef.current.isGrounded = true;
                physicsRef.current.vel.set(0, 0, 0);
                soundSynth.playChime(660);
                soundSynth.playItemObtain();
                setIsGroundedUI(true);
                triggerTransformToast('Landed — Transformed to Wayfarer [Press G for Gear]');
              }}
              className="px-4 py-3 rounded-2xl bg-[#0f141a]/90 hover:bg-[#1a2332] text-amber-300 font-bold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer border border-amber-500/40 active:scale-95"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Land Here [F]</span>
            </button>
          )}
        </div>

        {/* Center Prompt: Land & Enter Sanctuary OR Speak with Island NPC */}
        {nearNPC ? (
          <div className="pointer-events-auto flex flex-col items-center gap-2 animate-bounce">
            <button
              onClick={() => handleOpenNPCDialogue(nearNPC)}
              className="px-6 py-3.5 rounded-2xl text-[#0c0e10] font-bold text-sm shadow-[0_0_35px_rgba(245,158,11,0.6)] flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer border border-amber-200/60"
              style={{
                background: `linear-gradient(135deg, ${nearNPC.accentHex}, #fef08a)`,
              }}
            >
              <MessageSquare className="w-4 h-4 text-[#0c0e10]" />
              <span>[E / T] Talk to {nearNPC.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-amber-100 bg-black/75 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-400/40">
              Press E, T, or Click to hear {nearNPC.title}
            </span>
          </div>
        ) : nearSanctuary ? (
          <div className="pointer-events-auto flex flex-col items-center gap-2 animate-bounce">
            <button
              onClick={handleEnterNearestSanctuary}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#e2bb6f] hover:from-[#d8b268] hover:to-[#ebd089] text-[#0c0e10] font-bold text-sm shadow-[0_0_30px_rgba(197,160,89,0.6)] flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer border border-amber-200/50"
            >
              <MapPin className="w-4 h-4 text-[#0c0e10]" />
              <span>[E] Land & Enter {nearSanctuary.name}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-amber-200 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-500/30">
              Press E or Click to open Habit Sanctuary
            </span>
          </div>
        ) : null}

        {/* Right: Autopilot Fast Travel Drawer */}
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <div className="px-3.5 py-2.5 rounded-2xl bg-[#0f141a]/90 backdrop-blur-md border border-[#232b36] text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#94a3b8] font-semibold block mb-1.5">
              Fly Directly To Island:
            </span>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[280px]">
              {HABIT_ISLANDS.map((island) => (
                <button
                  key={island.id}
                  onClick={() => handleFastSoarToIsland(island)}
                  className="px-2.5 py-1 rounded-lg bg-[#1a212b] hover:bg-[#25303d] border border-[#2d3a49] text-[11px] text-[#f1f5f9] transition-all cursor-pointer flex items-center gap-1"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: island.accentHex }}
                  />
                  <span>{island.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Crosshair for flight orientation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <Crosshair className="w-6 h-6 text-[#f8fafc]" />
      </div>

      {/* --- POKEMON-STYLE ISLAND NPC DIALOGUE BOX --- */}
      {isDialogueOpen && dialogueNPC && (
        <div className="absolute inset-x-0 bottom-6 px-4 sm:px-8 md:px-16 pointer-events-none z-50 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-200">
          <div
            id="pokemon-npc-dialogue-box"
            onClick={handleAdvanceDialogue}
            className="pointer-events-auto relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border-2 bg-[#0c1117]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_45px_rgba(0,0,0,0.85)] cursor-pointer select-none transition-all hover:border-amber-400/80 group"
            style={{
              borderColor: `${dialogueNPC.accentHex}88`,
              boxShadow: `0 0 35px ${dialogueNPC.accentHex}25, 0 16px 40px rgba(0,0,0,0.9)`,
            }}
          >
            {/* NPC Speaker Plate Tag (Top-left Overlap) */}
            <div
              className="absolute -top-5 left-6 px-3.5 py-1.5 rounded-xl border flex items-center gap-2 shadow-lg backdrop-blur-md"
              style={{
                backgroundColor: '#111722',
                borderColor: dialogueNPC.accentHex,
                boxShadow: `0 0 15px ${dialogueNPC.accentHex}40`,
              }}
            >
              <span className="text-base sm:text-lg">{dialogueNPC.avatarEmoji}</span>
              <span className="font-serif-title font-bold text-xs sm:text-sm text-[#f5efe3]">
                {dialogueNPC.name}
              </span>
              <span className="text-[#64748b] text-xs">•</span>
              <span
                className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase"
                style={{ color: dialogueNPC.accentHex }}
              >
                {dialogueNPC.title}
              </span>
            </div>

            {/* Top-Right: Quick Actions (Replay, Scriptorium Guide, Close) */}
            <div
              className="absolute -top-4 right-6 flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {dialogueLineIndex > 0 && (
                <button
                  onClick={handleRestartDialogue}
                  className="px-2.5 py-1 rounded-lg bg-[#141b24] hover:bg-[#1f2a38] text-[11px] text-[#94a3b8] hover:text-[#f8fafc] border border-[#2a3749] transition-all cursor-pointer flex items-center gap-1 shadow"
                  title="Replay dialogue from start"
                >
                  <RotateCcw className="w-3 h-3 text-[#c5a059]" />
                  <span className="hidden sm:inline">Restart</span>
                </button>
              )}
              {onOpenGuideTab && (
                <button
                  onClick={() => {
                    handleCloseDialogue();
                    onOpenGuideTab();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#141b24] hover:bg-[#1f2a38] text-[11px] text-[#94a3b8] hover:text-[#f8fafc] border border-[#2a3749] transition-all cursor-pointer flex items-center gap-1 shadow"
                  title="Open Scriptorium Guide"
                >
                  <BookOpen className="w-3 h-3 text-[#c5a059]" />
                  <span className="hidden sm:inline">Scriptorium</span>
                </button>
              )}
              <button
                onClick={handleCloseDialogue}
                className="p-1 sm:px-2 sm:py-1 rounded-lg bg-[#141b24] hover:bg-[#1f2a38] text-[11px] text-[#94a3b8] hover:text-[#f8fafc] border border-[#2a3749] transition-all cursor-pointer flex items-center gap-1 shadow"
                title="Close dialogue (Esc)"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[10px]">Esc</span>
              </button>
            </div>

            {/* Dialogue Text Content Area */}
            <div className="pt-2 sm:pt-3 pb-3 min-h-[72px] sm:min-h-[82px] flex items-center">
              <p className="font-serif-title text-sm sm:text-base md:text-lg text-[#f1f5f9] leading-relaxed tracking-wide">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-amber-400 animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Footer Bar: Dialogue Progress, Key Hints & Classic Pokemon Bouncing Arrow */}
            <div className="pt-2 border-t border-[#1e2836] flex items-center justify-between text-xs text-[#94a3b8]">
              {/* Line indicator dots */}
              <div className="flex items-center gap-1.5">
                {dialogueNPC.dialogueLines.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === dialogueLineIndex
                        ? 'w-5 bg-amber-400'
                        : idx < dialogueLineIndex
                        ? 'w-2.5 bg-amber-600/70'
                        : 'w-1.5 bg-[#2a3749]'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-[#64748b] ml-1 font-mono">
                  {dialogueLineIndex + 1}/{dialogueNPC.dialogueLines.length}
                </span>
              </div>

              {/* Right Side: Key Hint & Bouncing Next Arrow */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#94a3b8] hidden sm:inline">
                  {isTyping
                    ? 'Click to skip typing'
                    : dialogueLineIndex < dialogueNPC.dialogueLines.length - 1
                    ? 'Click or [Space / Enter / E] to advance'
                    : 'Click or [Space / Enter / E] to finish'}
                </span>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-500/40 text-amber-300 font-semibold text-xs shadow">
                  <span>
                    {dialogueLineIndex < dialogueNPC.dialogueLines.length - 1 ? 'Next' : 'Done'}
                  </span>
                  {/* Classic Pokemon-style bouncing dialogue arrow indicator */}
                  <span className="inline-block text-[11px] animate-bounce text-amber-400 font-bold">
                    ▼
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTROLS MODAL --- */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#12171e] border border-[#27323f] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-sm text-[#e2e8f0]">
            <div className="flex items-center justify-between border-b border-[#232c37] pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-serif-title text-lg font-bold text-[#f5efe3]">
                  Wayfarer Controls & Movement Guide
                </h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1 rounded-lg text-[#94a3b8] hover:text-[#f8fafc] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                  Ground Movement (Wayfarer Character)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-[#c5a059] font-bold block">W / A / S / D</span>
                    <p className="text-[#94a3b8]">Walk in any direction relative to camera</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-[#c5a059] font-bold block">Mouse Drag / Touch</span>
                    <p className="text-[#94a3b8]">Smoothly orbit camera around character</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-[#c5a059] font-bold block">Shift Key</span>
                    <p className="text-[#94a3b8]">Sprint smoothly across sanctuaries</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-sky-400 font-bold block">Spacebar</span>
                    <p className="text-[#94a3b8]">Take flight & transform into Celestial Bird</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1.5">
                  Sky Flight (Celestial Bird)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-[#c5a059] font-bold block">W / S (In Air)</span>
                    <p className="text-[#94a3b8]">Dive down or climb up; auto-levels if released</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-[#c5a059] font-bold block">A / D (In Air)</span>
                    <p className="text-[#94a3b8]">Steer and bank smoothly left/right</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-amber-300 font-bold block">F Key</span>
                    <p className="text-[#94a3b8]">Land & transform back to Wayfarer</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#18202a] border border-[#263342] space-y-0.5">
                    <span className="text-sky-300 font-bold block">Spacebar (In Air)</span>
                    <p className="text-[#94a3b8]">Wingbeat boost climb into the open sky</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-xl bg-[#18202a] border border-[#263342] text-center">
                  <span className="text-emerald-400 font-bold block text-[11px]">E / T Key</span>
                  <p className="text-[10px] text-[#94a3b8]">Interact / Talk</p>
                </div>
                <div className="p-2 rounded-xl bg-[#18202a] border border-[#263342] text-center">
                  <span className="text-amber-400 font-bold block text-[11px]">G Key</span>
                  <p className="text-[10px] text-[#94a3b8]">Gear Panel</p>
                </div>
                <div className="p-2 rounded-xl bg-[#18202a] border border-[#263342] text-center">
                  <span className="text-purple-400 font-bold block text-[11px]">C Key</span>
                  <p className="text-[10px] text-[#94a3b8]">Camera Mode</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161d26] border border-[#2a3747] text-xs text-[#cbd5e1] leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                <Focus className="w-3.5 h-3.5" />
                <span>Land Transformation & Visible Gear:</span>
              </div>
              <p>
                When you touch down on any island or press F, your avatar instantaneously transforms from the celestial white bird into the Spiritual Wayfarer with all 5 gear pieces visible, opening your Character Gear Panel automatically! Press Space or the Take Flight button anytime to soar back into the heavens.
              </p>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b268] text-[#0c0e10] font-bold text-xs cursor-pointer transition-all"
            >
              Resume Flight
            </button>
          </div>
        </div>
      )}

      {/* --- CHARACTER & GEAR INSPECTION PANEL --- */}
      {/* Manifests when player touches land or toggles with G / button */}
      <CharacterGearPanel
        character={character}
        quests={quests}
        isOpen={isGearPanelOpen}
        onClose={() => setIsGearPanelOpen(false)}
        isGrounded={isGroundedUI}
        currentIsland={currentIsland}
        onOpenFullArmory={onOpenArmoryModal}
        onTakeFlight={() => {
          physicsRef.current.isGrounded = false;
          physicsRef.current.pos.y += 12;
          physicsRef.current.speed = 20;
          soundSynth.playWingWhoosh();
          setIsGroundedUI(false);
          setIsGearPanelOpen(false);
          triggerTransformToast('Ascended to Flight — Transformed to Celestial Bird');
        }}
        onAscendGear={onAscendGear}
      />
    </div>
  );
};
