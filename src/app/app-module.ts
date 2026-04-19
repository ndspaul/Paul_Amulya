import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Hero } from './components/hero/hero';
import { RsvpButton } from './components/rsvp-button/rsvp-button';
import { SectionDivider } from './components/section-divider/section-divider';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { Invitation } from './components/invitation/invitation';
import { CountDown } from './count-down/count-down';
import { Venue } from './venue/venue';
import { Couple } from './couple/couple';
import { FlowerRain } from './components/flower-rain/flower-rain';
import { GoldDust } from './components/gold-dust/gold-dust';
import { Confetti } from './components/confetti/confetti';
import { Monogram } from './components/monogram/monogram';
import { FloralDivider } from './components/floral-divider/floral-divider';

@NgModule({
  declarations: [
    App,
    Hero,
    RsvpButton,
    SectionDivider,
    LoadingSpinner,
    Invitation,
    CountDown,
    Venue,
    Couple,
    FlowerRain,
    GoldDust,
    Confetti,
    Monogram,
    FloralDivider,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
