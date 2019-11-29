import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Token} from '@angular/compiler';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Information} from './Information';
import {PassForm} from './PassForm';
import {Location} from '@angular/common';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  infor: Information;
  pass: PassForm;
  isError: true;
  error: string;
  returnUrl: string;
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    configPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });

  constructor(
    private token: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }
  goBack(): void {
      this.location.back();
  }
  ngOnInit() {
    this.infor = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      userId: this.token.getUserId(),
    };
  }

  updatePassword() {
    const {currentPassword, newPassword, configPassword} = this.passwordForm.value;
    if (newPassword !== configPassword) {
      this.isError = true;
      return this.error = 'Password config not match';
    }
    console.log(this.passwordForm.value);
    const formPass = new PassForm(this.infor.userId, this.infor.username, newPassword, currentPassword);
    console.log(formPass);
    this.authService.updatePassword(formPass).subscribe(
      result => {
        alert('Change password succesful.');

        this.router.navigateByUrl(this.returnUrl);
      }
    ),
      // tslint:disable-next-line:no-unused-expression
      error1 => {
        this.isError = true;
        this.error = 'Update fail';
        alert(this.error);
        // };
      };
  }
}
