import { Component } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { LoginPage } from '../login/login';
import { NotificationsPage } from '../notifications/notifications';
import { PivacyPage } from '../pivacy/pivacy';
import { ProfilePage } from '../profile/profile';
import { TermsPage } from '../terms/terms';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, public nav: Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  profile(){
    this.navCtrl.pop();
  }
  privacy(){
    this.navCtrl.push(PivacyPage);
  }
  about(){
    this.navCtrl.push(AboutPage);
  }
  terms(){
    this.navCtrl.push(TermsPage);
  }
  change(){
    this.navCtrl.push(ChangepasswordPage);
  }

  login(){
    this.nav.push(LoginPage);
  }

  notify(){
    this.navCtrl.push(NotificationsPage);
  }

  logout() {
    this.alertP.confirm('Salir',"¿Seguro de salir?").then((data) => {
      if(data) {
        this.auth.removeAllSessions();
        this.navCtrl.setRoot(LoginPage);
        window.location.href = "";
      }
    })
  }

}
