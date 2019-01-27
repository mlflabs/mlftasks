import { Component, OnInit, ApplicationRef, ViewChild, ElementRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user = {
    name: '',
    password: ''
  };

  private _isLoading = false;
  public get isLoading() {
    return this._isLoading;
  }
  public set isLoading(value) {
    this._isLoading = value;
    this.app.tick();
  }

  @ViewChild('inputName') inputName;
  @ViewChild('inputPassword') inputPassword;

  constructor(public auth: AuthService,
    public router: Router,
    public app: ApplicationRef,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      const res = await this.auth.login(this.user.name, this.user.password);
      console.log(res);
      this.isLoading = false;
      if (res.success === true) {
        // this.router.navigate(['home']);
      } else {
        // lets display error
        if(res.data.message){
          this.presentToast(res.data.message);
        }
        else if(res.data.errors){
          // just display the first message
          res.data.errors.forEach(err => {
            this.presentToast(err.msg);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    console.log('Cancel is Loading');
    this.isLoading = false;
    setTimeout(()=>{
      this.app.tick();
      console.log('App tick()');
    },100);
  }

  forgotPassword(){
    this.router.navigate(['forgotPassword']);
  }

  register(){
    this.router.navigate(['register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  keyPressNameInput(event){
    if(event.code === 'Enter'){
      this.inputPassword.setFocus();
    }
  }

  keyPressPasswordInput(event){
    if(event.code === 'Enter'){
      this.onSubmit();
    }
  }

}
