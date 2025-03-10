import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApimService } from '../../../../../../../../services/apim.service';
import { NewMainStoreComponent } from '../../../main-store/components/new-main-store/new-main-store.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MainStore } from '../../../../../../../../models/mainstoreModel';
import { SubStore } from '../../../../../../../../models/substoreModule';

@Component({
  selector: 'app-new-sub-store',
  templateUrl: './new-sub-store.component.html',
  styleUrl: './new-sub-store.component.css'
})
export class NewSubStoreComponent implements OnInit{
form!: FormGroup;
mainStores!: any;
selectedMainStore: number = 0;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewSubStoreComponent>,
    private _apim: ApimService
  ) {}

  ngOnInit(): void {
    this.fetchMainStores();
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      SubCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      SubName: ['', [Validators.required]],
    });
  }

  onAddSub() {
     if (this.form.valid) {
              let data = this.form.value;
              let Obj: SubStore = {
                mainStoreId: this.selectedMainStore,
                subStoreCode: data.SubCode,
                subStoreName: data.SubName,
              };
        
              this._apim.createSubStore(Obj).subscribe((response) => {
                console.log(response);
                this._dialogRef.close();
              });
            } else {
              console.log('Form is invalid');
            }
  }

  onMainStoreSelectionChange(event: any): void {
    this.selectedMainStore = event.value;
    console.log('Selected Category ID:', this.selectedMainStore);
  }

  fetchMainStores(): void {
    this._apim.getMainstores().subscribe({
      next: (main) => {
        this.mainStores = main;
        console.log('Main Stores:', this.mainStores);
  
      },
      error: (_error) => {
        console.error('Error fetching main stores:', _error);
      }
    });
  }
  
}
