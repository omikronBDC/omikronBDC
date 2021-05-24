import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the SalesNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sales-note',
  templateUrl: 'sales-note.html',
})
export class SalesNotePage {
note:any = '';
info:any;

  constructor(public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, 
    public viewCtrl: ViewController) {
    this.info = navParams.get('data');
    this.note = this.info.note;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesNotePage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  submit() {
    let Data = {
      employee_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      visit_id:{"value":this.info.id,"type":"NO"},
      note:{"value":this.note,"type":"NOTE"},
    }
    this.rest_api.postData(Data,'mark_as_complete_visit').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.alertP.presentToast(res.message,'bottom');
        this.viewCtrl.dismiss(true);
        // this.alertP.showAsync('Success',res.message).then(() => {
        //   this.viewCtrl.dismiss(true);
        // })
      } else {
        this.alertP.show('Alerta',res.message);
      }
    })
  }

}
