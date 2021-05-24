import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { OrderDetailPage } from '../order-detail/order-detail';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const sumTotal = arr =>
  arr.reduce((sum, { item_price, item_qty }) => sum + Number(item_price) * Number(item_qty), 0);
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  typ = "Plan";
  gaming: string = "n64";
  profile_info: any = '';

  order_Date: any;
  order_month: any;
  order_year: any;

  visit_Date: any;
  visit_month: any;
  visit_year: any;

  order_histories: any = new Array();
  visit_histories: any = new Array();

  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.get_order_history();
    this.get_visit_history();
    this.get_profile();
    console.log('ionViewDidLoad ProfilePage');
  }

  setting() {
    this.navCtrl.push(SettingsPage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_profile() {
    let Data = {
      id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData(Data, 'get_profile').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.profile_info = res.data;
      }
    })
  }

  edit() {
    this.navCtrl.push(ProfileEditPage);
  }

  calling(number: any) {
    this.auth.CallingFeature(number);
  }

  order_dateChange(type) {
    console.log(this.order_Date);
    let Data = {
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }

    if (type == 'date' && this.order_Date) {
      Data['date'] = { "value": this.order_Date, "type": "NO" };
      this.order_month = '';
      this.order_year = '';
      this.rest_api.postData(Data, 'order_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.order_histories = res.data.order_history;
        } else {
          this.order_histories = new Array();
        }
      })
    } else if (type == 'month' && this.order_month) {
      Data['month'] = { "value": this.order_month, "type": "NO" };
      this.order_Date = '';
      this.order_year = '';
      this.rest_api.postData(Data, 'order_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.order_histories = res.data.order_history;
        } else {
          this.order_histories = new Array();
        }
      })
    } else if (type == 'year' && this.order_year) {
      Data['year'] = { "value": this.order_year, "type": "NO" };
      this.order_month = '';
      this.order_Date = '';
      this.rest_api.postData(Data, 'order_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.order_histories = res.data.order_history;
        } else {
          this.order_histories = new Array();
        }
      })
    } else {
     this.order_month = '';
      this.order_Date = '';
      this.order_year = '';
      this.rest_api.postData_withoutLoder(Data, 'order_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.order_histories = res.data.order_history;
        } else {
          this.order_histories = new Array();
        }
      })
    }


    // this.rest_api.postData_withoutLoder(Data, 'order_history').then((res: any) => {
    //   console.log(res);
    //   if (res.status == 1) {
    //     this.order_histories = res.data.order_history;
    //     // for(let i=0;i<this.order_histories.length;i++){
    //     //   for(let j=0;j<this.order_histories[i].order_item.length;j++){
    //     //   this.order_histories[i].total_cost = sumTotal(this.order_histories[i].order_item[j].items);
    //     //   }
    //     // }
    //   } else {
    //     this.order_histories = new Array();
    //   }
    // })
  }

  visit_dateChange(type) {
    console.log('Visit Chnage Fired');

    let Data = {
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    if (type == 'date' && this.visit_Date) {
      Data['date'] = { "value": this.visit_Date, "type": "NO" };
      this.visit_month = '';
      this.visit_year = '';
      this.rest_api.postData(Data, 'visit_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.visit_histories = res.data;
        } else {
          this.visit_histories = new Array();
        }
      })
    } else if (type == 'month' && this.visit_month) {
      Data['month'] = { "value": this.visit_month, "type": "NO" };
      this.visit_Date = '';
      this.visit_year = '';
      this.rest_api.postData(Data, 'visit_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.visit_histories = res.data;
        } else {
          this.visit_histories = new Array();
        }
      })
    } else if (type == 'year' && this.visit_year) {
      Data['year'] = { "value": this.visit_year, "type": "NO" };
      this.visit_month = '';
      this.visit_Date = '';
      this.rest_api.postData(Data, 'visit_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.visit_histories = res.data;
        } else {
          this.visit_histories = new Array();
        }
      })
    } else {
      this.visit_year= '';
      this.visit_month = '';
      this.visit_Date = '';
      this.rest_api.postData_withoutLoder(Data, 'visit_history').then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.visit_histories = res.data;
        } else {
          this.visit_histories = new Array();
        }
      })
    }



  }

  get_order_history() {
    let Data = {
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData_withoutLoder(Data, 'order_history').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.order_histories = res.data.order_history;
        // for(let i=0;i<this.order_histories.length;i++){
        //   for(let j=0;j<this.order_histories[i].order_item.length;j++){
        //   this.order_histories[i].total_cost = sumTotal(this.order_histories[i].order_item[j].items);
        //   }
        // }
      } else {
        this.order_histories = new Array();
      }
    })
  }

  get_visit_history() {
    let Data = {
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData_withoutLoder(Data, 'visit_history').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.visit_histories = res.data;
        // for(let i=0;i<res.data.length;i++){
        //   if(res.data[i].order_history){
        //     for(let j=0;j<res.data[i].order_history.length;j++){
        //       this.visit_histories.push(res.data[i].order_history[j]);
        //      }
        //   }       
        // }
        // console.log(this.visit_histories);
        // setTimeout(() => {
        //   for(let i=0;i<this.visit_histories.length;i++){
        //     if(this.visit_histories[i].order_item){
        //       for(let j=0;j<this.visit_histories[i].order_item.length;j++){
        //         this.visit_histories[i].total_cost = sumTotal(this.visit_histories[i].order_item[j].items);
        //         }
        //     }          
        //   }
        //  },700);
      } else {
        this.visit_histories = new Array();
      }
    })
  }

  visit_detail(order_id: any, item: any) {
    console.log(order_id);
    this.navCtrl.push(OrderDetailPage, { data: order_id, item: item });
  }

  new_visit_detail() {
    alert('coming soon.');
  }

}
