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
import { SubmenuClickedAction } from '../state/action/submenu-clicked.action';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NavigationStateInterface } from '../state/navigation-state.interface';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  selector: '[appSubMenu]'
})
export class SubMenuDirective implements AfterContentInit, OnDestroy {
  @Input('appSubMenu') submenuName: string;
  @ContentChild('submenuIcon') submenuIcon: ElementRef<any>;
  @ContentChild('subMenuParent') subMenuParent: MatListItem;
  @ContentChildren(SubMenuChildDirective) children: QueryList<SubMenuChildDirective>;

  @Select(NavigationState)
  openedSubMenu$: Observable<NavigationStateInterface>;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngAfterContentInit(): void {
    this.openedSubMenu$
      .pipe(
        untilDestroyed(this),
        map(navigationState => navigationState.openedSubMenu === this.submenuName),
        distinctUntilChanged()
      )
      .subscribe(isOpen => {
        this.submenuIcon.nativeElement.className = `fa fa-chevron-${isOpen ? 'up' : 'down'}`;
        this.children.forEach(child => child.switchDisplay(isOpen));
      });

    this.renderer.listen(this.subMenuParent._getHostElement(), 'click', () => {
      this.store.dispatch(new SubmenuClickedAction(this.submenuName));
    });
  }

  ngOnDestroy(): void {}
}
