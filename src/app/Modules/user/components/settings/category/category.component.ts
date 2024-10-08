import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { PeriodicElement } from '../company/company.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatMenuTrigger } from '@angular/material/menu';
import FileSaver from 'file-saver';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements AfterViewInit{

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  selectedRow: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  // <-- ViewChild for MatSort

  constructor(public dialog: MatDialog) {}
  ngAfterViewInit() {
    // Attach paginator and sorter to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  // <-- Attach the sort to the dataSource
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

  checkboxLabel(row?: PeriodicElement): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position}`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createCategory() {
    this.dialog.open(NewCategoryComponent);
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
    const selectedRows = this.selection.selected.filter(row =>
      currentPageData.some(pageRow => pageRow.position === row.position)
    );

    if (selectedRows.length === 0) {
      console.log("No rows selected on the current page for export.");
      return;
    }

    import("xlsx").then(xlsx => {
      const modifiedData = selectedRows.map(row => ({
        ...row,
        Values: '' // Modify or add any additional properties here if needed
      }));

      const worksheet = xlsx.utils.json_to_sheet(modifiedData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this.saveAsExcelFile(excelBuffer, "selected_rows_");
    });
  }

  deselectElement(row: any) {
    this.selection.deselect(row);
  }

  deselectAllElement() {
    this.selection.clear();
  }

  exportAllExcel() {
    import("xlsx").then(xlsx => {
      const currentPageData = this.getCurrentPageData();
      const modifiedData = currentPageData.map(data => ({
        ...data,
        Values: ''
      }));

      const worksheet = xlsx.utils.json_to_sheet(modifiedData);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

      this.saveAsExcelFile(excelBuffer, "current_page_data");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + "_export_" + new Date().toDateString() + "-" + new Date().toLocaleTimeString() + ".xlsx");

  }
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  {position: 21, name: 'Scandium', weight: 44.9559, symbol: 'Sc'},
  {position: 22, name: 'Titanium', weight: 47.867, symbol: 'Ti'},
  {position: 23, name: 'Vanadium', weight: 50.9415, symbol: 'V'},
  {position: 24, name: 'Chromium', weight: 51.996, symbol: 'Cr'},
  {position: 25, name: 'Manganese', weight: 54.938, symbol: 'Mn'},
  {position: 26, name: 'Iron', weight: 55.845, symbol: 'Fe'},
  {position: 27, name: 'Cobalt', weight: 58.933, symbol: 'Co'},
  {position: 28, name: 'Nickel', weight: 58.9332, symbol: 'Ni'},
  {position: 29, name: 'Copper', weight: 63.546, symbol: 'Cu'},
  {position: 30, name: 'Zinc', weight: 65.38, symbol: 'Zn'},
  {position: 31, name: 'Gallium', weight: 69.723, symbol: 'Ga'},
  {position: 32, name: 'Germanium', weight: 72.63, symbol: 'Ge'},
  {position: 33, name: 'Arsenic', weight: 74.9216, symbol: 'As'},
  {position: 34, name: 'Selenium', weight: 78.971, symbol: 'Se'},
  {position: 35, name: 'Bromine', weight: 79.904, symbol: 'Br'},
  {position: 36, name: 'Krypton', weight: 83.798, symbol: 'Kr'},
  {position: 37, name: 'Rubidium', weight: 85.4678, symbol: 'Rb'},
  {position: 38, name: 'Strontium', weight: 87.62, symbol: 'Sr'},
  {position: 39, name: 'Yttrium', weight: 88.905, symbol: 'Y'},
  {position: 40, name: 'Zirconium', weight: 91.224, symbol: 'Zr'},
  {position: 41, name: 'Niobium', weight: 92.906, symbol: 'Nb'},
  {position: 42, name: 'Molybdenum', weight: 95.95, symbol: 'Mo'},
  {position: 43, name: 'Technetium', weight: 98, symbol: 'Tc'},
  {position: 44, name: 'Ruthenium', weight: 101.07, symbol: 'Ru'},
  {position: 45, name: 'Rhodium', weight: 102.905, symbol: 'Rh'},
  {position: 46, name: 'Palladium', weight: 106.42, symbol: 'Pd'},
  {position: 47, name: 'Silver', weight: 107.8682, symbol: 'Ag'},
  {position: 48, name: 'Cadmium', weight: 112.414, symbol: 'Cd'},
  {position: 49, name: 'Indium', weight: 114.818, symbol: 'In'},
  {position: 50, name: 'Tin', weight: 118.710, symbol: 'Sn'},
  {position: 51, name: 'Antimony', weight: 121.760, symbol: 'Sb'},
  {position: 52, name: 'Tellurium', weight: 127.60, symbol: 'Te'},
  {position: 53, name: 'Iodine', weight: 126.904, symbol: 'I'},
  {position: 54, name: 'Xenon', weight: 131.293, symbol: 'Xe'},
  {position: 55, name: 'Cesium', weight: 132.905, symbol: 'Cs'},
  {position: 56, name: 'Barium', weight: 137.327, symbol: 'Ba'},
  {position: 57, name: 'Lanthanum', weight: 138.905, symbol: 'La'},
  {position: 58, name: 'Cerium', weight: 140.116, symbol: 'Ce'},
  {position: 59, name: 'Praseodymium', weight: 140.907, symbol: 'Pr'},
  {position: 60, name: 'Neodymium', weight: 144.242, symbol: 'Nd'},
  {position: 61, name: 'Promethium', weight: 145, symbol: 'Pm'},
  {position: 62, name: 'Samarium', weight: 150.36, symbol: 'Sm'},
  {position: 63, name: 'Europium', weight: 151.964, symbol: 'Eu'},
  {position: 64, name: 'Gadolinium', weight: 157.25, symbol: 'Gd'},
  {position: 65, name: 'Terbium', weight: 158.925, symbol: 'Tb'},
  {position: 66, name: 'Dysprosium', weight: 162.500, symbol: 'Dy'},
  {position: 67, name: 'Holmium', weight: 164.930, symbol: 'Ho'},
  {position: 68, name: 'Erbium', weight: 167.259, symbol: 'Er'},
  {position: 69, name: 'Thulium', weight: 168.934, symbol: 'Tm'},
  {position: 70, name: 'Ytterbium', weight: 173.04, symbol: 'Yb'},
  {position: 71, name: 'Lutetium', weight: 174.966, symbol: 'Lu'},
  {position: 72, name: 'Hafnium', weight: 178.49, symbol: 'Hf'},
  {position: 73, name: 'Tantalum', weight: 180.947, symbol: 'Ta'},
  {position: 74, name: 'Tungsten', weight: 183.84, symbol: 'W'},
  {position: 75, name: 'Rhenium', weight: 186.207, symbol: 'Re'},
  {position: 76, name: 'Osmium', weight: 190.23, symbol: 'Os'},
  {position: 77, name: 'Iridium', weight: 192.217, symbol: 'Ir'},
  {position: 78, name: 'Platinum', weight: 195.084, symbol: 'Pt'},
  {position: 79, name: 'Gold', weight: 196.966, symbol: 'Au'},
  {position: 80, name: 'Mercury', weight: 200.592, symbol: 'Hg'},
  {position: 81, name: 'Thallium', weight: 204.38, symbol: 'Tl'},
  {position: 82, name: 'Lead', weight: 207.2, symbol: 'Pb'},
  {position: 83, name: 'Bismuth', weight: 208.980, symbol: 'Bi'},
  {position: 84, name: 'Polonium', weight: 209, symbol: 'Po'},
  {position: 85, name: 'Astatine', weight: 210, symbol: 'At'},
  {position: 86, name: 'Radon', weight: 222, symbol: 'Rn'},
  {position: 87, name: 'Francium', weight: 223, symbol: 'Fr'},
  {position: 88, name: 'Radium', weight: 226, symbol: 'Ra'},
  {position: 89, name: 'Actinium', weight: 227, symbol: 'Ac'},
  {position: 90, name: 'Thorium', weight: 232.038, symbol: 'Th'},
  {position: 91, name: 'Protactinium', weight: 231.035, symbol: 'Pa'},
  {position: 92, name: 'Uranium', weight: 238.028, symbol: 'U'},
  {position: 93, name: 'Neptunium', weight: 237, symbol: 'Np'},
  {position: 94, name: 'Plutonium', weight: 244, symbol: 'Pu'},
  {position: 95, name: 'Americium', weight: 243, symbol: 'Am'},
  {position: 96, name: 'Curium', weight: 247, symbol: 'Cm'},
  {position: 97, name: 'Berkelium', weight: 247, symbol: 'Bk'},
  {position: 98, name: 'Californium', weight: 251, symbol: 'Cf'},
  {position: 99, name: 'Einsteinium', weight: 252, symbol: 'Es'},
  {position: 100, name: 'Fermium', weight: 257, symbol: 'Fm'},
  {position: 101, name: 'Mendelevium', weight: 258, symbol: 'Md'},
  {position: 102, name: 'Nobelium', weight: 259, symbol: 'No'},
  {position: 103, name: 'Lawrencium', weight: 266, symbol: 'Lr'},
  {position: 104, name: 'Rutherfordium', weight: 267, symbol: 'Rf'},
  {position: 105, name: 'Dubnium', weight: 270, symbol: 'Db'},
  {position: 106, name: 'Seaborgium', weight: 271, symbol: 'Sg'},
  {position: 107, name: 'Bohrium', weight: 270, symbol: 'Bh'},
  {position: 108, name: 'Hassium', weight: 277, symbol: 'Hs'},
  {position: 109, name: 'Meitnerium', weight: 278, symbol: 'Mt'},
  {position: 110, name: 'Darmstadtium', weight: 281, symbol: 'Ds'},
  {position: 111, name: 'Roentgenium', weight: 282, symbol: 'Rg'},
  {position: 112, name: 'Copernicium', weight: 285, symbol: 'Cn'},
  {position: 113, name: 'Nihonium', weight: 286, symbol: 'Nh'},
  {position: 114, name: 'Flerovium', weight: 289, symbol: 'Fl'},
  {position: 115, name: 'Moscovium', weight: 290, symbol: 'Mc'},
  {position: 116, name: 'Livermorium', weight: 293, symbol: 'Lv'},
  {position: 117, name: 'Tennessine', weight: 294, symbol: 'Ts'},
  {position: 118, name: 'Oganesson', weight: 294, symbol: 'Og'}
];

