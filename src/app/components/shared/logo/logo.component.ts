import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LogoVariant = 'nexus' | 'monogram' | 'spark';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-2.5 group">
      <!-- Icon Container / Squircle Badge -->
      <div
        class="rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all duration-200 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 shrink-0 border border-white/20"
        [ngClass]="{
          'w-7 h-7 rounded-lg': size === 'sm',
          'w-9 h-9 rounded-xl': size === 'md',
          'w-12 h-12 rounded-2xl': size === 'lg'
        }"
      >
        <svg
          [ngClass]="{
            'w-4 h-4': size === 'sm',
            'w-5 h-5': size === 'md',
            'w-7 h-7': size === 'lg'
          }"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <filter [id]="'shadow-' + variant" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="0.25" />
            </filter>
          </defs>

          @switch (variant) {
            @case ('nexus') {
              <!-- The Modular Utility Matrix: 4 precision nodes + signature dot -->
              <g [attr.filter]="'url(#shadow-' + variant + ')'">
                <!-- Top-Left: Calculation block -->
                <rect x="6" y="6" width="8" height="8" rx="2.5" fill="#ffffff" />
                <!-- Top-Right: Logic / developer block -->
                <rect x="18" y="6" width="8" height="8" rx="2.5" fill="#ffffff" fill-opacity="0.9" />
                <!-- Bottom-Left: Growth / metric block -->
                <rect x="6" y="18" width="8" height="8" rx="2.5" fill="#ffffff" fill-opacity="0.9" />
                <!-- Bottom-Right: The Signature Focal Period '.' -->
                <circle cx="22" cy="22" r="4.2" fill="#ffffff" />
                <!-- Subtle central connector crosshair -->
                <path d="M14 10h4M10 14v4M18 14v4M14 22h4" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.4" />
              </g>
            }

            @case ('monogram') {
              <!-- Precision Geometric 'G' with embedded focal accent -->
              <g [attr.filter]="'url(#shadow-' + variant + ')'">
                <!-- Outer bold 'G' contour -->
                <path
                  d="M24 11.5A9.5 9.5 0 0 0 8 16a9.5 9.5 0 0 0 16.5 6.5l-4-4A4 4 0 0 1 12 16a4 4 0 0 1 7-2.6l3.5-3.5A9.4 9.4 0 0 0 24 11.5z"
                  fill="#ffffff"
                />
                <!-- Horizontal crossbar -->
                <rect x="16" y="14.5" width="8.5" height="3" rx="1.5" fill="#ffffff" />
                <!-- Distinctive platform accent dot -->
                <circle cx="25.5" cy="8.5" r="2.2" fill="#ffffff" />
              </g>
            }

            @case ('spark') {
              <!-- The Precision Utility Compass / Nexus Spark -->
              <g [attr.filter]="'url(#shadow-' + variant + ')'">
                <path
                  d="M16 5c0 6.075-4.925 11-11 11 6.075 0 11 4.925 11 11 0-6.075 4.925-11 11-11-6.075 0-11-4.925-11-11z"
                  fill="#ffffff"
                />
                <circle cx="16" cy="16" r="3" fill="#3b82f6" />
                <!-- Orbiting signature dot -->
                <circle cx="24.5" cy="7.5" r="2.2" fill="#ffffff" />
              </g>
            }
          }
        </svg>
      </div>

      <!-- Typography / Wordmark -->
      @if (showText) {
        <span
          class="font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight"
          [ngClass]="{
            'text-sm': size === 'sm',
            'text-base sm:text-lg': size === 'md',
            'text-xl sm:text-2xl': size === 'lg'
          }"
        >
          GenPopUtils<span class="text-blue-600 dark:text-blue-400">.</span>
        </span>
      }
    </div>
  `
})
export class LogoComponent {
  @Input() variant: LogoVariant = 'nexus';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showText: boolean = true;
  @Input() subtitle?: string;
}
