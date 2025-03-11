import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { SubMenuItem } from '../../../models/menu.model';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrl: './sidebar-submenu.component.css'
})
export class SidebarSubmenuComponent implements OnInit{
  @Input() public submenu = <SubMenuItem>{};

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
