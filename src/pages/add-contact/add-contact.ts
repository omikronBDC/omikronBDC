import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
/**
 * Generated class for the AddContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {
client_info:any;
name:any = '';
phone:any = '';

  constructor(public navCtrl: NavController, 
  	public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, 
    public view: ViewController) {
  	this.client_info = navParams.get('data');
  	console.log(this.client_info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactPage');
  }

   closemodal(){
    this.view.dismiss();
  }

  add() {
  	let Data = {
  		client_id:{"value":this.client_info.id,"type":"NO"},
  		name:{"value":this.name,"type":"PNAME"},
  		phone:{"value":this.phone,"type":"PPHONE"},
  	}
  	this.rest_api.postData(Data,'add_client_another_phone').then((res:any) => {
  		console.log(res);
  		if(res.status==1){
			  this.alertP.presentToast(res.message,'bottom');
			  this.view.dismiss(true);
  			// this.alertP.showAsync('Success',res.message).then(() => {
  			// 	this.view.dismiss(true);
  			// })
  		} else {
  			this.alertP.show('Alerta',res.message);
  		}
  	})
  }

}
