import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-images-viewer',
  templateUrl: 'images-viewer.html',
})
export class ImagesViewerPage {
  imgs = [];
  index: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.imgs = this.navParams.get("imgs");
    this.index = this.navParams.get('index');
      console.log(this.imgs)
  }

}
