import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.html',
  styleUrl: './count-down.scss',
  standalone: false
})
export class CountDown implements OnInit, OnDestroy {
  // Set to exactly June 6, 2026 at 7:00 PM (19:00:00).
  // Note: JavaScript months are 0-indexed, so 5 = June.
  weddingDate: number = new Date(2026, 5, 6, 19, 0, 0).getTime();

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private timeSubscription?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCountdown();
    // Use RxJS interval which integrates perfectly with Angular's change detection
    this.timeSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
      this.cdr.markForCheck(); // Marks the component to be checked by Angular safely
    });
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.weddingDate - now;

    if (distance < 0) {
      this.days = this.hours = this.minutes = this.seconds = 0;
      if (this.timeSubscription) this.timeSubscription.unsubscribe();
      return;
    }

    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
}
