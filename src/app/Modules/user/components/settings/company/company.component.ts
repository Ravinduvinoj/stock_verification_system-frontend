import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewComComponent } from './components/new-com/new-com.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{
constructor(public dialog: MatDialog,){

}

ngOnInit(): void {

}
createCom() {
this.dialog.open(NewComComponent)
}
exportExcel() {

}

}
