"use client";

import { Book, BookOpen, Briefcase, MessageSquare, Scroll, Sword, User } from "lucide-react";

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
  return (
    <div className="bg-[#313244] border-2 md:border-4 border-[#45475a] p-3 md:p-4">
      <div className="text-[#f9e2af] text-[10px] md:text-xs mb-3 md:mb-4 pb-2 border-b-2 border-[#45475a]">
        MAIN MENU
      </div>
      <nav className="space-y-1.5 md:space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.id] ?? User;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
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
  );
}
