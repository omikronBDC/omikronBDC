// import { Component, ViewChild } from '@angular/core';
// import { NavController, ModalController } from 'ionic-angular';
// import { NextvisitPage } from '../nextvisit/nextvisit';
// import { NotificationsPage } from '../notifications/notifications';
// import { ProductlistPage } from '../productlist/productlist';
// import { ProfilePage } from '../profile/profile';
// import { SalesNotePage } from '../sales-note/sales-note';
// import { RestApiProvider } from './../../providers/rest-api/rest-api';
// import { AlertProvider } from './../../providers/alert/alert';
// import { AuthProvider } from './../../providers/auth/auth';
// import { DetailsPage } from '../details/details';
// import { CallNumber } from '@ionic-native/call-number';
// import { splitDepsDsl } from '@angular/core/src/view/util';
// import * as moment from 'moment';
// //248 409
// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {
//   typ = "month";
//   @ViewChild('calendar1') cal: any;
//   clients: any = new Array();
//   dateselected:any = new Array();
//   // calender var //
//   tbl: any;
//   monthAndYear: any;
//   selectYear: any;
//   selectMonth: any;
//   cell: any;
//   cellText: any;
//   // currentMonth: any;
//   // currentYear: any;
//   calendar_data: any;
//   visitEvents: any = new Array();

//   date: any = '';
//   current = {
//     date: '',
//     month: '',
//     year: '',
//     fulldate: '',
//   }
//   constructor(public navCtrl: NavController,
//     public rest_api: RestApiProvider,
//     public auth: AuthProvider,
//     public alertP: AlertProvider,
//     public modalCtrl: ModalController) {
//     //this.get_calendar_data();

//   }

//   daysInMonth(iMonth, iYear) {
//     return 32 - new Date(iYear, iMonth, 32).getDate();
//   }

//   ionViewDidLoad() {
//     let d = new Date();
//     let obj =  { "year": d.getFullYear(), "month": d.getMonth(), "date": d.getDate() };
//     this.dateselected =[];
//     this.dateselected.push(obj);
//     console.log("date selected",this.dateselected);
//     //this.dateselected = moment(this.current.fulldate, 'YYYYMMDD').format('DD-MM-YYYY');
//   }

//   ionViewWillEnter() {
//     this.get_upcoming_visit_list();
//     this.get_calendar_data();
//     this.typ = '';
//   }


//   showCalendar(month, year) {
//     var today = new Date();

//     let firstDay = (new Date(year, month)).getDay();

//     console.log('table', this.tbl)
//     // clearing all previous cells
//     //this.tbl.innerHTML = "";
//     var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // filing data about month and in the page via DOM.
//     this.monthAndYear.innerHTML = months[month] + " " + today.getDate() + " , " + year;
//     this.selectYear.value = year;
//     this.selectMonth.value = month;

//     // creating all cells
//     let date: any = 1;
//     for (let i = 0; i < 6; i++) {
//       // creates a table row
//       let row = document.createElement("ion-row");

//       //creating individual cells, filing them up with data.
//       for (let j = 0; j < 7; j++) {
//         if (i === 0 && j < firstDay) {
//           this.cell = document.createElement("ion-col");
//           //this.cell.classList.add("show-date");

//           this.cellText = document.createTextNode("");
//           this.cell.appendChild(this.cellText);

//           row.appendChild(this.cell);

//         }
//         else if (date > this.daysInMonth(month, year)) {
//           break;
//         }

//         else {
//           this.cell = document.createElement("ion-col");
//           this.cellText = document.createTextNode(date);
//           if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
//             this.cell.classList.add("show-date");
//           } // color today's date
//           this.cell.appendChild(this.cellText);
//           row.appendChild(this.cell);
//           date++;
//         }


//       }

//       this.tbl.appendChild(row); // appending each row into calendar body.
//     }

//   }


//   // next() {
//   //   var today = new Date();
//   //   this.currentMonth = today.getMonth();
//   //   this.currentYear = today.getFullYear();
//   //   this.selectYear = document.getElementById("year");
//   //   this.selectMonth = document.getElementById("month");

//   //   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   //   this.showCalendar(this.currentMonth, this.currentYear);

//   //   this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
//   //   this.currentMonth = (this.currentMonth + 1) % 12;
//   //   this.showCalendar(this.currentMonth, this.currentYear);
//   // }

//   // previous() {
//   //   var today = new Date();
//   //   this.currentMonth = today.getMonth();
//   //   this.currentYear = today.getFullYear();


//   //   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   //   this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
//   //   this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
//   //   this.showCalendar(this.currentMonth, this.currentYear);
//   // }

//   // jump() {
//   //   var today = new Date();
//   //   this.currentMonth = today.getMonth();
//   //   this.currentYear = today.getFullYear();
//   //   this.selectYear = document.getElementById("year");
//   //   this.selectMonth = document.getElementById("month");
//   //   this.currentYear = parseInt(this.selectYear.value);
//   //   this.currentMonth = parseInt(this.selectMonth.value);
//   //   this.showCalendar(this.currentMonth, this.currentYear);
//   // }

//   product(item: any) {
//     const modal = this.modalCtrl.create(ProductlistPage, { visit_data: item.visit_data, client: item.client }, { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
//     modal.present();
//     modal.onDidDismiss((data) => {
//       if (data) {
//         this.get_upcoming_visit_list();
//         this.get_calendar_data();
//         this.navCtrl.push(DetailsPage, { client_id: item.client.id, typ: 'past' });
//       }
//     })
//   }

//   next1() {
//     // const modal = this.modalCtrl.create(NextvisitPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
//     // modal.present();
//     alert('Coming Soon');
//   }

//   rechedule(item: any) {
//     console.log(item);
//     const modal = this.modalCtrl.create(NextvisitPage, { data: item, type: 'Reschedule' },
//       { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
//     modal.present();
//     modal.onDidDismiss((data) => {
//       if (data) {
//         this.get_upcoming_visit_list();
//         this.get_calendar_data();
//       }
//     })
//   }

//   sales(item: any) {
//     const modal = this.modalCtrl.create(SalesNotePage, { data: item.visit_data },
//       { cssClass: 'moremodel', showBackdrop: true, enableBackdropDismiss: true });
//     modal.present();
//     modal.onDidDismiss((data) => {
//       console.log(data);
//       if (data) {
//         this.get_upcoming_visit_list();
//         this.get_calendar_data();
//       }
//     })
//     // alert('Coming Soon');
//   }

//   details(client: any) {
//     this.navCtrl.push(DetailsPage, { client_id: client.id });
//   }

//   profile() {
//     this.navCtrl.push(ProfilePage);
//   }

//   notify() {
//     this.navCtrl.push(NotificationsPage);
//   }

//   get_upcoming_visit_list() {
//     let Data = {
//       employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//     }
//     this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
//       console.log(res);
//       if (res.status == 1) {
//         this.clients = res.data;
//       } else {
//         this.clients = new Array();
//       }
//     })
//   }

//   calling(number: any) {
//     this.auth.CallingFeature(number);
//   }

//   filter(filter: string) {
//     let calArray: any = [];
//     if (filter == 'Week') {
//       this.getWeek();
//     } else if (filter == 'Month') {
//       this.getDaysInMonth()
//     } else {

//       let d1 = new Date();
//       let obj1 =  { "year": d1.getFullYear(), "month": d1.getMonth(), "date": d1.getDate() };
//       this.dateselected =[];
//       this.dateselected.push(obj1);


//       let d = new Date();
      
//       let objToSend = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
//       let obj = { "year": d.getFullYear(), "month": d.getMonth(), "date": d.getDate() };
//       calArray.push(obj);
//     //  / this.visitEvents = calArray;
//       let Data = {
//         employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//         filter: { "value": objToSend, "type": "NO" },
//       }
//       this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
//         console.log(res);
//         if (res.status == 1) {
//           this.clients = res.data;
//         } else {
//           this.clients = new Array();
//         }
//       })
//     }

//   }

//   get_calendar_data() {
//     let Data = {
//       employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//     }
//     this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visit_list_by_date').then((res: any) => {
//       console.log(res);
//       if (res.status == 1) {
//         this.calendar_data = res.data;
//         var date = [];
//         var split_data = [];
//         var main_data = [];
//         date = res.data;
//         for (let i = 0; i < date.length; i++) {
//           split_data.push(date[i].visit_data.visite_date.split('-'));
//         }
//         console.log('splite array---', split_data);
//         for (let i = 0; i < split_data.length; i++) {
//           if (split_data[i][1] == 0) {
//             console.log('zero');
//             var month: any = 0;
//           } else {
//             console.log('else');
//             month = split_data[i][1] - 1;
//           }

//           let obj = { "year": split_data[i][0], "month": month, "date": split_data[i][2] };
//           main_data.push(obj);
//         }
//         console.log('main_data', main_data);
//         this.visitEvents = main_data;
//       } else {
//         this.calendar_data = new Array();
//         this.visitEvents = new Array();
//       }
//     })
//   }

//   onDaySelect(ev: any) {
    
//     console.log('woksd',ev);
//     // this.visitEvents = [{ "year": JSON.stringify(ev.year), "month": ev.month, "date": JSON.stringify(ev.date) }];
//     var date = `${ev.year}-${ev.month + 1}-${ev.date}`;
//     if (ev.hasEvent) {
//       for (let i = 0; i < this.clients.length; i++) {
//         if (date == this.clients[i].visit_data.visite_date) {
//           this.clients[i].visit_data.is_clicked = true;
//         } else {
//           this.clients[i].visit_data.is_clicked = false;
//         }
//       }




//     }

//     // let calArray: any = [];
//     // let d = new Date();
//     // let objToSend = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate();
//     // let obj = { "year": d.getFullYear(), "month": d.getMonth(), "date": d.getDate() };
//     // calArray.push(obj);
//     // this.visitEvents = calArray;
//     let Data = {
//       employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//       filter: { "value": date, "type": "NO" },
//     }
//     this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
//       console.log(res);
//       if (res.status == 1) {
//         this.clients = res.data;
//       } else {
//         this.clients = new Array();
//       }
//     })


//     let obj =  { "year": ev.year, "month": ev.month, "date": ev.date };
//     this.dateselected =[];
//     this.dateselected.push(obj);

//     console.log("date selected",this.dateselected);
//   }


//   next(number, type) {
//     this.visitEvents = [];
//     if (this.current.fulldate == "") {
//       this.current.fulldate = moment().format("YYYYMMDD")
//     }
//     this.current.date = moment(this.current.fulldate, 'YYYYMMDD').add(number, type).format('DD');
//     this.current.month = moment(this.current.fulldate, 'YYYYMMDD').add(number, type).format('MM');
//     this.current.year = moment(this.current.fulldate, 'YYYYMMDD').add(number, type).format('YYYY');
//     this.current.fulldate = moment(this.current.fulldate, 'YYYYMMDD').add(number, type).format("YYYYMMDD");
//     if (moment(this.current.fulldate, 'YYYYMMDD').day() == 0) {
//       console.log('its sunday', this.current.fulldate);
//       this.current.date = moment(this.current.fulldate, 'YYYYMMDD').add(1, 'days').format('DD');
//       this.current.month = moment(this.current.fulldate, 'YYYYMMDD').add(1, 'days').format('MM');
//       this.current.year = moment(this.current.fulldate, 'YYYYMMDD').add(1, 'days').format('YYYY');
//       this.current.fulldate = moment(this.current.fulldate, 'YYYYMMDD').add(1, 'days').format("YYYYMMDD");
//     }



//     let data = {
//       year: this.current.year,
//       month: parseInt(this.current.month) - 1,
//       date: this.current.date
//     }
//     this.date = moment(this.current.fulldate, 'YYYYMMDD').format('DD-MM-YYYY');
//     this.visitEvents = this.visitEvents.concat(data);
//     this.cal.showmonth(data.month, data.year);
//     console.log(this.current);
//   }

//   getWeek() {
//     let s = this.dateselected[0];
//     this.dateselected=[];
//     this.dateselected.push(s);
//     let selectedDate=this.dateselected[0].year+((this.dateselected[0].month+1)>9?(this.dateselected[0].month+1):"0"+(this.dateselected[0].month+1))+((this.dateselected[0].date)>9?(this.dateselected[0].date):"0"+(this.dateselected[0].date));

//     let sd = moment(selectedDate, 'YYYYMMDD').format("YYYYMMDD");
 
//     for(let i=0;i<6;i++){
//       let date = moment(sd, 'YYYYMMDD').add(1, 'days').format('DD');
//       let month = moment(sd, 'YYYYMMDD').add(1, 'days').format('MM');
//       let year = moment(sd, 'YYYYMMDD').add(1, 'days').format('YYYY');
//       sd = moment(sd, 'YYYYMMDD').add(1, 'days').format("YYYYMMDD");
//       let data = {
//         year: parseInt(year),
//         month: parseInt(month) - 1,
//         date: parseInt(date)
//       }
//       this.dateselected.push(data);
    
//     }

//    // this.console
//     this.cal.showmonth(this.dateselected[0].month, this.dateselected[0].year);

//     console.log('selected dateeeeee',sd);
//     // var curr = new Date();
//     let calArray = [];
//     // let currWeek = [
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay())),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 1)),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 2)),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 3)),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 4)),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 5)),
//     //   new Date(curr.setDate(curr.getDate() - curr.getDay() + 6)),
//     // ]
//     // // console.log('currWeek----', currWeek);
//     // for (let index = 0; index < currWeek.length; index++) {
//     //   let obj = { "year": currWeek[index].getFullYear(), "month": currWeek[index].getMonth(), "date": currWeek[index].getDate() };
//     //   calArray.push(obj);
//     // }
//     // this.visitEvents = calArray;


//     var selected: any;

//     // if (this.visitEvents.length == 1) {
    
//     selected = new Date(this.visitEvents[0].year, this.visitEvents[0].month, this.visitEvents[0].date);
//     console.log(selected);
//     let currWeek = [
//       new Date(selected.setDate(selected.getDate())),
//       new Date(selected.setDate(selected.getDate() + 1)),
//       new Date(selected.setDate(selected.getDate() + 1)),
//       new Date(selected.setDate(selected.getDate() + 1)),
//       new Date(selected.setDate(selected.getDate() + 1)),
//       new Date(selected.setDate(selected.getDate() + 1)),
//       new Date(selected.setDate(selected.getDate() + 1)),
//     ]
//     console.log(currWeek);

//     for (let index = 0; index < currWeek.length; index++) {
//       let obj = { "year": currWeek[index].getFullYear(), "month": currWeek[index].getMonth(), "date": currWeek[index].getDate() };
//       calArray.push(obj);
//     }
//   //  this.visitEvents = calArray;
//     let arrToSend: any = [];

//     for (let index = 0; index < currWeek.length; index++) {
//       arrToSend.push(this.formatDate(currWeek[index]))
//     }
//     let Data = {
//       employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//       filter: { "value": arrToSend, "type": "NO" },
//     }
//     this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
//       console.log(res);
//       if (res.status == 1) {
//         this.clients = res.data;
//       } else {
//         this.clients = new Array();
//       }
//     })
//     // }
//   }

//   getDaysInMonth() {
//     let s = this.dateselected[0];
//     this.dateselected=[];
//     this.dateselected.push(s);
//     let selectedDate=this.dateselected[0].year+((this.dateselected[0].month+1)>9?(this.dateselected[0].month+1):"0"+(this.dateselected[0].month+1))+((this.dateselected[0].date)>9?(this.dateselected[0].date):"0"+(this.dateselected[0].date));

//     let sd = moment(selectedDate, 'YYYYMMDD').format("YYYYMMDD");
//     let month = moment(selectedDate, "YYYYMMDD").daysInMonth();
//     console.log("this is monthcount", month)
//     for(let i=0;i<month;i++){
//       let date = moment(sd, 'YYYYMMDD').add(1, 'days').format('DD');
//       let month = moment(sd, 'YYYYMMDD').add(1, 'days').format('MM');
//       let year = moment(sd, 'YYYYMMDD').add(1, 'days').format('YYYY');
//       sd = moment(sd, 'YYYYMMDD').add(1, 'days').format("YYYYMMDD");
//       let data = {
//         year: year,
//         month: parseInt(month) - 1,
//         date: date
//       }
//       this.dateselected.push(data);
    
//     }

//     var selected = new Date(this.visitEvents[0].year, this.visitEvents[0].month, this.visitEvents[0].date);
//     // let month = selected.getMonth();
//     // let year = selected.getFullYear();
//     // var date = new Date(year, month, selected.getDate());
//     console.log(selected);

//     var days = [new Date(selected.setDate(selected.getDate()))];
//     console.log(days);
//     let calArray = [];
//     // while (date.getMonth() === month) {
//     //   days.push(new Date(date));
//     //   date.setDate(date.getDate() + 1);
//     // }
//     // return days;
//     // console.log(days);
    
//     for (let index = 0; index < 29; index++) {
//       days.push(new Date(selected.setDate(selected.getDate() + 1)));
//     }
//     console.log(days);

//     for (let index = 0; index < days.length; index++) {
//       let obj = { "year": days[index].getFullYear(), "month": days[index].getMonth(), "date": days[index].getDate() };
//       calArray.push(obj);
//     }
//   //  this.visitEvents = calArray;
//     console.log(this.visitEvents);

//     let arrToSend: any = [];

//     for (let index = 0; index < days.length; index++) {
//       arrToSend.push(this.formatDate(days[index]))
//     }
//     let Data = {
//       employee_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
//       filter: { "value": arrToSend, "type": "NO" },
//     }
//     this.rest_api.postData_withoutLoder(Data, 'get_upcoming_visite_list').then((res: any) => {
//       console.log(res);
//       if (res.status == 1) {
//         this.clients = res.data;
//       } else {
//         this.clients = new Array();
//       }
//     })
//   }

//   onMonthSelect(ev) {
//     console.log(ev);
//     this.typ = '';
//   }

//   formatDate(date) {
//     var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
//     if (month.length < 2) month = '0' + month; if (day.length < 2) day = '0' + day;
//     return [year, month, day].join('-');
//   }
// }
