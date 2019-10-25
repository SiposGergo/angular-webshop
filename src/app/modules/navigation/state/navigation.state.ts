import { Action, Selector, State } from '@ngxs/store';
import { NavigationStateInterface } from './navigation-state.interface';
import { SubmenuClickedAction } from './action/submenu-clicked.action';

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

  @Action(SubmenuClickedAction)
  setOpenedSubmenu({ setState, getState }, { openedSubMenu }) {
    if (getState().openedSubMenu === openedSubMenu) {
      setState({ openedSubMenu: undefined });
    } else {
      setState({ openedSubMenu });
    }
  }
}
