import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryService } from '../../../services/registry.service';
import { ToolCategory, ToolStatus, UtilityTool } from '../../../models/tool.model';
import { ToolCardComponent } from '../tool-card/tool-card.component';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-popular-tools',
  standalone: true,
  imports: [CommonModule, ToolCardComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-14 sm:py-20 border-t border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-950/40 relative z-10" id="popular-tools">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            @if (registryService.searchQuery().trim()) {
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 mb-3">
                <app-icon name="search" className="w-3.5 h-3.5"></app-icon>
                <span>Search Results</span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                Matching utilities
              </h2>
              <div class="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl flex flex-wrap items-center gap-2">
                <span>Found {{ displayedTools().length }} matching utilities for "<strong>{{ registryService.searchQuery() }}</strong>".</span>
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer text-xs"
                >
                  Clear search
                </button>
              </div>
            } @else {
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Available & In Development</span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                Featured utilities
              </h2>
              <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
                Independent, fast-loading tools built to solve specific problems without bloated interfaces or unnecessary steps.
              </p>
            }
          </div>

          <!-- Filter buttons: All, Live Only -->
          <div class="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 dark:bg-zinc-900 border border-slate-300/60 dark:border-zinc-800 text-xs font-medium self-start md:self-auto">
            <button
              type="button"
              (click)="setStatusFilter('all')"
              class="px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              [ngClass]="{
                'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs': activeFilter() === 'all',
                'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200': activeFilter() !== 'all'
              }"
            >
              All ({{ totalAvailableCount() }})
            </button>

            <button
              type="button"
              (click)="setStatusFilter('live')"
              class="px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              [ngClass]="{
                'bg-white dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 shadow-xs': activeFilter() === 'live',
                'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200': activeFilter() !== 'live'
              }"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Live Now ({{ liveAvailableCount() }})</span>
            </button>
          </div>
        </div>

        <!-- Tool Grid -->
        @if (displayedTools().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (tool of displayedTools(); track tool.id) {
              <app-tool-card [tool]="tool"></app-tool-card>
            }
          </div>
        } @else {
          <!-- Empty State in Grid -->
          <div class="p-10 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 max-w-xl mx-auto">
            <div class="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-3">
              <app-icon name="search" className="w-5 h-5"></app-icon>
            </div>
            <p class="text-base font-semibold text-slate-900 dark:text-zinc-100">
              No utilities match your search
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              Try searching with broader keywords, or clear your query to view all available tools.
            </p>
            <button
              type="button"
              (click)="clearSearch()"
              class="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Clear Search & Show All Tools
            </button>
          </div>
        }

        <!-- Live Subdomains Ecosystem Callout Banner -->
        <div class="mt-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/90 via-indigo-950/90 to-slate-900 text-white border border-blue-500/30 shadow-lg relative overflow-hidden">
          <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="max-w-2xl">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-2">
                <app-icon name="bolt" className="w-3.5 h-3.5"></app-icon>
                <span>Platform Architecture</span>
              </span>
              <h3 class="text-xl sm:text-2xl font-bold tracking-tight">
                Independent subdomains. Dedicated compute. Instant load times.
              </h3>
              <p class="mt-2 text-sm text-slate-300 leading-relaxed">
                Each GenPopUtils application runs as its own decoupled utility. You get dedicated, zero-distraction tooling without monolithic bundle bloat.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://compoundcalc.genpoputils.com"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <span>compoundcalc.genpoputils.com</span>
                <app-icon name="arrow-up-right" className="w-4 h-4"></app-icon>
              </a>

              <a
                href="https://regex.genpoputils.com"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 border border-zinc-700 shadow-sm"
              >
                <span>regex.genpoputils.com</span>
                <app-icon name="arrow-up-right" className="w-4 h-4"></app-icon>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class PopularToolsComponent {
  public readonly registryService = inject(RegistryService);
  public readonly activeFilter = signal<'all' | 'live'>('all');

  public setStatusFilter(filter: 'all' | 'live'): void {
    this.activeFilter.set(filter);
  }

  public clearSearch(): void {
    this.registryService.resetFilters();
  }

  public displayedTools(): UtilityTool[] {
    const query = this.registryService.searchQuery().trim();
    if (query) {
      const searchResults = this.registryService.searchResults();
      let tools = searchResults.map(r => r.tool);
      if (this.activeFilter() === 'live') {
        tools = tools.filter(t => t.status === 'live');
      }
      return tools;
    }

    if (this.activeFilter() === 'live') {
      return this.registryService.liveTools();
    }
    // Sort so live tools appear first
    return [...this.registryService.tools()].sort((a, b) => {
      if (a.status === 'live' && b.status !== 'live') return -1;
      if (a.status !== 'live' && b.status === 'live') return 1;
      return 0;
    });
  }

  public totalAvailableCount(): number {
    const query = this.registryService.searchQuery().trim();
    if (query) {
      return this.registryService.searchResults().length;
    }
    return this.registryService.tools().length;
  }

  public liveAvailableCount(): number {
    const query = this.registryService.searchQuery().trim();
    if (query) {
      return this.registryService.searchResults().filter(r => r.tool.status === 'live').length;
    }
    return this.registryService.liveTools().length;
  }
}
