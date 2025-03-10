import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewComComponent } from '../../../../../company/components/new-com/new-com.component';
import { MainStore } from '../../../../../../../../models/mainstoreModel';
import { ApimService } from '../../../../../../../../services/apim.service';

@Component({
  selector: 'app-new-main-store',
  templateUrl: './new-main-store.component.html',
  styleUrl: './new-main-store.component.css'
})
export class NewMainStoreComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewMainStoreComponent>,
    private _apim: ApimService
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
              let data = this.form.value;
              let Obj: MainStore = {
                mainStoreCode: data.MainCode,
                mainStoreName: data.MainName,
              };
        
              this._apim.createMainStore(Obj).subscribe((response) => {
                console.log(response);
                this._dialogRef.close();
              });
            } else {
              console.log('Form is invalid');
            }
  }
}
