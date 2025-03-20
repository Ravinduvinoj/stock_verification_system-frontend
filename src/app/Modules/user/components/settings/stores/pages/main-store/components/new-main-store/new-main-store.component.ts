import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewComComponent } from '../../../../../company/components/new-com/new-com.component';
import { MainStore } from '../../../../../../../../models/mainstoreModel';
import { ApimService } from '../../../../../../../../services/apim.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-main-store',
  templateUrl: './new-main-store.component.html',
  styleUrl: './new-main-store.component.css',
})
export class NewMainStoreComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewMainStoreComponent>,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      MainCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      MainName: ['', [Validators.required]],
    });
  }

  onAddMain() {
    if (this.form.valid) {
      this.isLoading = true; 
      let data = this.form.value;
      let Obj: MainStore = {
        mainStoreCode: data.MainCode,
        mainStoreName: data.MainName,
      };
      this._apim.createMainStore(Obj).subscribe(
        (response) => {
          setTimeout(() => {
            this.isLoading = false; // Hide loader when data loads
            this._dialogRef.close();
            this._snackBar.open('Main Store Added', 'Close', {
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
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
