import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { OfflineProvider } from '../../providers/offline/offline';


@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
news_id:any
info:any = '';
  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams,
    public offline:OfflineProvider) {
    this.news_id = navParams.data.news_id;

      
    if (this.auth.isDisconnect==true) {
      this.offline.getNewsDetail(this.news_id).then((res)=>{
        this.info=res;
        console.log('this.info newss-------------------------', this.info);
      });
    } else {
      this.get_news_detail();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }

 notify(){
   this.navCtrl.push(NotificationsPage);
 }

 get_news_detail() {
   let url = `news_detail?id=${this.news_id}`;
   this.rest_api.get_withurl({},0,url).then((res:any) => {
     console.log(res);
     if(res.status == 1){
      this.info = res.data;
     }
   })
 }

}
