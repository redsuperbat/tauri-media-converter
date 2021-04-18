import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FfmpegService } from './services/ffmpeg.service';
import { UiElementsModule } from './ui-elements/ui-elements.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiElementsModule, AppRoutingModule],
  providers: [FfmpegService],
  bootstrap: [AppComponent],
})
export class AppModule {}
