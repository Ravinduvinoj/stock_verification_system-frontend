import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrl: './new-sidebar.component.css'
})
export class NewSidebarComponent implements OnInit{
   public appJson: any = packageJson;

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
