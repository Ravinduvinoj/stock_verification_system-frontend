import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.css'
})
export class NavbarMobileComponent implements OnInit{
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }
}
