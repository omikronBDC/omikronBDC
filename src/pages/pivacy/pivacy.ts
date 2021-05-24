import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the PivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pivacy',
  templateUrl: 'pivacy.html',
})
export class PivacyPage {

  html_content:any;

  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.get();
    console.log('ionViewDidLoad PivacyPage');
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }

  get() {
    let url = `privacy_policy`;
    this.restApi.get_withurl({},1,url).then((res:any) => {
      this.html_content=res.privacy_policy;
    })
  }
}
