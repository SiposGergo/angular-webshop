import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, throwError } from 'rxjs';
import { TaxService } from '../../../tax/tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { isPresent } from '../../../../../utils/type-guard/is-present';
import { isNumeric } from '../../../../../utils/type-guard/is-numeric';
import { ProductService } from '../../product.service';
import { ProductCategoryInterface } from '../../../product-category/model/product-category.interface';
import { ProductTypeEnum } from '../../model/product-type.enum';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../../utils/class/form-group';
import { ProductCategoryService } from '../../../product-category/product-category.service';
import { ProductInterface } from '../../model/product.interface';
import { isIntegerValidator } from '../../../validation/custom-validator/integer.validator';
import { ProductComponentInterface } from '../../model/product-component.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [TaxService, ProductService, ProductCategoryService]
})
export class FormComponent implements OnInit, OnDestroy {
  // a chips-hez
  labelControl = new FormControl(undefined, [Validators.maxLength(20), Validators.required]);

  nameControl = new FormControl(undefined, [Validators.required]);
  imageControl = new FormControl(undefined, [Validators.required]);
  productCategoryIdControl = new FormControl(undefined, [Validators.required]);
  netPriceControl = new FormControl(undefined, [Validators.required]);
  descriptionControl = new FormControl(undefined, [Validators.required]);
  labelsControl = new FormControl([]);
  productTypeControl = new FormControl(undefined, [Validators.required]);
  productComponentsArray: FormArray = new FormArray([]);

  productForm = new FormGroup({
    name: this.nameControl,
    image: this.imageControl,
    productCategoryId: this.productCategoryIdControl,
    netPrice: this.netPriceControl,
    description: this.descriptionControl,
    labels: this.labelsControl,
    productType: this.productTypeControl,
    components: this.productComponentsArray
  });

  productTypeEnum = ProductTypeEnum;

  // tslint:disable-next-line:variable-name
  private _isHandset = false;

  @HostBinding('class.isHandset')
  get isHandset() {
    return this._isHandset;
  }

  isComposite$: Observable<boolean>;
  idParam$: Observable<string | null>;
  idParam: string | null;
  isLoading = false;
  productCategories$: Observable<ProductCategoryInterface[]>;
  simpleProducts$: Observable<ProductInterface[]>;
  selectedProductCategory$: BehaviorSubject<ProductCategoryInterface | undefined> = new BehaviorSubject<
    ProductCategoryInterface | undefined
  >(undefined);

  constructor(
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {
    this.simpleProducts$ = this.productService
      .getProducts()
      .pipe(map(products => products.filter(p => p.productType === ProductTypeEnum.simple)));

    this.isComposite$ = this.productTypeControl.valueChanges.pipe(
      untilDestroyed(this),
      map(value => value === ProductTypeEnum.composite),
      distinctUntilChanged(),
      tap(isComposite => {
        if (isComposite) {
          this.productComponentsArray.setValidators([Validators.required]);
        } else {
          this.productComponentsArray.clearValidators();
        }
      })
    );

    this.productCategories$ = forkJoin([
      this.productCategoryService.getProductCategories(),
      this.taxService.getTaxes()
    ]).pipe(
      map(([productCategories, taxCategories]) =>
        productCategories.map(category => ({
          ...category,
          tax: taxCategories.find(t => t.id === category.taxCategoryId)
        }))
      ),
      // a következő blokk miatt ráhívna újra
      shareReplay(1),
      untilDestroyed(this)
    );

    combineLatest([this.productCategoryIdControl.valueChanges, this.productCategories$])
      .pipe(untilDestroyed(this))
      .subscribe(([newValue, productCategories]) => {
        if (isPresent(newValue) && isNumeric(+newValue)) {
          this.selectedProductCategory$.next(productCategories.find(pc => pc.id === +newValue));
        } else {
          this.selectedProductCategory$.next(undefined);
        }
      });

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

    this.idParam$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged()
      )
      .subscribe(idParam => {
        this.productForm.reset();
        this.idParam = idParam;
        if (isPresent(idParam) && isNumeric(+idParam)) {
          this.isLoading = true;
          this.productService.getProductById(+idParam).subscribe(
            productData => {
              this.productForm.patchValue(productData);
              if (Array.isArray(productData.components)) {
                productData.components.forEach((component: ProductComponentInterface) =>
                  this.productComponentsArray.push(this.createComponentForm(component))
                );
              }
              this.isLoading = false;
            },
            () => {
              this.isLoading = false;
              this.router.navigate(['product']);
            }
          );
        }
      });
  }

  ngOnDestroy() {}

  ngOnInit(): void {}

  private endpointCall(): Observable<ProductInterface> {
    if (isPresent(this.idParam) && isNumeric(+this.idParam)) {
      return this.productService.putProduct(this.productForm.value, +this.idParam);
    }
    return this.productService.postProduct(this.productForm.value);
  }

  private _submit(): Observable<ProductInterface | undefined> {
    this.productForm.submitted = true;
    this.productForm.markAllAsTouched();
    this.productComponentsArray.controls.forEach((c: FormGroup) => c.markAllAsTouched());
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productForm.startSubmit();
      return this.endpointCall();
    }
    return throwError({});
  }

  submitForm(createNew: boolean) {
    this._submit().subscribe(
      (product: ProductInterface) => {
        this.isLoading = false;
        this.productForm.endSubmit();
        this.matSnackBar.open(
          this.idParam === 'new' ? 'Új termék felvétele sikeres!' : 'Termék módosítása sikeres!',
          'Bezárás',
          { duration: 5000 }
        );
        if (createNew) {
          this.router.navigate(['product', 'new']);
          this.productForm.reset();
        } else {
          this.router.navigate(['product', product.id]);
        }
      },
      () => {
        this.isLoading = false;
        this.productForm.endSubmit();
      }
    );
  }

  createComponentForm({ productId, quantity }): FormGroup {
    const productIdControl = new FormControl(productId, Validators.required);
    const quantityControl = new FormControl(quantity, [Validators.required, isIntegerValidator]);
    return new FormGroup({ productId: productIdControl, quantity: quantityControl });
  }

  // form array
  onAddNewComponent() {
    const componentGroup = this.createComponentForm({ productId: undefined, quantity: undefined });
    if (this.productForm.submitted) {
      componentGroup.markAllAsTouched();
    }
    this.productComponentsArray.push(componentGroup);
  }

  onRemoveComponent(i: number) {
    this.productComponentsArray.removeAt(i);
  }
}
