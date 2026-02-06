"use client";

import { Briefcase, ExternalLink, Star, Sword, Trophy, User } from "lucide-react";
import { useState } from "react";

import { RpgWindow } from "@/components/rpg-window";
import type { Quest } from "@/types/portfolio";

type QuestLogProps = {
  quests: Quest[];
};

const difficultyColors: Record<Quest["difficulty"], string> = {
  Easy: "text-[#a6e3a1]",
  Medium: "text-[#89b4fa]",
  Hard: "text-[#fab387]",
  Legendary: "text-[#f9e2af]",
};

const difficultyIcons: Record<Quest["difficulty"], string> = {
  Easy: "★",
  Medium: "★★",
  Hard: "★★★",
  Legendary: "★★★★★",
};

export function QuestLog({ quests }: QuestLogProps) {
  const [activeTab, setActiveTab] = useState<"professional" | "personal">("professional");

  const filteredQuests = quests.filter((quest) => quest.type === activeTab);

  return (
    <RpgWindow title="QUEST LOG">
      <div className="flex gap-2 mb-6 border-b-4 border-[#45475a] pb-2">
        <button
          onClick={() => setActiveTab("professional")}
          className={`flex items-center gap-2 px-4 py-2 text-[10px] transition-all ${
            activeTab === "professional"
              ? "bg-[#f9e2af] text-[#1e1e2e] border-2 border-[#f9e2af]"
              : "bg-[#45475a] text-[#cdd6f4] border-2 border-[#45475a] hover:border-[#f9e2af]"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>▸ PROFESSIONAL</span>
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex items-center gap-2 px-4 py-2 text-[10px] transition-all ${
            activeTab === "personal"
              ? "bg-[#f9e2af] text-[#1e1e2e] border-2 border-[#f9e2af]"
              : "bg-[#45475a] text-[#cdd6f4] border-2 border-[#45475a] hover:border-[#f9e2af]"
          }`}
        >
          <User className="w-4 h-4" />
          <span>▸ PERSONAL</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredQuests.map((quest) => (
          <div
            key={quest.id}
            className={`bg-[#181825] border-4 ${
              quest.status === "Completed" ? "border-[#a6e3a1]" : "border-[#fab387]"
            } p-4`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                {quest.status === "Completed" ? (
                  <Trophy className="w-6 h-6 text-[#f9e2af] mt-1" />
                ) : (
                  <Sword className="w-6 h-6 text-[#fab387] mt-1" />
                )}
                <div>
                  <h3 className="text-[#f9e2af] mb-1 text-xs">{quest.title}</h3>
                  <p className={`text-[10px] mb-2 ${difficultyColors[quest.difficulty]}`}>
                    {difficultyIcons[quest.difficulty]} {quest.difficulty} Quest
                  </p>
                </div>
              </div>
              <div
                className={`px-2 py-1 text-[8px] border-2 ${
                  quest.status === "Completed"
                    ? "border-[#a6e3a1] text-[#a6e3a1]"
                    : "border-[#fab387] text-[#fab387]"
                }`}
              >
                {quest.status.toUpperCase()}
              </div>
            </div>

            <p className="text-[10px] text-[#bac2de] mb-3 leading-relaxed">{quest.description}</p>

            <div className="mb-3">
              <div className="text-[9px] text-[#f9e2af] mb-1">TECHNOLOGIES USED:</div>
              <div className="flex flex-wrap gap-1">
                {quest.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-[#45475a] text-[8px] border border-[#45475a]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] text-[#f9e2af] pt-2 border-t-2 border-[#45475a]">
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3" />
                <span>REWARD: {quest.reward}</span>
              </div>
              {quest.url && (
                <a
                  href={quest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[#f9e2af] text-[#1e1e2e] border-2 border-[#f9e2af] text-[8px] hover:bg-[#fab387] hover:border-[#fab387] transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  VIEW PROJECT
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </RpgWindow>
  );
}
