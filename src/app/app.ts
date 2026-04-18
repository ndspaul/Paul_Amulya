import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  // Page is visible from start (underneath envelope overlay)
  isLoading = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Called when envelope finishes its open animation — nothing extra needed,
  // the envelope's own CSS exit transition handles reveal of the page beneath.
  onInvitationOpened(): void {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
