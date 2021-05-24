import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { OfflineProvider } from '../../providers/offline/offline';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const sumTotal = arr =>
  arr.reduce((sum, { item_price, item_qty }) => sum + Number(item_price) * Number(item_qty), 0);
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order_id: any;
  order_info: any;
  orders: any = new Array();
  visit_data: any = new Array();
  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public navParams: NavParams,
    public offline: OfflineProvider) {
    this.order_id = navParams.data.data;
    var visit = navParams.data.item || 0;
    if (visit != 0) {
      this.visit_data.push(visit);
    }
    //this.order_id = data.order_history[0].order_id;
    console.log(this.visit_data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');

    if (this.auth.isDisconnect == true) {
      this.offline.get_order_detail(this.order_id).then((res) => {
        this.orders = res;
        console.log('this.orders orders-------------------------', this.orders);
      });
    } else {
      this.get_order_info(this.order_id);
    }
  }

  get_order_info(order_id: any) {
    let Data = {
      order_id: { "value": order_id, "type": "NO" }
    }
    this.rest_api.postData(Data, 'order_history_byId').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.orders = res.data.order_history;
        // for(let i=0;i<this.orders.length;i++){
        //   for(let j=0;j<this.orders[i].order_item.length;j++){
        //     this.orders[i].total_cost = sumTotal(this.orders[i].order_item[j].items);
        //     }
        // }
      }
    })
  }


}
