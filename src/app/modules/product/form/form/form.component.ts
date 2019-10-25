import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaxService } from '../../../tax/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';
import { isPresent } from '../../../../../utils/type-guard/is-present';
import { isNumeric } from '../../../../../utils/type-guard/is-numeric';
import { ProductService } from '../../product.service';
import { ProductCategoryInterface } from '../../../product-category/model/product-category.interface';
import { ProductTypeEnum } from '../../model/product-type.enum';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../../utils/class/form-group';
import { ProductCategoryService } from '../../../product-category/product-category.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [TaxService, ProductService, ProductCategoryService]
})
export class FormComponent implements OnInit, OnDestroy {
  labelControl = new FormControl(undefined, [Validators.required, Validators.maxLength(20)]);

  nameControl = new FormControl(undefined, [Validators.required]);
  imageControl = new FormControl(undefined, [Validators.required]);
  productCategoryIdControl = new FormControl(undefined, [Validators.required]);
  netPriceControl = new FormControl(undefined, [Validators.required]);
  descriptionControl = new FormControl(undefined, [Validators.required]);
  labelsControl = new FormControl([], [Validators.required]);
  productTypeControl = new FormControl(undefined, [Validators.required]);

  productForm = new FormGroup({
    name: this.nameControl,
    image: this.imageControl,
    productCategoryId: this.productCategoryIdControl,
    netPrice: this.netPriceControl,
    description: this.descriptionControl,
    labels: this.labelsControl,
    productType: this.productTypeControl
  });

  productTypeEnum = ProductTypeEnum;

  // tslint:disable-next-line:variable-name
  private _isHandset = false;

  @HostBinding('class.isHandset')
  get isHandset() {
    return this._isHandset;
  }

  idParam$: Observable<string | null>;
  idParam: string | null;
  isLoading = false;
  productCategories$: Observable<ProductCategoryInterface[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {
    this.productCategories$ = this.productCategoryService.getProductCategories();

    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        untilDestroyed(this),
        map(result => result.matches)
      )
      .subscribe(isHandSet => (this._isHandset = isHandSet));

    this.idParam$ = this.route.paramMap.pipe(
      untilDestroyed(this),
      map(x => x.get('id'))
    );

    this.idParam$.pipe(untilDestroyed(this)).subscribe(idParam => {
      this.productForm.reset();
      this.idParam = idParam;
      if (isPresent(idParam) && isNumeric(+idParam)) {
        this.isLoading = true;
        this.taxService.getTaxById(+idParam).subscribe(
          taxData => {
            this.productForm.patchValue(taxData);
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
            this.router.navigate(['tax']);
          }
        );
      }
    });
  }

  ngOnDestroy() {}

  ngOnInit(): void {}

  submitForm(b: boolean) {
    this.productForm.markAllAsTouched();
  }

  add($event: MatChipInputEvent) {
    if ($event.value) {
      const currentValue = this.labelsControl.value ? this.labelsControl.value : [];
      this.labelsControl.setValue([...currentValue, $event.value]);
      this.labelControl.reset();
    }
  }

  remove(labelIndex: number) {
    (this.labelsControl.value as Array<string>).splice(labelIndex, 1);
  }

  removeLoadedImage(event: MouseEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    this.imageControl.setValue(undefined);
  }
}
