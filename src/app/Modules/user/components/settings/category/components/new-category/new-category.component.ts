import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewComComponent } from '../../../company/components/new-com/new-com.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewComComponent>,
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      CatCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      catName: ['', [Validators.required]]
    });
  }

  onCatAdd() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
