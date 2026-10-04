import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityTool } from '../../../models/tool.model';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tool.status === 'live') {
      <a
        [href]="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex flex-col justify-between h-full rounded-xl p-5 sm:p-6 transition-all duration-200 border bg-white dark:bg-zinc-900/90 border-slate-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg dark:hover:shadow-zinc-950/40 hover:-translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 block no-underline text-inherit"
        [attr.aria-label]="'Open ' + tool.name + ' in a new tab'"
      >
        <ng-container *ngTemplateOutlet="cardBody; context: { $implicit: tool }"></ng-container>
      </a>
    } @else {
      <div
        class="group relative flex flex-col justify-between h-full rounded-xl p-5 sm:p-6 transition-all duration-200 border bg-slate-50/70 dark:bg-zinc-900/40 border-slate-200/70 dark:border-zinc-800/60 opacity-90 hover:border-slate-300 dark:hover:border-zinc-700 select-none"
      >
        <ng-container *ngTemplateOutlet="cardBody; context: { $implicit: tool }"></ng-container>
      </div>
    }

    <ng-template #cardBody let-tool>
      <!-- Top row: Icon + Category + Status Badge -->
      <div>
        <div class="flex items-center justify-between gap-3 mb-4">
          <!-- Icon container -->
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            [ngClass]="{
              'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600': tool.status === 'live',
              'bg-slate-100 text-slate-500 dark:bg-zinc-800/80 dark:text-zinc-400': tool.status === 'coming-soon'
            }"
          >
            <app-icon [name]="tool.icon" className="w-5 h-5"></app-icon>
          </div>

          <!-- Badges -->
          <div class="flex items-center gap-1.5">
            <!-- Category Tag -->
            <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
              {{ tool.category }}
            </span>

            <!-- Status Pill -->
            @if (tool.status === 'live') {
              <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
              </span>
            } @else {
              <span class="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                Coming soon
              </span>
            }
          </div>
        </div>

        <!-- Tool Name -->
        <h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ tool.name }}
        </h3>

        <!-- Description -->
        <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
          {{ tool.description }}
        </p>

        <!-- Highlights / Features pills if present -->
        @if (tool.highlights && tool.highlights.length) {
          <div class="mt-3.5 flex flex-wrap gap-1.5">
            @for (hl of tool.highlights; track hl) {
              <span class="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400 bg-slate-100/70 dark:bg-zinc-800/50 px-2 py-0.5 rounded">
                <span class="w-1 h-1 rounded-full bg-blue-500/60"></span>
                {{ hl }}
              </span>
            }
          </div>
        }
      </div>

      <!-- Action row -->
      <div class="mt-5 pt-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
        @if (tool.status === 'live') {
          <div
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all text-xs font-semibold shadow-2xs"
          >
            <span>Open tool</span>
            <app-icon name="arrow-up-right" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></app-icon>
          </div>
          <span class="text-[11px] font-mono text-slate-400 dark:text-zinc-500 truncate max-w-[130px] sm:max-w-[160px]">
            {{ cleanUrl(tool.url) }}
          </span>
        } @else {
          <div class="flex items-center justify-between w-full text-xs text-slate-400 dark:text-zinc-500">
            <span class="italic">In development</span>
            <span class="text-[11px] font-medium bg-slate-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded text-slate-500 dark:text-zinc-400">
              Planned utility
            </span>
          </div>
        }
      </div>
    </ng-template>
  `
})
export class ToolCardComponent {
  @Input({ required: true }) tool!: UtilityTool;

  public cleanUrl(url: string): string {
    return url.replace(/^https?:\/\//, '');
  }
}
