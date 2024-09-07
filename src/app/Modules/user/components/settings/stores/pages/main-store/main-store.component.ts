import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMainStoreComponent } from './components/new-main-store/new-main-store.component';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrl: './main-store.component.css'
})
export class MainStoreComponent {
  constructor(public dialog: MatDialog,){

  }
createMainStore() {
this.dialog.open(NewMainStoreComponent)
}

}
