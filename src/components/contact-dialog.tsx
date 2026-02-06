import { Github, Globe, Linkedin, Mail, MessageSquare } from "lucide-react";

import { RpgWindow } from "@/components/rpg-window";
import type { Contact } from "@/types/portfolio";

type ContactDialogProps = {
  contacts: Contact[];
  cta: {
    primaryLabel: string;
    secondaryLabel: string;
  };
};

const iconMap = {
  Mail,
  Github,
  Linkedin,
  Globe,
};

export function ContactDialog({ contacts, cta }: ContactDialogProps) {
  return (
    <RpgWindow title="CONTACT DIALOG">
      <div className="space-y-4 md:space-y-6">
        <div className="bg-[#181825] border-2 md:border-4 border-[#45475a] p-4 md:p-6 relative">
          <div className="absolute -top-2 md:-top-3 left-6 md:left-8 w-4 h-4 md:w-6 md:h-6 bg-[#181825] border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-[#45475a] rotate-45" />

          <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-[#f9e2af] flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] md:text-[10px] leading-relaxed mb-2 md:mb-3">
                <span className="text-[#f9e2af]">▸ </span>
                "Greetings, traveler! I am a Software Engineer on a quest to build amazing digital experiences. Would
                you like to join forces on your next adventure?"
              </p>
              <p className="text-[9px] md:text-[10px] leading-relaxed text-[#bac2de]">
                <span className="text-[#f9e2af]">▸ </span>
                Choose your preferred method of communication below to begin our collaboration quest!
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.icon as keyof typeof iconMap] ?? Mail;
            return (
              <a
                key={contact.label}
                href={contact.action}
                className="bg-[#181825] border-2 border-[#45475a] p-3 md:p-4 hover:border-[#f9e2af] hover:bg-[#313244] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#45475a] border-2 border-[#45475a] flex items-center justify-center group-hover:border-[#f9e2af] transition-all flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#f9e2af]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8px] md:text-[9px] text-[#bac2de] mb-1">
                      {contact.label.toUpperCase()}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-[#cdd6f4] group-hover:text-[#f9e2af] transition-colors truncate">
                      {contact.value}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <button className="flex-1 bg-[#f9e2af] text-[#1e1e2e] px-4 md:px-6 py-2 md:py-3 text-[9px] md:text-[10px] border-2 md:border-4 border-[#45475a] hover:bg-[#f5c2e7] transition-all active:translate-y-1">
            ▸ {cta.primaryLabel}
          </button>
          <button className="flex-1 bg-[#45475a] text-[#cdd6f4] px-4 md:px-6 py-2 md:py-3 text-[9px] md:text-[10px] border-2 md:border-4 border-[#45475a] hover:bg-[#585b70] transition-all active:translate-y-1">
            ▸ {cta.secondaryLabel}
          </button>
        </div>
      </div>
    </RpgWindow>
  );
}
