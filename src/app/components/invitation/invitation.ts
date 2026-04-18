import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-invitation',
  standalone: false,
  templateUrl: './invitation.html',
  styleUrl: './invitation.scss',
})
export class Invitation implements OnDestroy {
  @Output() opened = new EventEmitter<void>();

  state: 'idle' | 'opening' | 'expanding' | 'done' = 'idle';
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
