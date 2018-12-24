import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  isLoading = false;
  errors = '';
  public user = {
    name: '',
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
      const res = await this.auth.forgotPassword(this.user.name);
      console.log('ForgotPAssword submit: ', res);
      if(res.data.message)
        this.presentToast(res.data.message);
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
