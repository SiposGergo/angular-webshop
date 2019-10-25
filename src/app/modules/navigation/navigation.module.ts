import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SubMenuDirective } from './directive/sub-menu.directive';
import { SubMenuChildDirective } from './directive/sub-menu-child.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxsModule } from '@ngxs/store';
import { NavigationState } from './state/navigation.state';

@NgModule({
  declarations: [NavigationComponent, SubMenuDirective, SubMenuChildDirective],
  exports: [NavigationComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule,
    NgxsModule.forFeature([NavigationState])
  ]
})
export class NavigationModule {}
