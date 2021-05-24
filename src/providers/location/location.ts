import { AlertProvider } from './../alert/alert';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/*
  Generated class for the LocationProvider provider.
​
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  currentLocation = {
    lat :0,
    lng:0,
    add:'',
  }
​
  constructor(public http: HttpClient, 
    public diagnostic: Diagnostic,
    public locationAccuracy: LocationAccuracy,
    public platform:Platform,
    public permission:AndroidPermissions,
    public alert:AlertProvider
    ) {
​
    console.log('Hello LocationProvider Provider');
  }
​
​check()
{
   return new Promise((resolve) => {
    if(this.platform.is("android") && this.platform.is("cordova")){
      this.diagnostic.isGpsLocationEnabled().then((res:any)=>{
        // console.log(false)
            if(res==false){
              this.ask().then((p)=>{
                if(p==false){
                  resolve(false);
                 //  this.check().then((ss))
                }
                else{
                  resolve(true)
                }
               console.log("----------gps native alert response",p);
                 
              })
            }
            else{
              console.log("----------gps is on");
              resolve(true);
          
    
                   // resolve(m);
            
            }
         
      },(err)=>{
           resolve(false);
      })
  }
})
}
​
  check1(){
    return new Promise((resolve) => {
    if(this.platform.is("android") && this.platform.is("cordova")){
      this.diagnostic.isGpsLocationEnabled().then((res:any)=>{
            if(res==false){
              this.ask().then((p)=>{
                  if(p==true){
                    this.checkPermission().then((m)=>{
    
                       resolve(m);
                    
                    });
                  }
                  else{
                    resolve(p);
                  }
               
                 
              })
            }
            else{
              //resolve(true);
              this.checkPermission().then((m)=>{
    
                    resolve(m);
                  
              });
            }
         
      },(err)=>{
           resolve(false);
      })
  }
  else if(this.platform.is("ios") && this.platform.is("cordova")){
            this.diagnostic.isLocationEnabled().then((status)=>{
            if(status==true){
                resolve(true);
            }
            else{
              resolve(false)
               // this.presentAlert("För att fortsätta, vänligen sätt på platstjänster");
            }
      });
  }
  });
​
​
​
}
​
​
ask(){
  return new Promise((resolve) => {
    this.locationAccuracy.canRequest().then((canRequest:boolean)=>{
     // if(canRequest){
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
​
          (success)=>{
            resolve(true);
​
          },
          (error)=>{
              resolve(false);
          }
          );
   //   }
      // else{
      //   resolve(false);
      // }
      });
  });
}
​
​
checkPermission(){
  return new Promise((resolve) => {
​
  this.diagnostic.getPermissionsAuthorizationStatus([this.diagnostic.permission.ACCESS_COARSE_LOCATION]).then((status)=>{
    console.log('get permission authorization status--------------------------------------', status);
    if(status.ACCESS_COARSE_LOCATION=="NOT_REQUESTED" || status.ACCESS_COARSE_LOCATION=="DENIED_ONCE"){
      console.log(status.ACCESS_COARSE_LOCATION);
      this.permission.requestPermission(this.permission.PERMISSION.ACCESS_COARSE_LOCATION).then((res)=>{
         console.log("request permission",res);
        if(res.hasPermission==false){
          this.alert.showAsync("Alert!","until you are not allow location access for app you can't use it, please do it").then((res)=>{
            this.checkPermission().then((a)=>{
              if(a==true){
               resolve(true);
              }
                
           }) 
          })
​
        }
        else{
          resolve(true);
        }
        
      }).catch((err)=>{
        console.log("request permission errr", err);
      })
    }
    else if (status.ACCESS_COARSE_LOCATION=="GRANTED" ){
      console.log("granted");
      resolve(true);
    }
  })
​
});
​
  
​
​
​
​
​
  // this.permission.checkPermission(this.permission.PERMISSION.ACCESS_COARSE_LOCATION).then(
  //   result => {
  //     console.log('check permission result',result);
  //     if(result.hasPermission==false){
  //       this.permission.requestPermission(this.permission.PERMISSION.ACCESS_COARSE_LOCATION)
  //       console.log("permission requestede for location");
  //     }
   
  //   },
  //   err => {
  //     console.log('check permission err',err);
  //     this.permission.requestPermission(this.permission.PERMISSION.ACCESS_COARSE_LOCATION).then((res)=>{
​
  //     })
  //   }
  // );
  
}
​
}