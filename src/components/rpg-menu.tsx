"use client";

import { Book, BookOpen, Briefcase, ChevronDown, MessageSquare, Scroll, Sword, User } from "lucide-react";
import { useState } from "react";

type MenuItem = {
  id: string;
  label: string;
};

type RpgMenuProps = {
  items: MenuItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
};

const iconMap: Record<string, typeof User> = {
  stats: User,
  skills: Scroll,
  codex: Book,
  quests: Sword,
  experience: Briefcase,
  chronicles: BookOpen,
  contact: MessageSquare,
};

export function RpgMenu({ items, activeSection, onSectionChange }: RpgMenuProps) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleMenu = () => setIsOpen((current) => !current);
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="bg-[#313244] border-2 md:border-4 border-[#45475a] p-3 md:p-4">
      <div className="flex items-center justify-between gap-2 mb-3 md:mb-4 pb-2 border-b-2 border-[#45475a]">
        <div className="text-[#f9e2af] text-[10px] md:text-xs">MAIN MENU</div>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="rpg-main-menu"
          onClick={toggleMenu}
          className="lg:hidden flex items-center justify-center w-7 h-7 border-2 border-[#45475a] text-[#f9e2af] hover:border-[#f9e2af] transition-colors"
        >
          <span className="sr-only">Toggle menu</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id="rpg-main-menu" className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <nav aria-label="Main navigation" className="space-y-1.5 md:space-y-2">
          {items.map((item) => {
            const Icon = iconMap[item.id] ?? User;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={activeSection === item.id ? "page" : undefined}
                onClick={() => handleSectionClick(item.id)}
                className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-left text-[9px] md:text-[10px] transition-all ${
                  activeSection === item.id
                    ? "bg-[#f9e2af] text-[#1e1e2e] border-2 border-[#f9e2af]"
                    : "bg-[#181825] text-[#cdd6f4] border-2 border-[#45475a] hover:border-[#f9e2af]"
                }`}
              >
                <Icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                <span className="truncate">▸ {item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
