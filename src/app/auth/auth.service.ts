import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from './login-infor';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignUpInfo} from './sigup-info';
import {Router} from '@angular/router';

import {PassForm} from '../change-pass/PassForm';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private signupUrl = 'http://localhost:8080/api/auth/signup';

  private updatePasswordUrl: 'http://localhost:8080/api/auth/update-password';
  constructor(private http: HttpClient
  ) {


  constructor(private http: HttpClient) {

  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  updatePassword(passwordForm: PassForm): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/auth/update-password' + '/' + passwordForm.userId , passwordForm);
  }

}
