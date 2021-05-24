import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewsDetailPage } from '../news-detail/news-detail';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { OfflineProvider } from '../../providers/offline/offline';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  news: any = new Array();

  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public navParams: NavParams,
    public offline: OfflineProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  ionViewWillEnter() {
    console.log('this.auth.isDisconnect----------------', this.auth.isDisconnect);

    if (this.auth.isDisconnect == true) {
      this.offline.getnewslist().then((res) => {
        this.news = res
      })
      console.log('News list when net is disconnectd',this.news);

    } else {
      this.get_news();
    }
  }

  details(item: any) {
    this.navCtrl.push(NewsDetailPage, { news_id: item.id });
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_news() {
    let data =
    {
      company_id: { 'value': this.auth.getUserDetails().company.id, "type": 'NO' },
    }
    let url = `news_list`;
    this.rest_api.postData(data, url).then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.news = res.data;
        this.offline.updateNewsList(this.news);
      }
    })
  }

}
