import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryService } from '../../services/registry.service';
import { IconComponent } from '../shared/icon/icon.component';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-slate-200/80 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <!-- Column 1: Brand & Identity (2 cols on lg) -->
          <div class="lg:col-span-2 space-y-4">
            <app-logo size="md"></app-logo>

            <p class="text-sm text-slate-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Everyday internet utilities made ridiculously simple. Fast, focused tools built for developers, creators, and practical problem solvers.
            </p>

            <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-500 font-mono">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Central Ecosystem Platform • genpoputils.com</span>
            </div>
          </div>

          <!-- Column 2: Live Utilities -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-zinc-100 mb-3">
              Live Utilities
            </h4>
            <ul class="space-y-2 text-sm">
              @for (tool of registryService.liveTools(); track tool.id) {
                <li>
                  <a
                    [href]="tool.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{{ tool.name }}</span>
                    <app-icon name="arrow-up-right" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"></app-icon>
                  </a>
                </li>
              }
              <li class="pt-2 text-xs text-slate-400 dark:text-zinc-500 italic">
                More utilities deploying soon
              </li>
            </ul>
          </div>

          <!-- Column 3: Categories -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-zinc-100 mb-3">
              Categories
            </h4>
            <ul class="space-y-2 text-sm">
              @for (cat of registryService.categories(); track cat.id) {
                <li>
                  <a
                    href="#categories"
                    class="text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {{ cat.name }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Column 4: Platform & About -->
          <div>
            <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-zinc-100 mb-3">
              Platform
            </h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
              <li>
                <a href="#why-genpop" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Core Principles
                </a>
              </li>
              <li>
                <a href="#differentiation" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Product Vision
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/GenPopUtils"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>GitHub Organization</span>
                  <app-icon name="arrow-up-right" className="w-3.5 h-3.5 opacity-60"></app-icon>
                </a>
              </li>
              <li>
                <span class="text-xs text-slate-500 dark:text-zinc-500">
                  Client-side processing • Zero telemetry
                </span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {{ currentYear }} GenPopUtils. Small tools. Useful results.</p>
          <div class="flex items-center gap-6">
            <span>Fast • Clear • Practical • Free</span>
            <span>Privacy-Friendly</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  public readonly registryService = inject(RegistryService);
  public readonly currentYear = new Date().getFullYear();
}
