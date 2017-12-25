import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { SubirPage } from '../subir/subir';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   posts: Observable<any[]>;

  constructor( private modalCtrl: ModalController,
               afDB: AngularFireDatabase) {

    this.posts = afDB.list('post').valueChanges();

  }

  mostrarModal() {

    let modal = this.modalCtrl.create( SubirPage );

    modal.present();

  }

}
