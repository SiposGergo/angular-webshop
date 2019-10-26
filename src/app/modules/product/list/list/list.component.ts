import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { isTrue } from '../../../../../utils/type-guard/is-true';
import { TaxService } from '../../../tax/tax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { ProductInterface } from '../../model/product.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ProductService, TaxService]
})
export class ListComponent implements OnInit, OnDestroy {
  listNeedRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  dataSource$: Observable<MatTableDataSource<ProductInterface>>;
  displayedColumns: string[] = ['name', 'net', 'gross', 'type', 'actions'];
  isLoading = true;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource$ = this.listNeedRefresh.pipe(
      untilDestroyed(this),
      filter(x => isTrue(x)),
      switchMap(() => this.productService.getProducts()),
      map(products => new MatTableDataSource(products)),
      tap(dataSource => {
        dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {}

  constructor(
    private taxService: TaxService,
    private productService: ProductService,
    private matSnackbar: MatSnackBar,
    private router: Router
  ) {}

  deleteProduct(productId: number) {
    this.isLoading = true;
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.matSnackbar.open('Termék sikeresen törölve!', 'Bezárás', { duration: 5000 });
        this.listNeedRefresh.next(true);
      },
      () => (this.isLoading = false)
    );
  }

  editProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}
