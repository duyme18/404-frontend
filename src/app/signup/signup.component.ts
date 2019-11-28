import { Component, OnInit } from '@angular/core';
import {AuthLoginInfo} from '../auth/login-infor';
import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: any = {};
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        this.roles = this.tokenStorage.getAuthorities();
        // this.ngOnInit();
        // this.reloadPage();
        // this.router.navigate(['/widget']);
        this.router.navigateByUrl('/home-list', {skipLocationChange: true}).then(() => {
          this.router.navigate(['Your actualComponent']);
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }


  reloadPage() {
    window.location.reload();
  }
}
