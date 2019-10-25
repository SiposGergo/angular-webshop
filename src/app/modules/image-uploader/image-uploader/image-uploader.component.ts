import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, throwError } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { imageToBase64 } from '../../../../utils/function/image-to-base64';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {
  @Input() imageControl: FormControl;
  @Input() touched: boolean;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.imageControl.statusChanges.pipe(untilDestroyed(this)).subscribe(() => this.cdr.markForCheck());
  }

  // Akkor jelöljük touchednak amikor a mentés gombra nyom,
  // ilyenkor rányomok egy markForChceket mert ha nincs kép feltöltve, akkor jelölni kell,
  // de a FormControlból nemtudom kivenni, mert az referencia
  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    fromEvent(this.fileInput.nativeElement, 'change')
      .pipe(
        untilDestroyed(this),
        switchMap(() => {
          // strict null :)
          if (this.fileInput && this.fileInput.nativeElement && this.fileInput.nativeElement.files) {
            return fromPromise(imageToBase64(this.fileInput.nativeElement.files[0]));
          }
          return throwError({});
        })
      )
      .subscribe(image => {
        this.imageControl.setValue(image);
        this.cdr.markForCheck();
      });
  }

  removeLoadedImage($event: MouseEvent) {
    $event.preventDefault();
    this.imageControl.setValue(undefined);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {}
}
