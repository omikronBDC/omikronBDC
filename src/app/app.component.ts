import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, Nav, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ForgotPage } from '../pages/forgot/forgot';
import { SignupPage } from '../pages/signup/signup';
import { SearchPage } from '../pages/search/search';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { ProfilePage } from '../pages/profile/profile';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { TermsPage } from '../pages/terms/terms';
import { SettingsPage } from '../pages/settings/settings';
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { CategoryPage } from '../pages/category/category';
import { RestApiProvider } from './../providers/rest-api/rest-api';
import { AlertProvider } from './../providers/alert/alert';
import { AuthProvider } from './../providers/auth/auth';
import { LocationProvider } from './../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { OfflineProvider } from '../providers/offline/offline';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any; // = LoginPage;
  cust_type: any = '';
  distance: any = '';
  clientTypeList:any = new Array();
  structure: any = { lower: 0, upper: 60 };
  lat: any = '';
  lng: any = '';
  regions: any = new Array();
  region: any = '';

  constructor(platform: Platform, statusBar: StatusBar,
    public events: Events,
    public locationP: LocationProvider,
    private geolocation: Geolocation,
    public rest_api: RestApiProvider,
    public menu: MenuController,
    public auth: AuthProvider,
    splashScreen: SplashScreen,
    public zone:NgZone,
    public network:Network,
    public offline:OfflineProvider ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#cb1a34');
      this.checkUserExist();
      statusBar.styleLightContent();
      splashScreen.hide();

      setTimeout(() => {
        this.network.onDisconnect().subscribe((r) => {
          console.log('network was disconnected :-(', r);
          // this.event.publish("networkdissconnect");
          // this.homec.splash = false;
          this.zone.run(() => {
            this.auth.isDisconnect = true;
          });
        });
  
        this.network.onConnect().subscribe((r) => {
          console.log('network connected!', r);
          // this.event.publish("networkconnected");
          this.zone.run(() => {
            this.auth.isDisconnect = false;
            // this.checkLogin();
          })
        });
      }, 3000);
     

    });
    events.subscribe('login_success',(data) => {
      this.getClientType();
      this.get_regions();      
    })
  }

  checkUserExist() {
    if (this.auth.isUserLoggedIn()) {
      this.getClientType();
      this.get_regions();
      this.rootPage = TabsPage;
    } else {
      this.rootPage = LoginPage;
    }
  }

  newsfeed() {
    this.nav.setRoot(NewsfeedPage);
  }
  chat() {
    this.nav.setRoot(ChatlistPage);
  }

  change() {
    this.nav.setRoot(ChangepasswordPage);
  }
  category() {
    this.nav.push(CategoryPage);
  }
  logout() {
    this.nav.setRoot(LoginPage);
  }

  client_filter() {
    let Data = {
      distance: this.distance,
      lat: this.lat,
      lng: this.lng,
      c_type: this.cust_type,
      region: this.region,
    }
    
    this.events.publish('filter_client', Data);
    this.menu.close();
  }

  distance_change() {
    this.locationP.check().then((status) => {
      if (status) {
        console.log(this.distance);
      }
    })
  }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      // this.geoAccuracy = resp.coords.accuracy;
      // this.getGeoencoder(this.lat,this.lng);
    }).catch((error) => {
      alert('Error getting location1' + JSON.stringify(error));
    });
  }

  get_regions() {
    let data = {
      company_id: { 'value': this.auth.getUserDetails().company.id, "type": 'NO' },
    }
    let url = `regions`;
    this.rest_api.postData(data, url).then((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.regions = res.data;
      } else {

      }
    })
  }

  cancel() {
    this.distance = 0;
    this.lat = '';
    this.lng = '';
    this.cust_type = '';
    this.region = '';
    this.events.publish('filter_client', 'All');
    this.menu.close();
  }

  getClientType() {
    console.log('get-client-type--------calling');
      let data = {
        company_id: {'value': this.auth.getUserDetails().company.id, "type": 'NO'},
      }
      let url = `client_type`;
      this.rest_api.postData_withoutLoder(data,url).then((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.clientTypeList = res.data;
        }
      })
    }    

}
