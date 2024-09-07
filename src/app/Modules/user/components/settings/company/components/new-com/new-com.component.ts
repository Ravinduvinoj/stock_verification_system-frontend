import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-com',
  templateUrl: './new-com.component.html',
  styleUrl: './new-com.component.css'
})
export class NewComComponent implements OnInit{

  constructor(
    private _dialogRef: MatDialogRef<NewComComponent>,
  ){

  }
ngOnInit(): void {
 
}


form!: FormGroup;
onPostAdd() {

}

}
