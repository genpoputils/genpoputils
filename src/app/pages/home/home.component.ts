import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { PopularToolsComponent } from '../../components/tools/popular-tools/popular-tools.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { DifferentiationComponent } from '../../components/sections/differentiation/differentiation.component';
import { WhyGenPopComponent } from '../../components/sections/why/why.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    PopularToolsComponent,
    CategoriesComponent,
    DifferentiationComponent,
    WhyGenPopComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="min-h-screen">
      <!-- 1. Hero + Command Search Interface -->
      <app-hero></app-hero>

      <!-- 2. Popular & Live Tools (compoundcalc, regex, and planned tools) -->
      <app-popular-tools></app-popular-tools>

      <!-- 3. Browse by Category (Finance, Math, Developer Tools, etc.) -->
      <app-categories></app-categories>

      <!-- 4. More than just a number: Product Differentiation Concept -->
      <app-differentiation></app-differentiation>

      <!-- 5. Why GenPopUtils: Fast, Clear, Practical, Free -->
      <app-why-genpop></app-why-genpop>
    </main>
  `
})
export class HomeComponent {}
