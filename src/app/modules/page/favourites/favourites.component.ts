import { Component } from '@angular/core';
import { Anime } from '../../../core/models/AnimeModels';
import { AnimeService } from '../../../core/services/anime.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { BaseApiService } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  animeList : Anime[] = [];

  constructor(private service: AnimeService, private router: Router, private auth: AuthService, private api:BaseApiService){
    this.api.load()
    this.service.ListFavourites().then(x => {
      this.animeList = x;
      this.api.loaded();
    })
  }

  viewDetail(id:number){
    this.router.navigate(['details'], { queryParams: {animeid: id} });
  }

}
