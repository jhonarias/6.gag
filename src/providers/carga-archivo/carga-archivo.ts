import { Injectable } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class CargaArchivoProvider {

  constructor( public toastCtrl: ToastController ) {


  }

  cargar_imagen_firebase( archivo: ArchivoSubir ) {

    let promesa = new Promise( (resolve, reject)=>{

      this.presentToast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = storeRef.child('img/'+nombreArchivo)
                  .putString( archivo.img, 'base64', { contentType: 'image/jpeg' } );

        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
            () => {}, // Saber cuantos mgbits se han subido
            ( error ) => {
              //console.log(JSON.stringify(error));
              this.presentToast(JSON.stringify(error));
              reject();

            },
            () => {
              // TODO bien
              //console.log('Archivo subido');
              this.presentToast('Imagen cargada correctamente');
              resolve();

            }
          )

    });

    return promesa;

  }

  presentToast( mensaje:string ) {

    this.toastCtrl.create({
      message:  mensaje,
      duration: 3000
    }).present();
  }

}

interface ArchivoSubir {
  titulo:string;
  img:string;
  key?: string;
}
