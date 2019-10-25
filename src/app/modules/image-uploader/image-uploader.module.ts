import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@NgModule({
  declarations: [ImageUploaderComponent],
  exports: [ImageUploaderComponent],
  imports: [CommonModule]
})
export class ImageUploaderModule {}
