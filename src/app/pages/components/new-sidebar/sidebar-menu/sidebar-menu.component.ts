import { Component, OnInit } from '@angular/core';
import { SubMenuItem } from '../../../models/menu.model';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent implements OnInit{
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  ngOnInit(): void {}
}
