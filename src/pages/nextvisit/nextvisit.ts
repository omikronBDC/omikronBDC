import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import * as moment from 'moment';

/**
 * Generated class for the NextvisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-nextvisit',
  templateUrl: 'nextvisit.html',
})
export class NextvisitPage {
  @ViewChild('calendar') cal : any;
client_info:any;
date:any = '';
current_date:any = new Date().toISOString();
type:any;
is_enable:boolean = false;
currentEvents:any = new Array();
next_week_date:any;
current={
  date:'',
  month:'',
  year:'',
  fulldate:'',
}
  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, 
    public view: ViewController) {
    this.client_info = navParams.get('data');
    console.log(this.client_info);
    this.type = navParams.get('type');
    if(this.type == 'Reschedule') {
      let calendar = document.getElementById('calendar');
      console.log(calendar);
      calendar = this.client_info.visit_data.visite_date.split('-');
      console.log(calendar);
      if(calendar[1] == 0){
        console.log('zero');
        var month:any = 0;
      } else {
        console.log('else');       
        month = calendar[1]-1;
      }
    this.currentEvents = [
        {
          year: calendar[0],
          month: month,
          date: calendar[2]
        }
      ];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextvisitPage');
  }

  closemodal(){
    this.view.dismiss();
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }

  add_visit() {
    if(this.type=='Next'){
      let Data = {
        company_id:{"value":this.auth.getUserDetails().company.id,"type":"NO"},
        employee_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        client_id:{"value":this.client_info.id,"type":"NO"},
        visite_date:{"value":this.date,"type":"VDATE"},
      }
      this.rest_api.postData(Data,'add_visit').then((res:any) => {
        console.log(res);
        if(res.status==1){
          this.alertP.presentToast(res.message,'bottom');
          this.view.dismiss(true);
          // this.alertP.showAsync('Success',res.message).then(() => {
          //   this.view.dismiss(true);
          // })
        } else {
          this.alertP.show('Alerta',res.message);
        }
        })
    } else {
      let Data = {
        employee_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        visit_id:{"value":this.client_info.visit_data.id,"type":"NO"},
        visite_date:{"value":this.date,"type":"VDATE"},
      }
      this.rest_api.postData(Data,'re_schedule_visit').then((res:any) => {
        console.log(res);
        if(res.status == 1){
          this.alertP.presentToast(res.message,'bottom');
          this.view.dismiss(true);
          // this.alertP.showAsync('Success',res.message).then(() => {
          //   this.view.dismiss(true);
          // })
        } else {
          this.alertP.show('Alerta',res.message);
        }
      })
    }
  }

  onDaySelect(ev:any){
    var date:any,date1:any;
    console.log(ev);
     date = `${ev.date}-${ev.month+1}-${ev.year}`;
     date1 = `${ev.year}-${ev.month+1}-${ev.date}`;
    console.log(new Date().toISOString().split('T'));
    var a  = moment(date1);
    var b = moment(new Date().toISOString().split('T')[0]);
   var c =  a.diff(b,'days');
   console.log(c);
   if(c > -1){
     // this.is_enable = true;
     this.date = date;
   } else {
     this.alertP.presentToast('Seleccione una fecha futura por favor.','top');
   }

   let d = ev.date>9?ev.date:"0"+ev.date;
   let m = (ev.month+1)>9?(ev.month+1):"0"+(ev.month+1);
   
   this.current.fulldate=ev.year+""+m+d;
  // this.current.fulldate=moment(d+""+m+ev.year,'DDMMYYYY').format('YYYYMMDD')
   console.log(this.current.fulldate);
  }

  onEventSelected(ev:any){
    console.log(ev);
  }

  next_quarter() {


  }

  next_month() {

  }

  next(number,type) {
    this.currentEvents=[];
    if(this.current.fulldate==""){
        this.current.fulldate=moment().format("YYYYMMDD")
    }
    this.current.date= moment(this.current.fulldate,'YYYYMMDD').add(number, type).format('DD');
    this.current.month= moment(this.current.fulldate,'YYYYMMDD').add(number, type).format('MM');
    this.current.year= moment(this.current.fulldate,'YYYYMMDD').add(number, type).format('YYYY');
    this.current.fulldate=moment(this.current.fulldate,'YYYYMMDD').add(number, type).format("YYYYMMDD");
    if(moment(this.current.fulldate,'YYYYMMDD').day()==0){
      console.log('its sunday',this.current.fulldate);
      this.current.date= moment(this.current.fulldate,'YYYYMMDD').add(1, 'days').format('DD');
      this.current.month= moment(this.current.fulldate,'YYYYMMDD').add(1, 'days').format('MM');
      this.current.year= moment(this.current.fulldate,'YYYYMMDD').add(1, 'days').format('YYYY');
      this.current.fulldate=moment(this.current.fulldate,'YYYYMMDD').add(1, 'days').format("YYYYMMDD");
    }



          let data = {
            year: this.current.year,
            month: parseInt(this.current.month)-1,
            date: this.current.date
    }
    this.date = moment(this.current.fulldate,'YYYYMMDD').format('DD-MM-YYYY');
    this.currentEvents = this.currentEvents.concat(data);
    this.cal.showmonth(data.month, data.year);
    console.log(this.current);
      // this.current.date= moment().add(7, 'days').format('DD');
      // this.current.month= moment().add(7, 'days').format('MM');
      // this.current.year= moment().add(7, 'days').format('YYYY');
      // this.current.fulldate=moment().add(7, 'days').format("YYYYMMDD")
      //       let data = {
      //     year: this.current.year,
      //     month: parseInt(this.current.month)-1,
      //     date: this.current.date
      // }
      // this.currentEvents = this.currentEvents.concat(data);
      // this.cal.showmonth(data.month, data.year);
      // console.log(this.current);
    // }
    // else{

    // }

    // this.current.date=date;

    // console.log(date,month,year);
  //  console.log(this.cal.forward());
    console.log()
    // this.currentEvents = new Array();
    // if(this.next_week_date){
    //   var nxt_week_date = [];
    // var valid = moment(this.next_week_date).day();
    // console.log(valid);
    // if(valid>0){
    //   console.log("check check check", valid);
    //   let today = this.next_week_date //moment(new Date().toISOString().split('T')[0]);
    //   // console.log(today);
    //   nxt_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD').split('-');
    //   this.next_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD');
    //   console.log('nex week date--',nxt_week_date);
    //   if(nxt_week_date[1] == 0){
    //     console.log('zero');
    //     var month:any = 0;
    //   } else {      
    //     month = nxt_week_date[1]-1;

    //   }
    //   let data = {
    //       year: nxt_week_date[0],
    //       month: month,
    //       date: nxt_week_date[2]
    //   }
    //   this.currentEvents = this.currentEvents.concat(data);
    // } else {
    //   let today =  this.next_week_date;
    //   // console.log(today);
    //   nxt_week_date = moment(today, "YYYY-MM-DD").add('days',8).format('YYYY-MM-DD').split('-');
    //   this.next_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD');
    //   console.log('nex week date--',nxt_week_date);
    //   if(nxt_week_date[1] == 0){
    //     console.log('zero');
    //     var month:any = 0;
    //   } else {      
    //     month = nxt_week_date[1]-1;
    //   }
    //   let data = {
    //       year: nxt_week_date[0],
    //       month: month,
    //       date: nxt_week_date[2]
    //   }
    //   this.currentEvents = this.currentEvents.concat(data);
    // }
    // } else {
    //   var nxt_week_date = [];
    // var valid = moment(new Date().toISOString().split('T')[0]).day();
    // console.log(valid);
    // if(valid>0){
    //   let today =  moment(new Date().toISOString().split('T')[0]);
    //   // console.log(today);
    //   nxt_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD').split('-');
    //   this.next_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD');
    //   console.log('nex week date--',nxt_week_date);
    //   if(nxt_week_date[1] == 0){
    //     console.log('zero');
    //     var month:any = 0;
    //   } else {      
    //     month = nxt_week_date[1]-1;
    //   }
    //   let data = {
    //       year: nxt_week_date[0],
    //       month: month,
    //       date: nxt_week_date[2]
    //   }
    //   this.currentEvents = this.currentEvents.concat(data);
    // } else {
    //   let today =  moment(new Date().toISOString().split('T')[0]);
    //   // console.log(today);
    //   nxt_week_date = moment(today, "YYYY-MM-DD").add('days',8).format('YYYY-MM-DD').split('-');
    //   this.next_week_date = moment(today, "YYYY-MM-DD").add('days',7).format('YYYY-MM-DD');
    //   console.log('nex week date--',nxt_week_date);
    //   if(nxt_week_date[1] == 0){
    //     console.log('zero');
    //     var month:any = 0;
    //   } else {      
    //     month = nxt_week_date[1]-1;
    //   }
    //   let data = {
    //       year: nxt_week_date[0],
    //       month: month,
    //       date: nxt_week_date[2]
    //   }
    //   this.currentEvents = this.currentEvents.concat(data);
    // }
    // }
    
  }

}
