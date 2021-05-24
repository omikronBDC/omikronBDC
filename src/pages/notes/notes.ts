import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {
notes:any = new Array();
note:any = '';
client:any;
isedit:boolean = false;
note_id:any;

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public viewCtrl:ViewController,
    public navParams: NavParams) {
      var data = navParams.data.data;
      this.client = data;
      //this.notes = data.sales_note;      
     // console.log(this.notes);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
    let Data = {
      client_id:{"value":this.client.id,"type":"NO"},
    }
    this.rest_api.postData(Data,'salesnotelist').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.notes = res.data;
      }
    })
  }

  send_note() {
    if(!this.note&&this.note.trim != ''){
      this.alertP.show('Nota invalida', 'introduce una nota por favor');
      return;
    }
    let Data = {
      emp_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      company_id:{"value":this.auth.getUserDetails().company.id,"type":"NO"},
      client_id:{"value":this.client.id,"type":"NO"},
      note:{"value":this.note,"type":"NO"},
    }
    this.rest_api.postData(Data,'slaesnote').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.note = '';
        this.ionViewDidLoad();
        // this.alertP.showAsync('Success',res.message).then(() => {

        // })
      }
    })
  }

  remove(item:any) {
    console.log(item);
    let Data = {
      note_id:{"value":item.id,"type":"NO"},
    }
    this.rest_api.postData(Data,'deleteslaesnote').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.ionViewDidLoad();
      }
    })
  }

  edit_note(item:any){
    console.log(item);
    this.isedit = true;
    this.note = item.note;
    this.note_id = item.id;
  }

  send_edit() {
    if(!this.note&&this.note.trim != ''){
      this.alertP.show('Nota invalida', 'introduce una nota por favor');
      return;
    }
    let Data = {
      emp_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      company_id:{"value":this.auth.getUserDetails().company.id,"type":"NO"},
      client_id:{"value":this.client.id,"type":"NO"},
      note:{"value":this.note,"type":"NO"},
      note_id:{"value":this.note_id,"type":"NO"},
    }
    this.rest_api.postData(Data,'editslaesnote').then((res:any) => {
      console.log(res);
      if(res.status==1){
        this.note_id = '';
        this.note = '';
        this.isedit = false;
        this.ionViewDidLoad();
        // this.alertP.showAsync('Success',res.message).then(() => {

        // })
      }
    })
  }

}
