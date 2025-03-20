import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewComComponent } from '../../../company/components/new-com/new-com.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../../../models/categoryModel';
import { ApimService } from '../../../../../../services/apim.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewCategoryComponent>,
    private _apim: ApimService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      CatCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      catName: ['', [Validators.required]],
    });
  }

  onCatAdd() {
    if (this.form.valid) {
      this.isLoading = true; // Show loader when data is being fetched
      let data = this.form.value;
      let Obj: Category = {
        categoryCode: data.CatCode,
        categoryName: data.catName,
      };

      this._apim.createCategory(Obj).subscribe((response) => {
        setTimeout(() => {
          this.isLoading = false; // Hide loader when data loads
          this._dialogRef.close();
          this._snackBar.open('Category Added', 'Close', {
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
}
