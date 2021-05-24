import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
email:any = '';

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  login(){
    this.navCtrl.pop();
  }

  submit() {
    let Data = {
      email:{"value":this.email,"type":"EMAIL"}
    }
    this.rest_api.postData(Data,'forget_password').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.alertP.showAsync('Exito',res.message).then(() => {
          this.navCtrl.pop();
        })
      } else {
        this.alertP.showAsync('Alerta',res.message).then(() => {
          this.email = '';
        })
      }
    })
  }

}
