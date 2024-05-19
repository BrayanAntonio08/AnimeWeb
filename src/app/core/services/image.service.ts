import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url:string = "https://api.cloudinary.com/v1_1/dddjj3cfl/upload";
  constructor(private http: HttpClient, private msg: ToastrService) { }

  upload(file: File): Promise<string>{
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'sx1z8xbc');
    data.append('cloud_name', 'dddjj3cfl');

    return new Promise<string>((resolve, reject) => {
      this.http.post(this.url, data).pipe(
        catchError((error)=>{
          this.msg.error("Error while saving the picture");
          reject(null);
          throw error;
        })
      ).subscribe((response: any)=>{
        let url = response.secure_url;
        resolve(url);
      });
    });
  }

}
