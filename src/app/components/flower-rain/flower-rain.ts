import { Component, OnInit } from '@angular/core';

interface Petal {
  emoji: string;
  left: number;
  delay: number;
  fallDuration: number;
  swayDuration: number;
  size: number;
  opacity: number;
  swayAmount: number;
  rotateSpeed: number;
  layer: number; // 0=far, 1=mid, 2=near
  blur: number;
  shimmerDuration: number;
  flipAxis: string; // 'X' | 'Y' | 'XY'
  startRotate: number;
}

@Component({
  selector: 'app-flower-rain',
  templateUrl: './flower-rain.html',
  standalone: false,
  styleUrl: './flower-rain.scss',
})
export class FlowerRain implements OnInit {
  petals: Petal[] = [];

  private flowers = ['🌿', '🍃', '🌸', '✿', '❀'];
  private flipAxes = ['X', 'Y', 'XY'];

  ngOnInit(): void {
    this.petals = Array.from({ length: 20 }, () => {
      const layer = Math.floor(Math.random() * 3);
      const depthScale = [0.5, 0.8, 1.2][layer];
      const depthBlur = [2.5, 0.5, 0][layer];
      const depthOpacity = [0.1, 0.2, 0.3][layer];

      return {
        emoji: this.flowers[Math.floor(Math.random() * this.flowers.length)],
        left: Math.random() * 100,
        delay: Math.random() * 12,
        fallDuration: (8 + Math.random() * 7) / depthScale,
        swayDuration: 2 + Math.random() * 3,
        size: (0.6 + Math.random() * 0.8) * depthScale,
        opacity: depthOpacity + Math.random() * 0.25,
        swayAmount: 40 + Math.random() * 80,
        rotateSpeed: 4 + Math.random() * 8,
        layer,
        blur: depthBlur,
        shimmerDuration: 2 + Math.random() * 3,
        flipAxis: this.flipAxes[Math.floor(Math.random() * this.flipAxes.length)],
        startRotate: Math.random() * 360,
      };
    });
  }
}
