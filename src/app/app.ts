import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements OnInit, AfterViewInit {
  isLoading = false;
  confettiFired = false;

  constructor(private cdr: ChangeDetectorRef) {}

  onInvitationOpened(): void {
    this.confettiFired = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.initScrollAnimations();
      ScrollTrigger.refresh();
    }, 800);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  private initScrollAnimations(): void {
    // Gentle fade-up for all .reveal sections
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            scroller: '.site-content',
          },
        }
      );
    });

    // Gentle parallax on couple portrait
    const portraitEl = document.querySelector('.couple-section__portrait');
    if (portraitEl) {
      gsap.fromTo(
        portraitEl,
        { y: 30 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            scroller: '.site-content',
          },
        }
      );
    }

    // Stagger countdown blocks
    gsap.utils.toArray<HTMLElement>('.countdown__block').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
            scroller: '.site-content',
          },
        }
      );
    });

    // Verse cards slide from alternating sides
    gsap.utils.toArray<HTMLElement>('.couple-section__verse').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            scroller: '.site-content',
          },
        }
      );
    });

    // Venue card
    const venueEl = document.querySelector('.venue-container');
    if (venueEl) {
      gsap.fromTo(
        venueEl,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: venueEl,
            start: 'top 82%',
            toggleActions: 'play none none none',
            scroller: '.site-content',
          },
        }
      );
    }
  }
}
