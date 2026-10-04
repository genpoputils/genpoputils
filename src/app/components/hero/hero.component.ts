import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistryService } from '../../services/registry.service';
import { UtilityTool } from '../../models/tool.model';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative z-30 pt-12 pb-16 sm:pt-20 sm:pb-24" id="search">
      <!-- Subtle background ambient gradient -->
      <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-40 dark:opacity-25 overflow-hidden">
        <div class="w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/20 via-indigo-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <!-- Platform Tag -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/70 dark:border-blue-800/70 mb-6">
          <app-icon name="sparkles" className="w-3.5 h-3.5 text-blue-500"></app-icon>
          <span>The discovery hub for GenPopUtils tools</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight leading-[1.15]">
          Everyday utilities.<br class="hidden sm:inline" />
          <span class="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Made ridiculously simple.
          </span>
        </h1>

        <!-- Supporting Copy -->
        <p class="mt-4 sm:mt-6 text-base sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Fast, practical calculators and utilities for the things you actually need to figure out. No ads, no fluff, instant answers.
        </p>

        <!-- Command Search Bar Container -->
        <div class="mt-8 sm:mt-10 max-w-2xl mx-auto relative text-left">
          <div
            class="relative rounded-2xl bg-white dark:bg-zinc-900 shadow-lg shadow-slate-200/50 dark:shadow-zinc-950/60 border border-slate-300/80 dark:border-zinc-700/80 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          >
            <!-- Search Input Wrapper -->
            <div class="flex items-center px-4 sm:px-5 py-3 sm:py-4">
              <app-icon name="search" className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 dark:text-zinc-500 shrink-0"></app-icon>

              <input
                #searchInput
                id="primary-search-input"
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="onQueryChange($event)"
                (keydown)="onKeydown($event)"
                (focus)="onInputFocus()"
                placeholder="What do you want to calculate, convert, or figure out?"
                class="w-full ml-3 text-sm sm:text-base bg-transparent text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                autocomplete="off"
                spellcheck="false"
                aria-label="Search utilities and calculators"
              />

              <!-- Right badges/buttons: Clear or Shortcut -->
              @if (searchQuery().length > 0) {
                <button
                  type="button"
                  (click)="clearSearch()"
                  class="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <app-icon name="x" className="w-4 h-4"></app-icon>
                </button>
              } @else {
                <div class="hidden sm:flex items-center gap-1 pl-2 text-xs font-mono text-slate-400 dark:text-zinc-500">
                  <span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">/</span>
                  <span>to search</span>
                </div>
              }
            </div>

            <!-- Live Search Results Dropdown -->
            @if (isDropdownOpen()) {
              <div
                class="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 rounded-xl shadow-xl shadow-slate-300/40 dark:shadow-zinc-950/80 border border-slate-200 dark:border-zinc-800 overflow-hidden z-50 max-h-[420px] overflow-y-auto"
              >
                @if (registryService.searchResults().length > 0) {
                  <!-- Results Count Header -->
                  <div class="px-4 py-2.5 bg-slate-50 dark:bg-zinc-800/50 border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                    <span>{{ registryService.searchResults().length }} matching utilities</span>
                    <span class="hidden sm:inline text-[11px] font-mono">Use ↑ ↓ to navigate, ↵ to open</span>
                  </div>

                  <!-- Results List -->
                  <div class="p-1.5 space-y-1">
                    @for (res of registryService.searchResults(); track res.tool.id; let i = $index) {
                      <div
                        [id]="'search-result-' + i"
                        (click)="selectResult(res.tool)"
                        (mouseenter)="focusedIndex.set(i)"
                        class="p-3 rounded-lg cursor-pointer transition-colors flex items-start justify-between gap-3"
                        [ngClass]="{
                          'bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/50': focusedIndex() === i,
                          'hover:bg-slate-50 dark:hover:bg-zinc-800/60': focusedIndex() !== i
                        }"
                        role="option"
                        [attr.aria-selected]="focusedIndex() === i"
                      >
                        <div class="flex items-start gap-3 min-w-0">
                          <div
                            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            [ngClass]="{
                              'bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400': res.tool.status === 'live',
                              'bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400': res.tool.status === 'coming-soon'
                            }"
                          >
                            <app-icon [name]="res.tool.icon" className="w-4 h-4"></app-icon>
                          </div>

                          <div class="min-w-0">
                            <div class="flex items-center gap-2">
                              <span class="text-sm font-semibold text-slate-900 dark:text-zinc-100 truncate">
                                {{ res.tool.name }}
                              </span>
                              @if (res.tool.status === 'live') {
                                <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                                  Live
                                </span>
                              } @else {
                                <span class="px-1.5 py-0.2 rounded text-[10px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400">
                                  Coming Soon
                                </span>
                              }
                            </div>
                            <p class="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {{ res.tool.description }}
                            </p>
                            @if (res.matchReason) {
                              <span class="inline-block mt-1 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                                {{ res.matchReason }}
                              </span>
                            }
                          </div>
                        </div>

                        <div class="shrink-0 self-center">
                          @if (res.tool.status === 'live') {
                            <a
                              [href]="res.tool.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-1"
                              (click)="$event.stopPropagation()"
                            >
                              <span>Open</span>
                              <app-icon name="arrow-up-right" className="w-3 h-3"></app-icon>
                            </a>
                          } @else {
                            <span class="text-xs text-slate-400 dark:text-zinc-500 italic">Planned</span>
                          }
                        </div>
                      </div>
                    }
                  </div>
                } @else {
                  <!-- Empty Search State -->
                  <div class="p-6 text-center">
                    <div class="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500 mb-3">
                      <app-icon name="search" className="w-5 h-5"></app-icon>
                    </div>
                    <p class="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                      No matching utilities found for "{{ searchQuery() }}"
                    </p>
                    <p class="mt-1 text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
                      Try searching for broad terms like "interest", "regex", "loan", "math", or browse our categories below.
                    </p>
                    <div class="mt-4 flex flex-wrap justify-center gap-2">
                      <button
                        type="button"
                        (click)="setSearchExample('compound interest')"
                        class="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Try "compound interest"
                      </button>
                      <button
                        type="button"
                        (click)="setSearchExample('regex')"
                        class="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Try "regex"
                      </button>
                      <a
                        href="#categories"
                        (click)="closeDropdown()"
                        class="text-xs px-2.5 py-1 rounded text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <span>Browse categories</span>
                        <app-icon name="arrow-right" className="w-3 h-3"></app-icon>
                      </a>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Quick Example Chips -->
          <div class="mt-4 flex items-center justify-center sm:justify-start flex-wrap gap-1.5 sm:gap-2 text-xs">
            <span class="text-slate-500 dark:text-zinc-400 font-medium mr-1">Popular searches:</span>
            @for (example of searchExamples; track example.label) {
              <button
                type="button"
                (click)="setSearchExample(example.query)"
                class="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer border border-slate-200/50 dark:border-zinc-700/50"
              >
                {{ example.label }}
              </button>
            }
          </div>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInputElement?: ElementRef<HTMLInputElement>;

  public readonly registryService = inject(RegistryService);
  public readonly searchQuery = signal<string>('');
  public readonly isDropdownOpen = signal<boolean>(false);
  public readonly focusedIndex = signal<number>(-1);

  public readonly searchExamples = [
    { label: 'Compound interest', query: 'compound interest' },
    { label: 'Regex tester', query: 'regex' },
    { label: 'Mortgage payoff', query: 'mortgage' },
    { label: 'Percentage change', query: 'percentage' },
    { label: 'Working days', query: 'date' },
    { label: 'Unit converter', query: 'converter' }
  ];

  ngAfterViewInit(): void {
    // Focus search if requested
  }

  @HostListener('document:keydown', ['$event'])
  handleGlobalShortcuts(event: KeyboardEvent): void {
    // Check for '/' key when not already focusing an input
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    if (event.key === '/' && !isInput) {
      event.preventDefault();
      this.searchInputElement?.nativeElement.focus();
      this.searchInputElement?.nativeElement.select();
    } else if (event.key === 'Escape') {
      this.closeDropdown();
      this.searchInputElement?.nativeElement.blur();
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const searchSection = document.getElementById('search');
    if (searchSection && !searchSection.contains(target)) {
      this.closeDropdown();
    }
  }

  public onQueryChange(val: string): void {
    this.searchQuery.set(val);
    this.registryService.setSearchQuery(val);
    this.isDropdownOpen.set(val.trim().length > 0);
    this.focusedIndex.set(-1);
  }

  public onInputFocus(): void {
    if (this.searchQuery().trim().length > 0) {
      this.isDropdownOpen.set(true);
    }
  }

  public onKeydown(event: KeyboardEvent): void {
    const results = this.registryService.searchResults();
    if (!this.isDropdownOpen() || results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (this.focusedIndex() + 1) % results.length;
      this.focusedIndex.set(next);
      this.scrollResultIntoView(next);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = this.focusedIndex() <= 0 ? results.length - 1 : this.focusedIndex() - 1;
      this.focusedIndex.set(prev);
      this.scrollResultIntoView(prev);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.focusedIndex() >= 0 && this.focusedIndex() < results.length) {
        this.selectResult(results[this.focusedIndex()].tool);
      } else if (results.length > 0) {
        this.selectResult(results[0].tool);
      }
    }
  }

  public selectResult(tool: UtilityTool): void {
    if (tool.status === 'live' && tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
      this.closeDropdown();
    } else {
      // For upcoming tools, scroll down to the tool card in popular tools
      this.closeDropdown();
      const el = document.getElementById('popular-tools');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public setSearchExample(query: string): void {
    this.searchQuery.set(query);
    this.registryService.setSearchQuery(query);
    this.isDropdownOpen.set(true);
    this.searchInputElement?.nativeElement.focus();
  }

  public clearSearch(): void {
    this.searchQuery.set('');
    this.registryService.setSearchQuery('');
    this.isDropdownOpen.set(false);
    this.focusedIndex.set(-1);
  }

  public closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  private scrollResultIntoView(index: number): void {
    const el = document.getElementById('search-result-' + index);
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }
}
