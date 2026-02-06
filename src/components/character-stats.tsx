import Image from "next/image";
import { Briefcase, Code, MapPin } from "lucide-react";

import { RpgWindow } from "@/components/rpg-window";
import { StatBar } from "@/components/stat-bar";
import type { StatsData } from "@/types/portfolio";

type CharacterStatsProps = {
  stats: StatsData;
};

const renderStars = (rating: number) =>
  Array.from({ length: 5 }, (_, index) => (index < rating ? "★" : "☆")).join("");

export function CharacterStats({ stats }: CharacterStatsProps) {
  const heroClass = stats.className;

  return (
    <RpgWindow title="CHARACTER INFO">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#45475a] border-2 md:border-4 border-[#45475a] flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src="/profile.png"
                alt={`${stats.heroName} portrait`}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-[#f9e2af] mb-2 text-xs md:text-sm">{stats.heroName}</h3>
              <p className="text-[9px] md:text-[10px] mb-1">{stats.levelTitle}</p>
              <p className="text-[9px] md:text-[10px] text-[#bac2de]">{heroClass}</p>
            </div>
          </div>

          <StatBar label="HP (HEALTH POINTS)" current={stats.hp.current} max={stats.hp.max} color="hp" />
          <StatBar label="MP (MOTIVATION POINTS)" current={stats.mp.current} max={stats.mp.max} color="mp" />
          <StatBar label="EXP (EXPERIENCE)" current={stats.exp.current} max={stats.exp.max} color="exp" />
        </div>

        <div>
          <h3 className="text-[#f9e2af] mb-3 md:mb-4 text-[10px] md:text-xs border-b-2 border-[#45475a] pb-2">
            CORE ATTRIBUTES
          </h3>
          <div className="space-y-1.5 md:space-y-2 text-[9px] md:text-[10px]">
            {stats.attributes.map((attribute) => (
              <div key={attribute.label} className="flex justify-between p-2 bg-[#181825]">
                <span className="truncate mr-2">{attribute.label}</span>
                <span className="text-[#f9e2af] flex-shrink-0">{renderStars(attribute.rating)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#181825] border-2 border-[#45475a]">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3 h-3 text-[#f9e2af] flex-shrink-0" />
              <span className="text-[9px] md:text-[10px] truncate">{stats.location}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-3 h-3 text-[#f9e2af] flex-shrink-0" />
              <span className="text-[9px] md:text-[10px]">{stats.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code className="w-3 h-3 text-[#f9e2af] flex-shrink-0" />
              <span className="text-[9px] md:text-[10px]">{stats.languages}</span>
            </div>
          </div>
        </div>
      </div>
    </RpgWindow>
  );
}
