import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoading = false;
  errors = '';
  public user = {
    username: '',
    email: '',
    password: ''
  };


  constructor(public auth: AuthService,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public toastController: ToastController) {

  }

  ngOnInit() {
  }

  async onSubmit() {
    this.isLoading = true;
    this.errors = '';
    try {
      const res = await this.auth.register(this.user);
      console.log('Register submit: ', res);
      if (res.success === true) {
        // now lets login
        // this.presentToast('User created, now authenticating.');
        const loginRes = await this.auth.login(this.user.email, this.user.password);
        console.log('register page, login: ', loginRes);
        // this.router.navigate(['home']);
      } else {
        // lets display error
        let msg = '';
        res.data.errors.forEach(e => {
          msg += e.msg + '. ';
        });
        this.errors = msg;
        console.log(this.errors);
        // this.presentToast(msg);
      }
    } catch (err) {
      console.log('register page ts, register, err', err);
    }

    this.isLoading = false;
    this.cdr.detectChanges();
  }

  login(){
    this.router.navigate(['login']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
