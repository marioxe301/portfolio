"use client";

import { ExternalLink, Shield, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

import { RpgWindow } from "@/components/rpg-window";
import type { Technology } from "@/types/portfolio";

type TechCodexProps = {
  technologies: Technology[];
};

const rarityColors: Record<Technology["rarity"], string> = {
  Common: "text-[#bac2de]",
  Rare: "text-[#89b4fa]",
  Epic: "text-[#cba6f7]",
  Legendary: "text-[#f9e2af]",
};

const rarityBorders: Record<Technology["rarity"], string> = {
  Common: "border-[#bac2de]",
  Rare: "border-[#89b4fa]",
  Epic: "border-[#cba6f7]",
  Legendary: "border-[#f9e2af]",
};

export function TechCodex({ technologies }: TechCodexProps) {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  return (
    <RpgWindow title="TECHNOLOGY CODEX">
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2 max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2">
          {technologies.map((tech) => (
            <button
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className={`w-full bg-[#181825] border-2 p-2 md:p-3 text-left transition-all hover:bg-[#313244] ${
                selectedTech?.id === tech.id
                  ? `${rarityBorders[tech.rarity]} bg-[#313244]`
                  : "border-[#45475a]"
              }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl flex-shrink-0">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] md:text-[10px] text-[#cdd6f4]">
                      #{tech.id.toString().padStart(3, "0")}
                    </span>
                    <span className="text-[9px] md:text-[10px] text-[#cdd6f4] truncate">{tech.name}</span>
                  </div>
                  <span className={`text-[8px] ${rarityColors[tech.rarity]}`}>
                    {tech.rarity.toUpperCase()}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-[#181825] border-2 md:border-4 border-[#45475a] p-4 md:p-6 lg:sticky lg:top-0">
          {selectedTech ? (
            <div>
              <div className={`border-b-2 ${rarityBorders[selectedTech.rarity]} pb-4 mb-4`}>
                <div className="flex items-start gap-3 md:gap-4 mb-3">
                  <span className="text-4xl md:text-5xl flex-shrink-0">{selectedTech.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] text-[#bac2de] mb-1">
                      #{selectedTech.id.toString().padStart(3, "0")}
                    </div>
                    <h3 className="text-[#f9e2af] text-xs md:text-sm mb-2 break-words">
                      {selectedTech.name}
                    </h3>
                    <div className={`text-[9px] ${rarityColors[selectedTech.rarity]} mb-2`}>
                      ★ {selectedTech.rarity.toUpperCase()}
                    </div>
                    <div className="text-[9px] text-[#bac2de] bg-[#313244] px-2 py-1 inline-block border border-[#45475a]">
                      {selectedTech.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-[#f9e2af] text-[10px] mb-2">DESCRIPTION</h4>
                <p className="text-[9px] text-[#cdd6f4] leading-relaxed">{selectedTech.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-[#f9e2af] text-[10px] mb-3">STATS</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1 text-[9px]">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#f38ba8] flex-shrink-0" />
                        <span className="text-[#bac2de]">POWER</span>
                      </div>
                      <span className="text-[#f38ba8]">{selectedTech.power}/100</span>
                    </div>
                    <div className="h-2 bg-[#313244] border border-[#45475a]">
                      <div className="h-full bg-[#f38ba8]" style={{ width: `${selectedTech.power}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1 text-[9px]">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#89b4fa] flex-shrink-0" />
                        <span className="text-[#bac2de]">MANA COST</span>
                      </div>
                      <span className="text-[#89b4fa]">{selectedTech.mana}/100</span>
                    </div>
                    <div className="h-2 bg-[#313244] border border-[#45475a]">
                      <div className="h-full bg-[#89b4fa]" style={{ width: `${selectedTech.mana}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={selectedTech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#f9e2af] text-[#1e1e2e] px-3 md:px-4 py-2 md:py-3 text-[9px] md:text-[10px] border-2 border-[#f9e2af] hover:bg-[#fab387] hover:border-[#fab387] transition-all"
              >
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">▸ VIEW DOCUMENTATION</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#45475a] mx-auto mb-4" />
              <p className="text-[10px] text-[#bac2de]">Select a technology from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </RpgWindow>
  );
}
