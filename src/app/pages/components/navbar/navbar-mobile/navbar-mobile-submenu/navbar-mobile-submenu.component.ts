import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { SubMenuItem } from '../../../../models/menu.model';

@Component({
  selector: 'app-navbar-mobile-submenu',
  templateUrl: './navbar-mobile-submenu.component.html',
  styleUrl: './navbar-mobile-submenu.component.css'
})
export class NavbarMobileSubmenuComponent implements OnInit{
  @Input() public submenu = <SubMenuItem>{};

  constructor(private menuService: MenuService) {}

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

  public closeMobileMenu() {
    this.menuService.showMobileMenu = false;
  }
}
