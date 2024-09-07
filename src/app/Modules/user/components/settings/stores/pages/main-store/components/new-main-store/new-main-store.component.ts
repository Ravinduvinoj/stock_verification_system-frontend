import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewComComponent } from '../../../../../company/components/new-com/new-com.component';

@Component({
  selector: 'app-new-main-store',
  templateUrl: './new-main-store.component.html',
  styleUrl: './new-main-store.component.css'
})
export class NewMainStoreComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewComComponent>,
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      MainCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      MainName: ['', [Validators.required]]
    });
  }

  onAddMain() {
    if (this.form.valid) {

      console.log(this.form.value);
    } else {
      console.log("Form is invalid");
    }
  }
}
