import { Injectable } from '@angular/core';

import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  public instance: FFmpeg;
  constructor() {
    this.instance = createFFmpeg({
      corePath: 'https://unpkg.com/@ffmpeg/core@0.8.5/dist/ffmpeg-core.js',
      log: true,
    });
    this.instance.load();
  }
}
