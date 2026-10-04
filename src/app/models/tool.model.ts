export type ToolCategory =
  | 'Finance'
  | 'Math'
  | 'Developer Tools'
  | 'Business'
  | 'Health & Fitness'
  | 'Date & Time'
  | 'Converters';

export type ToolStatus = 'live' | 'coming-soon';

export interface UtilityTool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  aliases?: string[];
  url: string;
  status: ToolStatus;
  icon: string;
  featured?: boolean;
  popular?: boolean;
  badge?: string;
  highlights?: string[];
}

export interface Category {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  accentColor: string;
}
