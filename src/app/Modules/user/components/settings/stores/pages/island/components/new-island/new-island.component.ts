import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApimService } from '../../../../../../../../services/apim.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SubStore } from '../../../../../../../../models/substoreModule';
import { Island } from '../../../../../../../../models/islandModel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-island',
  templateUrl: './new-island.component.html',
  styleUrl: './new-island.component.css',
})
export class NewIslandComponent implements OnInit {
  form!: FormGroup;
  mainStores!: any;
  subStores!: any;
  selectedMainStore: number = 0;
  selectedSubStore: number = 0;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewIslandComponent>,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchMainStores();
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      IslandCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      IslandName: ['', [Validators.required]],
    });
  }

  onAddIsland() {
    if (this.form.valid) {
      this.isLoading = true; 
      let data = this.form.value;
      let Obj: Island = {
        mainStoreId: this.selectedMainStore,
        subStoreId: this.selectedSubStore,
        islandCode: data.IslandCode,
        islandName: data.IslandName,
      };

      this._apim.createIsland(Obj).subscribe((response) => {
        setTimeout(() => {
          this.isLoading = false; // Hide loader when data loads
          this._dialogRef.close();
          this._snackBar.open('Island Added', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['mat-accent'],
          });
        }, 1000);
      },
      (error) => {
        console.log(error);
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

  onSubStoreSelectionChange(event: any): void {
    this.selectedSubStore = event.value;
    console.log('Selected Category ID:', this.selectedSubStore);
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
}
