import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ProductInterface } from '../../model/product.interface';
import { FormGroup } from '../../../../../utils/class/form-group';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormArrayComponent implements OnInit {
  @Input() isHandset: boolean;
  @Input() productForm: FormGroup;
  @Input() productComponentsArray: FormArray;
  @Input() simpleProducts: ProductInterface[];
  @Output() removeComponent = new EventEmitter<number>();
  @Output() addNewComponent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onRemoveComponent(id: number) {
    this.removeComponent.emit(id);
  }

  onAddNewComponent() {
    this.addNewComponent.emit();
  }
}
