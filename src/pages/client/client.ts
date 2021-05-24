import { Component } from '@angular/core';
import { ModalController, Events } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AddclientPage } from '../addclient/addclient';
import { DetailsPage } from '../details/details';
import { NotificationsPage } from '../notifications/notifications';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { OfflineProvider } from '../../providers/offline/offline';

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage {
  clients: any = new Array();
  resions: any = new Array();

  constructor(public navCtrl: NavController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public events: Events,
    public alertP: AlertProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public offline: OfflineProvider) {

    events.subscribe('filter_client', (data) => {
      if (data != 'All') {
        console.log(data);
        let Data = {
          user_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
          region: { "value": data.region, "type": "NO" },
          client_type: { "value": data.c_type, "type": "NO" },
          distance: { "value": data.distance, "type": "NO" },
          latitude: { "value": data.lat, "type": "NO" },
          longitude: { "value": data.lng, "type": "NO" },
        }
        this.rest_api.postData(Data, 'View_client_list').then((res: any) => {
          console.log(res);
          if (res.status == 1) {
            this.clients = res.data;
          } else {
            this.clients = new Array();
          }
        })
      } else {
        this.get_client_list();
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');

  }

  ionViewWillEnter() {
    console.log('=========isDisconnect ', this.auth.isDisconnect);

    if (this.auth.isDisconnect == true) {
      this.offline.getclientlist().then((res) => {
        this.clients = res;
      })
    } else {
      this.get_client_list();

    }
    let client = this.navParams.get("client_id");
    if (client != "") {
      setTimeout(() => {

        this.navCtrl.push(DetailsPage, { client_id: client, opennext: true });
      }, 500)

    }

  }

  add() {
    console.log(this.auth.isDisconnect);
    
    if (this.auth.isDisconnect == false) {
      const modal = this.modalCtrl.create(AddclientPage, {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
      modal.present();
      modal.onDidDismiss((data) => {
        if (data) {
          this.get_client_list();
        }
      })
    } else {
      this.alertP.show('Alerta', 'Por favor comprueba la conectividad.');
    }

  }

  details(client: any) {
    this.navCtrl.push(DetailsPage, { client_id: client.id });
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  get_client_list() {
    let Data = {
      user_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData(Data, 'View_client_list').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.clients = res.data;
        // for (let index = 0; index < this.clients.length; index++) {
        //   // this.offline.createClientList(this.clients[index]);
        //   console.log('wokdfdkfj');
        // }
        this.offline.updateClientList(this.clients);
      }
    })
  }

  search(ev: any) {
    console.log(ev.value);
    var val = ev.value;
    if (val && val.trim()) {
      return this.clients = this.clients.filter((item) => {
        return item.client_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.get_client_list();
    }
  }

  calling(number: any) {
    this.auth.CallingFeature(number);
  }

}
