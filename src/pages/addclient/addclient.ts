import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AutofillPlacesPage } from '../autofill-places/autofill-places';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationProvider } from './../../providers/location/location';
import { MapViewPage } from '../map-view/map-view';
import { MapPage } from '../map/map';
declare var google;

/**
 * Generated class for the AddclientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addclient',
  templateUrl: 'addclient.html',
})
export class AddclientPage {

  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;
  geoAddress: string;
  geocoder: any;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  
  latlng:any='';
  c_name: any = '';
  c_id: any = '';
  c_type: any = '';
  bill_address: any = '';
  bill_postcode: any = '';
  ship_address: any = '';
  deliver_postcode: any = '';
  phone: any = '';
  c_email: any = '';
  loaction: any = '';
  lat: any = '';
  lng: any = '';
  iban: any = '';
  zipcode: any = ''
  client_id: any = '';
  region: any = '';
  other_contact_person: any = new Array();
  resions: any = new Array();
  clientTypeList: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public alertP: AlertProvider,
    public modal: ModalController,
    public zone:NgZone,
    public viewCtrl: ViewController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public locationP: LocationProvider) {
      this.geocoder = new google.maps.Geocoder;

    // this.resions = this.auth.getRegions();
    console.log(this.resions);
    this.other_contact_person.push({ name: '', number: '' });
    this.c_id = this.auth.getUserDetails().company.id;

    this.get_current_address();

  }

  copy_address() {
    this.ship_address = this.bill_address;
  }

  ionViewDidLoad() {
    this.generate_client_id();
    console.log('ionViewDidLoad AddclientPage');
  }

  ibam_fill(ev:any) {
    console.log(ev.target.value);
    this.lat='';
    this.lng='';
  }


  closemodal() {
    this.viewCtrl.dismiss();
  }

  generate_client_id() {
    let url = `get_next_client_id`;
    this.rest_api.get_withurl({}, 0, url).then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.client_id = res.last_id;
        this.getRegion();
      }
    })
  }

  getRegion() {
    let data = {
      company_id: { 'value': this.auth.getUserDetails().company.id, "type": 'NO' },
    }
    let url = `regions`;
    this.rest_api.postData(data, url).then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.resions = res.data;
        this.getClientType();
      }
    })
  }

  getClientType() {
    let data = {
      company_id: { 'value': this.auth.getUserDetails().company.id, "type": 'NO' },
    }
    let url = `client_type`;
    this.rest_api.postData(data, url).then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.clientTypeList = res.data;
      }
    })
  }

  locationOpenAutofillPlaces() {
    const modal = this.modal.create(AutofillPlacesPage, { type: 'Location' });
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        this.loaction = location.fulladdress;
        this.lat = location.lat;
        this.lng = location.lng;
      }
    });
    modal.present();
  }

  shippingOpenAutofillPlaces() {
    const modal = this.modal.create(AutofillPlacesPage, { type: 'Dir. de entrega' });
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        this.ship_address = location.fulladdress;
        this.deliver_postcode = location.post_code;
        // this.lat = location.lat;
        // this.lng = location.lng;
      }
    });
    modal.present();
  }

  billingOpenAutofillPlaces() {
    const modal = this.modal.create(AutofillPlacesPage, { type: 'Dir. de facturación' });
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        this.bill_address = location.fulladdress;
        this.bill_postcode = location.post_code;
        // this.lat = location.lat;
        // this.lng = location.lng;
      }
    });
    modal.present()
  }

  add_person() {
    var person = { name: '', number: '' };
    this.other_contact_person.push(person);
  }

  minus_person(inx: any) {
    this.other_contact_person.splice(inx, 1);
  }

  add_client() {
    let Data = {
      emp_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      client_name: { "value": this.c_name, "type": "CNAME" },
      cid: { "value": this.c_id, "type": "NO" },
      client_id: { "value": this.client_id, "type": "NO" },
      client_type: { "value": this.c_type, "type": "CTYPE" },
      region: { "value": this.region, "type": "REGION" },
      billing_address: { "value": this.bill_address, "type": "BILADD" },

      //billing_postcode: { "value": this.bill_postcode, "type": "BILLPOST" },

      shipping_address: { "value": this.ship_address, "type": "SHIPADD" },

     // shipping_postcode: { "value": this.deliver_postcode, "type": "DELIPOST" },

      phone: { "value": this.phone, "type": "PHONE" },
      email: { "value": this.c_email, "type": "EMAIL" },
      location: { "value": this.loaction, "type": "ADDRS" },
      lat: { "value": this.lat, "type": "LAT" },
      lng: { "value": this.lng, "type": "LNG" },
      zipcode: { "value": this.zipcode, "type": "NO" },
      iban: { "value": this.iban, "type": "NO" },
    }

    for (let i = 0; i < this.other_contact_person.length; i++) {
      Data[`names[${i}]`] = { "value": this.other_contact_person[i].name, "type": "PNAME" };
      Data[`phones[${i}]`] = { "value": this.other_contact_person[i].number, "type": "PPHONE" };
    }

    this.rest_api.postData(Data, 'addClient').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.alertP.presentToast(res.message,'bottom');
        this.viewCtrl.dismiss(true);

        // this.alertP.showAsync('Success', res.message).then(() => {
        //   this.viewCtrl.dismiss(true);
        // })
      } else {
        this.alertP.show('Alerta', res.message);
      }
    })

  }

  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
      this.getGeoencoder(this.lat, this.lng);
    }).catch((error) => {
      alert('Error getting location1' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.zone.run(() => {
          this.loaction = this.generateAddress(result[0]);
        });
      })
      .catch((error: any) => {
        console.error('Error getting location2' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  get_current_address() {
    this.locationP.check().then((status) => {
      if (status) {
        this.getGeolocation();
      }
    })
  }

  map_view() {
    const modal = this.modal.create(MapPage, {});
    modal.present();
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        //    this.getGeoencoder(location.lat,location.lng);
        this.lat = location.lat;
        this.lng = location.lng;
        this.loaction = location.address;
        this.latlng = `${location.lat}, ${location.lng}`;
      }
    });
  }

  get_latlng_by_address() {
    this.geocoder.geocode({ 'address': this.loaction }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.zone.run(() => {
          this.lat = results[0].geometry.location.lat()+"";
          this.lng = results[0].geometry.location.lng()+"";
          this.loaction = results[0].formatted_address;
          console.log('get location-----',results[0]);
        });        
      } else {
        this.alertP.presentToast('Por revisa la dirección e intruzca una valida.','bottom');
      }
    });
  }


}
