import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComComponent } from './components/new-com/new-com.component';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import FileSaver from 'file-saver';
import { ApimService } from '../../../../services/apim.service';
import { MatTableDataSource } from '@angular/material/table';
export interface company {
  id: string;
  companyCode: number;
  companyName: string;
}
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // <-- ViewChild for MatSort

  displayedColumns: string[] = [
    'select',
    'id', // This should match the 'id' field in your data
    'companyCode', // Change 'code' to 'companyCode'
    'companyName',
  ];

  ELEMENT_DATA: company[] = [];
  dataSource = new MatTableDataSource<company>(this.ELEMENT_DATA);
  selection = new SelectionModel<company>(true, []);
  selectedRow: any;
  isLoaded: boolean = false;

  constructor(public dialog: MatDialog, private _apim: ApimService) {}
  ngOnInit(): void {
    this.isLoaded = false;
    this.getCompanies();
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

  checkboxLabel(row?: company): string {
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

  createCom() {
    const dialogRef = this.dialog.open(NewComComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getCompanies(); // Call the getCompanies() method to fetch the updated data
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

  getCompanies() {
    this.isLoaded = false;
    this._apim.getCompanies().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response;
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
        this.isLoaded = true;
      }
    );
  }
}
