import { Action, Selector, State } from '@ngxs/store';
import { NavigationStateInterface } from './navigation-state.interface';
import { SetOpenedSubmenuAction } from './action/set-opened-submenu.action';

@State<NavigationStateInterface>({
  name: 'navigation',
  defaults: {
    openedSubMenu: undefined
  }
})
export class NavigationState {
  @Selector() static openedSubMenu(state: NavigationStateInterface) {
    return state.openedSubMenu;
  }

  @Action(SetOpenedSubmenuAction)
  setOpenedSubmenu({ setState }, { openedSubMenu }) {
    setState({ openedSubMenu });
  }
}
