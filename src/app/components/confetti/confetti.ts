import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';

interface Confetto {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  gravity: number;
  drag: number;
}

@Component({
  selector: 'app-confetti',
  standalone: false,
  templateUrl: './confetti.html',
  styleUrl: './confetti.scss',
})
export class Confetti implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() set fire(val: boolean) {
    if (val && this.ctx) this.burst();
  }

  private ctx!: CanvasRenderingContext2D;
  private confetti: Confetto[] = [];
  private animId = 0;
  private running = false;

  private colors = [
    '#b8a07a', '#d4c4a0', '#c9b48e', // muted golds
    '#8a9a7a', '#6b7c5e', '#a8b898', // olives
    '#e8e0d4', '#f5f0e8', '#ffffff',  // ivories
  ];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', this.resizeBound);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.resizeBound);
  }

  private resizeBound = () => this.resize();

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  burst(): void {
    const { width, height } = this.canvasRef.nativeElement;
    const cx = width / 2;
    const cy = height * 0.4;

    this.confetti = Array.from({ length: 150 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 12;
      return {
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        width: 4 + Math.random() * 6,
        height: 6 + Math.random() * 10,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        opacity: 1,
        gravity: 0.12 + Math.random() * 0.06,
        drag: 0.98 + Math.random() * 0.015,
      };
    });

    if (!this.running) {
      this.running = true;
      this.animate();
    }
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = canvas;
    this.ctx.clearRect(0, 0, width, height);

    let alive = false;
    for (const c of this.confetti) {
      if (c.opacity <= 0) continue;
      alive = true;

      c.vy += c.gravity;
      c.vx *= c.drag;
      c.vy *= c.drag;
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.rotationSpeed;

      if (c.y > height * 0.85) c.opacity -= 0.02;

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, c.opacity);
      this.ctx.fillStyle = c.color;
      this.ctx.shadowColor = c.color;
      this.ctx.shadowBlur = 4;
      this.ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
      this.ctx.restore();
    }

    if (alive) {
      this.animId = requestAnimationFrame(this.animate);
    } else {
      this.running = false;
    }
  };
}
