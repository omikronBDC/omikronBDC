
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import { SignupPage } from '../signup/signup';
 import { ForgotPage } from '../forgot/forgot';
import { TabsPage } from '../tabs/tabs';
import { AddBusinessPage } from '../add-business/add-business';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
email:any = '';
pass:any = '';

  constructor(public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public event:Events,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }

  register() {
    this.navCtrl.push(SignupPage);
  }

  home() {
    this.navCtrl.push(TabsPage);
  }

  add() {
    this.navCtrl.push(AddBusinessPage);
  }

  forgotnew(){
    this.navCtrl.push(ForgotPasswordPage);
  }

  login() {
    let Data = {
      email:{"value":this.email,"type":"EMAIL"},
      password:{"value":this.pass,"type":"NO"},
    }
    this.rest_api.postData(Data,'login').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.auth.updateUserDetails(res.data);
        this.event.publish('login_success',true);
        if(res.data.login_status==1){
          this.navCtrl.setRoot(ForgotPage);
        } else {
          this.navCtrl.setRoot(TabsPage);
        }
      } else {
        this.alertP.show('Alerta',res.message);
      }
    })
  }
}
