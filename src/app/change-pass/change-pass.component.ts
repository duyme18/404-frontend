import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Token} from '@angular/compiler';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {Information} from './Information';
import {PassForm} from './PassForm';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  infor: Information;
  isError: true;
  error: string;
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    configPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });
  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.infor = {
      name: this.token.getUsername(),
      token: this.token.getToken(),
      username: this.token.getToken(),
      role: this.token.getAuthorities(),
      userId: this.token.getUserId(),
      email: this.token.getUsername(),
    };
  }
  updatePassword() {
    const{currentPassword, newPassword, configPassword} = this.passwordForm.value;
    if (newPassword !== configPassword) {
      this.isError = true;
      return this.error = 'Password config not match';
    }
    const formPass = new PassForm(this.infor.userId, this.infor.name, currentPassword, newPassword);
    this.authService.updatePassword(formPass).subscribe(
      result => {
        alert('Change password succesful.');
      }
    ),
      // tslint:disable-next-line:no-unused-expression
        error1 => {
      this.isError = true;
      this.error = 'Update fail';
      alert(this.error);
    };
  }
}
