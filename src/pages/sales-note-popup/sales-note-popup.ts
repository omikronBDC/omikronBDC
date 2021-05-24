import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
/**
 * Generated class for the SalesNotePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sales-note-popup',
  templateUrl: 'sales-note-popup.html',
})
export class SalesNotePopupPage {
client:any;
note:any = '';
  constructor(public navCtrl: NavController,
   public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public viewCtrl:ViewController, 
  	public navParams: NavParams) {
  	var data = navParams.data.data;
    this.client = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesNotePopupPage');
  }

  send_note() {
    if(!this.note&&this.note.trim() != ''){
      this.alertP.show('Nota invalida', 'introduce una nota por favor');
      return;
    }
    let Data = {
      emp_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      company_id:{"value":this.auth.getUserDetails().company.id,"type":"NO"},
      client_id:{"value":this.client.id,"type":"NO"},
      note:{"value":this.note.trim(),"type":"NOTE"},
    }
    this.rest_api.postData(Data,'slaesnote').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.note = '';
        this.viewCtrl.dismiss();
        // this.alertP.showAsync('Success',res.message).then(() => {

        // })
      }
    })
  }

  closemodal() {
  	this.viewCtrl.dismiss();
  }

}
