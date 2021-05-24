import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('focusInput') myInput;
  map:any;
  isSearch=false;
  selectedText="";
  autocomplete: any;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  lat_lng:any;
  //selectedLocation="";
  selectedLocation={
    address:"",
    lat:"",
    lng:""
  }
  geocode: any;
  geocoder: any;
  responseData: any;
  marker:any;
  


  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public viewCtrl: ViewController,
    public platform:Platform,
    public geolocation:Geolocation,
    public navParams: NavParams) {
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
      this.geocoder = new google.maps.Geocoder;
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    let latLng = new google.maps.LatLng(22.7355,75.9074);
    //console.log("latlng:", latLng)

    let mapOptions = {
       center: latLng,
      zoom: 15,
      zoomControl: false,
      // mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      mapTypeId: 'satellite',
      clickableIcons: false
    }

    this.map = new google.maps.Map(document.getElementById('map123'), mapOptions);

    google.maps.event.addListenerOnce(this.map, 'idle', ()=>{
      let lat = this.navParams.get("lat");
      let lng = this.navParams.get("lng");
      if(lat&&lng){
          console.log("from edit profile");
          this.selectedLocation.lat=lat;
          this.selectedLocation.lng=lng;
          this.lat_lng = `${this.selectedLocation.lat} , ${this.selectedLocation.lng}`;
          let latLng = new google.maps.LatLng(lat,lng);
          this.setLocation(latLng)
      }
      else{
        console.log("from add client");
        this.getCurrentLocation();
      }
     
      google.maps.event.addListener(this.map, 'click', (event)=> {
        this.selectedLocation.lat = event.latLng.lat()+"";
        this.selectedLocation.lng = event.latLng.lng()+"";

       this.geocoder.geocode({ 'location': event.latLng }, (results, status) => {
          this.selectedText=results[0].formatted_address;
          this.selectedLocation.address=results[0].formatted_address;
          
          console.log('results',this.selectedLocation);
        this.lat_lng = `${this.selectedLocation.lat} , ${this.selectedLocation.lng}`;
       })
     if(this.marker){
         this.marker.setPosition(event.latLng);
     }
     else{
       this.marker = new google.maps.Marker({
         position: event.latLng, 
         map: this.map
     })
     }
     
     //  placeMarker(event.latLng);
    });
    })
 
  }

  search(){
    this.isSearch=true;
    if(this.platform.is("cordova")){
      //this.keyboard.show();
    }
    setTimeout(()=>{
      this.myInput.setFocus();
    },200)


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
  selectSearchResult(item) {
    this.selectedText=item.description;
    this.selectedLocation.address=item.description;
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
         this.selectedLocation.lat = results[0].geometry.location.lat()+"";
         this.selectedLocation.lng = results[0].geometry.location.lng()+"";
         this.lat_lng = `${this.selectedLocation.lat} , ${this.selectedLocation.lng}`;
         let latLng = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
         this.setLocation(latLng)
         this.autocomplete.input="";
         this.isSearch=false;
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


  setLocation(latlng){
    this.map.panTo(latlng);
    if(this.marker){
      this.marker.setPosition(latlng);
    }
      else {
      this.marker = new google.maps.Marker({
        position: latlng, 
        map: this.map
      })
    }
    this.geocoder.geocode({ 'location': latlng }, (results, status) => {
      this.selectedText=results[0].formatted_address;
      this.selectedLocation.address=results[0].formatted_address;
    })
  }

  getCurrentLocation(){    
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);      
      this.selectedLocation.lat = resp.coords.latitude+"";
      this.selectedLocation.lng = resp.coords.longitude+"";
      this.lat_lng = `${this.selectedLocation.lat} , ${this.selectedLocation.lng}`;
      console.log('geoliocation',resp);
      this.setLocation(latLng)
    //resp.coords.latitude, resp.coords.longitude
  })
  }

}
