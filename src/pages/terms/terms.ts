import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  html_content:any;

  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.get();
    console.log('ionViewDidLoad PivacyPage');
  }

  get() {
    let url = `terms_condition`;
    this.restApi.get_withurl({},1,url).then((res:any) => {
      this.html_content=res.terms_condition;
    })
  }

}
