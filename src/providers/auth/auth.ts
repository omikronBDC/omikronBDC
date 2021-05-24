
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { App } from 'ionic-angular';
import { NgIf } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  localStorageUserKey = "sessionVentappApp";
  onUserDetailChanged: BehaviorSubject<any> = new BehaviorSubject(null);

  userimageurl = 'https://partnerteam.io/Api/assets/users_profile/';
  mediaurl = 'https://partnerteam.io/Api/assets/media/';
  // userimageurl='https://webwiders.com/WEB01/Partner_app/Api/assets/users_profile/';
  // mediaurl='https://webwiders.com/WEB01/Partner_app/Api/assets/media/';
  isDisconnect: any=false;
  constructor(
    public app: App, private callNumber: CallNumber,
  ) {
    console.log('Hello AuthProvider Provider');
  }

  // https://webwiders.com/WEB01/Partner_app/Api/assets/media/9602541596736378.mp3
  /***************************************************************************************************
  *******************************************GET USER DETAILS*************************************************
  ****************************************************************************************************/

  getUserDetails() {
    let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    return user.userDetails;
  }

  getRegions() {
    let user = this.getUserDetails();
    return user.region;
  }


  getCurrentUserName() {
    let user = this.getUserDetails();
    return user.name;
  }
  getCurrentUserId() {
    let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    return user.userDetails.id;
  }

  tokenUpdate(token) {
    let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    user.userDetails["device_token"] = token;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
  }

  addimageCache(img) {
    let cache = JSON.parse(localStorage.getItem("imageCache"))
    if (cache) {
      let index = cache.indexOf(img);
      if (index == -1) {
        cache.push(img);
        localStorage.setItem("imageCache", JSON.stringify(cache));

      }
    }
    else {
      let m = []
      m.push(img);
      localStorage.setItem("imageCache", JSON.stringify(m));
    }
  }




  isImageExists(filename) {
    let cache = JSON.parse(localStorage.getItem("imageCache"));
    if (cache) {
      if (cache.length > 0) {
        let index = cache.indexOf(filename);
        if (index == -1) {
          return 0;
        }
        else {
          return "1";
        }
      }
      else {
        return "0"
      }
    }
    else {
      return "0"
    }
  }

  updateUserDetails(details: any) {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));

    if (session) {
      session.userDetails = details;
    }
    else {
      session = {
        "userDetails": details,
        "language": "en"
      }
    }
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));

    //this.onUserDetailChanged.next(details);

  }


  updateChatSettings(detail) {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    session["chatDetail"] = detail;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));

    //this.onUserDetailChanged.next(details);

  }


  setAppLock(status) {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    session["applock"] = status;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));
    //this.onUserDetailChanged.next(details);
  }

  isApplockEnabled() {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    if (session["applock"] && session["applock"] == 1) {
      return true;
    }
    else {
      return false;
    }


  }

  getChatSettings() {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    return session["chatDetail"];


    //this.onUserDetailChanged.next(details);

  }


  removeUserDetails() {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    delete session["userDetails"];
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));
  }

  removeAllSessions() {
    localStorage.removeItem(this.localStorageUserKey);
  }

  isUserLoggedIn() {
    let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    if (user) {
      if (user.userDetails) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  getAppLanguage() {
    // let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    // if(session.language){
    //   return session.language;
    // }
    // else{
    return "en";
    // }

  }

  updateAppLanguage(lang: string) {
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    session["language"] = lang;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));

  }

  logout() {
    this.app.getRootNav().popToRoot().then(() => {
      this.removeUserDetails();
      window.location.href = "";
    })
  }



  setCurrentCountry(country: string) {
    //  localStorage.setItem("saareyCNCD",country);
    let session = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    session["country"] = country;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(session));
  }
  getCurrentCountry() {
    // let c = localStorage.getItem("saareyCNCD");
    // if(c){
    //   return c;
    // }
    // else{
    //   return "US";
    // }
    let user = this.getUserDetails();
    // console.log("get current country", user.country_code);
    return user.country_code;




  }

  isGooglePlayPremiumMember() {
    let user = this.getUserDetails();
    // console.log(user);
    if (user.in_app_purchase == '1') {
      return true;
    }
    else {
      return false;
    }
  }



  canDownloadPremiumData() {
    if (this.isUserLoggedIn()) {

      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));


      let d = new Date();
      if (user.userDetails.plan_validity && user.userDetails.plan_validity != "0000-00-00") {
        let planDate = new Date(user.userDetails.plan_validity);

        if (user.userDetails.customer_state == "3" || user.userDetails.customer_state == "2" || user.userDetails.customer_state == "6") {// && d.getTime()<=planDate.getTime()){
          return true;
        } else {
          return false;
        }
      }
      else {
        return false;
      }

    }
  }

  canAccessPremiumData() {
    if (this.isUserLoggedIn()) {

      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));


      let date = new Date();
      let day = (date.getUTCDate() > 9) ? (date.getUTCDate()) : ("0" + date.getUTCDate());
      let year = date.getUTCFullYear();
      let month = ((date.getUTCMonth() + 1) > 9) ? ((date.getUTCMonth() + 1)) : ("0" + (date.getUTCMonth() + 1));
      let d = new Date(year + '-' + month + "-" + day);
      if (user.userDetails.plan_validity && user.userDetails.plan_validity != "0000-00-00") {
        let planDate = new Date(user.userDetails.plan_validity);
        //      console.log("-----------can acces",d.getTime(),planDate.getTime(),(year+'-'+month+"-"+day));
        if (((user.userDetails.customer_state == "3" || user.userDetails.customer_state == "2" || user.userDetails.customer_state == "6") && (d.getTime() <= planDate.getTime())) || user.userDetails.customer_state == "7") {
          return true;
        } else {
          return false;
        }
      }
      else if (this.getRemainTime() > 0 || user.userDetails.customer_state == "7") {
        return true;
      }
      else {
        return false;
      }

    }
  }

  isFreeTrial() {
    if (this.isUserLoggedIn()) {
      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
      // console.log(user.userDetails.premium);
      let d = new Date();
      if (user.userDetails.plan_validity && user.userDetails.plan_validity != "0000-00-00") {
        let planDate = new Date(user.userDetails.plan_validity);
        if (user.userDetails.on_free_trial == "1" && d.getTime() <= planDate.getTime()) {
          return true;
        } else {
          return false;
        }
      }
      else {
        return false;
      }
    }
  }
  isCancelledPlan() {
    if (this.isUserLoggedIn()) {
      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
      if (user.userDetails.customer_state == "4") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  isPaymentFailed() {
    if (this.isUserLoggedIn()) {
      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
      if (user.userDetails.customer_state == "5") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  showTrial() {
    if (this.isUserLoggedIn()) {
      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
      if (user.userDetails.customer_state == "1") {
        return true;
      }
      else {
        return false;
      }
    }
  }

  isPendingCancellation() {

    //  if(user.userDetails.customer_state=="3"){
    if (this.isUserLoggedIn()) {

      let user = JSON.parse(localStorage.getItem(this.localStorageUserKey));
      // console.log(user.userDetails.premium);

      let d = new Date();
      if (user.userDetails.plan_validity && user.userDetails.plan_validity != "0000-00-00") {
        let planDate = new Date(user.userDetails.plan_validity);
        if (user.userDetails.customer_state == "3") {// && d.getTime()<=planDate.getTime()){
          return true;
        } else {
          return false;
        }
      }
      else {
        return false;
      }

    }
  }



  updateTotalTime(duration: any) {
    let l = JSON.parse(localStorage.getItem("totalPlayingTime"));
    if (l) {
      l = l + duration;
    }
    else {
      l = duration;
    }
    localStorage.setItem('totalPlayingTime', JSON.stringify(l));
  }



  getTotalTime() {
    let m = JSON.parse(localStorage.getItem("totalPlayingTime"));
    if (m) {
      return m;
    }
    else {
      return 0;
    }
  }

  resetTotalTime() {
    localStorage.setItem('totalPlayingTime', JSON.stringify(0));

  }



  updateRemainTime(duration) {

    localStorage.setItem('totalRemainTime', JSON.stringify(duration));



  }

  reduceRemainTime(duration) {
    let l = JSON.parse(localStorage.getItem("totalRemainTime"));
    if (l) {
      l = l - duration;
      localStorage.setItem('totalRemainTime', JSON.stringify(l));
    }

  }


  getRemainTime() {

    let m = JSON.parse(localStorage.getItem("totalRemainTime"));
    if (m) {
      return m;
    }


  }
  getRemainTimeInFormate() {
    let m = parseInt(this.getRemainTime());
    if (m >= 3600) {
      let k = Math.ceil(m / 3600);
      if (k > 1) {
        return k + " hours Free Use Remaining"
      }
      else {
        return k + " hour Free Use Remaining"
      }

    }
    else {
      let k = Math.ceil(m / 60);
      if (k > 1) {
        return k + " minutes Free Use Remaining"
      }
      else if (k == 1) {
        return k + " minute Free Use Remaining"
      }
      else {
        return "0 minute Free Use Remaining"
      }

    }
  }


  getHomeContent() {
    let cache = JSON.parse(localStorage.getItem("homecontentcache"));
    if (cache) {
      if (cache.length > 0) {
        return cache
      }
      else {
        return "0"
      }
    }
    else {
      return "0"
    }

  }
  addHomeContent(content) {
    localStorage.setItem("homecontentcache", JSON.stringify(content));
  }

  CallingFeature(number: any) {
    console.log(number);
    return new Promise((resolve, reject) => {
      this.callNumber.callNumber(number, true)
        .then(res => { resolve(res); console.log('Launched dialer!', res) })
        .catch(err => { reject(err); console.error('Error launching dialer', err) });
    })
  }

}
