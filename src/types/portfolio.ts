export type StatValue = {
  current: number;
  max: number;
};

export type Attribute = {
  label: string;
  rating: number;
};

export type StatsData = {
  heroName: string;
  levelTitle: string;
  className: string;
  hp: StatValue;
  mp: StatValue;
  exp: StatValue;
  attributes: Attribute[];
  location: string;
  experience: string;
  languages: string;
};

export type Skill = {
  name: string;
  category: string;
  icon: string;
  mana: number;
  power: number;
  description: string;
};

export type Quest = {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  status: "Completed" | "In Progress";
  reward: string;
  technologies: string[];
  type: "professional" | "personal";
  url?: string;
};

export type Experience = {
  id: number;
  company: string;
  role: string;
  period: string;
  achievements: string[];
  website?: string;
};

export type Chronicle = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
};

export type Technology = {
  id: number;
  name: string;
  icon: string;
  category: string;
  description: string;
  mana: number;
  power: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  url: string;
  discovered: boolean;
};

export type Contact = {
  icon: string;
  label: string;
  value: string;
  action: string;
};

export type PortfolioData = {
  site: {
    headerTitle: string;
    headerSubtitle: string;
  };
  menu: { id: string; label: string }[];
  stats: StatsData;
  skills: Skill[];
  quests: Quest[];
  experiences: Experience[];
  chronicles: Chronicle[];
  technologies: Technology[];
  contacts: Contact[];
  cta: {
    primaryLabel: string;
    secondaryLabel: string;
  };
};
