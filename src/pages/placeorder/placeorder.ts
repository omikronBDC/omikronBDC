import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductlistPage } from '../productlist/productlist';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
/**
 * Generated class for the PlaceorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-placeorder',
  templateUrl: 'placeorder.html',
})
export class PlaceorderPage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  select_product:any = new Array();
  image:any;
  blob_img:any = '';
  blob_img_name:any = '';
  note:any = '';
  blob_signature:any = '';
  blob_signature_name:any = '';
  is_signature:any = false;
  visit_data:any;
  client:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public ImageP:ImageProvider,
    public alertP:AlertProvider,) {
      this.select_product = navParams.data.set_product;
      console.log(this.select_product);
      this.visit_data = navParams.data.visit_data;
      this.client = navParams.data.client;
      console.log(this.client);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceorderPage');
  }

  closemodal() {
    this.viewCtrl.dismiss();
  }

  list() {
    this.viewCtrl.dismiss();
    const modal = this.modalCtrl.create(ProductlistPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

  get_image(){
    this.ImageP.getImage().then((img:any) => {
      this.image = img;
      this.blob_img = this.ImageP.imgURItoBlob2(img);
      this.blob_img_name = this.ImageP.generateImageName('hello.jpg');
      console.log(this.blob_img,this.blob_img_name);
    })
  }

  remove_img() {
    this.image = '';
    this.blob_img = '';
    this.blob_img_name = '';
  }

  drawStart(ev) {
    console.log(ev);
  }

  drawComplete(ev) {
    console.log(ev);
    this.is_signature = ev;
  }

  order_place() {
    if(!this.image&&!this.blob_img){
      this.alertP.show('Alerta','Por favor cargue una imagen.');
      return;
    }
    if(!this.is_signature){
      this.alertP.show('Alerta','Por favor añada su firma.');
      return;
    }

    this.blob_signature = this.ImageP.imgURItoBlob2(this.signaturePad.toDataURL());
    this.blob_signature_name = this.ImageP.generateImageName('hello.jpg');
    console.log(this.blob_signature,this.blob_signature_name);

    let Data = {
      employee_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      visit_id :{"value":this.visit_data.id,"type":"NO"},
      client_id:{"value":this.client.id,"type":"NO"},
      image:{"value":this.blob_img,"name":this.blob_img_name,"type":"NO"},
      signature:{"value":this.blob_signature,"name":this.blob_signature_name,"type":"NO"},
      add_not:{"value":this.note,"type":"NO"},
    }
      for(let i=0;i<this.select_product.length;i++){
        Data[`item_id[${i}]`] = {"value":this.select_product[i].venter_id,"type":"NO"};
        Data[`product_id[${i}]`] = {"value":this.select_product[i].pid,"type":"NO"};
        Data[`product_unit[${i}]`] = {"value":this.select_product[i].unit,"type":"NO"};
        Data[`product_qty[${i}]`] = {"value":this.select_product[i].qty,"type":"NO"};
        Data[`product_price[${i}]`] = {"value":this.select_product[i].price,"type":"NO"};
        Data[`product_total_price[${i}]`] = {"value":this.select_product[i].product_price,"type":"NO"};
        Data[`product_title[${i}]`] = {"value":this.select_product[i].title,"type":"NO"};
      }
      this.rest_api.postData(Data,'place_order').then((res:any) => {
        console.log(res);
        if(res.status==1){
          this.alertP.presentToast(res.message,'bottom');
          this.viewCtrl.dismiss(true);
        //   this.alertP.showAsync('Success',res.message).then(() => {
        // this.viewCtrl.dismiss(true);
        // })
     }
    })
  }
  
}
