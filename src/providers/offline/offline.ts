import { Platform, Events } from 'ionic-angular';
import { AuthProvider } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DomSanitizer } from '@angular/platform-browser';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, IWriteOptions } from '@ionic-native/file';
@Injectable()
export class OfflineProvider {
  productDetail: any;
  newsDetail: any;
  constructor(public http: HttpClient,
    public sqlite: SQLite,
    public auth: AuthProvider,
    public sanitizer: DomSanitizer,
    public platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    public events: Events) {
    console.log('Hello OfflineProvider Provider');
  }

  getclientlist() {
    return new Promise((resolve, reject) => {
      console.log("dddddd get list of download");
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventclientlist WHERE user_id ='" + this.auth.getCurrentUserId() + "' ORDER BY id DESC", [])
            .then(res => {
              let clientList = [];
              for (var i = 0; i < res.rows.length; i++) {
                // let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).thumbnail_image))
                clientList.push({ id: res.rows.item(i).id, client_name: res.rows.item(i).client_name, permanent_location: res.rows.item(i).permanent_location, client_contact: JSON.parse(res.rows.item(i).client_contact) })
                if (i == (res.rows.length - 1)) {
                  resolve(clientList)
                }
              }
            })
            .catch(e => {
              console.log("dddddd error on get client list", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db", e);
        });
    });
  }


  updateClientList(arr) {
    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM ventclientlist WHERE user_id = ' + this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("dddddd DELETE client sucess", res);
          })
          .catch(e => {
            console.log("dddddd error on client DELETE ", e);
          });

      }).catch(e => {
        console.log("dddddd client update error on get", e);
      });



    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS ventclientlist(id INTEGER PRIMARY KEY, user_id INTEGER(10), client_name TEXT, permanent_location TEXT, client_contact TEXT,billing_address TEXT,billing_postcode TEXT,client_id INTEGER(10),client_type TEXT,created_at TEXT,email TEXT,iban TEXT,lat TEXT,lng TEXT,note TEXT,phone TEXT,region TEXT,sales_note TEXT,shipping_address TEXT,shipping_postcode TEXT,updated_at TEXT,vistilist TEXT,zipcode TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("dddddd success on create table", r);
            })
            .catch(e => {
              console.log("dddddd error on create table", e);
            });

          db.executeSql("SELECT * FROM ventclientlist WHERE id ='" + arr[obj].id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM ventclientlist WHERE id = ' + arr[obj].id + ';', [])
                  .then(res => {
                    console.log("dddddd DELETE client sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on client DELETE ", e);
                  });

                let q = "INSERT INTO ventclientlist (id,user_id,client_name,permanent_location,client_contact,billing_address,billing_postcode, client_id, client_type,created_at, email, iban, lat, lng, note,phone,region,sales_note,shipping_address,shipping_postcode,updated_at,vistilist,zipcode) VALUES('"
                  + arr[obj].id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + arr[obj].client_name + "','"
                  + arr[obj].permanent_location + "','"
                  + JSON.stringify(arr[obj].client_contact) + "','"
                  + arr[obj].billing_address + "','"
                  + arr[obj].billing_postcode + "','"
                  + arr[obj].client_id + "','"
                  + arr[obj].client_type + "','"
                  + arr[obj].created_at + "','"
                  + arr[obj].email + "','"
                  + arr[obj].iban + "','"
                  + arr[obj].lat + "','"
                  + arr[obj].lng + "','"
                  + arr[obj].note + "','"
                  + arr[obj].phone + "','"
                  + JSON.stringify(arr[obj].region) + "','"
                  + arr[obj].sales_note + "','"
                  + arr[obj].shipping_address + "','"
                  + arr[obj].shipping_postcode + "','"
                  + arr[obj].updated_at + "','"
                  + JSON.stringify(arr[obj].vistilist) + "','"
                  + arr[obj].zipcode + "')";
                //  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('ventclientlist querry if -------', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("dddddd insert clientlist sucess after delete", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on insert after delete", e);
                  });

              } else {
                let q = "INSERT INTO ventclientlist (id,user_id,client_name,permanent_location,client_contact,billing_address,billing_postcode, client_id, client_type,created_at, email, iban, lat, lng, note,phone,region,sales_note,shipping_address,shipping_postcode,updated_at,vistilist,zipcode) VALUES('"
                  + arr[obj].id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + arr[obj].client_name + "','"
                  + arr[obj].permanent_location + "','"
                  + JSON.stringify(arr[obj].client_contact) + "','"
                  + arr[obj].billing_address + "','"
                  + arr[obj].billing_postcode + "','"
                  + arr[obj].client_id + "','"
                  + arr[obj].client_type + "','"
                  + arr[obj].created_at + "','"
                  + arr[obj].email + "','"
                  + arr[obj].iban + "','"
                  + arr[obj].lat + "','"
                  + arr[obj].lng + "','"
                  + arr[obj].note + "','"
                  + arr[obj].phone + "','"
                  + JSON.stringify(arr[obj].region) + "','"
                  + arr[obj].sales_note + "','"
                  + arr[obj].shipping_address + "','"
                  + arr[obj].shipping_postcode + "','"
                  + arr[obj].updated_at + "','"
                  + JSON.stringify(arr[obj].vistilist) + "','"
                  + arr[obj].zipcode + "')";
                //  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('ventclientlist querry else-------', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("dddddd insert clientlist sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on insert ", e);
                  });
              }

            })
            .catch(e => {
              console.log("dddddd client update error on get", e);
            });

        }).catch(e => {
        });
    }
  }


  getproductlist() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventproductlist WHERE user_id ='" + this.auth.getCurrentUserId() + "' ORDER BY id DESC", [])
            .then(res => {
              let productList = [];

              console.log('product list from DB-----',res);
              // let imgArr= res.rows.item(i).product_img;
              // for (let index = 0; index < imgArr.length; index++) {

              // }
              for (var i = 0; i < res.rows.length; i++) {
                let k = JSON.parse(res.rows.item(i).product_img);
                if (k.length > 0) {
                  for (let index = 0; index < k.length; index++) {
                    let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(k[index].image));
                    k[index].image = mm;
                  }
                }
                productList.push({ id: res.rows.item(i).id, Company_name: res.rows.item(i).Company_name, description: res.rows.item(i).description, name: res.rows.item(i).name, product_venter: JSON.parse(res.rows.item(i).product_venter), product_img: k, short_description: res.rows.item(i).short_description })
                if (i == (res.rows.length - 1)) {
                }
                console.log('product insert -----'+ k.length,productList);
              }
              resolve(productList);
            })
            .catch(e => {
              console.log("dddddd error on get product list", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get product list", e);
        });
    });
  }

  updateProductList(arr) {

    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM ventproductlist WHERE user_id = ' + this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("dddddd DELETE before ventproductlist create sucess", res);
          })
          .catch(e => {
            console.log("dddddd error on DELETE before ventproductlist create ", e);
          });

      }).catch(e => {
        console.log("dddddd DELETE before ventproductlist create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      console.log('product arr length',arr.length);
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS ventproductlist(id INTEGER PRIMARY KEY, user_id INTEGER(10), Company_name TEXT, description TEXT, name TEXT, product_venter TEXT,product_img TEXT,short_description TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("dddddd success on create ventproductlist table", r);
            })
            .catch(e => {
              console.log("dddddd error on create ventproductlist table", e);
            });

          db.executeSql("SELECT * FROM ventproductlist WHERE id ='" + arr[obj].id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM ventproductlist WHERE id = ' + arr[obj].id + ';', [])
                  .then(res => {
                    console.log("dddddd DELETE ventproductlist sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on ventproductlist DELETE ", e);
                  });

                let k = arr[obj].product_img;

                if (arr[obj].product_img) {
                  for (let index = 0; index < k.length; index++) {
                    this.downloadThumb(k[index].image).then((res) => {
                      k[index].image = res;
                      console.log('download image-------------------', k[index].image);
                      if (index == (k.length - 1)) {
                        let query = "INSERT INTO ventproductlist (id,user_id,Company_name,description,name,product_venter,product_img,short_description) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].Company_name + "','" + arr[obj].description + "','" + arr[obj].name + "','" + JSON.stringify(arr[obj].product_venter) + "','" + JSON.stringify(k) + "','" + arr[obj].short_description + "')"
                        db.executeSql(query, [])
                          .then(res => {
                            // console.log("dddddd insert ventproductlist sucess after delete", res);
                            console.log("newconsole insert ventproductlist sucess after delete", query,res);
                          })
                          .catch(e => {
                            // console.log("dddddd error on ventproductlist insert after delete", e);
                            console.log("newconsole insert ventproductlist sucess after delete", query,e);
                          });
                      }
                    });
                  }
                } else {
                  k = [];
                  let  q = "INSERT INTO ventproductlist (id,user_id,Company_name,description,name,product_venter,product_img,short_description) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].Company_name + "','" + arr[obj].description + "','" + arr[obj].name + "','" + JSON.stringify(arr[obj].product_venter) + "','" + JSON.stringify(k) + "','" + arr[obj].short_description + "')"
                  db.executeSql(q, [])
                    .then(res => {
                      console.log("newconsole insert ventproductlist sucess after delete",q, res);
                    })
                    .catch(e => {
                      console.log("newconsole error on ventproductlist insert after delete",q, e);
                    });
                }



              } else {



                let k = arr[obj].product_img;

                if (arr[obj].product_img) {
                  for (let index = 0; index < k.length; index++) {
                    this.downloadThumb(k[index].image).then((res) => {
                      k[index].image = res;
                      console.log('download image-------------------', k[index].image);
                      if (index == (k.length - 1)) {
                        let q = "INSERT INTO ventproductlist (id,user_id,Company_name,description,name,product_venter,product_img,short_description) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].Company_name + "','" + arr[obj].description.replace("'","") + "','" + arr[obj].name + "','" + JSON.stringify(arr[obj].product_venter) + "','" + JSON.stringify(k) + "','" + arr[obj].short_description + "')"
                        db.executeSql(q, [])
                          .then(res => {
                            console.log("newconsole insert ventproductlist sucess after delete",q, res);
                          })
                          .catch(e => {
                            console.log("newconsole error on ventproductlist insert after delete",q, e);
                          });
                      }
                    });
                  }
                } else {
                  k = [];
                  let q = "INSERT INTO ventproductlist (id,user_id,Company_name,description,name,product_venter,product_img,short_description) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].Company_name + "','" + arr[obj].description.replace("'","") + "','" + arr[obj].name + "','" + JSON.stringify(arr[obj].product_venter) + "','" + JSON.stringify(k) + "','" + arr[obj].short_description + "')"
                  db.executeSql(q, [])
                    .then(res => {
                      console.log("newconsole insert ventproductlist sucess after delete", q,res);
                    })
                    .catch(e => {
                      console.log("newconsole error on ventproductlist insert after delete",q, e);
                    });
                }
              }
            })
            .catch(e => {
              console.log("dddddd ventproductlist update error on get", e);
            });

        }).catch(e => {
        });
    }
  }


  downloadThumb(song: any) {

    return new Promise((resolve, reject) => {
      let url = song;
      console.log('url=====================', url);

      var filename = this.auth.getCurrentUserId() + (url.substring(url.lastIndexOf('/') + 1));
      var imageurl = this.file.externalDataDirectory + filename;//.replace(/^file:\/\//, '')
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(url, imageurl).then((entry) => {
        resolve(imageurl);
      }, error => {
        resolve("0");
      });
    })
  }

  getProductDetail(id) {

    return new Promise((resolve, reject) => {

      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventproductlist WHERE id ='" + id + "'", [])
            .then(res => {
              // this.clientList = [];
              console.log('Product detail--------------', res);

              for (var i = 0; i < res.rows.length; i++) {
                // let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).thumbnail_image))
                // this.clientList.push({ id: res.rows.item(i).id, Company_name: res.rows.item(i).Company_name, description: res.rows.item(i).description, name: res.rows.item(i).name, product_venter: JSON.parse(res.rows.item(i).product_venter), product_img: JSON.parse(res.rows.item(i).product_img) })
                let k = JSON.parse(res.rows.item(i).product_img);
                if (k.length > 0) {
                  for (let index = 0; index < k.length; index++) {
                    let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(k[index].image));
                    k[index].image = mm;
                  }
                }
                if (i == res.rows.length - 1) {
                  this.productDetail = { id: res.rows.item(i).id, Company_name: res.rows.item(i).Company_name, description: res.rows.item(i).description, name: res.rows.item(i).name, product_venter: JSON.parse(res.rows.item(i).product_venter), product_img: k };
                  console.log('this.productDetail------------', this.productDetail);
                  resolve(this.productDetail);
                }
              }

            })
            .catch(e => {
              console.log("dddddd error on get product list", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get product list", e);
        });
    })
  }


  getnewslist() {
    return new Promise((resolve, reject) => {

      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventnewslist WHERE user_id ='" + this.auth.getCurrentUserId() + "' ORDER BY id DESC", [])
            .then(res => {
              let newsList = [];
              // let imgArr= res.rows.item(i).product_img;
              // for (let index = 0; index < imgArr.length; index++) {

              // }
              for (var i = 0; i < res.rows.length; i++) {
                let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).image))
                newsList.push({ id: res.rows.item(i).id, created_at: res.rows.item(i).created_at, description: res.rows.item(i).description, image: mm, short_description: res.rows.item(i).short_description, title: res.rows.item(i).title })
                console.log('News List in offline provider 111111----------------', newsList);
                console.log('==================i,length ', i, '  ', res.rows.length - 1);

                if (i == (res.rows.length - 1)) {
                  console.log('News List in offline provider----------------', newsList);
                  resolve(newsList);
                }
              }
            })
            .catch(e => {
              console.log("dddddd error on get product list", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get product list", e);
        });
    });
  }

  updateNewsList(arr) {

    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM ventnewslist WHERE user_id = ' + this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("dddddd DELETE before ventnewslist create sucess", res);
          })
          .catch(e => {
            console.log("dddddd error on DELETE before ventnewslist create ", e);
          });

      }).catch(e => {
        console.log("dddddd DELETE before ventnewslist create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS ventnewslist(id INTEGER PRIMARY KEY, user_id INTEGER(10), created_at TEXT, description TEXT, image TEXT,short_description TEXT, title TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("dddddd success on create ventnewslist table", r);
            })
            .catch(e => {
              console.log("dddddd error on create ventnewslist table", e);
            });

          db.executeSql("SELECT * FROM ventnewslist WHERE id ='" + arr[obj].id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM ventnewslist WHERE id = ' + arr[obj].id + ';', [])
                  .then(res => {
                    console.log("dddddd DELETE ventnewslist sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on ventnewslist DELETE ", e);
                  });

                let k = arr[obj].image;
                if (k) {
                  // for (let index = 0; index < k.length; index++) {
                  this.downloadThumb(k).then((res) => {
                    k = res;
                    console.log('download image-------------------', k);
                    db.executeSql("INSERT INTO ventnewslist (id,user_id,created_at,description,image,short_description,title) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].created_at + "','" + arr[obj].description + "','" + k + "','" + arr[obj].short_description + "','" + arr[obj].title + "')", [])
                      .then(res => {
                        console.log("dddddd insert ventnewslist sucess after delete", res);
                      })
                      .catch(e => {
                        console.log("dddddd error on ventnewslist insert after delete", e);
                      });
                  });
                  // }
                } else {
                  k = '';
                  db.executeSql("INSERT INTO ventnewslist (id,user_id,created_at,description,image,short_description,title) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].created_at + "','" + arr[obj].description + "','" + k + "','" + arr[obj].short_description + "','" + arr[obj].title + "')", [])
                    .then(res => {
                      console.log("dddddd insert ventnewslist sucess after delete", res);
                    })
                    .catch(e => {
                      console.log("dddddd error on ventnewslist insert after delete", e);
                    });
                }




              } else {


                let k = arr[obj].image;
                if (k) {
                  // for (let index = 0; index < k.length; index++) {
                  this.downloadThumb(k).then((res) => {
                    k = res;
                    console.log('download image-------------------', k);
                    db.executeSql("INSERT INTO ventnewslist (id,user_id,created_at,description,image,short_description,title) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].created_at + "','" + arr[obj].description + "','" + k + "','" + arr[obj].short_description + "','" + arr[obj].title + "')", [])
                      .then(res => {
                        console.log("dddddd insert ventnewslist sucess after delete", res);
                      })
                      .catch(e => {
                        console.log("dddddd error on ventnewslist insert after delete", e);
                      });
                  });
                  // }
                } else {
                  k = '';
                  db.executeSql("INSERT INTO ventnewslist (id,user_id,created_at,description,image,short_description,title) VALUES('" + arr[obj].id + "','" + this.auth.getCurrentUserId() + "','" + arr[obj].created_at + "','" + arr[obj].description + "','" + k + "','" + arr[obj].short_description + "','" + arr[obj].title + "')", [])
                    .then(res => {
                      console.log("dddddd insert ventnewslist sucess after delete", res);
                    })
                    .catch(e => {
                      console.log("dddddd error on ventnewslist insert after delete", e);
                    });
                }
              }

            })
            .catch(e => {
              console.log("dddddd ventnewslist update error on get", e);
            });

        }).catch(e => {
        });
    }
  }


  getNewsDetail(id) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventnewslist WHERE id ='" + id + "'", [])
            .then(res => {
              // this.clientList = [];
              console.log('News detail--------------', res);

              for (var i = 0; i < res.rows.length; i++) {
                if (i == res.rows.length - 1) {
                  let k = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).image));
                  console.log('sanitized k--------------', k);
                  this.newsDetail = { id: res.rows.item(i).id, created_at: res.rows.item(i).created_at, description: res.rows.item(i).description, image: k, short_description: res.rows.item(i).short_description, title: res.rows.item(i).title, };
                  console.log('this.newsDetail------------', this.newsDetail);
                  resolve(this.newsDetail);
                }
              }

            })
            .catch(e => {
              console.log("dddddd error on get news detail", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get news detail", e);
        });
    })
  }

  get_client_detail(client_id: any) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM ventclientlist WHERE id ='" + client_id + "'", [])
            .then(res => {
              // this.clientList = [];
              console.log('News detail--------------', res);
              // resolve(res);  
              // id,user_id,client_name,permanent_location,client_contact,billing_address,billing_postcode, client_id, client_type,created_at, email, iban, lat, lng, note,phone,region,sales_note,shipping_address,shipping_postcode,updated_at,vistilist,zipcode
              var client_detail;
              for (var i = 0; i < res.rows.length; i++) {
                if (i == res.rows.length - 1) {
                  client_detail = {
                    id: res.rows.item(i).id, user_id: res.rows.item(i).user_id, client_name: res.rows.item(i).client_name, permanent_location: res.rows.item(i).permanent_location,
                    client_contact: JSON.parse(res.rows.item(i).client_contact), billing_address: res.rows.item(i).billing_address,
                    billing_postcode: res.rows.item(i).billing_postcode, client_id: res.rows.item(i).client_id,
                    client_type: res.rows.item(i).client_type, created_at: res.rows.item(i).created_at, email: res.rows.item(i).email, iban: res.rows.item(i).iban, lat: res.rows.item(i).lat, lng: res.rows.item(i).lng, note: res.rows.item(i).note, phone: res.rows.item(i).phone, region: JSON.parse(res.rows.item(i).region), sales_note: res.rows.item(i).sales_note, shipping_address: res.rows.item(i).shipping_address, shipping_postcode: res.rows.item(i).shipping_postcode, updated_at: res.rows.item(i).updated_at,
                    vistilist: JSON.parse(res.rows.item(i).vistilist),
                    zipcode: res.rows.item(i).zipcode,
                  };
                }
              }
              console.log('client_detail offlineP------------', client_detail);
              resolve(client_detail);
            })
            .catch(e => {
              console.log("dddddd error on get client detail", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get client detail", e);
        });
    })
  }

  // Update_clientOrderhistory(array:[]){
  //  console.log('Update_clientOrderhistory--------',array);
  //  this.sqlite.create({
  //   name: 'Ventapp.db',
  //   location: 'default'
  //  }).then((db:SQLiteObject) => {
  //    db.executeSql('CREATE TABLE IF NOT EXISTS other_history(id INTEGER PRIMARY KEY, user_id INTEGER(10), created_at TEXT, description TEXT, image TEXT,short_description TEXT, title TEXT), []')
  //  })
  // }

  Update_clientOrderhistory(arr: any, client_id: any) {
    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM other_history WHERE user_id= '
          + this.auth.getCurrentUserId() + ";", [])
          .then(res => {
            console.log("dddddd DELETE before other_history create sucess", res);

          })
          .catch(e => {
            console.log("dddddd error on DELETE before other_history create ", e);
          });


      }).catch(e => {
        console.log("dddddd DELETE before other_history create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS other_history(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER(10),user_id INTEGER(10),client_id INTEGER(10), create_date TEXT, add_not TEXT, client_name TEXT,image TEXT, order_item TEXT,signature TEXT,total_cost INTEGER(10))', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("dddddd success on create other_history table", r);
            })
            .catch(e => {
              console.log("dddddd error on create other_history table", e);
            });

          db.executeSql("SELECT * FROM other_history WHERE id ='" + arr[obj].id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM other_history WHERE id = ' + arr[obj].id + ';', [])
                  .then(res => {
                    console.log("dddddd DELETE other_history sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on other_history DELETE ", e);
                  });






                this.downloadThumb(arr[obj].image).then((res) => {
                  let k = res;
                  console.log('download image k-------------------', k);
                  this.downloadThumb(arr[obj].signature).then((res1) => {
                    let s = res1;
                    console.log('download image s-------------------', s);

                    let q = "INSERT INTO other_history (order_id ,user_id,client_id, create_date , add_not , client_name ,image , order_item ,signature ,total_cost) VALUES('"
                      // + arr[obj].id + "','"
                      + arr[obj].order_id + "','"
                      + this.auth.getCurrentUserId() + "','"
                      + client_id + "','"
                      + arr[obj].create_date + "','"
                      + arr[obj].add_not + "','"
                      + arr[obj].client_name + "','"
                      + k + "','"
                      + JSON.stringify(arr[obj].order_item) + "','"
                      + s + "','"
                      + arr[obj].total_cost + "')";

                    console.log('order_history--------', q);

                    db.executeSql(q, [])
                      .then(res => {
                        console.log("dddddd insert other_history sucess after delete", res);
                      })
                      .catch(e => {
                        console.log("dddddd error on other_history insert after delete", e);
                      });
                  });
                });








              } else {

                this.downloadThumb(arr[obj].image).then((res) => {
                  let k = res;
                  console.log('download image k-------------------', k);
                  this.downloadThumb(arr[obj].signature).then((res1) => {
                    let s = res1;
                    console.log('download image ss-------------------', s);

                    let q = "INSERT INTO other_history (order_id ,user_id,client_id, create_date , add_not , client_name ,image , order_item ,signature ,total_cost) VALUES('"
                      // + arr[obj].id + "','"
                      + arr[obj].order_id + "','"
                      + this.auth.getCurrentUserId() + "','"
                      + client_id + "','"
                      + arr[obj].create_date + "','"
                      + arr[obj].add_not + "','"
                      + arr[obj].client_name + "','"
                      + k + "','"
                      + JSON.stringify(arr[obj].order_item) + "','"
                      + s + "','"
                      + arr[obj].total_cost + "')";

                    console.log('order_history--------', q);

                    db.executeSql(q, [])
                      .then(res => {
                        console.log("dddddd insert other_history sucess after delete", res);
                      })
                      .catch(e => {
                        console.log("dddddd error on other_history insert after delete", e);
                      });
                  });
                });
              }

            })
            .catch(e => {
              console.log("dddddd other_history update error on get", e);
            });

        }).catch(e => {
        });
    }

  }


  get_orderhistory(client_id: any) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          db.executeSql("SELECT * FROM other_history WHERE client_id ='"
            + client_id + "'", []).then((res: any) => {
              console.log('order_history offlineP----', res);
              let order_history = [];
              let o = {};
              for (var i = 0; i < res.rows.length; i++) {
                // if (i == res.rows.length - 1) {
                let j = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).image));
                let s = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).signature))
                o = {
                  order_id: res.rows.item(i).order_id, user_id: res.rows.item(i).user_id,
                  create_date: res.rows.item(i).create_date, add_not: res.rows.item(i).add_not,
                  client_name: res.rows.item(i).client_name, image: j,
                  order_item: JSON.parse(res.rows.item(i).order_item), signature: s,
                  total_cost: res.rows.item(i).total_cost
                };
                order_history.push(o);
                // }
              }
              console.log('order_history offlineP----', order_history);
              resolve(order_history);
            })
        }).catch(e => console.error(e));
    })
  }


  get_order_detail(order_id: any) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          db.executeSql("SELECT * FROM other_history WHERE order_id ='"
            + order_id + "'", []).then((res: any) => {
              console.log('order detail offlineP----', res);
              let o = {};
              let order_history_detail = [];
              for (var i = 0; i < res.rows.length; i++) {
                // if (i == res.rows.length - 1) {
                let j = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).image));
                let s = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).signature))
                o = {
                  order_id: res.rows.item(i).order_id, user_id: res.rows.item(i).user_id,
                  create_date: res.rows.item(i).create_date, add_not: res.rows.item(i).add_not,
                  client_name: res.rows.item(i).client_name, image: j,
                  order_item: JSON.parse(res.rows.item(i).order_item), signature: s,
                  total_cost: res.rows.item(i).total_cost
                };
                order_history_detail.push(o)
                // }
              }
              console.log('order detail offlineP----', order_history_detail);
              resolve(order_history_detail);
            })
        }).catch(e => console.error(e));
    })
  }


  pastVisity_update(arr: any, client_id: any) {
    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM pastvisit WHERE user_id = ' + this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("DELETE before pastvisit create sucess", res);
          })
          .catch(e => {
            console.log("error on DELETE before pastvisit create ", e);
          });

      }).catch(e => {
        console.log("DELETE before pastvisit create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS pastvisit(id INTEGER PRIMARY KEY, client_id INTEGER(10), user_id INTEGER(10),client TEXT, visit_data TEXT,order_history TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("success on create pastvisit table", r);
            })
            .catch(e => {
              console.log("error on create pastvisit table", e);
            });

          db.executeSql("SELECT * FROM pastvisit WHERE id ='" + arr[obj].visit_data.id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM pastvisit WHERE id = ' + arr[obj].visit_data.id + ';', [])
                  .then(res => {
                    console.log("DELETE pastvisit sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on pastvisit DELETE ", e);
                  });

                let q = "INSERT INTO pastvisit (id,client_id,user_id,client,visit_data,order_history) VALUES('"
                  + arr[obj].visit_data.id + "','"
                  + client_id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + JSON.stringify(arr[obj].client) + "','"
                  + JSON.stringify(arr[obj].visit_data) + "','"
                  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('insert into qurey1', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("insert pastvisit sucess after delete", res);
                  })
                  .catch(e => {
                    console.log("error on pastvisit insert after delete", e);
                  });

              } else {
                let q = "INSERT INTO pastvisit (id,client_id,user_id,client,visit_data,order_history) VALUES('"
                  + arr[obj].visit_data.id + "','"
                  + client_id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + JSON.stringify(arr[obj].client) + "','"
                  + JSON.stringify(arr[obj].visit_data) + "','"
                  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('insert into qurey2', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("insert pastvisit sucess", res);
                  })
                  .catch(e => {
                    console.log("error on pastvisit insert ", e);
                  });
              }

            })
            .catch(e => {
              console.log("pastvisit update error on get", e);
            });

        }).catch(e => {
        });
    }
  }

  get_pastVisit(id) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          // db.executeSql("SELECT * FROM ventproductlist WHERE id ='" + id + "'", [])
          db.executeSql("SELECT * FROM pastvisit WHERE client_id ='" + id + "'", []).then((res: any) => {
            console.log('pastvisit offlineP----', res);
            let pastvisit = [];
            let o = {};
            for (var i = 0; i < res.rows.length; i++) {
              // if (i == res.rows.length - 1) {
              o = {
                user_id: res.rows.item(i).user_id,
                client: JSON.parse(res.rows.item(i).client),
                visit_data: JSON.parse(res.rows.item(i).visit_data),
                order_history: JSON.parse(res.rows.item(i).order_history)
              };
              pastvisit.push(o);
              // }
            }
            console.log('pastvisit offlineP----', pastvisit);
            resolve(pastvisit);
          })
        }).catch(e => console.error(e));
    })
  }

  nextVisity_update(arr: any, client_id: any) {
    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM nextvisit WHERE user_id = ' +
          this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("DELETE before nextvisit create sucess", res);
          })
          .catch(e => {
            console.log("error on DELETE before nextvisit create ", e);
          });

      }).catch(e => {
        console.log("DELETE before nextvisit create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS nextvisit(id INTEGER PRIMARY KEY, client_id INTEGER(10), user_id INTEGER(10),client TEXT, visit_data TEXT,order_history TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("success on create nextvisit table", r);
            })
            .catch(e => {
              console.log("error on create nextvisit table", e);
            });

          db.executeSql("SELECT * FROM nextvisit WHERE id ='" + arr[obj].visit_data.id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM nextvisit WHERE id = ' + arr[obj].visit_data.id + ';', [])
                  .then(res => {
                    console.log("DELETE nextvisit sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on nextvisit DELETE ", e);
                  });

                let q = "INSERT INTO nextvisit (id,client_id,user_id,client,visit_data,order_history) VALUES('"
                  + arr[obj].visit_data.id + "','"
                  + client_id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + JSON.stringify(arr[obj].client) + "','"
                  + JSON.stringify(arr[obj].visit_data) + "','"
                  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('insert into qurey1', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("insert nextvisit sucess after delete", res);
                  })
                  .catch(e => {
                    console.log("error on nextvisit insert after delete", e);
                  });

              } else {
                let q = "INSERT INTO nextvisit (id,client_id,user_id,client,visit_data,order_history) VALUES('"
                  + arr[obj].visit_data.id + "','"
                  + client_id + "','"
                  + this.auth.getCurrentUserId() + "','"
                  + JSON.stringify(arr[obj].client) + "','"
                  + JSON.stringify(arr[obj].visit_data) + "','"
                  + JSON.stringify(arr[obj].order_history) + "')";
                console.log('insert into qurey2', q);
                db.executeSql(q, [])
                  .then(res => {
                    console.log("insert nextvisit sucess", res);
                  })
                  .catch(e => {
                    console.log("error on nextvisit insert ", e);
                  });
              }

            })
            .catch(e => {
              console.log("nextvisit update error on get", e);
            });

        }).catch(e => {
        });
    }
  }

  get_nextVisit(id) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {

          // db.executeSql("SELECT * FROM ventproductlist WHERE id ='" + id + "'", [])
          db.executeSql("SELECT * FROM nextvisit WHERE client_id ='"
            + id + "'", []).then((res: any) => {
              console.log('nextvisit offlineP----', res);
              let nextvisit = [];
              let o = {};
              for (var i = 0; i < res.rows.length; i++) {
                // if (i == res.rows.length - 1) {
                o = {
                  user_id: res.rows.item(i).user_id,
                  client: JSON.parse(res.rows.item(i).client),
                  visit_data: JSON.parse(res.rows.item(i).visit_data),
                  order_history: JSON.parse(res.rows.item(i).order_history)
                };
                nextvisit.push(o);
                // }
              }
              console.log('next visit offlineP----', nextvisit);
              resolve(nextvisit);
            })
        }).catch(e => console.error(e));
    })
  }



  updateUpcomingList(arr) {

    this.sqlite.create({
      name: 'Ventapp.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('DELETE FROM upcominglist WHERE user_id = ' + this.auth.getCurrentUserId() + ';', [])
          .then(res => {
            console.log("dddddd DELETE before upcominglist create sucess", res);
          })
          .catch(e => {
            console.log("dddddd error on DELETE before upcominglist create ", e);
          });

      }).catch(e => {
        console.log("dddddd DELETE before upcominglist create error on get", e);
      });

    for (let obj = 0; obj < arr.length; obj++) {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS upcominglist(id INTEGER PRIMARY KEY, user_id INTEGER(10), client TEXT, order_history TEXT, visit_data TEXT)', [])
            // db.executeSql('create table songs(name VARCHAR(32))', [])
            .then((r) => {
              console.log("dddddd success on create upcominglist table", r);
            })
            .catch(e => {
              console.log("dddddd error on create upcominglist table", e);
            });

          db.executeSql("SELECT * FROM upcominglist WHERE id ='" + arr[obj].visit_data.id + "'", [])
            .then(res => {
              if (res.rows.length > 0) {

                db.executeSql('DELETE FROM upcominglist WHERE id = ' + arr[obj].visit_data.id + ';', [])
                  .then(res => {
                    console.log("dddddd DELETE upcominglist sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on upcominglist DELETE ", e);
                  });

                db.executeSql("INSERT INTO upcominglist (id,user_id,client,order_history,visit_data) VALUES('" + arr[obj].visit_data.id + "','" + this.auth.getCurrentUserId() + "','" + JSON.stringify(arr[obj].client) + "','" + JSON.stringify(arr[obj].order_history) + "','" + JSON.stringify(arr[obj].visit_data) + "')", [])
                  .then(res => {
                    console.log("dddddd insert upcominglist sucess after delete", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on upcominglist insert after delete", e);
                  });

              } else {

                db.executeSql("INSERT INTO upcominglist (id,user_id,client,order_history,visit_data) VALUES('" + arr[obj].visit_data.id + "','" + this.auth.getCurrentUserId() + "','" + JSON.stringify(arr[obj].client) + "','" + JSON.stringify(arr[obj].order_history) + "','" + JSON.stringify(arr[obj].visit_data) + "')", [])
                  .then(res => {
                    console.log("dddddd insert upcominglist sucess", res);
                  })
                  .catch(e => {
                    console.log("dddddd error on upcominglist insert ", e);
                  });
              }

            })
            .catch(e => {
              console.log("dddddd upcominglist update error on get", e);
            });

        }).catch(e => {
        });
    }
  }


  getUpcoming() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'Ventapp.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          db.executeSql("SELECT * FROM upcominglist WHERE user_id ='" + this.auth.getCurrentUserId() + "' ORDER BY id DESC", [])
            .then(res => {
              let upcomingList = [];
              for (var i = 0; i < res.rows.length; i++) {
                // let mm = this.sanitizer.bypassSecurityTrustResourceUrl((<any>window).Ionic.WebView.convertFileSrc(res.rows.item(i).thumbnail_image))
                upcomingList.push({ id: res.rows.item(i).id, user_id: res.rows.item(i).user_id, client: JSON.parse(res.rows.item(i).client), order_history: JSON.parse(res.rows.item(i).order_history), visit_data: JSON.parse(res.rows.item(i).visit_data) })
                if (i == (res.rows.length - 1)) {
                  console.log('Upcoming List in offline provider----------------', upcomingList);
                  resolve(upcomingList);
                }
              }
            })
            .catch(e => {
              console.log("dddddd error on get product list", e);
            });
        }).catch(e => {
          console.log("dddddd error on create db on get product list", e);
        });
    });
  }
}
