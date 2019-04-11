import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: any;
  selectedFiles: any;

  constructor(private http: HttpClient) { }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('arquivos', this.selectedFile, this.selectedFile.name);
    this.http.post('http://localhost:3000/files/upload', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe((event: any) => {
        console.log(event);
        console.log(Math.round(100 * event.loaded / event.total));
      });
  }


  onFilesChanged(event) {
    this.selectedFiles = event.target.files;
  }

  onUploads() {
    const formData: any = new FormData();
    const files = this.selectedFiles;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append('arquivos', files[i], files[i]['name']);
    }

    this.http.post('http://localhost:3000/files/upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe((event: any) => {
        console.log(event);
        console.log(Math.round(100 * event.loaded / event.total));
      });
  }
}
