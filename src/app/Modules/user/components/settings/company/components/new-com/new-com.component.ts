import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from '../../../../../../models/companyModel';
import { ApimService } from '../../../../../../services/apim.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrl: './new-com.component.css',
})
export class NewComComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<NewComComponent>,
    private _fb: FormBuilder,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      companyCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      companyName: ['', [Validators.required]],
    });
  }

  onCompanyAdd() {
    this.isLoading = true;
    if (this.form.valid) {
      let data = this.form.value;
      let Obj: Company = {
        companyCode: data.companyCode,
        companyName: data.companyName,
      };
      this._apim.createCompany(Obj).subscribe(
        (response) => {
          setTimeout(() => {
            this.isLoading = false; // Hide loader when data loads
            this._dialogRef.close();
            this._snackBar.open('Company Added', 'Close', {
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
