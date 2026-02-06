"use client";

import { Cloud, Code, Database, Palette, Terminal, Wrench } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { RpgWindow } from "@/components/rpg-window";
import type { Skill } from "@/types/portfolio";

type SkillTreeProps = {
  skills: Skill[];
};

const categoryIcons: Record<string, typeof Code> = {
  Frontend: Code,
  Backend: Terminal,
  Database: Database,
  DevOps: Cloud,
  Design: Palette,
  Tools: Wrench,
};

export function SkillTree({ skills }: SkillTreeProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  const handleMouseEnter = (
    skill: Skill,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setHoveredSkill(skill);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({ x: rect.left, y: rect.top });
  };

  const handleMouseLeave = () => {
    setHoveredSkill(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tooltip = hoveredSkill ? (
    <div
      className="fixed z-[9999] bg-[#181825] border-4 border-[#f9e2af] p-4 pointer-events-none max-w-xs"
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y - 10}px`,
        transform: "translateY(-100%)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{hoveredSkill.icon}</span>
        <div>
          <h4 className="text-[#f9e2af] text-xs mb-1">{hoveredSkill.name}</h4>
          <p className="text-[8px] text-[#bac2de]">{hoveredSkill.category}</p>
        </div>
      </div>

      <p className="text-[9px] text-[#cdd6f4] mb-3 leading-relaxed">
        {hoveredSkill.description}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-[#bac2de]">MANA COST:</span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 bg-[#313244] border border-[#45475a]">
              <div className="h-full bg-[#89b4fa]" style={{ width: `${hoveredSkill.mana}%` }} />
            </div>
            <span className="text-[#89b4fa]">{hoveredSkill.mana}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px]">
          <span className="text-[#bac2de]">POWER:</span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 bg-[#313244] border border-[#45475a]">
              <div className="h-full bg-[#f38ba8]" style={{ width: `${hoveredSkill.power}%` }} />
            </div>
            <span className="text-[#f38ba8]">{hoveredSkill.power}</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <RpgWindow title="SKILL TREE">
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Code;
          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#45475a]">
                <Icon className="w-4 h-4 text-[#f9e2af]" />
                <h3 className="text-[#f9e2af] text-xs">{category.toUpperCase()}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={(event) => handleMouseEnter(skill, event)}
                      onMouseLeave={handleMouseLeave}
                      className="bg-[#181825] border-2 border-[#45475a] px-3 py-2 hover:border-[#f9e2af] hover:bg-[#313244] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{skill.icon}</span>
                        <span className="text-[10px] text-[#cdd6f4] group-hover:text-[#f9e2af] transition-colors">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {isMounted && tooltip ? createPortal(tooltip, document.body) : null}
    </RpgWindow>
  );
}
