import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
profile_info:any;

name:any = '';
email:any = '';
dob:any = '';
phone:any = '';
c_name:any = '';
gender:any = '';
region:any = ''; 
max = new Date().toISOString();

  constructor(public navCtrl: NavController,
  	public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.get_profile();  	
    console.log('ionViewDidLoad ProfileEditPage');
  }

  initilazedata() {
  	this.name = this.profile_info.name;
  	this.email = this.profile_info.email;
  	this.dob = this.profile_info.dob;
  	this.phone = this.profile_info.phone;
  	this.c_name = this.profile_info.company.company_name;
  	this.gender = this.profile_info.gender;
     var region = [];
    for(let i=0;i<this.profile_info.region.length;i++){
      region.push(this.profile_info.region[i].name+"  ");
    }
    this.region = region.join();
    console.log(this.region);
  }


  get_profile() {
    let Data = {
      id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postData(Data,'get_profile').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.profile_info = res.data;
        this.initilazedata();
      }
    })
  }

  update() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		name:{"value":this.name,"type":"FULLNAME"},
  		//email:{"value":this.email,"type":"NO"},
  		gender:{"value":this.gender,"type":"NO"},
  		dob:{"value":this.dob,"type":"NO"},
  		//phone :{"value":this.phone,"type":"NO"},
  		//company :{"value":this.c_name,"type":"NO"},
  	}
  	this.rest_api.postData(Data,'edit_profile').then((res:any) => {
  		console.log(res);
  		if(res.status==1){
  			this.alertP.showAsync('Éxito',res.message).then(() => {
  				this.auth.updateUserDetails(res.data);
  				this.navCtrl.pop();
  			})
  		}
  	})
  }

}
