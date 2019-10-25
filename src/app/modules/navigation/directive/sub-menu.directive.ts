import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  Renderer2
} from '@angular/core';
import { SubMenuChildDirective } from './sub-menu-child.directive';
import { MatListItem } from '@angular/material/list';
import { NavigationState } from '../state/navigation.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { isTrue } from '../../../../utils/type-guard/is-true';
import { SetOpenedSubmenuAction } from '../state/action/set-opened-submenu.action';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NavigationStateInterface } from '../state/navigation-state.interface';

@Directive({
  selector: '[appSubMenu]'
})
export class SubMenuDirective implements AfterContentInit, OnDestroy {
  isOpen = false;

  @Input('appSubMenu') submenuName: string;
  @ContentChild('submenuIcon') submenuIcon: ElementRef<any>;
  @ContentChild('subMenuParent') subMenuParent: MatListItem;
  @ContentChildren(SubMenuChildDirective) children: QueryList<SubMenuChildDirective>;

  @Select(NavigationState)
  openedSubMenu: Observable<NavigationStateInterface>;

  constructor(private renderer: Renderer2, private store: Store) {
    this.openedSubMenu.pipe(untilDestroyed(this)).subscribe(({ openedSubMenu }) => {
      console.log(`Ez: ${this.submenuName}, aktivált:${openedSubMenu}`);
      if (openedSubMenu !== this.submenuName && this.isOpen) {
        console.log('zárom:', this.submenuName);
        this.isOpen = false;
        this.setClass();
        this.setDisplay();
      }
    });
  }

  ngAfterContentInit(): void {
    this.renderer.listen(this.subMenuParent._getHostElement(), 'click', () => {
      this.isOpen = !this.isOpen;
      if (isTrue(this.isOpen)) {
        this.store.dispatch(new SetOpenedSubmenuAction(this.submenuName));
      }
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

  ngOnDestroy(): void {}
}
