import {Component, OnInit} from '@angular/core';
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
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  private info: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      id: this.tokenStorage.getUserId()
    };

    console.log(this.info);
  }

  onSubmit() {

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveId(data.id);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.tokenStorage.getUserId(), this.tokenStorage.getToken(), this.tokenStorage.getUsername());
        this.router.navigate(['/']).then(r => {
          console.log('success to navigate');
        });
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
