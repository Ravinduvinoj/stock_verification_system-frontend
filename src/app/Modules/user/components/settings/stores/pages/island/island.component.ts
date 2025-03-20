import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApimService } from '../../../../../../services/apim.service';
import { NewIslandComponent } from './components/new-island/new-island.component';
import { MatMenuTrigger } from '@angular/material/menu';
import FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface islands {
  id: string;
  islandCode: string;
  islandName: string;
  subStoreCode: string;
  subStoreName: string;
}

@Component({
  selector: 'app-island',
  templateUrl: './island.component.html',
  styleUrl: './island.component.css',
})
export class IslandComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // <-- ViewChild for MatSort

  displayedColumns: string[] = [
    'select',
    'id', // This should match the 'id' field in your data
    'subStore', // Change 'code' to 'companyCode'
    'islandCode',
    'islandName',
  ];
  ELEMENT_DATA: islands[] = [];
  dataSource = new MatTableDataSource<islands>(this.ELEMENT_DATA);
  selection = new SelectionModel<islands>(true, []);
  selectedRow: any;
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit() {
    // Attach paginator and sorter to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // <-- Attach the sort to the dataSource
  }

  // Select All logic for checkboxes
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

  getCurrentPageData(): any[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    return this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  checkboxLabel(row?: islands): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
          row.id
        }`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createIsland() {
    const dialogRef = this.dialog.open(NewIslandComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.getCategories(); 
      }
    });
  }

  onRightClick(event: MouseEvent, row: any, menuTrigger: MatMenuTrigger) {
    if (this.selection.isSelected(row)) {
      event.preventDefault(); // Prevent the default browser right-click menu
      this.selectedRow = row;

      // Open the context menu at the cursor's position
      menuTrigger.openMenu();
    }
  }

  exportselectedRows() {
    const currentPageData = this.getCurrentPageData();
    const selectedRows = this.selection.selected.filter((row) =>
      currentPageData.some((pageRow) => pageRow.position === row.id)
    );

    if (selectedRows.length === 0) {
      console.log('No rows selected on the current page for export.');
      return;
    }

    import('xlsx').then((xlsx) => {
      const modifiedData = selectedRows.map((row) => ({
        ...row,
        Values: '', // Modify or add any additional properties here if needed
      }));

      const worksheet = xlsx.utils.json_to_sheet(modifiedData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      this.saveAsExcelFile(excelBuffer, 'selected_rows_');
    });
  }

  deselectElement(row: any) {
    this.selection.deselect(row);
  }

  deselectAllElement() {
    this.selection.clear();
  }

  exportAllExcel() {
    import('xlsx').then((xlsx) => {
      const currentPageData = this.getCurrentPageData();
      const modifiedData = currentPageData.map((data) => ({
        ...data,
        Values: '',
      }));

      const worksheet = xlsx.utils.json_to_sheet(modifiedData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      this.saveAsExcelFile(excelBuffer, 'current_page_data');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName +
        '_export_' +
        new Date().toDateString() +
        '-' +
        new Date().toLocaleTimeString() +
        '.xlsx'
    );
  }

  getCategories() {
    this.isLoading = true;
    this._apim.getIslands().subscribe(
      (response) => {
        setTimeout(() => {
          this.isLoading = false; // Hide loader when data loads
          this.dataSource.data = response;
          // this._snackBar.open('Company loaded successfully', 'Close', {
          //   duration: 3000,
          //   verticalPosition: 'bottom',
          //   horizontalPosition: 'center',
          //   panelClass: ['mat-accent'],
          // });
        }, 500);
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error.error.error, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.isLoading = false;
      }
    );
  }
}
