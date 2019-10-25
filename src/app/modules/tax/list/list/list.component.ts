import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaxInterface } from '../../model/tax.interface';
import { TaxService } from '../../tax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { isTrue } from '../../../../../utils/type-guard/is-true';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [TaxService]
})
export class ListComponent implements OnInit, OnDestroy {
  listNeedRefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  dataSource$: Observable<MatTableDataSource<TaxInterface>>;
  displayedColumns: string[] = ['name', 'percent', 'description', 'actions'];
  isLoading = true;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource$ = this.listNeedRefresh.pipe(
      untilDestroyed(this),
      filter(x => isTrue(x)),
      switchMap(() => this.taxService.getTaxes()),
      map(taxes => new MatTableDataSource(taxes)),
      tap(dataSource => {
        dataSource.sort = this.sort;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {}

  constructor(private taxService: TaxService, private matSnackbar: MatSnackBar, private router: Router) {}

  deleteTax(taxId: number) {
    this.isLoading = true;
    this.taxService.deleteTax(taxId).subscribe(
      () => {
        this.matSnackbar.open('Áfa kategória sikeresen törölve!', 'Bezárás', { duration: 5000 });
        this.listNeedRefresh.next(true);
      },
      () => (this.isLoading = false)
    );
  }

  editTax(id: any) {
    this.router.navigate(['tax', id]);
  }
}
