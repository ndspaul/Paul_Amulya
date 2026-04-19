import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

interface Spark {
  x: string; y: string; size: string; color: string;
  animationDelay: string; animationDuration: string;
}

interface Ember {
  x: string; y: string; size: string;
  animationDelay: string; animationDuration: string;
}

@Component({
  selector: 'app-invitation',
  standalone: false,
  templateUrl: './invitation.html',
  styleUrl: './invitation.scss',
})
export class Invitation implements OnDestroy {
  @Output() opened = new EventEmitter<void>();

  state: 'idle' | 'opening' | 'expanding' | 'done' = 'idle';

  sparks: Spark[] = Array.from({ length: 28 }, (_, i) => {
    const angle = -88 + (i / 27) * 176;
    const rad = (angle * Math.PI) / 180;
    const dist = 120 + (i % 6) * 40;
    return {
      x: `${(Math.sin(rad) * dist).toFixed(1)}px`,
      y: `${(-Math.cos(rad) * dist).toFixed(1)}px`,
      size: `${4 + (i % 5) * 2}px`,
      color: `hsl(${15 + (i % 7) * 8},100%,${55 + (i % 3) * 12}%)`,
      animationDelay: `${(i % 9) * 0.07}s`,
      animationDuration: `${0.65 + (i % 5) * 0.13}s`,
    };
  });

  embers: Ember[] = Array.from({ length: 12 }, (_, i) => {
    const angle = -70 + (i / 11) * 140;
    const rad = (angle * Math.PI) / 180;
    const dist = 180 + (i % 4) * 55;
    return {
      x: `${(Math.sin(rad) * dist).toFixed(1)}px`,
      y: `${(-Math.cos(rad) * dist).toFixed(1)}px`,
      size: `${8 + (i % 4) * 6}px`,
      animationDelay: `${i * 0.11}s`,
      animationDuration: `${1.1 + (i % 4) * 0.2}s`,
    };
  });
  private timeoutId?: any;
  private expandTimeoutId?: any;

  onEnvelopeClick(): void {
    if (this.state !== 'idle') return;
    this.state = 'opening';

    // Cinematic timing: Flap opens slowly (4s). Letter waits 2500ms, then slides fast for 400ms (finishes at 2900ms)
    // 2.5s delay + 0.6s slide = 3.1s → trigger expand
    this.timeoutId = setTimeout(() => {
      this.state = 'expanding';

      // 0.5s expand transition → mark done (removes invite-screen from DOM)
      this.expandTimeoutId = setTimeout(() => {
        this.state = 'done';
        this.opened.emit();
      }, 300);
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.expandTimeoutId) clearTimeout(this.expandTimeoutId);
  }
}
