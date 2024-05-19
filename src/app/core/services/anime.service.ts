import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Anime } from '../models/AnimeModels';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  
  private url: string = "https://api.jikan.moe/v4/anime"
  private api: string = "https://localhost:7003/api/anime"
  
  constructor(private http: HttpClient, private auth: AuthService) { }

  ListAnimes():Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(this.api).pipe(catchError(
        (err)=>{
          reject(null);
          throw err;
        }
      )).subscribe(
        (value) => resolve(value)
      )
    })
  }

  

  GetAnime(id:number):Promise<Anime>{
    return new Promise<Anime>((resolve, reject) => {
      this.http.get<Anime>(`${this.api}/${id}`).pipe(catchError(
        (err)=>{
          reject(null);
          throw err;
        }
      )).subscribe(
        (value) => resolve(value)
      )
    })
  }
  SearchAnime(name:string):Promise<Anime[]>{
    return new Promise<Anime[]>((resolve, reject) => {
      this.http.get<Anime[]>(`${this.api}/search/${name}`).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => resolve(value)
      )
    })
  }

  CreateAnime(anime:Anime):Promise<Anime>{
    return new Promise<Anime>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });

      this.http.post<Anime>(this.api, anime, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value: Anime) => resolve(value)
      )
    })
  }

  CreateAnimeRange(anime:Anime[]):Promise<Anime[]>{
    return new Promise<Anime[]>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });

      this.http.post<Anime[]>(`${this.api}/range`, anime, { headers }).pipe(catchError(
        (err) => {
          reject(err);
          throw err;
        }
      )).subscribe(
        (value: Anime[]) => resolve(value)
      )
    })
  }

  UpdateAnime(anime:Anime): Promise<Anime>{
    return new Promise<Anime>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });

      this.http.put<Anime>(this.api, anime, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value: Anime) => resolve(value)
      )
    })
  }

  DeleteAnime(id: number): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });
      this.http.delete<boolean>(`${this.api}/${id}`, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => {
          resolve(value)
        }
      )
    })
  }

  AddFavouriteAnime(animeId: number) : Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      });
      this.http.post<boolean>(`${this.api}/favourite/${animeId}`, null, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => {
          resolve(value)
        }
      )
    });
  }

  IsFavouriteAnime(animeId: number) : Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });
      this.http.get<boolean>(`${this.api}/isfavourite/${animeId}`, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => {
          resolve(value)
        }
      )
    });
  }

  RemoveFavouriteAnime(animeId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });
      this.http.delete<boolean>(`${this.api}/favourite/${animeId}`, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => {
          resolve(value)
        }
      )
    });
  }

  ListFavourites() : Promise<Anime[]>{
    return new Promise<Anime[]>((resolve, reject) => {
      //This actions are restricted, so headers with the token are needed
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth.getToken()}`
      });
      this.http.get<Anime[]>(`${this.api}/favourites`, {headers}).pipe(catchError(
        (err)=>{
          reject(err);
          throw err;
        }
      )).subscribe(
        (value) => {
          resolve(value)
        }
      )
    });
  }
}
