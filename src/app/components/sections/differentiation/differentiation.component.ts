import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-differentiation',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-14 sm:py-20 border-t border-slate-200/80 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-950/60" id="differentiation">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/70 dark:border-indigo-800/70 mb-4">
            <app-icon name="sparkles" className="w-3.5 h-3.5 text-indigo-500"></app-icon>
            <span>Product Philosophy</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            More than just a number.
          </h2>
          <p class="mt-3 text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Most online calculators stop after spitting out an isolated formula result. GenPopUtils utilities are built to answer your real underlying question: <em>"What does this mean, and what can I do about it?"</em>
          </p>
        </div>

        <!-- Visual Contrast: Generic Calculator vs GenPopUtils Utility -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          <!-- Column 1: Generic Calculator -->
          <div class="rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between shadow-2xs">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800/80 mb-6">
                <div class="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-sm font-medium">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700"></span>
                  <span>A typical online calculator</span>
                </div>
                <span class="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded">
                  Raw Output Only
                </span>
              </div>

              <!-- Mock Output -->
              <div class="bg-slate-50 dark:bg-zinc-950 rounded-xl p-5 border border-slate-200/60 dark:border-zinc-800/60 space-y-4">
                <div>
                  <div class="text-xs font-mono uppercase text-slate-400 tracking-wider">Calculated Result</div>
                  <div class="text-3xl font-extrabold text-slate-800 dark:text-zinc-200 mt-1 font-mono">
                    $1,842.12
                  </div>
                  <div class="text-xs text-slate-400 mt-1">Monthly payment</div>
                </div>
              </div>

              <div class="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
                <div class="flex items-center gap-2">
                  <span class="text-rose-500 font-bold">✕</span>
                  <span>No visual breakdown of interest versus principal</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-rose-500 font-bold">✕</span>
                  <span>No side-by-side comparison of prepayment scenarios</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-rose-500 font-bold">✕</span>
                  <span>Leaves you wondering if the trade-off is worth it</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60 text-xs text-slate-400 italic">
              Leaves the critical thinking entirely up to you.
            </div>
          </div>

          <!-- Column 2: GenPopUtils Standard -->
          <div class="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-blue-50/80 to-indigo-50/40 dark:from-zinc-900 dark:to-blue-950/20 border-2 border-blue-500/40 dark:border-blue-500/50 flex flex-col justify-between shadow-md relative">
            
            <div class="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              The GenPopUtils Standard
            </div>

            <div>
              <div class="flex items-center justify-between pb-4 border-b border-blue-200/50 dark:border-zinc-800 mb-6">
                <div class="flex items-center gap-2 text-blue-900 dark:text-blue-300 text-sm font-semibold">
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>Actionable Decision Modeling</span>
                </div>
                <span class="text-xs text-blue-700 dark:text-blue-400 font-semibold bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                  Context & Scenarios
                </span>
              </div>

              <!-- Rich Mock Output -->
              <div class="bg-white dark:bg-zinc-950 rounded-xl p-5 border border-blue-200/60 dark:border-blue-900/50 space-y-4 shadow-2xs">
                <div class="grid grid-cols-2 gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800/80">
                  <div>
                    <div class="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Monthly Payment</div>
                    <div class="text-2xl font-extrabold text-slate-900 dark:text-zinc-100 font-mono mt-0.5">$1,842</div>
                  </div>
                  <div>
                    <div class="text-[11px] font-medium text-slate-500 dark:text-zinc-400">Total Interest</div>
                    <div class="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-0.5">$263,400</div>
                  </div>
                </div>

                <!-- Scenario Insight Card -->
                <div class="p-3 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-xs">
                  <div class="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <app-icon name="sparkles" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"></app-icon>
                    <span>Scenario: Add $100/mo extra principal</span>
                  </div>
                  <div class="mt-1 text-slate-700 dark:text-zinc-300 flex items-center justify-between">
                    <span>Pay off <strong>18 months earlier</strong></span>
                    <span class="font-bold text-emerald-700 dark:text-emerald-400 font-mono">+$12,430 saved</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                <div class="flex items-center gap-2">
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Instant milestone forecasts & visual scenario modeling</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Clear trade-off comparisons that inform real decisions</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>100% client-side privacy with zero telemetry of your inputs</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-200/50 dark:border-zinc-800/80 text-xs text-blue-700 dark:text-blue-300 font-medium">
              Better tools, not just more tools.
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class DifferentiationComponent {}
