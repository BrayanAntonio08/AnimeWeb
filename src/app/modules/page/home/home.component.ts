import { Component, inject } from '@angular/core';
import { AnimeService } from '../../../core/services/anime.service';
import { Anime, mapApiEntity } from '../../../core/models/AnimeModels';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseApiService } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faIcon = faMagnifyingGlass;

  animeList : Anime[] = [];
  searchingValue: string = '';

  constructor(private service: AnimeService, private router: Router, private api:BaseApiService){
    this.getList();
  }

  viewDetail(id:number){
    this.router.navigate(['details'], { queryParams: {animeid: id} });
  }

  async getList(){
    this.api.load();
    if(this.searchingValue.length > 0)
      this.animeList = await this.service.SearchAnime(this.searchingValue).catch((err:any) => {
        this.api.loaded();
        return [];
      });
    else
      this.animeList = await this.service.ListAnimes().catch((err:any) => {
        this.api.loaded();
        return [];
      });
    this.api.loaded();

  }
}
