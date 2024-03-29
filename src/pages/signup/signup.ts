import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MembershipPage } from '../membership/membership';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  member(){
    this.navCtrl.push(MembershipPage);
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
}
