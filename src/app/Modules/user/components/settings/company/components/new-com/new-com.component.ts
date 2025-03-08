import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Company } from '../../../../../../models/companyModel';
import { ApimService } from '../../../../../../services/apim.service';

@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrl: './new-com.component.css',
})
export class NewComComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<NewComComponent>,
    private _fb: FormBuilder,
    private _apim: ApimService
  ) {}

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
    this.form = this._fb.group({
      companyCode: ['', [Validators.required, Validators.maxLength(2)]], // Add validation
      companyName: ['', [Validators.required]],
    });
  }

  onCompanyAdd() {
    if (this.form.valid) {
      let data = this.form.value;
      let Obj: Company = {
        companyCode: data.companyCode,
        companyName: data.companyName,
      };

      this._apim.createCompany(Obj).subscribe((response) => {
        console.log(response);
        this._dialogRef.close();
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
