import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  apiUrl = "http://www.animehub-webapi.somee.com/api";
  
  constructor() { }
}
