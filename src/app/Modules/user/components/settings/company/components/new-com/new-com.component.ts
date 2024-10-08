import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrl: './new-com.component.css'
})
export class NewComComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewComComponent>,
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      comCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      comName: ['', [Validators.required]]
    });
  }

  onPostAdd() {
    if (this.form.valid) {

      console.log(this.form.value);
    } else {
      console.log("Form is invalid");
    }
  }

}
