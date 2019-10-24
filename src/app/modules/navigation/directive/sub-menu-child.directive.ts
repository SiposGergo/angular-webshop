import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSubMenuChild]'
})
export class SubMenuChildDirective {
  @HostBinding('style.display') private display = 'none';

  public switchDisplay() {
    if (this.display === 'none') {
      this.display = 'block';
    } else {
      this.display = 'none';
    }
  }

  constructor() {}
}
