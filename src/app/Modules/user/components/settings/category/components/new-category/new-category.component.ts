import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewComComponent } from '../../../company/components/new-com/new-com.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../../../models/categoryModel';
import { ApimService } from '../../../../../../services/apim.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewCategoryComponent>,
    private _apim: ApimService
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
      let data = this.form.value;
      let Obj: Category = {
        categoryCode: data.CatCode,
        categoryName: data.catName,
      };

      this._apim.createCategory(Obj).subscribe((response) => {
        console.log(response);
        this._dialogRef.close();
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
