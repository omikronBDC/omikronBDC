import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { AlertProvider } from '../alert/alert'

// let apiUrl = `https://www.bluediamondresearch.com/WEB01/ventapp/Api/`;
let apiUrl = `https://www.ventapp.tech/Api/`;

const validation = {
  "EMAIL": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  "PHONE": /^[0-9]{10,14}$/,
  "NPASS": /^[a-zA-Z0-9]{6,100}$/, //[a-zA-Z0-9]{6,100}  /^[0-9]{6,100}$/
  "postal_code": /^[0-9\ ]{4,8}$/,
  "onlyAlpha": /^[a-zA-Z\s]*$/
}




/*****************/
@Injectable()
export class RestApiProvider {
  localStorageUserKey = "yallaLanguage";
  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public alert: AlertProvider) {
    // console.log('Hello RestApiProvider Provider');
  }


  // presentAlert(message) {
  //
  //
  //
  //   let alert = this.alertCtrl.create({
  //     subTitle: 'GoFrakt',
  //     cssClass: 'simpleAlert',
  //     message: message,
  //     buttons: [{
  //     text:'Okay',
  //     cssClass:'cancel'
  //   }
  //     ]
  //   });
  //   alert.present();
  // }




  /***************************************************************************************************
  *******************************************POST DATA*************************************************
  ****************************************************************************************************/

  validation(data: any) {
    for (let key in data) {
      if (data[key].type != "NO") {
        if (data[key].value == null || data[key].value == "" || data[key].value === false ) {
          this.alert.showEmptyMessage(data[key].type);
          return 0;
        }
        else if (key == "confirmP" && (data[key].value != data["password"].value)) {
          this.alert.showMessage(data[key].type);
          return 0;
        }
        else {
          if (data[key].type == "EMAIL" || data[key].type == "PHONE" || data[key].type == "onlyAlpha" || data[key].type == "NPASS") {
            if (!validation[data[key].type].test(data[key].value)) {
              this.alert.showMessage(data[key].type);
              return 0;
            }
          }
        }
      }
    }
    return 1;
  }



  generateFormData(data: any) {
    let input = new FormData();
    for (let key in data) {
      if (key !== "confirmP" && key !== "terms") {
        if (data[key].name && data[key].value) {
          input.append(key, data[key].value, data[key].name);
        } else {
          input.append(key, data[key].value);
        }
      }
    }
    return input;
  }

  postData(data: any, url: string) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" });
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }

  postData_withoutLoder(data: any, url: string) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    //loader.present();
    let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" });
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }




  /***************************************************************************************************
  *******************************************GET DATA*************************************************
  ****************************************************************************************************/

  getUrlFromData(data: any) {

    let params = new HttpParams();

    for (let key in data) {
      params = params.append(key, data[key]);
    }
    return params;
  }

  get(data: any, spinner: any) {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: 'customloading'
    });
    if (spinner == "1") {
      loader.present();
    }
    let params = this.getUrlFromData(data);
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, { params: params })
        .toPromise()
        .then((response) => {
          resolve(response);
          loader.dismiss();
        })
        .catch((error) => {
          reject(error);
          loader.dismiss();
        });
    });
  }

  get_withurl(data: any, spinner: any, url: string) {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: 'customloading'
    });
    if (spinner == "1") {
      loader.present();
    }
    let params = this.getUrlFromData(data);
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + url, { params: params })
        .toPromise()
        .then((response) => {
          resolve(response);
          loader.dismiss();
        })
        .catch((error) => {
          reject(error);
          loader.dismiss();
        });
    });
  }



  check() {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, {})
        .toPromise()
        .then((response) => {
          resolve(response);

        })
        .catch((error) => {
          reject(error);

        });
    });
  }


  /***************************************************************************************************
*******************************************GET LANGUAGE DETAILS*************************************************
****************************************************************************************************/

  getUserLanguage() {
    let lang = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    return lang;
  }

  updateUserLanguage(lang: any) {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(lang));
  }





  getCountries() {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: 'customloading'
    });

    loader.present();


    return new Promise((resolve, reject) => {
      this.http.get("countries.json", {})
        .toPromise()
        .then((response) => {
          resolve(response);
          loader.dismiss();
        })
        .catch((error) => {
          reject(error);
          loader.dismiss();
        });
    });
  }


  getCurrentCountry() {

    let url = "http://www.geoplugin.net/json.gp";

    return new Promise((resolve, reject) => {
      this.http.get(url, {})
        .toPromise()
        .then((response: any) => {

          resolve(response);


        })
        .catch((error) => {

          reject(error);


        });
    });

  }

  getRates(CUR: string) {
    //  let url = "https://www.saareyrecords.com/Api/api.php?action=currency_convert&from=INR&tos=USD"
    let url = "https://free.currconv.com/api/v7/convert?q=" + CUR + "_USD&compact=ultra&apiKey=8c42958d50b1d4eeafb0";

    return new Promise((resolve, reject) => {
      this.http.get(url, {})
        .toPromise()

        .then((response: any) => {

          resolve(response[CUR + "_USD"]);


        })
        .catch((error) => {

          reject(error);


        });
    });

  }






}
