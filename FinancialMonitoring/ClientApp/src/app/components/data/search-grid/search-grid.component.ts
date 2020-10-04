import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatColumnDef, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

/**
 * Component for a search grid
 */
@Component({
  selector: 'app-search-grid',
  templateUrl: './search-grid.component.html',
  styleUrls: ['./search-grid.component.css']
})
export class SearchGridComponent implements AfterViewInit, AfterContentInit
{
  private searchText$: Subject<string> = new Subject<string>();

  private dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  private _columns: string[] = [];
  /**
   * @returns {string[]} The displayed columns
   */
  public get columns(): string[] { return this._columns; }
  /**
   * @param {string[]} value The displayed columns
   */
  @Input() public set columns(value: string[]) { this._columns = value; }

  private _searchFunction: (param: string) => Observable<any[]>;
  /**
   * @returns {(param: string) => Observable<any[]>} The search Function
   */
  get searchFunction(): (param: string) => Observable<any[]>
  { return this._searchFunction; }
  /**
   * @param {(param: string) => Observable<any[]>} value The search Function
   */
  @Input() set searchFunction(value: (param: string) => Observable<any[]>)
  { 
    this._searchFunction = value; 
    this.searchFunction(null).subscribe(categories => this.dataSource.data = categories);

    this.searchText$.pipe(
      debounceTime(1000), 
      distinctUntilChanged(),
      switchMap(searchText => this.searchFunction(searchText))
    ).subscribe(categories => this.dataSource.data = categories);
  }

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  @ViewChild(MatTable, { static: true }) private table: MatTable<FinancialItemModel>;
  @ContentChildren(MatColumnDef) private columnDefs: QueryList<MatColumnDef>;

  /**
   * @inheritdoc
   */
  public ngAfterContentInit() 
  { this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef)); }

  /**
   * @inheritdoc
   */
  public ngAfterViewInit() 
  { this.dataSource.paginator = this.paginator; }

  /**
   * Removes an item from the grid
   * 
   * @param {any} itemToRemove The item that should be removed
   */
  public removeItem(itemToRemove: any)
  { this.dataSource.data = this.dataSource.data.filter(item => item != itemToRemove); }

  private searchTextChange(searchText: string) { this.searchText$.next(searchText); }
}