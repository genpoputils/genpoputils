import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  public readonly isDark = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    try {
      const stored = localStorage.getItem('genpop-theme');
      if (stored === 'dark') {
        this.setDark(true);
      } else if (stored === 'light') {
        this.setDark(false);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setDark(prefersDark);
      }

      // Listen for system changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('genpop-theme')) {
          this.setDark(e.matches);
        }
      });
    } catch {
      // Fallback in case localStorage or matchMedia fails
      this.setDark(false);
    }
  }

  public toggleTheme(): void {
    this.setDark(!this.isDark());
    if (this.isBrowser) {
      localStorage.setItem('genpop-theme', this.isDark() ? 'dark' : 'light');
    }
  }

  private setDark(dark: boolean): void {
    this.isDark.set(dark);
    if (this.isBrowser) {
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
}
