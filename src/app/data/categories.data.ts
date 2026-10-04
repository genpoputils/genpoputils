import { Category } from '../models/tool.model';

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'Finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Loans, investments, interest, savings, taxes.',
    icon: 'finance',
    accentColor: 'emerald'
  },
  {
    id: 'Developer Tools',
    name: 'Developer Tools',
    slug: 'developer-tools',
    description: 'Regex, JSON, encoding, hashing and developer utilities.',
    icon: 'code',
    accentColor: 'indigo'
  },
  {
    id: 'Math',
    name: 'Math',
    slug: 'math',
    description: 'Percentages, fractions, equations, statistics and calculations.',
    icon: 'math',
    accentColor: 'blue'
  },
  {
    id: 'Business',
    name: 'Business',
    slug: 'business',
    description: 'Margins, profit, markup, pricing and business calculations.',
    icon: 'business',
    accentColor: 'amber'
  },
  {
    id: 'Date & Time',
    name: 'Date & Time',
    slug: 'date-time',
    description: 'Age, date differences, time zones, working days and deadlines.',
    icon: 'calendar',
    accentColor: 'violet'
  },
  {
    id: 'Converters',
    name: 'Converters',
    slug: 'converters',
    description: 'Length, weight, temperature, volume, speed, area and more.',
    icon: 'converter',
    accentColor: 'cyan'
  },
  {
    id: 'Health & Fitness',
    name: 'Health & Fitness',
    slug: 'health-fitness',
    description: 'BMI, calories, body measurements and fitness calculations.',
    icon: 'health',
    accentColor: 'rose'
  }
];
