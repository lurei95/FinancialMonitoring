import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { FinancialCategoryModel } from './../../../../models/finance/financialCatgegory.model';
import { Observable, of, Subject } from 'rxjs';
import { Component} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { debounceTime,  distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * Components for displaying a list of categories
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent
{
  private searchText$: Subject<string> = new Subject<string>();

  private displayedColumns: string[] = ['title', "value", "items", "edit", "delete"];

  private dataSource: MatTableDataSource<FinancialCategoryModel> = new MatTableDataSource([]);

  private categories: Observable<FinancialCategoryModel[]> = of([new FinancialCategoryModel()]);

  /**
   * Constructor
   * 
   * @param {FinancialCategoryService} service Injected: FinancialCategoryService
   */
  constructor(service: FinancialCategoryService)
  {
    this.categories.subscribe(result => this.dataSource.data = result);

    this.searchText$.pipe(
      debounceTime(1000), 
      distinctUntilChanged(),
      switchMap(searchText => service.retrieve([{ name: "searchText", value: searchText}]))
    ).subscribe(categories => this.dataSource.data = categories.result);
  }

  private searchTextChange(searchText: string) { this.searchText$.next(searchText); }
}