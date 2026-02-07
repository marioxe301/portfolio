"use client";

import { Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

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
const defaultSection = data.menu[0]?.id ?? "stats";
const menuSectionIds = new Set(data.menu.map((item) => item.id));

const sectionMeta = {
  stats: {
    title: "Status | Mario Flores",
    description:
      "Profile stats and hero summary for Mario Flores, a software engineer focused on modern web experiences.",
    label: "Status",
  },
  skills: {
    title: "Skills | Mario Flores",
    description: "Skill tree spanning frontend, backend, DevOps, and tooling expertise.",
    label: "Skills",
  },
  codex: {
    title: "Tech Codex | Mario Flores",
    description: "Technology codex covering frameworks, languages, and tools in the stack.",
    label: "Tech Codex",
  },
  quests: {
    title: "Quests | Mario Flores",
    description: "Project quests and case studies showcasing real-world work and outcomes.",
    label: "Quests",
  },
  experience: {
    title: "Battle Log | Mario Flores",
    description: "Career timeline and achievements across roles and organizations.",
    label: "Battle Log",
  },
  chronicles: {
    title: "Chronicles | Mario Flores",
    description: "Notes, posts, and updates from the developer journey.",
    label: "Chronicles",
  },
  contact: {
    title: "Contact | Mario Flores",
    description: "Ways to connect with Mario Flores for collaboration opportunities.",
    label: "Contact",
  },
} as const;

const normalizeHash = (hash: string) => hash.replace(/^#/, "").trim().toLowerCase();

const resolveSectionFromHash = (hash: string) => {
  const normalized = normalizeHash(hash);
  return menuSectionIds.has(normalized) ? normalized : defaultSection;
};

const getSectionMeta = (sectionId: string) => sectionMeta[sectionId as keyof typeof sectionMeta] ?? sectionMeta.stats;

const updateDocumentMeta = (sectionId: string) => {
  if (typeof document === "undefined") {
    return;
  }

  const meta = getSectionMeta(sectionId);
  document.title = meta.title;

  const descriptionTag = document.querySelector("meta[name='description']");
  if (descriptionTag) {
    descriptionTag.setAttribute("content", meta.description);
    return;
  }

  const newDescription = document.createElement("meta");
  newDescription.setAttribute("name", "description");
  newDescription.setAttribute("content", meta.description);
  document.head.appendChild(newDescription);
};

export default function Home() {
  const [activeSection, setActiveSection] = useState(defaultSection);

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);

    if (typeof window !== "undefined") {
      const nextHash = `#${section}`;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncFromHash = () => {
      const nextSection = resolveSectionFromHash(window.location.hash);
      setActiveSection((currentSection) => (currentSection === nextSection ? currentSection : nextSection));
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

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

  useEffect(() => {
    updateDocumentMeta(activeSection);
  }, [activeSection]);

  const activeSectionMeta = getSectionMeta(activeSection);

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
          <RpgMenu items={data.menu} activeSection={activeSection} onSectionChange={handleSectionChange} />
        </aside>

        <main className="min-w-0">
          <section id={activeSection} aria-label={activeSectionMeta.label} className="scroll-mt-6">
            {content}
          </section>
        </main>
      </div>
    </div>
  );
}
