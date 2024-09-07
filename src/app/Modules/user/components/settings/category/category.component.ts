import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from './components/new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(public dialog: MatDialog,){

  }
createCategory() {
this.dialog.open(NewCategoryComponent)
}

}
