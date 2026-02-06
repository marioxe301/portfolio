"use client";

import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { BattleLog } from "@/components/battle-log";
import { CharacterStats } from "@/components/character-stats";
import { Chronicles } from "@/components/chronicles";
import { ContactDialog } from "@/components/contact-dialog";
import { QuestLog } from "@/components/quest-log";
import { RpgMenu } from "@/components/rpg-menu";
import { SkillTree } from "@/components/skill-tree";
import { TechCodex } from "@/components/tech-codex";
import portfolioData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

const data = portfolioData as PortfolioData;

export default function Home() {
  const defaultSection = data.menu[0]?.id ?? "stats";
  const [activeSection, setActiveSection] = useState(defaultSection);

  const content = useMemo(() => {
    switch (activeSection) {
      case "stats":
        return <CharacterStats stats={data.stats} />;
      case "skills":
        return <SkillTree skills={data.skills} />;
      case "codex":
        return <TechCodex technologies={data.technologies} />;
      case "quests":
        return <QuestLog quests={data.quests} />;
      case "experience":
        return <BattleLog experiences={data.experiences} />;
      case "chronicles":
        return <Chronicles posts={data.chronicles} />;
      case "contact":
        return <ContactDialog contacts={data.contacts} cta={data.cta} />;
      default:
        return <CharacterStats stats={data.stats} />;
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#1e1e2e] p-2 sm:p-4 md:p-8">
      <header className="mb-6 md:mb-8">
        <div className="bg-[#313244] border-2 md:border-4 border-[#45475a] p-4 md:p-6 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2">
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-[#f9e2af]" />
            <h1 className="text-[#f9e2af] text-[10px] sm:text-xs md:text-sm lg:text-base">
              {data.site.headerTitle}
            </h1>
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-[#f9e2af]" />
          </div>
          <p className="text-[8px] sm:text-[10px] text-[#bac2de]">{data.site.headerSubtitle}</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] gap-4 md:gap-6 max-w-7xl mx-auto mb-8">
        <aside className="lg:sticky lg:top-8 h-fit">
          <RpgMenu items={data.menu} activeSection={activeSection} onSectionChange={setActiveSection} />
        </aside>

        <main className="min-w-0">{content}</main>
      </div>
    </div>
  );
}
