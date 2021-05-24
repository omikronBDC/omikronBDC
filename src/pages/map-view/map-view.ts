import { Component ,ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform, Nav, Events } from 'ionic-angular';

declare var google;
/**
 * Generated class for the MapViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
  @ViewChild('map') mapElement:ElementRef;
  maps: any;
  info:any = '';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  lat:any;
  lng:any;
  latlng:any;
  constructor(public navCtrl: NavController,public viewCtrl:ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap(22.7196, 75.8577);
    console.log('ionViewDidLoad MapViewPage');
  }

  loadMap(lat:any,lng:any){
    let latLng = new google.maps.LatLng(lat,lng);
    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // mapTypeId: 'satellite',
      heading: 90,
      tilt: 45
    }

    this.maps = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.addListenerOnce(this.maps, 'idle', ()=>{
      console.log("map loaded successfuly=------------------");
    // this.addMarker(this.maps);
       // this.generateMarkers(this.result);
      // do something only the first time the map is loaded
      let marker = new google.maps.Marker({
        map: this.maps,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: this.maps.getCenter()
      });
      this.lastLatLng(marker);
      // let content = '';
      // this.addInfoWindow(marker, content);     

    });
    // this.addMarker();
  }

  lastLatLng(marker){
    google.maps.event.addListener(marker, 'dragend', () =>{ 
    this.lat = marker.position.lat();
    this.lng = marker.position.lng();
    this.latlng =  marker.position.lat() + "," +  marker.position.lng();
    console.log('get lat/lng',marker.position.lat(),marker.position.lng());   
    });
  }

  set_latlng() {
    let Data = {
      lat:this.lat,
      lng:this.lng,
    }
    this.viewCtrl.dismiss(Data);
  }

}
