import { Scroll } from "lucide-react";

import { RpgWindow } from "@/components/rpg-window";
import type { Experience } from "@/types/portfolio";

type BattleLogProps = {
  experiences: Experience[];
};

export function BattleLog({ experiences }: BattleLogProps) {
  return (
    <RpgWindow title="BATTLE LOG (EXPERIENCE)">
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative">
            {index < experiences.length - 1 && (
              <div className="absolute left-[15px] top-12 w-0.5 h-full bg-[#45475a]" />
            )}

            <div className="flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 bg-[#f9e2af] border-4 border-[#45475a] flex items-center justify-center">
                  <Scroll className="w-4 h-4 text-[#1e1e2e]" />
                </div>
              </div>

              <div className="flex-1 bg-[#181825] border-2 border-[#45475a] p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[#f9e2af] text-xs mb-1">{exp.role}</h3>
                    <p className="text-[10px] text-[#bac2de]">{exp.company}</p>
                  </div>
                  <div className="px-2 py-1 bg-[#45475a] text-[8px] border border-[#45475a]">
                    {exp.period}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-[9px] text-[#f9e2af] mb-2">ACHIEVEMENTS UNLOCKED:</div>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="text-[10px] text-[#bac2de] flex items-start gap-2">
                        <span className="text-[#a6e3a1] mt-0.5">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RpgWindow>
  );
}
