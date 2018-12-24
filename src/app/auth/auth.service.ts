import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { isEqual } from 'lodash';

// export const AUTH_TOKEN_KEY = 'auth-token';
// export const AUTH_TOKEN_EXP = 'auth-token-exp';
// export const AUTH_USERNAME_KEY = 'auth-username';
// export const AUTH_USER_EMAIL_KEY = 'auth-email';
export const AUTH_USER_KEY = 'auth-user-key';

export interface AuthEvent {
  success: boolean;
  code: number;
  data: any;
}

export function createAuthEvent(success: boolean = true,
  code = 1,
  data = {}): AuthEvent {
  return {
    success, code, data
  };
}

export interface UserModel {
  username?: string;
  email?: string;
  token?: string;
  token_expiery?: string;
}

export function guestUser() {
  return { username: 'Guest', email: null, token: null, token_expiery: null};
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;
  public isAuthenticated$  = new BehaviorSubject(false);
  public user$ = new BehaviorSubject<UserModel>(guestUser());
  public user: UserModel = guestUser();

  constructor(private storage: Storage,
              public http: HttpClient,
              private plt: Platform) {
    this.plt.ready().then(async () => {
      if( await this.checkLogin())
        this.renewToken();// renew token only if we have saved credentials
    });

    this.isAuthenticated = false;
    this.isAuthenticated$.next(false);
  }

  async getUsername(){
    return this.user.username;
  }

  async getEmail(){
    return this.user.email;
  }

  updateUser(user = null, force = false){
    console.log('Userupdate');
    if(user != null){
      if(!isEqual(this.user, user)){
        this.user = user;
        this.user$.next(user);
      }
      if(!isEqual(this.isAuthenticated, true)){
        this.isAuthenticated = true;
        this.isAuthenticated$.next(true);
      }
      return;
    }

    if(!this.isAuthenticated && !force) return;

    this.user = guestUser();
    this.user$.next(this.user);
    this.isAuthenticated = false;
    this.isAuthenticated$.next(false);

  }

  async checkLogin(){
    console.log('Check login');
    try{
      const userstring = await this.storage.get(AUTH_USER_KEY);
      const user = JSON.parse(userstring);
      // console.log('User: ', user);
      if(!user){
        // this.logout();
        return;
      }

      if(!user.token){
        // this.logout();
        return;
      }

      console.log('LOADED UER', user);

      const exp = moment.unix(user.token_expiery);
      if(exp.isAfter(moment.now())){
        console.log('TOKEN VALID');
        this.updateUser(user);
        return user;
      }
      else{
        console.log('TOKEN is old');
        this.updateUser();
      }
      return false;
    }
    catch(e){
      console.log(e);
      return false;
    }
  }

  async renewToken(token: string = null) {
    console.log('Renew token');
    try {
      if (token === null) {
        token = this.user.token;
        console.log('Token: ', token, this.user);
        if(!token){
          // we have no token, lets just logout and request a login
          // await this.logout();
          console.log('No token, exiting');
          return;
        }
      }

      console.log('Got Token, lets see if its expired');

      const res = await this.http.post(environment.auth_api+'/auth/renewJWT',
      {token: token}, {}).toPromise();

      console.log('RenewToken:  ', res);
      this.saveCredentials(res);
        //const user = await this.saveCredentials(res);
        //console.log('Login res: ', res, user);
        //return createAuthEvent(true, 1, user);


      //TODO renew token here

      // const authEvent = await this.feathers.renewJWT(token);

      // if(authEvent.success){
      //  const user = await this.saveCredentials(authEvent.data);
     // }
      // else{
       // console.log('Failed to renew token:: ', authEvent);
        // await this.logout();
      // }

      /// const user = await this.saveCredentials(res.accessToken);

      // console.log('Successful JWT login: ', user);
    } catch (err) {
      console.log(err);
    }
  }




  async forgotPassword(id: string): Promise<any> {
    try {
      const res = await this.http.post(environment.auth_api+'/auth/forgotpassword',
      {
          strategy: 'local',
          id: id,
      }, {}).toPromise();

      console.log('Forgot pass res: ', res);
      return createAuthEvent(true, 1, res);

    } catch (err) {
        console.log('Login Error: ', err);
        return createAuthEvent(false, err.error.code, err.error);
        // TODO, need to figure out what error codes we will receive
    }
  }

  async login(name: string, password: string, strategy: string = 'local'): Promise<any> {
    try {
      const res = await this.http.post(environment.auth_api+'/auth/login',
      {
          strategy: 'local',
          id: name,
          password: password
      }, {}).toPromise();
      const user = await this.saveCredentials(res);
      console.log('Login res: ', res, user);
      return createAuthEvent(true, 1, user);

    } catch (err) {
        console.log('Login Error: ', err);
        return createAuthEvent(false, err.error.code, err.error);
        // TODO, need to figure out what error codes we will receive
    }
  }

  async saveCredentials(value):Promise<UserModel> {

    console.log('Save Credentials:: ', value);
    const  user = {
      username: value.username,
      email: value.email,
      token: value.token,
      token_expiery: value.expires
    };

    await this.storage.set(AUTH_USER_KEY, JSON.stringify(user));
    this.updateUser(user);
    return user;

  }

  async logout() {
    // this.feathers.logout();
    await this.storage.remove(AUTH_USER_KEY);

    this.updateUser(null, true);
  }



  async register(credentials): Promise<AuthEvent> {
    try {
      const res = await this.http.post(environment.auth_api+'/auth/register',
        {
          strategy: 'local',
          email: credentials.email,
          password: credentials.password,
          username: credentials.username
        }, {}).toPromise();
      // const user = await this.saveCredentials('test', true);
      console.log('Login res: ', res);
      return createAuthEvent(true, 1, res);

    } catch (err) {

        console.log(err, err.status);
        return createAuthEvent(false, err.status, err.error);
        // TODO, need to figure out what error codes we will receive
    }

  }





/*
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
*/
}
