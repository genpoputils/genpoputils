import { Injectable, computed, signal } from '@angular/core';
import { Category, ToolCategory, ToolStatus, UtilityTool } from '../models/tool.model';
import { CATEGORIES_DATA } from '../data/categories.data';
import { TOOLS_DATA } from '../data/tools.data';

export interface SearchResult {
  tool: UtilityTool;
  score: number;
  matchReason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  private readonly _tools = signal<UtilityTool[]>(TOOLS_DATA);
  private readonly _categories = signal<Category[]>(CATEGORIES_DATA);
  private readonly _searchQuery = signal<string>('');
  private readonly _selectedCategory = signal<ToolCategory | 'all'>('all');
  private readonly _statusFilter = signal<ToolStatus | 'all'>('all');

  // Readonly signals
  public readonly tools = this._tools.asReadonly();
  public readonly categories = this._categories.asReadonly();
  public readonly searchQuery = this._searchQuery.asReadonly();
  public readonly selectedCategory = this._selectedCategory.asReadonly();
  public readonly statusFilter = this._statusFilter.asReadonly();

  // Computed signals
  public readonly liveTools = computed(() =>
    this._tools().filter(t => t.status === 'live')
  );

  public readonly popularTools = computed(() =>
    this._tools().filter(t => t.popular || t.featured)
  );

  public readonly categoryCounts = computed(() => {
    const counts = new Map<ToolCategory, { total: number; live: number; comingSoon: number }>();
    for (const cat of this._categories()) {
      counts.set(cat.id, { total: 0, live: 0, comingSoon: 0 });
    }

    for (const tool of this._tools()) {
      const current = counts.get(tool.category) || { total: 0, live: 0, comingSoon: 0 };
      current.total += 1;
      if (tool.status === 'live') {
        current.live += 1;
      } else {
        current.comingSoon += 1;
      }
      counts.set(tool.category, current);
    }
    return counts;
  });

  public readonly searchResults = computed<SearchResult[]>(() => {
    const query = this._searchQuery().trim().toLowerCase();
    if (!query) {
      return [];
    }

    const results: SearchResult[] = [];

    for (const tool of this._tools()) {
      let score = 0;
      let matchReason = '';

      const nameLower = tool.name.toLowerCase();
      const slugLower = tool.slug.toLowerCase();
      const catLower = tool.category.toLowerCase();
      const descLower = tool.description.toLowerCase();

      // Check exact name/slug
      if (nameLower === query || slugLower === query) {
        score += 100;
        matchReason = 'Exact name match';
      } else if (nameLower.startsWith(query)) {
        score += 80;
        matchReason = 'Name starts with query';
      } else if (nameLower.includes(query)) {
        score += 50;
        matchReason = 'Name match';
      }

      // Check aliases
      if (tool.aliases) {
        for (const alias of tool.aliases) {
          const aliasLower = alias.toLowerCase();
          if (aliasLower === query) {
            score = Math.max(score, 90);
            matchReason = `Matched alias "${alias}"`;
          } else if (aliasLower.includes(query)) {
            score = Math.max(score, 45);
            matchReason = `Matched alias "${alias}"`;
          }
        }
      }

      // Check keywords
      for (const kw of tool.keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower === query) {
          score += 40;
          if (!matchReason) matchReason = `Keyword: ${kw}`;
        } else if (kwLower.includes(query) || query.includes(kwLower)) {
          score += 25;
          if (!matchReason) matchReason = `Keyword: ${kw}`;
        }
      }

      // Check category
      if (catLower === query) {
        score += 35;
        if (!matchReason) matchReason = `Category: ${tool.category}`;
      } else if (catLower.includes(query)) {
        score += 20;
        if (!matchReason) matchReason = `Category: ${tool.category}`;
      }

      // Check description / tagline
      if (descLower.includes(query)) {
        score += 15;
        if (!matchReason) matchReason = 'Description match';
      }

      // Bonus for live tools so they surface prominently
      if (score > 0 && tool.status === 'live') {
        score += 10;
      }

      if (score > 0) {
        results.push({ tool, score, matchReason });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  });

  public readonly filteredTools = computed(() => {
    const category = this._selectedCategory();
    const status = this._statusFilter();
    const query = this._searchQuery().trim().toLowerCase();

    return this._tools().filter(tool => {
      // Category check
      if (category !== 'all' && tool.category !== category) {
        return false;
      }

      // Status check
      if (status !== 'all' && tool.status !== status) {
        return false;
      }

      // Search query check
      if (query) {
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesCat = tool.category.toLowerCase().includes(query);
        const matchesDesc = tool.description.toLowerCase().includes(query);
        const matchesKw = tool.keywords.some(k => k.toLowerCase().includes(query));
        const matchesAlias = tool.aliases?.some(a => a.toLowerCase().includes(query));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesKw && !matchesAlias) {
          return false;
        }
      }

      return true;
    });
  });

  // Mutators
  public setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  public setSelectedCategory(category: ToolCategory | 'all'): void {
    this._selectedCategory.set(category);
  }

  public setStatusFilter(status: ToolStatus | 'all'): void {
    this._statusFilter.set(status);
  }

  public resetFilters(): void {
    this._searchQuery.set('');
    this._selectedCategory.set('all');
    this._statusFilter.set('all');
  }

  public getToolById(id: string): UtilityTool | undefined {
    return this._tools().find(t => t.id === id);
  }

  public getCategoryBySlug(slug: string): Category | undefined {
    return this._categories().find(c => c.slug === slug);
  }
}
