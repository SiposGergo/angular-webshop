export class SubmenuClickedAction {
  static type = '[Navigation] set opened submenu';
  constructor(private openedSubMenu: string | undefined) {}
}
