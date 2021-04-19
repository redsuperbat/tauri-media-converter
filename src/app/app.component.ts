import { Component, OnDestroy, OnInit } from '@angular/core';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ConversionType, conversionTypes } from 'src/assets/constants';
import filterNil from './operators/filter-nil';
import { FfmpegService } from './services/ffmpeg.service';
import { download, serialUnsubscriber, SubscriptionCollection } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private ffmpegService: FfmpegService) {}

  private subs: SubscriptionCollection = {};
  public onConversionTypeSelect$ = new Subject<ConversionType>();
  public onFileSelect$ = new Subject<File | null | undefined>();
  public onConvertBtnClick$ = new Subject<void>();
  public conversionProgress$ = new Subject<number>();
  public fileName$: Observable<string>;
  public items: ConversionType[];

  ngOnInit() {
    this.items = conversionTypes;
    this.fileName$ = this.onFileSelect$.pipe(
      filterNil(),
      map((f) => f.name),
      startWith('Choose file')
    );
    this.subs.fileConversion = combineLatest([
      this.onConversionTypeSelect$,
      this.onFileSelect$.pipe(filterNil()),
      this.onConvertBtnClick$,
    ]).subscribe(([{ key: convertTo }, file]) => {
      this.handleFileConversion(convertTo, file);
    });
  }

  private async handleFileConversion(convertTo: string, file: File) {
    if (!convertTo) return;
    if (!file) return;
    if (this.ffmpegService.instance.isLoaded()) {
      const convertedName = file.name.split('.')[0] + '.' + convertTo;

      this.ffmpegService.instance.setProgress(({ ratio }) =>
        this.conversionProgress$.next(ratio)
      );
      this.ffmpegService.instance.FS(
        'writeFile',
        file.name,
        await fetchFile(file)
      );
      await this.ffmpegService.instance.run('-i', file.name, convertedName);
      const out = this.ffmpegService.instance.FS('readFile', convertedName);

      // Create a URL
      const url = URL.createObjectURL(
        new Blob([out.buffer], { type: convertTo })
      );
      download(url, convertedName);
    }
  }

  ngOnDestroy() {
    serialUnsubscriber(this.subs);
  }
}
