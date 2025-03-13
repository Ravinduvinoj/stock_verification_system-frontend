import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { SubMenuItem } from '../../../../models/menu.model';

@Component({
  selector: 'app-navbar-mobile-menu',
  templateUrl: './navbar-mobile-menu.component.html',
  styleUrl: './navbar-mobile-menu.component.css'
})
export class NavbarMobileMenuComponent implements OnInit{
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {}
}
