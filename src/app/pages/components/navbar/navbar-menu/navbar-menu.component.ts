import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { MenuItem } from '../../../models/menu.model';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.css'
})
export class NavbarMenuComponent implements OnInit, AfterViewInit {
  private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
  private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

  @ViewChild('submenuRef', { static: true }) submenuRef!: ElementRef<HTMLDivElement>;

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.submenuRef && this.submenuRef.nativeElement) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }

  public toggleMenu(menu: MenuItem): void {
    menu.selected = !menu.selected;
  }

  public mouseEnter(event: any): void {
    const element = event.target.querySelector('.submenu');
    if (element) {
      this.hideMenuClass.forEach((c) => element.classList.remove(c));
      this.showMenuClass.forEach((c) => element.classList.add(c));
    }
  }

  public mouseLeave(event: any): void {
    const element = event.target.querySelector('.submenu');
    if (element) {
      this.showMenuClass.forEach((c) => element.classList.remove(c));
      this.hideMenuClass.forEach((c) => element.classList.add(c));
    }
  }
}
