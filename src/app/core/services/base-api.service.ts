import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  apiUrl = "https://www.animehub-webapi.somee.com/api";
  loading = false;
  constructor() { }

  load(){
    this.loading = true;
  }
  loaded(){
    this.loading = false;
  }
}
