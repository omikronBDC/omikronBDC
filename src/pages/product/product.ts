import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { OfflineProvider } from '../../providers/offline/offline';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  products: any = new Array();
  all_products: any = new Array();
  search_val:any;

  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public navParams: NavParams,
    public offline: OfflineProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  ionViewWillEnter() {
    if (this.auth.isDisconnect == true) {
      // this.products = this.offline.productList;
      this.offline.getproductlist().then(res => {
        console.log('product list --------',res);
        this.products = res;
      })
    } else {
      this.get_product_list();
    }
  }

  ionViewWillLeave() {
    this.search_val='';
  }

  detail(product: any) {
    this.navCtrl.push(ProductDetailPage, { product_id: product.id });
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_product_list() {
    let Data = {
      user_id: { "value": this.auth.getUserDetails().company.id, "type": "NO" },
    }
    this.rest_api.postData(Data, 'View_product_list').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.products = res.data;
        this.all_products = res.data;
        this.offline.updateProductList(this.products);
      }
    })
  }

  search(ev: any) {
    console.log(ev.value);
    var val = ev.value;
    if (val && val.trim()) {
        this.products = this.all_products.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      // this.get_product_list();
      this.products=this.all_products;
    }
  }

}
