import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatColumnDef, MatPaginator, MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements AfterViewInit, AfterContentInit
{
  private _dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  /**
   * @returns {MatTableDataSource<any>} The datasource of the grid 
   */
  get dataSource(): MatTableDataSource<any> { return this._dataSource; }
  /**
   * @param {MatTableDataSource<any>} value The datasource of the grid 
   */
  @Input() set dataSource(value: MatTableDataSource<any>) { this._dataSource = value; }

  private _columns: string[] = [];
  /**
   * @returns {string[]} The displayed columns
   */
  public get columns(): string[] { return this._columns; }
  /**
   * @param {string[]} value The displayed columns
   */
  @Input() public set columns(value: string[]) { this._columns = value; }

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) private table: MatTable<any>;
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
}