import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

interface ButterflyData {
  id: number;
  top: string; left: string;
  scale: number;
  dx1: string; dy1: string; dx2: string; dy2: string;
  dx3: string; dy3: string; dx4: string; dy4: string;
  r1: string; r2: string; r3: string; r4: string;
  driftDur: string; flapDur: string; delay: string;
  entranceDelay: string;
  color1: string; color2: string; color3: string; spotColor: string;
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
  butterflies: ButterflyData[] = this.generateButterflies();

  private generateButterflies(): ButterflyData[] {
    const palettes: [string, string, string, string][] = [
      ['#f5d0a9', '#e8a87c', '#d4845a', '#a85a30'],  // monarch orange
      ['#c8daf0', '#94b8e0', '#6a94cc', '#3a6aa0'],  // morpho blue
      ['#f0e08a', '#e8cc5c', '#d4b430', '#a88c18'],  // sulphur yellow
      ['#e8c0d8', '#d498bc', '#bc70a0', '#944878'],  // painted lady pink
      ['#b8e0c8', '#88c8a0', '#5aac78', '#308850'],  // emerald swallowtail
      ['#f0d4b8', '#e0b898', '#c89870', '#a07048'],  // copper
      ['#d0c8f0', '#b0a4e0', '#9080cc', '#6858a8'],  // purple emperor
      ['#e0eecc', '#c4dca0', '#a0c870', '#78a848'],  // luna moth green
    ];
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const px = (min: number, max: number) => rand(min, max) + 'px';
    const deg = (min: number, max: number) => rand(min, max) + 'deg';

    return Array.from({ length: 8 }, (_, i) => {
      const [c1, c2, c3, spot] = palettes[i % palettes.length];
      return {
        id: i,
        top: rand(8, 75) + '%',
        left: rand(3, 90) + '%',
        scale: rand(0.3, 0.85),
        dx1: px(-80, 80), dy1: px(-60, 40),
        dx2: px(-100, 100), dy2: px(-80, 60),
        dx3: px(-70, 70), dy3: px(-50, 50),
        dx4: px(-90, 90), dy4: px(-70, 30),
        r1: deg(-15, 15), r2: deg(-20, 20),
        r3: deg(-10, 10), r4: deg(-18, 18),
        driftDur: rand(10, 20) + 's',
        flapDur: rand(0.18, 0.4) + 's',
        delay: '-' + rand(0, 14) + 's',
        entranceDelay: rand(0.2, 2.5) + 's',
        color1: c1, color2: c2, color3: c3, spotColor: spot,
      };
    });
  }

  private timeoutId?: any;
  private expandTimeoutId?: any;

  onEnvelopeClick(): void {
    if (this.state !== 'idle') return;
    this.state = 'opening';

    this.timeoutId = setTimeout(() => {
      this.state = 'expanding';

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
