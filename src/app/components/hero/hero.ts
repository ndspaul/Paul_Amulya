import { Component, OnInit } from '@angular/core';

interface LetterItem {
  char: string;
  delay: number;
  isAmp: boolean;
  isSpace: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  letters: LetterItem[] = [];

  private name1 = 'Spurgeon';
  private name2 = 'Amulya';
  private baseDelay = 0.8; // seconds before first letter
  private perLetter = 0.06; // stagger per letter

  ngOnInit(): void {
    let i = 0;
    for (const ch of this.name1) {
      this.letters.push({ char: ch, delay: this.baseDelay + i * this.perLetter, isAmp: false, isSpace: false });
      i++;
    }
    // space
    this.letters.push({ char: ' ', delay: this.baseDelay + i * this.perLetter, isAmp: false, isSpace: true });
    i++;
    // ampersand
    this.letters.push({ char: '&', delay: this.baseDelay + i * this.perLetter, isAmp: true, isSpace: false });
    i++;
    // space
    this.letters.push({ char: ' ', delay: this.baseDelay + i * this.perLetter, isAmp: false, isSpace: true });
    i++;
    for (const ch of this.name2) {
      this.letters.push({ char: ch, delay: this.baseDelay + i * this.perLetter, isAmp: false, isSpace: false });
      i++;
    }
  }
}
