export class SetOpenedSubmenuAction {
  static type = '[Navigation] set opened submenu';
  constructor(private openedSubMenu: string) {}
}
