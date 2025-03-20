import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewIslandComponent } from '../../../settings/stores/pages/island/components/new-island/new-island.component';
import { ApimService } from '../../../../../services/apim.service';
import { Island } from '../../../../../models/islandModel';
import { item } from '../../../../../models/itemModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css',
})
export class NewItemComponent implements OnInit {
  form!: FormGroup;
  companies!: any;
  mainStores!: any;
  subStores!: any;
  islands!: any;
  categories!: any;

  selectedMainStore: number = 0;
  selectedSubStore: number = 0;
  selectedCompany: number = 0;
  selectedIsland: number = 0;
  selectedCategory: number = 0;

  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewIslandComponent>,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchMainStores();
    this.fetchCompanies();
    this.fetchCategories();
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      ItemName: ['', [Validators.required]],
    });
  }

  onAddItem() {
    this.isLoading = true; // Show loader when data is being fetched
    if (this.form.valid) {
      let data = this.form.value;
      let Obj: item = {
        companyId: this.selectedCompany,
        islandId: this.selectedIsland,
        categoryId: this.selectedCategory,
        itemName: data.ItemName,
      };

      this._apim.createItem(Obj).subscribe((response) => {
        setTimeout(() => {
          this.isLoading = false; // Hide loader when data loads
          this._dialogRef.close();
          this._snackBar.open('item Added', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['mat-accent'],
          });
        }, 1000);
      },
      (error) => {
        this._snackBar.open(error.error.error, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.isLoading = false;
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onMainStoreSelectionChange(event: any): void {
    this.selectedMainStore = event.value;
    console.log('Selected Category ID:', this.selectedMainStore);

    this.fetchSubStores(this.selectedMainStore);
  }

  onCompanySelectionChange(event: any): void {
    this.selectedCompany = event.value;
    console.log('Selected item ID:', this.selectedCompany);
  }

  onSubStoreSelectionChange(event: any): void {
    this.selectedSubStore = event.value;
    console.log('Selected SubStore ID:', this.selectedSubStore);
    this.islands = [];
    this.fetchIslands(this.selectedSubStore);
  }

  onIslandsSelectionChange(event: any): void {
    this.selectedIsland = event.value;
    console.log('Selected Island ID:', this.selectedIsland);
  }

  onCategorySelectionChange(event: any): void {
    this.selectedCategory = event.value;
    console.log('Selected category ID:', this.selectedCategory);
  }

  fetchCompanies(): void {
    this._apim.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
        console.log('Companies:', this.companies);
      },
      error: (_error) => {
        console.error('Error fetching companies:', _error);
      },
    });
  }

  fetchMainStores(): void {
    this._apim.getMainstores().subscribe({
      next: (main) => {
        this.mainStores = main;
        console.log('Main Stores:', this.mainStores);
      },
      error: (_error) => {
        console.error('Error fetching main stores:', _error);
      },
    });
  }

  fetchSubStores(id: number): void {
    this._apim.getSubstoresByMainId(id).subscribe({
      next: (sub) => {
        this.subStores = sub;
        console.log('Sub Stores:', this.subStores);
      },
      error: (_error) => {
        console.error('Error fetching sub stores:', _error);
      },
    });
  }

  fetchIslands(id: number): void {
    this._apim.getIslandsBySubId(id).subscribe({
      next: (islnds) => {
        this.islands = islnds;
        console.log('islands:', this.islands);
      },
      error: (_error) => {
        console.error('Error fetching islands:', _error);
      },
    });
  }

  fetchCategories() {
    this._apim.getCategories().subscribe(
      (response) => {
        this.categories = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
