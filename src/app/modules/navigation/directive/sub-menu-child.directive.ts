import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSubMenuChild]'
})
export class SubMenuChildDirective {
  @HostBinding('style.display') private display = 'none';

  public switchDisplay(isOpen: boolean) {
    if (isOpen) {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  constructor() {}
}
