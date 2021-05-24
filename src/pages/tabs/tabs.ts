import { Events, Tabs } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';
import { ClientPage } from '../client/client';
import { ProductPage } from '../product/product';
import { NewsPage } from '../news/news';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild(Tabs) tab: Tabs;
  tab1Root = HomePage;
  tab2Root = LocationPage;
  tab3Root = ClientPage;
  tab4Root = ProductPage;
  tab5Root = NewsPage;
  params = {client_id:""}
  constructor(public event:Events) {
    this.event.subscribe("opencreatetab",(data)=>{
      if(data){
        this.params.client_id=data.client.id;
        this.tab.select(2);
        console.log(data);
        setTimeout(()=>{
          this.params.client_id="";
        },500)
        console.log('check',data);
      }
      

    })

  }


  
  tabChanged($ev) {
    // console.log("Tab Change------------------",$ev)
  //  $ev.setRoot($ev.root);
    $ev.popToRoot();//($ev.root);
  }
}
