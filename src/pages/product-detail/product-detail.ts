import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { ImagesViewerPage } from '../images-viewer/images-viewer';
import { OfflineProvider } from '../../providers/offline/offline';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  info: any = '';

  slides = [
    {
      image: "assets/imgs/product.png",
    },
    {
      image: "assets/imgs/product.png",
    }
  ];

  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public offline: OfflineProvider) {
    var product_id = navParams.get('product_id');

    if (this.auth.isDisconnect==true) {
      
      this.offline.getProductDetail(product_id).then(res=>{

        this.info = res;
        console.log('this.info-------------------------', this.info);
      });

    } else {
      this.get_product_info(product_id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_product_info(product_id: any) {
    let Data = {
      product_id: { "value": product_id, "type": "NO" },
    }
    this.rest_api.postData(Data, 'product_detail').then((res: any) => {
      console.log(res);
      if (res.status = 1) {
        this.info = res.data;
      }
    })
  }


  openSlider(imgArr, index) {
    let profileModal = this.modalCtrl.create(ImagesViewerPage, { imgs: imgArr, index: index });
    profileModal.onDidDismiss(data => {
      if (data) {

      }
    });
    profileModal.present();
  }
}
