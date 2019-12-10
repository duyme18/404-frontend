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
  errorMessage = '';
  roles: string[] = [];
  id: any;
  loginInfo: AuthLoginInfo;
  info: any;
  isLoggedIn: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      id: this.tokenStorage.getUserId()
    };
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
        this.roles = this.tokenStorage.getAuthorities();

        this.tokenStorage.saveUserId(data.id);
        this.id = this.tokenStorage.getUserId();
        // this.ngOnInit();
        // this.reloadPage();
        // this.router.navigate(['/widget']);
        this.router.navigateByUrl('/home-list', {skipLocationChange: true}).then(() => {
            this.router.navigate(['Your actualComponent']);

            console.log(this.tokenStorage.getUserId(), this.tokenStorage.getToken(), this.tokenStorage.getUsername());
            this.router.navigate(['/']).then(r => {
              console.log('success to navigate');

            });
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            alert('The username or password is incorrect!');
          }
        );
      }, error => {
        console.log(error);
        this.errorMessage = error.error.message;
        alert('The username or password is incorrect!');
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
