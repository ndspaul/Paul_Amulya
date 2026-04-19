import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDir: number;
  hue: number;
}

@Component({
  selector: 'app-gold-dust',
  standalone: false,
  templateUrl: './gold-dust.html',
  styleUrl: './gold-dust.scss',
})
export class GoldDust implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animId = 0;
  private count = 35;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.initParticles();
    this.animate();
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

  private initParticles(): void {
    const { width, height } = this.canvasRef.nativeElement;
    this.particles = Array.from({ length: this.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.15 - Math.random() * 0.25,
      radius: 1 + Math.random() * 2.5,
      opacity: Math.random() * 0.6,
      opacityDir: 0.002 + Math.random() * 0.004,
      hue: 45 + Math.random() * 30, // olive-gold range
    }));
  }

  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const { width, height } = canvas;
    this.ctx.clearRect(0, 0, width, height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.opacity += p.opacityDir;

      if (p.opacity >= 0.7 || p.opacity <= 0.05) p.opacityDir *= -1;
      if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Glow
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      grad.addColorStop(0, `hsla(${p.hue}, 30%, 55%, ${p.opacity * 0.5})`);
      grad.addColorStop(0.4, `hsla(${p.hue}, 25%, 50%, ${p.opacity * 0.2})`);
      grad.addColorStop(1, `hsla(${p.hue}, 20%, 45%, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Core
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue}, 35%, 60%, ${p.opacity * 0.6})`;
      this.ctx.fill();
    }

    this.animId = requestAnimationFrame(this.animate);
  };
}
