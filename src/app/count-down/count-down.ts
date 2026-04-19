import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.html',
  styleUrl: './count-down.scss',
  standalone: false
})
export class CountDown implements OnInit, OnDestroy {
  weddingDate: number = new Date(2026, 5, 6, 19, 0, 0).getTime();

  googleCalendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=Paul+%26+Amulya+Wedding' +
    '&dates=20260606T130000Z/20260606T170000Z' +
    '&details=Join+us+as+we+celebrate+the+wedding+of+Paul+%26+Amulya!' +
    '&location=Grand+Ballroom,+Hyderabad';

  downloadIcs(): void {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'DTSTART:20260606T130000Z',
      'DTEND:20260606T170000Z',
      'SUMMARY:Paul & Amulya Wedding',
      'DESCRIPTION:Join us as we celebrate the wedding of Paul & Amulya!',
      'LOCATION:Grand Ballroom, Hyderabad',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paul-amulya-wedding.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

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
