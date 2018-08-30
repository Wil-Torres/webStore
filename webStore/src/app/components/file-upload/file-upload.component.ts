import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  porcentaje: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  arrayDownload: any = [];


  constructor(private storage: AngularFireStorage) { }
  toggleHover(event: boolean) {
    this.isHovering = event
  }
  startUpload(event: FileList) {
    // const file = event.item(0);
    const files = event;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.split('/')[0] !== 'image') {
        console.error('unsupported file type :( ');
        return;
      }
      const path = `test/${new Date().getTime()}_${file.name}`;
      const customMetadata = { app: 'My AngularFire-powered PWA!' };
      const fileRef = this.storage.ref(path);
      this.task = this.storage.upload(path, file, { customMetadata })
      this.task.then(res => {
        console.log(res)
        this.porcentaje = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(
          finalize(async () => {
            fileRef.getDownloadURL().toPromise().then(url => {
              this.arrayDownload.push(url);
            });
            return this.downloadURL = fileRef.getDownloadURL()
          })
        );
      });

    }

  }

  isActive(snapshot) {
    return snapshot === 'running' && snapshot.bytesTansferred < snapshot.totalBytes;
  }

  ngOnInit() {
  }

}
