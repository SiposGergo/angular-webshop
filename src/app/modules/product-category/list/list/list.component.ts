import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { isTrue } from '../../../../../utils/type-guard/is-true';
import { TaxService } from '../../../tax/tax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductCategoryService } from '../../product-category.service';
import { ProductCategoryInterface } from '../../model/product-category.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [TaxService, ProductCategoryService]
})
export class ListComponent implements OnDestroy, OnInit {
  listNeedRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  dataSource$: Observable<MatTableDataSource<ProductCategoryInterface>>;
  displayedColumns: string[] = ['name', 'tax', 'description', 'actions'];
  isLoading = true;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource$ = combineLatest([this.listNeedRefresh, this.taxService.getTaxes()]).pipe(
      untilDestroyed(this),
      filter(([x]) => isTrue(x)),
      switchMap(([, taxes]) =>
        this.productCategoryService.getProductCategories().pipe(
          map(productCategories =>
            productCategories.map(productCategory => ({
              ...productCategory,
              tax: taxes.find(t => t.id === productCategory.taxCategoryId)
            }))
          )
        )
      ),
      map(productCategories => new MatTableDataSource(productCategories)),
      tap(dataSource => {
        dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {}

  constructor(
    private productCategoryService: ProductCategoryService,
    private taxService: TaxService,
    private matSnackbar: MatSnackBar,
    private router: Router
  ) {}

  deleteProductCategory(productCategoryId: number) {
    this.isLoading = true;
    this.productCategoryService.deleteProductCategory(productCategoryId).subscribe(
      () => {
        this.matSnackbar.open('Termék kategória sikeresen törölve!', 'Bezárás', { duration: 5000 });
        this.listNeedRefresh.next(true);
      },
      () => (this.isLoading = false)
    );
  }

  editProductCategory(id: any) {
    this.router.navigate(['product-category', id]);
  }
}
