import { Component } from '@angular/core';
import { Anime } from '../../../core/models/AnimeModels';
import { AnimeService } from '../../../core/services/anime.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {

  animeList : Anime[] = [];

  constructor(private service: AnimeService, private router: Router, private auth: AuthService){
    if(this.auth.isUserActive()){
      this.service.ListFavourites().then(x => {
        this.animeList = x;
      })
    }else{
      this.router.navigate(['/']);
    }

    
  }

  viewDetail(id:number){
    this.router.navigate(['details'], { queryParams: {animeid: id} });
  }

}
