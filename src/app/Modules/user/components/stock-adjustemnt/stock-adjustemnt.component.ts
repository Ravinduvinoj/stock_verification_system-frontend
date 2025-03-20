import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import FileSaver from 'file-saver';
import { ApimService } from '../../../services/apim.service';
import { category } from '../settings/category/category.component';
import { NewCategoryComponent } from '../settings/category/components/new-category/new-category.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { adjustStock } from '../../../models/itemModel';
import { PrintPopupComponent } from './components/print-popup/print-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-adjustemnt',
  templateUrl: './stock-adjustemnt.component.html',
  styleUrl: './stock-adjustemnt.component.css',
})
export class StockAdjustemntComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // <-- ViewChild for MatSort

  displayedColumns: string[] = [
    'select',
    'id', // This should match the 'id' field in your data
    'categoryCode', // Change 'code' to 'companyCode'
    'categoryName',
  ];
  ELEMENT_DATA: category[] = [];
  dataSource = new MatTableDataSource<category>(this.ELEMENT_DATA);
  selection = new SelectionModel<category>(true, []);
  selectedRow: any;
  isLoading: boolean = false;
  isStockAddingLoading: boolean = false;
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getStockItems();

    this.form = this._fb.group({
      itemCode: ['', [Validators.required]], // Add validation
      quantity: ['', [Validators.required]],
    });
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

  checkboxLabel(row?: category): string {
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

  getStockItems() {
    this.isLoading = true;
    this.dataSource.data = [];
    this._apim.getAllStocks().subscribe(
      (response) => {
        setTimeout(() => {
          this.isLoading = false; // Hide loader when data loads
          this.dataSource.data = response;
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this._snackBar.open(error, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['mat-accent'],
        });
      }
    );
  }

  onstockAdd() {
    if (this.form.valid) {
      this.isStockAddingLoading = true;
      let data = this.form.value;
      let Obj: adjustStock = {
        itemCode: data.itemCode,
        quantity: data.quantity,
      };
      this._apim.adjustItemStock(Obj).subscribe((response) => {
        setTimeout(() => {
          this.isStockAddingLoading = false; // Hide loader when data loads
          this._snackBar.open('Stock Adjusted', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['mat-accent'],
          });
          this.getStockItems();
          const dialogRef = this.dialog.open(PrintPopupComponent);
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this._apim.getLastStocksPdf(Obj).subscribe(
                (response) => {
                  // const blob = new Blob([response], { type: 'application/pdf' });
                  // const url = window.URL.createObjectURL(blob);
                  // const a = document.createElement('a');
                  // a.href = url;
                  // a.download = `last_stock_report.pdf`; // Customize the filename
                  // document.body.appendChild(a);
                  // a.click();
                  // document.body.removeChild(a);

                  const blob = new Blob([response], {
                    type: 'application/pdf',
                  });
                  const url = window.URL.createObjectURL(blob);
                  window.open(url, '_blank'); // Open in a new tab
                },
                (error) => {
                  console.log(error);
                }
              );
            }
          });
        }, 1000);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  clearForm() {
    this.form.reset(); // Clears all fields
  }
}
