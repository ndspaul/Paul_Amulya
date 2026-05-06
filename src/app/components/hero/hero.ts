import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit {
  @ViewChild('heroVideo') private videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    // Make autoplay intent explicit for Chrome's media policies.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;

    // Chrome can pause media when the container is initially hidden.
    // Retry once metadata is loaded and when it becomes visible.
    video.addEventListener('loadeddata', () => {
      video.play().catch(() => {});
    }, { once: true });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        video.play().catch(() => {});
        observer.disconnect();
      }
    });
    observer.observe(video);
  }
}
