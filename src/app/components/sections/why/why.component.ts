import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-why-genpop',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-14 sm:py-20 border-t border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950" id="why-genpop">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 mb-3">
            <app-icon name="shield-check" className="w-3.5 h-3.5 text-blue-500"></app-icon>
            <span>Core Principles</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Why GenPopUtils?
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            Engineered from the ground up for speed, privacy, and clarity.
          </p>
        </div>

        <!-- 4 Principles Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- 1. Fast -->
          <div class="p-6 rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 transition-all">
            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 flex items-center justify-center mb-4">
              <app-icon name="bolt" className="w-5 h-5"></app-icon>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
              Fast
            </h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Get answers without unnecessary steps, heavy client payloads, interstitial ads, or mandatory logins.
            </p>
          </div>

          <!-- 2. Clear -->
          <div class="p-6 rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 transition-all">
            <div class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-400 flex items-center justify-center mb-4">
              <app-icon name="chart-line" className="w-5 h-5"></app-icon>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
              Clear
            </h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Understand the result, not just the raw number. Interactive charts and scenarios contextualize what the math means.
            </p>
          </div>

          <!-- 3. Practical -->
          <div class="p-6 rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 transition-all">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 flex items-center justify-center mb-4">
              <app-icon name="check" className="w-5 h-5"></app-icon>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
              Practical
            </h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Tools designed around real-world problems developers, creators, and everyday problem-solvers actually face.
            </p>
          </div>

          <!-- 4. Free -->
          <div class="p-6 rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900/80 transition-all">
            <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400 flex items-center justify-center mb-4">
              <app-icon name="sparkles" className="w-5 h-5"></app-icon>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-zinc-100">
              Free
            </h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Core utilities are free and accessible to everyone, prioritizing client-side computation and privacy.
            </p>
          </div>

        </div>

      </div>
    </section>
  `
})
export class WhyGenPopComponent {}
