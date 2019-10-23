import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '../../../../utils/class/form-group';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameControl = new FormControl(undefined, Validators.required);
  passwordControl = new FormControl(undefined, Validators.required);
  loginForm = new FormGroup({ userName: this.userNameControl, password: this.passwordControl });

  constructor() {}

  ngOnInit() {}

  login() {
    this.loginForm.submitted = true;
  }
}
