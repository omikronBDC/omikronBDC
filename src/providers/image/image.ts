import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import {AlertController} from 'ionic-angular';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(
    public http: HttpClient, 
    public camera:Camera,
    public alertCtrl:AlertController
    ) {
    console.log('Hello ImageProvider Provider');
  }

  getImageByCamera(){
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          quality: 100,
          destinationType : this.camera.DestinationType.DATA_URL,
          sourceType      : this.camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: this.camera.EncodingType.JPEG,
          targetHeight: 1000,
          targetWidth:1000,
          saveToPhotoAlbum: false,
          correctOrientation: true

        }).then((data) => {
          resolve('data:image/jpeg;base64,' + data);
        }, (err) => {
            reject('Unable to take photo: ' + err);
        })
      }
      else{
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
        }
      }
    });
  }



  getImage(){
    return new Promise((resolve, reject) => {
    if (Camera['installed']()) {

      this.alertCtrl.create({
          title: 'Crear foto del producto',
          message: '¿Tomar foto o seleccionar de galería?',
          buttons: [
          {
              text: 'Cancelar',
              handler: data => { }
          },
          {
              text: 'Elegir de galeria de fotos',
              handler: () => {

    

              this.camera.getPicture({
                quality: 100,
                destinationType : this.camera.DestinationType.DATA_URL,
                sourceType      : this.camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: this.camera.EncodingType.JPEG,
                targetHeight: 1000,
                targetWidth:1000,
                saveToPhotoAlbum: false,
                correctOrientation: true

              }).then((data) => {
                resolve('data:image/jpeg;base64,' + data);
              }, (err) => {
                  reject('Unable to take photo: ' + err);
              })


              }
          },
          {
              text: 'Tomar foto',
              handler: () => {

              this.camera.getPicture({
                  quality: 100,
                  destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  saveToPhotoAlbum: false,
                  targetHeight: 1000,
                  targetWidth:1000,
                  correctOrientation: true
              }).then((data) => {
                resolve('data:image/jpeg;base64,' + data);
              }, (err) => {
                reject('Unable to take photo: ' + err);
              })

              }
          }
          ]
      }).present();



        } else {
            var self = this;
            var file  = document.createElement("INPUT");
            file.setAttribute("type", "file");
            file.style.height="0px";
            file.style.visibility="hidden";
            file.click();
            file.onchange = function(ev:any){
              self.getWebImage(ev.target.files[0]).then((res:any)=>{
                resolve(res);            
              });
            }
      }
  });
}




getGalleryimages(){
  return new Promise((resolve, reject) => {
  if (Camera['installed']()) {
    this.camera.getPicture({
      quality: 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType      : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      targetWidth:1000,
      saveToPhotoAlbum: false,
      correctOrientation: true

    }).then((data) => {
      resolve('data:image/jpeg;base64,' + data);
    }, (err) => {
        reject('Unable to take photo: ' + err);
    })

   


      } else {
          var self = this;
          var file  = document.createElement("INPUT");
          file.setAttribute("type", "file");
          file.style.height="0px";
          file.style.visibility="hidden";
          file.click();
          file.onchange = function(ev:any){
            self.getWebImage(ev.target.files[0]).then((res:any)=>{
              resolve(res);            
            });
          }
    }
});
}
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  imgURItoBlob(dataURI) {
    return new Promise((resolve, reject) => {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    console.log(mimeString);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    resolve(new Blob([new Uint8Array(array)], {
          type: mimeString
        })); 
  });
}

imgURItoBlob2(dataURI) {

  var binary = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  console.log(mimeString);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {
    type: mimeString
  });
}


getWebImage(imagefile:any){
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        resolve(imageData);
        console.log(imageData);
    };
    reader.readAsDataURL(imagefile);    
  });

}


  imgURLtoURI(imagefile:any){
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL();
        resolve(dataURL);
        canvas = null;
      };
      img.src = imagefile;
  
    });

}

generateImageName(name){
    let ext = this.getImageExt(name);
    return  new Date().getTime() + '.'+ext;
}

getImageExt(name){
  return name.substr(name.lastIndexOf('.') + 1);
}

}
