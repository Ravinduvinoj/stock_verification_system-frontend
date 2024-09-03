import { Component } from '@angular/core';
import { adminData } from './side-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  showFiller = false;
  navData: any =adminData;
  

  toggleDropdown(item: any) {
    item.showChildren = !item.showChildren;
  }
}
