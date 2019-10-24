import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../utils/class/form-group';
import { AuthService } from '../../auth/auth.service';
import { UserInterface } from '../../auth/model/user.interface';
import { LoginAction } from '../../auth/state/actions/login.action';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  userNameControl = new FormControl(undefined, Validators.required);
  passwordControl = new FormControl(undefined, Validators.required);
  loginForm = new FormGroup({ userName: this.userNameControl, password: this.passwordControl });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  login() {
    this.loginForm.submitted = true;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.authenticate(this.loginForm.value).subscribe(
        (user: UserInterface) => {
          this.isLoading = false;
          this.store
            .dispatch(new LoginAction(user))
            .pipe(untilDestroyed(this))
            .subscribe(() => this.router.navigate(['']));
        },
        () => {
          this.isLoading = false;
          this.matSnackBar.open('Érvénytelen felahsználónév vagy jelszó', 'Bezárás', { duration: 5000 });
        }
      );
    }
  }

  ngOnDestroy(): void {}
}
