import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryService } from '../../services/registry.service';
import { Category, ToolCategory } from '../../models/tool.model';
import { IconComponent } from '../shared/icon/icon.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-14 sm:py-20 border-t border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950" id="categories">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Heading -->
        <div class="max-w-2xl mb-10">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 mb-3">
            <app-icon name="compass" className="w-3.5 h-3.5"></app-icon>
            <span>Organized Discovery</span>
          </div>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Browse by category
          </h2>
          <p class="mt-2 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            Find the right utility for everyday calculations, development tasks, conversions, and scenario planning.
          </p>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          @for (cat of registryService.categories(); track cat.id) {
            @let stats = registryService.categoryCounts().get(cat.id);
            <div
              (click)="onSelectCategory(cat.id)"
              class="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-zinc-800/90 bg-slate-50/50 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div>
                <!-- Top Row: Icon + Counts -->
                <div class="flex items-center justify-between gap-2 mb-3">
                  <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <app-icon [name]="cat.icon" className="w-5 h-5"></app-icon>
                  </div>

                  <div class="flex items-center gap-1">
                    @if (stats && stats.live > 0) {
                      <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400">
                        {{ stats.live }} Live
                      </span>
                    }
                    @if (stats) {
                      <span class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                        {{ stats.total }} {{ stats.total === 1 ? 'tool' : 'tools' }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Category Name -->
                <h3 class="text-base font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ cat.name }}
                </h3>

                <!-- Description -->
                <p class="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                  {{ cat.description }}
                </p>
              </div>

              <!-- Action Link -->
              <div class="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <span>Explore {{ cat.name }}</span>
                <app-icon name="arrow-right" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"></app-icon>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class CategoriesComponent {
  public readonly registryService = inject(RegistryService);

  public onSelectCategory(catId: ToolCategory): void {
    this.registryService.setSelectedCategory(catId);
    this.registryService.setSearchQuery(catId);
    const searchSection = document.getElementById('search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
