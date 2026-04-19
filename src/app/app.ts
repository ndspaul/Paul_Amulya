import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';

interface Petal {
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
  rotate: string;
  drift: string;
}

interface BurstPetal {
  angle: string;
  distance: string;
  size: string;
  delay: string;
}

interface BurstHeart {
  left: string;
  size: string;
  delay: string;
  drift: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  isLoading = false;
  isMuted = false;
  showBurst = false;
  petals: Petal[] = [];
  burstPetals: BurstPetal[] = [];
  burstHearts: BurstHeart[] = [];

  @ViewChild('bgMusic') private bgMusic!: ElementRef<HTMLAudioElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.petals = Array.from({ length: 40 }, () => ({
      left: `${Math.random() * 100}%`,
      size: `${10 + Math.random() * 14}px`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 15}s`,
      opacity: 0.25 + Math.random() * 0.45,
      rotate: `${Math.random() * 360}deg`,
      drift: `${(Math.random() - 0.5) * 120}px`,
    }));

    this.burstPetals = Array.from({ length: 20 }, (_, i) => ({
      angle: `${(i * 360 / 20) + (Math.random() * 18 - 9)}deg`,
      distance: `${130 + Math.random() * 120}px`,
      size: `${14 + Math.random() * 18}px`,
      delay: `${Math.random() * 0.25}s`,
    }));

    this.burstHearts = Array.from({ length: 12 }, (_, i) => ({
      left: `${20 + Math.random() * 60}%`,
      size: `${16 + Math.random() * 20}px`,
      delay: `${i * 0.1}s`,
      drift: `${(Math.random() - 0.5) * 120}px`,
    }));
  }

  onInvitationOpened(): void {
    this.showBurst = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showBurst = false;
      this.cdr.detectChanges();
    }, 3500);

    const audio = this.bgMusic?.nativeElement;
    if (audio) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  }

  toggleMusic(): void {
    const audio = this.bgMusic?.nativeElement;
    if (!audio) return;
    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
  }

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
