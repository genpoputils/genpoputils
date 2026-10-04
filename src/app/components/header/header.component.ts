import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { RegistryService } from '../../services/registry.service';
import { IconComponent } from '../shared/icon/icon.component';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Brand Logo / Wordmark -->
          <div class="flex items-center gap-3">
            <a href="/" class="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl py-1 px-1 -ml-1 transition-colors">
              <app-logo size="md"></app-logo>
            </a>

            <!-- Ecosystem badge -->
            <span class="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-zinc-800/70 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-700/60">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Platform Hub
            </span>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#search"
              (click)="focusSearch($event)"
              class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Search
            </a>
            <a
              href="#popular-tools"
              class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Tools
            </a>
            <a
              href="#categories"
              class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Categories
            </a>
            <a
              href="#differentiation"
              class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Differentiation
            </a>
            <a
              href="#why-genpop"
              class="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Why GenPop
            </a>
          </nav>

          <!-- Right Controls: Quick Search Button, Theme Toggle, Mobile Menu -->
          <div class="flex items-center gap-2">
            
            <!-- Quick Search Bar trigger on desktop -->
            <button
              type="button"
              (click)="focusSearch()"
              class="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg hover:border-slate-300 dark:hover:border-zinc-700 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Search utilities (Press /)"
            >
              <app-icon name="search" className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500"></app-icon>
              <span>Quick search</span>
              <kbd class="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded border border-slate-200 dark:border-zinc-700 shadow-2xs">/</kbd>
            </button>

            <!-- Theme Toggle -->
            <button
              type="button"
              (click)="themeService.toggleTheme()"
              [attr.aria-label]="themeService.isDark() ? 'Switch to light theme' : 'Switch to dark theme'"
              class="p-2 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              @if (themeService.isDark()) {
                <app-icon name="sun" className="w-4 h-4"></app-icon>
              } @else {
                <app-icon name="moon" className="w-4 h-4"></app-icon>
              }
            </button>

            <!-- Mobile Hamburger Button -->
            <button
              type="button"
              (click)="mobileMenuOpen.set(!mobileMenuOpen())"
              [attr.aria-expanded]="mobileMenuOpen()"
              aria-label="Toggle navigation menu"
              class="md:hidden p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              @if (mobileMenuOpen()) {
                <app-icon name="x" className="w-5 h-5"></app-icon>
              } @else {
                <app-icon name="menu" className="w-5 h-5"></app-icon>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2">
          <button
            type="button"
            (click)="focusSearchMobile()"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-200 bg-slate-50 dark:bg-zinc-900/60 rounded-lg border border-slate-200 dark:border-zinc-800"
          >
            <div class="flex items-center gap-2">
              <app-icon name="search" className="w-4 h-4 text-slate-400"></app-icon>
              <span>Search utilities...</span>
            </div>
            <kbd class="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">/</kbd>
          </button>
          
          <a
            href="#popular-tools"
            (click)="closeMobileMenu()"
            class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors"
          >
            Popular Tools
          </a>
          <a
            href="#categories"
            (click)="closeMobileMenu()"
            class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors"
          >
            Browse Categories
          </a>
          <a
            href="#differentiation"
            (click)="closeMobileMenu()"
            class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors"
          >
            Why GenPopUtils is Different
          </a>
          <a
            href="#why-genpop"
            (click)="closeMobileMenu()"
            class="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-lg transition-colors"
          >
            Core Principles
          </a>

          <div class="pt-2 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-3">
            <span>genpoputils.com</span>
            <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 2 Live Utilities
            </span>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  public readonly themeService = inject(ThemeService);
  public readonly registryService = inject(RegistryService);
  public readonly mobileMenuOpen = signal<boolean>(false);

  public focusSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const input = document.getElementById('primary-search-input') as HTMLInputElement | null;
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => input.focus(), 300);
    }
  }

  public focusSearchMobile(): void {
    this.closeMobileMenu();
    this.focusSearch();
  }

  public closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
