import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlaceorderPage } from '../placeorder/placeorder';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { ImageProvider } from './../../providers/image/image';
/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const sumTotal = arr =>
arr.reduce((sum, { price, qty ,unit}) => sum + Number(price) * Number(qty) *  Number(unit), 0);

@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {
  products:any = new Array();
visit_data:any;
client:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public veiwCtrl:ViewController, 
    public modalCtrl: ModalController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public ImageP:ImageProvider,
    public alertP:AlertProvider,) {
      this.visit_data = navParams.data.visit_data;
      this.client = navParams.data.client;
  }

  place() {
    let product:any = [];
    for(let i=0;i<this.products.length;i++){
      for(let j=0;j<this.products[i].product_venter.length;j++){
        if(this.products[i].product_venter[j].qty > 0){
          // this.products[i].product_venter[j]["product_id"]=this.products[i].id;
          product.push(this.products[i].product_venter[j]);
        }
      }
    }

    

    console.log('select product--',product);
    if(product.length>0){
      //this.veiwCtrl.dismiss();
      const modal = this.modalCtrl.create(PlaceorderPage,
        {set_product:product,visit_data:this.visit_data,client:this.client},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
      modal.present();
      modal.onDidDismiss((data) => {
        this.veiwCtrl.dismiss(true);
      })
    } else {
      this.alertP.show('Alerta','Añada al menos un producto por favor.');
    }
    
  }

  

  ionViewDidLoad() {
    this.get_product_list();
    console.log('ionViewDidLoad ProductlistPage');
  }

  closemodal(){
    this.veiwCtrl.dismiss();
  }

  get_product_list(){
    let Data = {
      user_id:{"value":this.auth.getUserDetails().company.id,"type":"NO"},
    }
    this.rest_api.postData(Data,'View_product_list').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.products = res.data;
        for(let i=0;i<this.products.length;i++){
          this.products[i].total_price = sumTotal(this.products[i].product_venter);
        }
      }
    })
  }

  search(ev:any) {
    console.log(ev.value);
    var val = ev.value;
    if(val&&val.trim()){
      return this.products = this.products.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.get_product_list();
    }
  }

  dicount_calc(item:any,ev:any) {
    console.log(ev.target.value);
    console.log(item);
      item.price = ev.target.value;
      item.product_price = Number(item.price) * Number(item.qty) * Number(item.unit);
      for(let i=0;i<this.products.length;i++){
        this.products[i].total_price = sumTotal(this.products[i].product_venter);
      }
  }

  add_item(item:any) {
    console.log(item);
    // if(item.unit>item.qty){
      item.qty += 1;
      item.product_price = Number(item.price) * Number(item.qty) * Number(item.unit);
      for(let i=0;i<this.products.length;i++){
        this.products[i].total_price = sumTotal(this.products[i].product_venter);
      }
    // } else {
    //   this.alertP.presentToast(`Only ${item.unit} unit available.`,'buttom');
    // }

  }

  minus_item(item:any) {
    if(item.qty>0){ 
      item.qty -= 1;
      // item.product_price = Number(item.product_price) - Number(item.price);
      item.product_price = Number(item.price) * Number(item.qty) * Number(item.unit);
      for(let i=0;i<this.products.length;i++){
        this.products[i].total_price = sumTotal(this.products[i].product_venter);
      }
    }
  }

}
