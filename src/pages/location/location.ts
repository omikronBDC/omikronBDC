import { LocationProvider } from './../../providers/location/location';
import { ClientPage } from './../client/client';
import { Component, ViewChild, NgZone } from '@angular/core';
import { ModalController, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { NextvisitPage } from '../nextvisit/nextvisit';
import { NotificationsPage } from '../notifications/notifications';
import { PlaceorderPage } from '../placeorder/placeorder';
import { ProductlistPage } from '../productlist/productlist';
import { ProfilePage } from '../profile/profile';
import { SalesNotePage } from '../sales-note/sales-note';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { NotesPage } from '../notes/notes';
import { DetailsPage } from '../details/details';
import { SalesNotePopupPage } from '../sales-note-popup/sales-note-popup';

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('focusInput') myInput;
  map: any;
  clients: any = new Array();
  isSearch = false;
  selectedText = "";
  autocomplete: any;
  mapload = false;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  //selectedLocation="";
  selectedLocation = {
    address: "",
    lat: "",
    lng: ""
  }
  geocode: any;
  geocoder: any;
  responseData: any;
  marker: any;
  markers: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public platform: Platform,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public rest_api: RestApiProvider,
    public auth: AuthProvider,
    public loationP: LocationProvider,
    public events: Events,
    public alertP: AlertProvider,) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;

    events.subscribe('filter_client', (data) => {
      console.log("filter client", data)
      if (data != 'All') {
        console.log(data);
        let Data = {
          user_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
          region: { "value": data.region, "type": "NO" },
          client_type: { "value": data.c_type, "type": "NO" },
          distance: { "value": data.distance, "type": "NO" },
          latitude: { "value": this.selectedLocation.lat, "type": "NO" },
          longitude: { "value": this.selectedLocation.lng, "type": "NO" },
        }
        this.rest_api.postData(Data, 'View_client_list').then((res: any) => {
          console.log(res);
          if (res.status == 1) {
            this.clients = res.data;
            for (let key in this.markers) {
              let marker = this.markers[key].marker;
              marker.setVisible(false);
            }
            var latlng = [];
            for (let i = 0; i < this.clients.length; i++) {
              // let data = {"lat":this.clients[i].lat,"lng":this.clients[i].lng};
              let data = new google.maps.LatLng(this.clients[i].lat, this.clients[i].lng);
              latlng.push(data);
            }
            console.log('latlng', latlng);
            let data = new google.maps.LatLng(this.clients[0].lat, this.clients[0].lng);
            this.map.panTo(data);
            this.setLocation(latlng);
            // this.setLocationmap(data);
          } else {
            this.alertP.presentToast(res.message, 'bottom');

          }
        }).catch((err) => {
          this.get_client_list(0);
        })
      } else {
        this.get_client_list(0);
        this.getCurrentLocation();
      }
    });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    let latLng = new google.maps.LatLng(40.4637, 3.7492);
    //console.log("latlng:", latLng)

    let mapOptions = {
      center: latLng,
      zoom: 15,
      // minZoom:7,
      zoomControl: false,
      disableDefaultUI:true,
      // mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: 'satellite',
      clickableIcons: false
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.getCurrentLocation();
      this.mapload = true;
      console.log("maploaded*************");
      this.get_client_list(0);
      google.maps.event.addListener(this.map, 'click', () => {
        console.log('click event');

        for (let key in this.markers) {
          let infowindow = this.markers[key].infowindow;
          if (infowindow) { infowindow.close(this.map, this.markers[key].marker); }
        }
      });
      //     google.maps.event.addListener(this.map, 'click', (event)=> {
      //     this.selectedLocation.lat = event.latLng.lat()+"";
      //     this.selectedLocation.lng = event.latLng.lng()+"";

      //    this.geocoder.geocode({ 'location': event.latLng }, (results, status) => {
      //       this.selectedText=results[0].formatted_address;
      //       this.selectedLocation.address=results[0].formatted_address;

      //       console.log('results',this.selectedLocation)
      //    })
      //  if(this.marker){
      //      this.marker.setPosition(event.latLng);
      //  }
      //  else {
      //   const customicon = 'assets/imgs/marker.png';
      //    this.marker = new google.maps.Marker({
      //      position: event.latLng, 
      //      icon:customicon,
      //      map: this.map,
      //  })
      //  }

      //  //  placeMarker(event.latLng);
      // });
    })
  }

  ionViewWillEnter() {
    if (this.mapload == true) {
      console.log("will enter*************");
      this.get_client_list(0);
    }
  }

  ionViewWillLeave() {
    let _this1 = this;
    for (let key in _this1.markers) {
      let infowindow = _this1.markers[key].infowindow;
      if (infowindow) { infowindow.close(_this1.map, _this1.markers[key].marker); }
    }
  }
  search() {
    this.isSearch = true;
    if (this.platform.is("cordova")) {
      //this.keyboard.show();
    }
    setTimeout(() => {
      this.myInput.setFocus();
    }, 200)
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        // alert(JSON.stringify(predictions));
        console.log(predictions);
        if (predictions) {
          this.autocompleteItems = [];
          this.zone.run(() => {

            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);

            });

          });
        }
      });
  }

  place() {
    const modal = this.modalCtrl.create(PlaceorderPage, {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  next() {
    const modal = this.modalCtrl.create(NextvisitPage, {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  sales() {
    const modal = this.modalCtrl.create(SalesNotePage, {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  product() {
    const modal = this.modalCtrl.create(ProductlistPage, {}, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }



  profile() {
    this.navCtrl.push(ProfilePage);
  }

  notify() {
    this.navCtrl.push(NotificationsPage);
  }

  selectSearchResult(item) {
    this.selectedText = item.description;
    this.selectedLocation.address = item.description;
    console.log(item);
    this.autocompleteItems = [];
    let selected_area = {
      "fulladdress": "",
      "city": "",
      "state": "",
      "country": "",
      "post_code": "",
      "lat": "",
      "lng": ""
    };
    this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
      if (status === 'OK' && results[0]) {
        //  this.selectedLocation=results[0].geometry.location.lat()+", "+results[0].geometry.location.lng();
        this.selectedLocation.lat = results[0].geometry.location.lat() + "";
        this.selectedLocation.lng = results[0].geometry.location.lng() + "";
        let latLng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        this.setLocationmap(latLng, 0);
        this.autocomplete.input = "";
        this.isSearch = false;
        // selected_area.city = this.getlongname(results[0].address_components, "locality");
        // selected_area.state = this.getlongname(results[0].address_components, "administrative_area_level_1");
        // selected_area.country = this.getlongname(results[0].address_components, "country");
        // selected_area.post_code = this.getlongname(results[0].address_components, "postal_code");
        // selected_area.fulladdress = results[0].formatted_address;
        // selected_area.lat = results[0].geometry.location.lat();
        // selected_area.lng = results[0].geometry.location.lng();
        // console.log(selected_area.post_code);

        // let position = {
        //   lat: results[0].geometry.location.lat(),
        //   lng: results[0].geometry.location.lng(),
        //   formatted_address: results[0].address_components[0].long_name
        // }
        // this.viewCtrl.dismiss(selected_area);
      }
    })
  }

  setLocationmap(latlng, type: any) {
    this.map.panTo(latlng);
    var customicon;
    if (type == 1) {
      customicon = {
        url: "assets/imgs/marker.png", // url
        size: new google.maps.Size(40, 50),
        scaledSize: new google.maps.Size(40, 50), // scaled size
        // origin: new google.maps.Point(0,0), // origin
        // anchor: new google.maps.Point(0, 0) // anchor
      }
    } else {
      customicon = {
        url: "assets/imgs/current.png", // url
        size: new google.maps.Size(18, 18),
        scaledSize: new google.maps.Size(16, 16), // scaled size
        origin: new google.maps.Point(0, 0) // origin
        // anchor: new google.maps.Point(0, 0) // anchor
      }
    }

    if (this.marker) {
      this.marker.setPosition(latlng);
    }
    else {
      this.marker = new google.maps.Marker({
        position: latlng,
        map: this.map,
        icon: customicon,
      })
    }
  }

  generateshtmlofinfowindow(i) {
    console.log("clients", this.clients, i)
    let _this1 = this;
    let content = ""
    if (_this1.clients[i].vistilist.length == 0) {
      content = `<ion-row>
    <ion-col col-12 no-padding>
      <ion-item no-lines class="location_main">
       <h6 class="heading_int" id="client_detail`+ _this1.clients[i].id + `">${_this1.clients[i].client_name}</h6>

       <p><img src="assets/imgs/home/location-active.png" ><span id="addressupdate`+ _this1.clients[i].id + `">${_this1.clients[i].permanent_location}</span></p>

       <p class="color color_2" style="text-decoration: underline;">
       <img src="assets/imgs/home/phone.png">
       <span>${_this1.clients[i].client_contact[0].phone}</span> 
       (${_this1.clients[i].client_contact[0].name})</p>

       <div class="btns_loc">
       <button ion-button color="primary" class="btn_loc" small 
       style="border-radius: 0;font-size: 12px;" id="client_note`+ _this1.clients[i].id + `"
       (click)="sales(c)"><img src="assets/imgs/check.png">Nota de venta</button>

       <button ion-button color="primary" outline small id="client_place`+ _this1.clients[i].id + `"
       style="border-radius: 0;font-size: 12px;" 
       (click)="product(c)">Lanzar pedido</button>

       <button ion-button color="primary"
       outline small id="client_reschedule`+ _this1.clients[i].id + `"
       style="border-radius: 0;font-size: 12px;"                                  
       >Prox. Visita</button>
                  </div>             
          </ion-item>
        </ion-col>
      </ion-row>`;
    } else {
      content = `<ion-row>
      <ion-col col-12 no-padding>
        <ion-item no-lines class="location_main">
         <h6 class="heading_int" id="client_detail`+ _this1.clients[i].id + `">${_this1.clients[i].client_name}</h6>

         <p><img src="assets/imgs/home/location-active.png" >${_this1.clients[i].permanent_location}</p>

         <p class="color color_2" style="text-decoration: underline;">
         <img src="assets/imgs/home/phone.png">
         <span>${_this1.clients[i].client_contact[0].phone}</span> 
         (${_this1.clients[i].client_contact[0].name})</p>

         <div class="btns_loc">
         <button ion-button color="primary" class="btn_loc" small 
         style="border-radius: 0;font-size: 12px;" id="client_note`+ _this1.clients[i].id + `"
         (click)="sales(c)"><img src="assets/imgs/check.png">Nota de venta</button>

         <button ion-button color="primary" outline small id="client_place`+ _this1.clients[i].id + `"
         style="border-radius: 0;font-size: 12px;" 
         (click)="product(c)">Lanzar pedido</button>

         <button ion-button color="primary" outline small id="client_reschedule`+ _this1.clients[i].id + `"
         style="border-radius: 0;font-size: 12px;"                                  
         >Reagendar Visita</button>

                    </div>             
            </ion-item>
          </ion-col>
        </ion-row>`


    }

    return content;
  }






  setLocation(latlngs) {
    let _this1 = this;
    var customicon;
    for (let i = 0; i < this.clients.length; i++) {
      console.log("mizan", i);
      if (this.markers["client" + this.clients[i].id]) {
        let latlng = new google.maps.LatLng(this.clients[i].lat, this.clients[i].lng);
        this.markers["client" + this.clients[i].id].marker.setPosition(latlng);
        if (this.markers["client" + this.clients[i].id]['infowindow']) {
          this.markers["client" + this.clients[i].id].infowindow.setPosition(latlng);
        }

        this.markers["client" + this.clients[i].id].marker.setVisible(true);



        console.log("this is markers-----", this.markers["client" + this.clients[i].id].marker);
        console.log("mizan2", i);
      }
      else {
        let latlng = new google.maps.LatLng(this.clients[i].lat, this.clients[i].lng);
        this.map.panTo(latlng);
        // if(this.marker){
        //   this.marker.setPosition(latlng);
        // }
        //   else {
        if (this.clients[i].id) {
          customicon = {
            url: "assets/imgs/marker.png", // url
            size: new google.maps.Size(40, 50),
            scaledSize: new google.maps.Size(40, 50), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
          }
        } else {
          customicon = {
            url: "assets/imgs/maps-and-flags.png", // url
            size: new google.maps.Size(40, 50),
            scaledSize: new google.maps.Size(40, 50), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
          }

        }

        var marker = new google.maps.Marker({
          position: latlng,
          icon: customicon,
          map: this.map
        })
        let join_marker = {
          marker: marker,
          i: i,
          client_id: this.clients[i].id,
          Detail: this.clients[i]
        }
        this.markers["client" + this.clients[i].id] = join_marker;
        //<p class="color" *ngIf="`+this.clients[i].vistilist.length > 0 +`">
        // <img src="assets/imgs/home/calender.png">
        // ${this.clients[i].vistilist[0].visite_date}</p>

        google.maps.event.addListener(this.markers["client" + this.clients[i].id].marker, "click", () => {
          console.log("mizan3 marker cliekd", i, join_marker.client_id, join_marker.i);
          for (let key in _this1.markers) {
            let infowindow = _this1.markers[key].infowindow;
            if (infowindow) { infowindow.close(_this1.map, _this1.markers[key].marker); }
          }

          // infowindow.close();
          console.log("mizan4 marker cliekd", _this1.markers["client" + join_marker.client_id]);

          if (!_this1.markers["client" + join_marker.client_id].infowindow) {
            let newi = _this1.getindex(join_marker.client_id);
            console.log('mizan5', newi);
            let content = this.generateshtmlofinfowindow(newi);


            var infowindow = new google.maps.InfoWindow({ content: content });
            _this1.markers["client" + join_marker.client_id]["infowindow"] = infowindow;
            _this1.markers["client" + join_marker.client_id].infowindow.open(_this1.map, _this1.markers["client" + join_marker.client_id].marker);


            _this1.markers["client" + join_marker.client_id].infowindow.addListener('domready', () => {
              let text = "nueva visita";
              if (_this1.clients[newi].vistilist.length > 0) {
                text = "visita final";
              }
              let ele: any = document.getElementById('client_reschedule' + join_marker.client_id);
              if (ele) {
                ele.innerText = text;
              }
              let ele1: any = document.getElementById('addressupdate' + join_marker.client_id);
              if (ele1) {

                ele1.innerText = _this1.clients[newi].permanent_location;
              }

              console.log('clent detail from infowindo',);
              // alert("hello");
              if (_this1.markers["client" + join_marker.client_id]['domready'] != true) {
                _this1.markers["client" + join_marker.client_id]['domready'] = true;
                document.getElementById("client_note" + join_marker.client_id).addEventListener("click",
                  function () {
                    _this1.markers["client" + join_marker.client_id].infowindow.close();

                    const modal = _this1.modalCtrl.create(SalesNotePopupPage, { data: _this1.clients[i] },
                      { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
                    modal.present();
                    modal.onDidDismiss(() => {

                    })
                  });

                document.getElementById("client_place" + join_marker.client_id).addEventListener("click",
                  function () {
                    let client = {
                      id: _this1.clients[i].id,
                    }
                    let visit_data = {
                      id: 0
                    }
                    _this1.markers["client" + join_marker.client_id].infowindow.close();

                    const modal = _this1.modalCtrl.create(ProductlistPage,
                      { visit_data: visit_data, client: client },
                      { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
                    modal.present();
                    modal.onDidDismiss((data) => {
                      if (data) {
                        _this1.navCtrl.push(DetailsPage, { client_id: join_marker.client_id, typ: 'past' });
                      }
                    })
                  });

                document.getElementById("client_detail" + join_marker.client_id).addEventListener("click",
                  function () {
                    _this1.markers["client" + join_marker.client_id].infowindow.close();
                    _this1.navCtrl.push(DetailsPage, { client_id: join_marker.client_id, typ: 'past' });
                  });

                // if(_this1.clients[newi].vistilist.length==0){
                //   document.getElementById("client_next" + join_marker.client_id).addEventListener("click", 
                //   function() {
                //   _this1.markers["client"+join_marker.client_id].infowindow.close();
                //     let data = {
                //       id:_this1.clients[i].id,
                //       // visit_data:{
                //       //   visite_date:_this1.clients[i].vistilist[0].visite_date,
                //       //   id:_this1.clients[i].vistilist[0].id
                //       // }
                //     }
                //     console.log('----',data);
                //    const modal = _this1.modalCtrl.create(NextvisitPage,
                //     {data:data,type:'Next'},
                //     {cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
                //      modal.present();
                //      modal.onDidDismiss((data) => {
                //        if(data){
                //           // _this1.ionViewDidLoad();
                //          setTimeout(() => {
                //           _this1.ionViewWillEnter();
                //          }, 700);
                //        }
                //      })
                //   });
                // } else {
                document.getElementById("client_reschedule" + join_marker.client_id).addEventListener("click",
                  function () {
                    _this1.markers["client" + join_marker.client_id].infowindow.close();

                    if (_this1.clients[newi].vistilist.length > 0) {

                      let item = {
                        client: { id: _this1.clients[newi].vistilist[0].client_id },
                        visit_data: _this1.clients[newi].vistilist[0]
                      }
                      _this1.endVisit(item);
                    }
                    else {
                      let item = {
                        client: { id: _this1.clients[newi].id }

                      }

                      _this1.events.publish('opencreatetab', item)
                    }



                    //   let data = {
                    //     id:join_marker.client_id,
                    //     visit_data:{
                    //       visite_date:_this1.clients[newi].vistilist[0].visite_date,
                    //       id:_this1.clients[newi].vistilist[0].id
                    //     }
                    //   }
                    //   console.log('----',data);
                    // const modal = _this1.modalCtrl.create(NextvisitPage,
                    //   {data:data,type:'Reschedule'},
                    //   {cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
                    //    modal.present();
                  });
                //  }
              }
            });
          } else {
            _this1.markers["client" + join_marker.client_id].infowindow.open(
              _this1.map,
              _this1.markers["client" + join_marker.client_id].userpic
            );
          }


        });


        //   var infowindow = new google.maps.InfoWindow({content: content});
        //   google.maps.event.addListener(marker,'click', ((marker,content,infowindow) => { 
        //     return () => {
        //         infowindow.setContent(content);
        //         infowindow.open(this.map,marker);
        //         document.getElementById(_this1.clients[i].id).addEventListener("click",
        //         function() {
        //           console.log('working');
        //         })
        //     };
        // })(marker,content,infowindow));
        // }
        // this.geocoder.geocode({ 'location': latlng }, (results, status) => {
        //   this.selectedText=results[0].formatted_address;
        //   this.selectedLocation.address=results[0].formatted_address;
        // })
      }

    }


  }

  getCurrentLocation() {
    console.log('calling');
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.loationP.check().then((status) => {
          if (status == true) {
            this.geolocation.getCurrentPosition().then((resp) => {
              let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
              this.selectedLocation.lat = resp.coords.latitude + "";
              this.selectedLocation.lng = resp.coords.longitude + "";
              console.log('geoliocation', resp);
              this.setLocationmap(latLng, 0);
              //resp.coords.latitude, resp.coords.longitude
            })
          } else {
            this.alertP.showAsync("¡Habilite el servicio de ubicación! ", 'Active los servicios de ubicación para ver los lugares cercanos.').then(() => {
              this.getCurrentLocation();
            })
          }
        })
      }, 500);

    });
  }


  get_client_list(fromfilter) {
    console.log("client list called");
    let Data = {
      user_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
    }
    this.rest_api.postData(Data, 'View_client_list').then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.clients = res.data;

        for (let key in this.markers) {
          let marker = this.markers[key].marker;
          marker.setVisible(false);
        }
        var latlng = [];
        for (let i = 0; i < this.clients.length; i++) {
          let data = { "lat": this.clients[i].lat, "lng": this.clients[i].lng };
          latlng.push(data);
        }
        console.log('latlng', latlng);
        let data = new google.maps.LatLng(this.clients[0].lat, this.clients[0].lng);
        if (fromfilter == 1) {
          this.map.panTo(data);
        }

        // this.markers["client"+this.clients[i].id].marker.setVisible(false);
        this.setLocation(latlng);
        //}
      }
    })
  }
  getindex(clientid) {

    for (let i = 0; i < this.clients.length; i++) {
      console.log('mizan444', this.clients[i], i)
      if (this.clients[i].id == clientid) {
        return i
      }
    }
    return -1;
  }



  endVisit(item: any) {



    const modal = this.modalCtrl.create(SalesNotePage, { data: item.visit_data },
      { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      if (data) {

        this.events.publish('opencreatetab', item)

      }
    })
    // alert('Coming Soon');
  }
}
