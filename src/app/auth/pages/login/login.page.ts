import { Component, OnInit } from '@angular/core';
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

  isLoading = false;

  constructor(public auth: AuthService,
    public router: Router,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      const res = await this.auth.login(this.user.name, this.user.password);
      console.log(res);
      if (res.success === true) {
        // this.router.navigate(['home']);
      } else {
        // lets display error
        this.presentToast(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }

    this.isLoading = false;

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

}
