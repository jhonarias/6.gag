import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

// Plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  title:string;
  imagenPreview: string;
  imagen64: string;

  constructor( private viewCtrl: ViewController,
               private camera: Camera,
               private imagePicker: ImagePicker,
               public _cap: CargaArchivoProvider ) {
  }

  cerrarModal() {

    this.viewCtrl.dismiss();

  }

  mostrar_camara() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;
    }, (err) => {
      console.log("Error en la camara ", JSON.stringify(err));
    });

  }

  seleccionar_archivo() {

    let options:ImagePickerOptions = {

      quality: 70,
      outputType: 1,
      maximumImagesCount: 1

    }

    this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];
      }
    }, (err) => {

      console.error("Error en el selector", JSON.stringify(err));

    });

  }

  crear_post() {

    let archivo = {

      img: this.imagen64,
      titulo: this.title

    };

    this._cap.cargar_imagen_firebase(archivo);

  }

}
