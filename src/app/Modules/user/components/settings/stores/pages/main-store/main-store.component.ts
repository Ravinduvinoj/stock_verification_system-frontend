import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMainStoreComponent } from './components/new-main-store/new-main-store.component';
import FileSaver from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { ApimService } from '../../../../../../services/apim.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface mainStore {
  id: string;
  mainStoreCode: number;
  mainStoreName: string;
}

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrl: './main-store.component.css',
})
export class MainStoreComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // <-- ViewChild for MatSort

  displayedColumns: string[] = [
    'select',
    'id', // This should match the 'id' field in your data
    'mainStoreCode', // Change 'code' to 'companyCode'
    'mainStoreName',
  ];
  ELEMENT_DATA: mainStore[] = [];
  dataSource = new MatTableDataSource<mainStore>(this.ELEMENT_DATA);
  selection = new SelectionModel<mainStore>(true, []);
  selectedRow: any;
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMainstores();
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

  checkboxLabel(row?: mainStore): string {
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

  createMainStore() {
    const dialogRef = this.dialog.open(NewMainStoreComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMainstores();
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

  getMainstores() {
    this.isLoading = true;
    this._apim.getMainstores().subscribe(
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
