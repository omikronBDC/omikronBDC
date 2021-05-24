import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NextvisitPage } from '../nextvisit/nextvisit';
import { NotificationsPage } from '../notifications/notifications';
import { ProductlistPage } from '../productlist/productlist';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { AddContactPage } from '../add-contact/add-contact';
import { SalesNotePage } from '../sales-note/sales-note';
import { OrderDetailPage } from '../order-detail/order-detail';
import { NotesPage } from '../notes/notes';
import { MapPage } from '../map/map';
import { OfflineProvider } from '../../providers/offline/offline';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const sumTotal = arr =>
  arr.reduce((sum, { item_price, item_qty }) => sum + Number(item_price) * Number(item_qty), 0);
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  typ = "Plan";
  client_info: any = '';
  client_id: any;
  region: any;
  past_visits: any = new Array();
  order_histories: any = new Array();
  clients: any = new Array();
  next_visits: any = new Array();
  visit_segment: any = 'visit_next';
  lat = "";
  lng = "";
  loaction = "";
  opennext = false;
  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public offlineP: OfflineProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
    this.client_id = navParams.get('client_id');
    this.typ = navParams.data.typ || 'Plan';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  ionViewWillEnter() {
    if (this.auth.isDisconnect == true) {
      this.offlineP.get_client_detail(this.client_id).then((data: any) => {
        console.log('client info--------', data);
        this.client_info = data;
        var region = [];
        for (let i = 0; i < this.client_info.region.length; i++) {
          region.push(this.client_info.region[i].name);
        }
        this.region = region.join();
        console.log(this.region);
      })

      console.log('this.client_id   ----', this.client_id);

      this.offlineP.get_orderhistory(this.client_id).then((res: any) => {
        console.log('order_history ----', res);
        this.order_histories = res;
      })

      this.offlineP.get_pastVisit(this.client_id).then((res: any) => {
        console.log('pastvisit------', res);
        this.past_visits = res;
      })

      this.offlineP.get_nextVisit(this.client_id).then((res: any) => {
        console.log('get_nextVisit------', res);
        this.next_visits = res;
      })

    } else {
      this.get_client_detail(this.client_id);
      this.get_past_visit();
      this.get_upcoming_visit_list();
    }
  }

  place() {
    let client = {
      id: this.client_info.id,
    }
    let visit_data = {
      id: 0
    }
    const modal = this.modalCtrl.create(ProductlistPage,
      { visit_data: visit_data, client: client }, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log('test', data);
      if (data) {
        this.get_client_detail(this.client_id);
        this.get_upcoming_visit_list();
        this.get_past_visit();
        this.typ = 'past';
      }
    })
  }

  next_visit(type: string) {
    if (this.auth.isDisconnect == true) {
      this.alertP.show('Alerta', 'Por favor comprueba la conectividad.');      
    } else {
      if (type == 'Next') {
        const modal = this.modalCtrl.create(NextvisitPage, { data: this.client_info, type: type },
          { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
        modal.onDidDismiss((data) => {
          if (data) {
            this.get_upcoming_visit_list();
            this.get_past_visit();
            this.typ = 'personnel';
          }
        })
      } else {
        const modal = this.modalCtrl.create(NextvisitPage, { data: this.clients[0], type },
          { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
        modal.present();
        modal.onDidDismiss((data) => {
          if (data) {
            this.get_upcoming_visit_list();
            this.get_past_visit();
          }
        })
      }
    }


  }

  add_person() {
    if (this.auth.isDisconnect == false) {
      const modal = this.modalCtrl.create(AddContactPage, { data: this.client_info },
        { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data) {
          this.get_client_detail(this.client_id);
        }
      })
    }
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_client_detail(client_id: any) {
    let Data = {
      client_id: { "value": client_id, "type": "NO" },
    }
    this.rest_api.postData(Data, 'client_detail').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.client_info = res.data;
        this.order_histories = res.data.order_history;

        this.offlineP.Update_clientOrderhistory(this.order_histories, client_id);

        var region = [];
        for (let i = 0; i < this.client_info.region.length; i++) {
          region.push(this.client_info.region[i].name);
        }
        this.region = region.join();
        console.log(this.region);
        // for(let i=0;i<this.order_histories.length;i++){
        //   for(let j=0;j<this.order_histories[i].order_item.length;j++){
        //       this.order_histories[i].total_cost = sumTotal(this.order_histories[i].order_item[j].items);
        //     }
        // }
      }
    })
  }

  calling(number: any) {
    this.auth.CallingFeature(number);
  }

  get_past_visit() {
    let Data = {
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      client_id: { "value": this.client_id, "type": "NO" },
    }
    this.rest_api.postData_withoutLoder(Data, 'get_past_visit_list').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.past_visits = res.data;
        this.offlineP.pastVisity_update(this.past_visits, this.client_id);
        // for(let i=0;i<res.data.length;i++){
        //   if(res.data[i].order_history){
        //     for(let j=0;j<res.data[i].order_history.length;j++){
        //       this.past_visits.push(res.data[i].order_history[j]);
        //      }
        //   }       
        // }
      } else {
        this.past_visits = new Array();
      }
    })
  }

  get_upcoming_visit_list() {
    let Data = {
      client_id: { "value": this.client_id, "type": "NO" },
      employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.next_visits = res.data;
        this.offlineP.nextVisity_update(this.next_visits, this.client_id);
      } else {
        this.next_visits = new Array();
      }
      setTimeout(() => {
        if (this.next_visits.length == 0) {
          if (this.opennext == false) {
            if (this.navParams.get('opennext') == true) {
              this.next_visit('Next');
              this.opennext = true;
            }

          }
        }
      }, 500);


    })
  }

  sales(item: any) {
    const modal = this.modalCtrl.create(SalesNotePage, { data: item.visit_data },
      { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      if (data) {
        this.get_upcoming_visit_list();
        this.get_past_visit();
      }
    })
    // alert('Coming Soon');
  }

  rechedule(item: any) {
    // console.log('prasoon');
    if (this.auth.isDisconnect == true) {
      this.alertP.show('Alerta', 'Por favor comprueba la conectividad.');      
    } else {
      console.log(item);
      const modal = this.modalCtrl.create(NextvisitPage, { data: item, type: 'Reschedule' },
        { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data) {
          this.get_upcoming_visit_list();
          this.get_past_visit();
        }
      })
    }

  }

  product(item: any) {
    const modal = this.modalCtrl.create(ProductlistPage, { visit_data: item.visit_data, client: item.client }, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.get_upcoming_visit_list();
        this.get_past_visit();
        this.get_client_detail(this.client_id);
        this.typ = 'past';
      }
    })
  }

  visit_detail(order_id: any, item: any) {
    console.log(order_id);
    this.navCtrl.push(OrderDetailPage, { data: order_id, item: item });
  }

  order_detail(order_id: any) {
    console.log(order_id);
    this.navCtrl.push(OrderDetailPage, { data: order_id });
  }

  note_modal() {
    const modal = this.modalCtrl.create(NotesPage, { data: this.client_info });
    modal.present();
    modal.onDidDismiss(() => {
      this.get_client_detail(this.client_id);
    })
  }

  map_view() {
    const modal = this.modalCtrl.create(MapPage, { lat: this.client_info.lat, lng: this.client_info.lng });
    modal.present();
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        //    this.getGeoencoder(location.lat,location.lng);
        this.lat = location.lat;
        this.lng = location.lng;
        this.loaction = location.address;
        this.update_address()

        // this.latlng = `${location.lat}, ${location.lng}`;
      }
    });
  }







  update_address() {
    let Data = {
      emp_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      client_id: { "value": this.client_id, "type": "CNAME" },
      location: { "value": this.loaction, "type": "ADDRS" },
      lat: { "value": this.lat, "type": "LAT" },
      lng: { "value": this.lng, "type": "LNG" }
    }


    this.rest_api.postData(Data, 'updateAddress').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.alertP.presentToast(res.message, 'bottom');
        this.get_client_detail(this.client_id);
        // this.alertP.showAsync('Success', res.message).then(() => {
        //   this.viewCtrl.dismiss(true);
        // })
      } else {
        this.alertP.show('Alerta', res.message);
      }
    })

  }
}
