import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  new_pass:any ='';
  c_pass:any ='';

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public AlertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

  skip(){
    this.navCtrl.setRoot(TabsPage);
  }

  submit() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      password:{"value":this.new_pass,"type":"NPASS"},
      confirmP:{"value":this.c_pass,"type":"CONFP"},
    }
    this.rest_api.postData(Data,'update_password').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.AlertP.showAsync('Exito',res.message).then(() => {
          this.navCtrl.setRoot(TabsPage);
        })
      }
    })
  }


}
