import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ValidationModule } from '../../validation/validation.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploaderModule } from '../../image-uploader/image-uploader.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    ValidationModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    ImageUploaderModule
  ]
})
export class FormModule {}
