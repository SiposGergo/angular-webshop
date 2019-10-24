import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  Renderer2
} from '@angular/core';
import { SubMenuChildDirective } from './sub-menu-child.directive';
import { MatListItem } from '@angular/material/list';

@Directive({
  selector: '[appSubMenu]'
})
export class SubMenuDirective implements AfterContentInit {
  isOpen = false;

  @ContentChild('submenuIcon') submenuIcon: ElementRef<any>;
  @ContentChild('subMenuParent') subMenuParent: MatListItem;
  @ContentChildren(SubMenuChildDirective) children: QueryList<SubMenuChildDirective>;

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    this.renderer.listen(this.subMenuParent._getHostElement(), 'click', () => {
      this.isOpen = !this.isOpen;
      this.setClass();
      this.setDisplay();
    });
    this.setClass();
  }

  private setDisplay() {
    this.children.forEach(child => child.switchDisplay());
  }

  private setClass() {
    this.submenuIcon.nativeElement.className = `fa fa-chevron-${this.isOpen ? 'up' : 'down'}`;
  }
}
