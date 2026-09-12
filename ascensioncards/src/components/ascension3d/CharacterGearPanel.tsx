// @ts-nocheck -- vendored game code, kept as authored
import React, { useState } from 'react';
import {
  X,
  Shield,
  Award,
  Sparkles,
  Zap,
  ChevronRight,
  Minimize2,
  Maximize2,
  Feather,
  Shirt,
  Footprints,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Wind,
  Layers,
} from 'lucide-react';
import { CharacterState, QuestStatus, GearSlot, GearItem, HabitIsland, getTierColor } from './types';

interface CharacterGearPanelProps {
  isOpen: boolean;
  onClose: () => void;
  character: CharacterState;
  quests: QuestStatus[];
  isGrounded: boolean;
  currentIsland: HabitIsland | null;
  onOpenFullArmory?: () => void;
  onTakeFlight?: () => void;
  onAscendGear?: (slot: GearSlot) => void;
}

const SLOT_CONFIG: {
  slot: GearSlot;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  associatedQuestId: string;
}[] = [
  { slot: 'head', label: 'Head Gear', icon: Shield, associatedQuestId: 'spirituality' },
  { slot: 'chest', label: 'Chest Armor', icon: Shirt, associatedQuestId: 'vitality' },
  { slot: 'weapon', label: 'Equipped Weapon', icon: Feather, associatedQuestId: 'creation' },
  { slot: 'accessory', label: 'Sacred Relic', icon: Sparkles, associatedQuestId: 'reflection' },
  { slot: 'feet', label: 'Traveler Boots', icon: Footprints, associatedQuestId: 'wisdom' },
];

export const CharacterGearPanel: React.FC<CharacterGearPanelProps> = ({
  isOpen,
  onClose,
  character,
  quests,
  isGrounded,
  currentIsland,
  onOpenFullArmory,
  onTakeFlight,
  onAscendGear,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<GearSlot>('head');

  if (!isOpen) return null;

  const equipped = character.equipment || {
    head: null,
    chest: null,
    weapon: null,
    accessory: null,
    feet: null,
  };
  const currentItem: GearItem | null = equipped[selectedSlot] || null;

  // Base attributes calibrated to character level
  const baseVal = 10 + character.level * 4;
  const stats: Record<string, number> = {
    Serenity: baseVal,
    Vitality: baseVal,
    Wisdom: baseVal,
    Focus: baseVal,
    Creativity: baseVal,
  };

  // Add gear bonuses
  (Object.values(equipped) as (GearItem | null)[]).forEach((item) => {
    if (item && item.statBonus) {
      if (stats[item.statBonus.statName] !== undefined) {
        stats[item.statBonus.statName] += item.statBonus.amount;
      }
    }
  });

  return (
    <div
      id="character-gear-panel"
      className={`fixed z-40 transition-all duration-300 pointer-events-auto ${
        isMinimized
          ? 'bottom-6 left-6 w-80'
          : 'top-16 sm:top-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[460px] max-h-[85vh]'
      }`}
    >
      <div className="rounded-2xl bg-[#0d1217]/95 backdrop-blur-xl border border-[#27323f] shadow-[0_16px_40px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col text-[#f3ede3]">
        {/* Panel Header */}
        <div className="p-4 border-b border-[#212b36] flex items-center justify-between bg-gradient-to-r from-[#141b22] to-[#0f141a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a232d] border border-[#c5a059]/40 flex items-center justify-center relative shadow-[0_0_15px_rgba(197,160,89,0.15)]">
              {isGrounded ? (
                <Shield className="w-5 h-5 text-[#c5a059]" />
              ) : (
                <Feather className="w-5 h-5 text-sky-400" />
              )}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#c5a059] text-[#0c0e10] text-[10px] font-bold flex items-center justify-center font-mono">
                {character.level}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#f5efe3] tracking-wide">
                  {character.name || 'Spiritual Wayfarer'}
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c2631] text-[#c5a059] border border-[#c5a059]/30 font-medium">
                  {character.archetype}
                </span>
              </div>
              <p className="text-xs text-[#828e9b] flex items-center gap-1.5">
                <span>{character.activeTitle}</span>
                <span>•</span>
                <span className={isGrounded ? 'text-emerald-400 font-semibold' : 'text-sky-400 font-semibold'}>
                  {isGrounded ? 'Grounded Form' : 'Soaring Form'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="gear-panel-minimize-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg text-[#828e9b] hover:text-[#f5efe3] hover:bg-[#1a222a] transition-colors cursor-pointer"
              title={isMinimized ? 'Expand panel' : 'Minimize panel'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              id="gear-panel-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#828e9b] hover:text-[#f5efe3] hover:bg-[#1a222a] transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimized View */}
        {isMinimized ? (
          <div className="p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#a5b2c0]">
                {isGrounded ? 'On Island Ground' : 'Flying in Sky'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="text-xs text-[#c5a059] hover:underline font-medium cursor-pointer"
            >
              View Gear Slots
            </button>
          </div>
        ) : (
          /* Expanded Content Area */
          <div className="overflow-y-auto max-h-[calc(85vh-70px)] p-4 space-y-4">
            {/* Form & Environment Banner */}
            <div
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                isGrounded
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-sky-950/30 border-sky-500/40 text-sky-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="font-bold block">
                    {isGrounded ? 'Humanoid Character Manifested' : 'Celestial Soaring Bird'}
                  </span>
                  <span className="text-[11px] opacity-80">
                    {isGrounded
                      ? `Landed at ${currentIsland ? currentIsland.name : 'Sanctuary Island'} • Visible Gear Active`
                      : 'Wings unfolded • Soaring across the cloud sea'}
                  </span>
                </div>
              </div>

              {isGrounded && onTakeFlight && (
                <button
                  type="button"
                  onClick={onTakeFlight}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-100 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Wind className="w-3 h-3" />
                  <span>Take Flight</span>
                </button>
              )}
            </div>

            {/* Core Stats Overview */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#828e9b]">
                  Wayfarer Attributes
                </span>
                <span className="text-[11px] text-[#c5a059]">Gear Reinforced</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {[
                  { name: 'Serenity', val: stats.Serenity, color: 'text-sky-400' },
                  { name: 'Vitality', val: stats.Vitality, color: 'text-emerald-400' },
                  { name: 'Wisdom', val: stats.Wisdom, color: 'text-blue-400' },
                  { name: 'Focus', val: stats.Focus, color: 'text-rose-400' },
                  { name: 'Creation', val: stats.Creativity, color: 'text-purple-400' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="p-2 rounded-xl bg-[#121820] border border-[#1e2732] flex flex-col items-center"
                  >
                    <span className="text-[10px] text-[#717e8d] truncate w-full">{s.name}</span>
                    <span className={`text-sm font-bold font-mono mt-0.5 ${s.color}`}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear Slots Quick Selector */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#828e9b] block mb-2">
                Equipped Attire & Sacred Relics
              </span>
              <div className="grid grid-cols-5 gap-2">
                {SLOT_CONFIG.map(({ slot, label, icon: Icon, associatedQuestId }) => {
                  const item = equipped[slot];
                  const tier = item?.tier || 'Common';
                  const tierColors = getTierColor(tier);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      id={`gear-slot-btn-${slot}`}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${
                        isSelected
                          ? `${tierColors.bg} ${tierColors.border} ring-2 ring-[#c5a059]/60 shadow-[0_0_15px_rgba(197,160,89,0.2)]`
                          : 'bg-[#121820] border-[#1e2732] hover:border-[#2f3d4e] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${tierColors.text}`} />
                      <span className="text-[10px] font-medium text-[#d3dce6] truncate w-full text-center">
                        {slot.toUpperCase()}
                      </span>
                      {item && (
                        <span className={`text-[9px] font-mono font-semibold ${tierColors.text}`}>
                          {item.tier[0]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Gear Item Detail Card */}
            {currentItem ? (
              <div className="p-4 rounded-xl bg-[#121820] border border-[#24303d] space-y-3 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          getTierColor(currentItem.tier).bg
                        } ${getTierColor(currentItem.tier).border} border ${
                          getTierColor(currentItem.tier).text
                        }`}
                      >
                        {currentItem.tier}
                      </span>
                      <span className="text-xs text-[#717e8d] font-mono capitalize">
                        Slot: {currentItem.slot}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#f5efe3] mt-1.5 tracking-wide">
                      {currentItem.name}
                    </h4>
                  </div>

                  {currentItem.statBonus && (
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        +{currentItem.statBonus.amount}
                      </span>
                      <span className="block text-[10px] text-[#7e8c9b]">
                        {currentItem.statBonus.statName}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#a6b4c3] leading-relaxed">
                  {currentItem.description}
                </p>

                {currentItem.lore && (
                  <div className="p-2.5 rounded-lg bg-[#0b0e12] border border-[#1b232c] text-[11px] text-[#8391a0] italic">
                    "{currentItem.lore}"
                  </div>
                )}

                {/* Ascension Progress & Action */}
                {(() => {
                  const associatedSlot = SLOT_CONFIG.find((s) => s.slot === selectedSlot);
                  const quest = quests.find((q) => q.questId === associatedSlot?.associatedQuestId);
                  const currentStreak = quest?.currentStreak || 0;
                  const req = currentItem.streakRequirementForNext || 7;
                  const canAscend = currentStreak >= req && currentItem.tier !== 'Legendary';

                  return (
                    <div className="pt-2 border-t border-[#1d2630] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                      <div>
                        <span className="text-[#7d8b99] text-[11px] block">
                          Associated Discipline: {quest?.questName || 'Daily Practice'}
                        </span>
                        <span className="font-mono text-[#f3ede3] font-semibold">
                          Streak Progress: {currentStreak} / {req} Days
                        </span>
                      </div>

                      {canAscend && onAscendGear && (
                        <button
                          type="button"
                          id={`ascend-gear-btn-${selectedSlot}`}
                          onClick={() => onAscendGear(selectedSlot)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#c5a059] hover:bg-[#d6b066] text-[#0c0e10] font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#0c0e10]" />
                          <span>Ascend Gear</span>
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="p-6 text-center rounded-xl bg-[#121820] border border-[#1e2732] text-xs text-[#717e8d]">
                No gear currently equipped in this slot.
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-1 flex items-center justify-between gap-3">
              {onOpenFullArmory && (
                <button
                  type="button"
                  id="open-full-armory-btn"
                  onClick={onOpenFullArmory}
                  className="w-full py-2.5 rounded-xl bg-[#161e27] hover:bg-[#202b37] border border-[#2d3a49] text-xs font-semibold text-[#c5a059] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Open Full Armory & Mastery Codex</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
