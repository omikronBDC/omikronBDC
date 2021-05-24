import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

old_pass:any = '';
new_pass:any = '';
c_pass:any = '';

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
   public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }


  profile(){
    this.navCtrl.push(ProfilePage);
  }


  update() {
    let Data = {
      current_password:{"value":this.old_pass,"type":"PASSW"}, 
      password:{"value":this.new_pass,"type":"NPASS"}, 
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      confirmP:{"value":this.c_pass,"type":"CONFP"}, 
    }
    this.rest_api.postData(Data,'change_password').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.alertP.showAsync('Exito',res.message).then(() => {
          this.navCtrl.pop();
        })
      } else {
        this.alertP.show('Alerta',res.message);
      }
    })
  }


}
