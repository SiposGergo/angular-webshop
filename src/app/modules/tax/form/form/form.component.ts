import { Component, HostBinding, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../../utils/class/form-group';
import { TaxService } from '../../tax.service';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPresent } from '../../../../../utils/type-guard/is-present';
import { isNumeric } from '../../../../../utils/type-guard/is-numeric';
import { isIntegerValidator } from '../../../validation/custom-validator/integer.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaxInterface } from '../../model/tax.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [TaxService]
})
export class FormComponent implements OnDestroy {
  nameControl: FormControl = new FormControl(undefined, [Validators.required, Validators.maxLength(20)]);
  percentControl: FormControl = new FormControl(undefined, [
    isIntegerValidator(),
    Validators.required,
    Validators.min(0),
    Validators.max(100)
  ]);
  descriptionControl: FormControl = new FormControl(undefined, [Validators.required, Validators.maxLength(100)]);

  taxForm: FormGroup = new FormGroup({
    name: this.nameControl,
    percent: this.percentControl,
    description: this.descriptionControl
  });

  // tslint:disable-next-line:variable-name
  private _isHandset = false;

  @HostBinding('class.isHandset')
  get isHandset() {
    return this._isHandset;
  }

  idParam$: Observable<string | null>;
  idParam: string | null;
  isLoading = false;

  constructor(
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

    this.idParam$ = this.route.paramMap.pipe(
      untilDestroyed(this),
      map(x => x.get('id'))
    );

    this.idParam$.pipe(untilDestroyed(this)).subscribe(idParam => {
      this.taxForm.reset();
      this.idParam = idParam;
      if (isPresent(idParam) && isNumeric(+idParam)) {
        this.isLoading = true;
        this.taxService.getTaxById(+idParam).subscribe(
          taxData => {
            this.taxForm.patchValue(taxData);
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

  private endpointCall(): Observable<TaxInterface> {
    if (isPresent(this.idParam) && isNumeric(+this.idParam)) {
      return this.taxService.putTax(this.taxForm.value, +this.idParam);
    }
    return this.taxService.postTax(this.taxForm.value);
  }

  private _submit(): Observable<TaxInterface | undefined> {
    this.taxForm.submitted = true;
    this.taxForm.markAllAsTouched();
    if (this.taxForm.valid) {
      this.isLoading = true;
      this.taxForm.startSubmit();
      return this.endpointCall();
    }
    return throwError({});
  }

  submitForm(createNew: boolean) {
    this._submit().subscribe(
      (tax: TaxInterface) => {
        this.isLoading = false;
        this.taxForm.endSubmit();
        this.matSnackBar.open(
          this.idParam === 'new' ? 'Új áfa kategória felvétele sikeres!' : 'Áfa kategória módosítása sikeres!',
          'Bezárás',
          { duration: 5000 }
        );
        if (createNew) {
          this.router.navigate(['tax', 'new']);
          this.taxForm.reset();
        } else {
          this.router.navigate(['tax', tax.id]);
        }
      },
      () => {
        this.isLoading = false;
        this.taxForm.endSubmit();
      }
    );
  }
}
