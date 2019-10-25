import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../../utils/class/form-group';
import { Observable, throwError } from 'rxjs';
import { TaxInterface } from '../../../tax/model/tax.interface';
import { ProductCategoryService } from '../../product-category.service';
import { TaxService } from '../../../tax/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';
import { isPresent } from '../../../../../utils/type-guard/is-present';
import { isNumeric } from '../../../../../utils/type-guard/is-numeric';
import { ProductCategoryInterface } from '../../model/product-category.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [TaxService, ProductCategoryService]
})
export class FormComponent implements OnInit, OnDestroy {
  nameControl = new FormControl(undefined, [Validators.required, Validators.maxLength(20)]);
  taxCategoryIdControl = new FormControl(undefined, Validators.required);
  descriptionControl = new FormControl(undefined, [Validators.required, Validators.maxLength(100)]);

  productCategoryForm = new FormGroup({
    name: this.nameControl,
    taxCategoryId: this.taxCategoryIdControl,
    description: this.descriptionControl
  });

  idParam$: Observable<string | null>;
  idParam: string | null;
  isLoading = false;
  taxCategories$: Observable<TaxInterface[]>;

  // tslint:disable-next-line:variable-name
  private _isHandset = false;

  @HostBinding('class.isHandset')
  get isHandset() {
    return this._isHandset;
  }

  constructor(
    private productCategoryService: ProductCategoryService,
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        untilDestroyed(this),
        map(result => result.matches)
      )
      .subscribe(isHandSet => (this._isHandset = isHandSet));

    this.taxCategories$ = this.taxService.getTaxes();
    this.idParam$ = this.route.paramMap.pipe(
      untilDestroyed(this),
      map(x => x.get('id'))
    );

    this.idParam$.pipe(untilDestroyed(this)).subscribe(idParam => {
      this.productCategoryForm.reset();
      this.idParam = idParam;
      if (isPresent(idParam) && isNumeric(+idParam)) {
        this.isLoading = true;
        this.productCategoryService.getProductCategoryById(+idParam).subscribe(
          productFormData => {
            console.log(productFormData);
            this.productCategoryForm.patchValue(productFormData);
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

  ngOnInit() {}

  ngOnDestroy(): void {}

  private endpointCall(): Observable<ProductCategoryInterface> {
    if (isPresent(this.idParam) && isNumeric(+this.idParam)) {
      return this.productCategoryService.putProductCategory(this.productCategoryForm.value, +this.idParam);
    }
    return this.productCategoryService.postProductCategory(this.productCategoryForm.value);
  }

  private _submit(): Observable<ProductCategoryInterface | undefined> {
    this.productCategoryForm.submitted = true;
    this.productCategoryForm.markAllAsTouched();
    if (this.productCategoryForm.valid) {
      this.isLoading = true;
      this.productCategoryForm.startSubmit();
      return this.endpointCall();
    }
    return throwError({});
  }

  submitForm(createNew: boolean) {
    this._submit().subscribe(
      (productCategory: ProductCategoryInterface) => {
        this.isLoading = false;
        this.productCategoryForm.endSubmit();
        this.matSnackBar.open(
          this.idParam === 'new' ? 'Új termék kategória felvétele sikeres!' : 'Termék kategória módosítása sikeres!',
          'Bezárás',
          { duration: 5000 }
        );
        if (createNew) {
          this.router.navigate(['product-category', 'new']);
          this.productCategoryForm.reset();
        } else {
          this.router.navigate(['product-category', productCategory.id]);
        }
      },
      () => {
        this.isLoading = false;
        this.productCategoryForm.endSubmit();
      }
    );
  }
}
