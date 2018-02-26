import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {LineUpPage} from '../../pages/lineup/lineup'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToPrograms(){
    this.navCtrl.push(LineUpPage);
  }

}
