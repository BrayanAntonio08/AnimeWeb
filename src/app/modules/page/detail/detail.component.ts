import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../../../core/services/anime.service';
import { Anime, mapApiEntity } from '../../../core/models/AnimeModels';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faListDots, faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from '../../../core/services/base-api.service';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  faStar = faStar;
  faList = faListDots;
  faHeart = faHeart;
  faX = faX;

  videoUrl: SafeResourceUrl | undefined;
  animeInfo : Anime = new Anime();

  clientUser : boolean = false;
  favAdded: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private animeService: AnimeService, 
    private sanitizer: DomSanitizer, 
    private router: Router, 
    private authService: AuthService,
    private msg: ToastrService,
    private api:BaseApiService
  ) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const anime_id = params['animeid'];
      if(anime_id === undefined){
        this.router.navigate(['/']);
      }

      this.api.load();
      //call the service to get the corresponding anime
      this.animeService.GetAnime(anime_id).then((value)=>{
        this.animeInfo = value
        if(this.animeInfo.trailer_url !== undefined && this.animeInfo.trailer_url !== null)
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeInfo.trailer_url);
        this.api.loaded();
      })
      
      if(this.authService.isUserActive()){
        this.authService.isUserAdmin().then(x => {
          this.clientUser = !x;
          if(this.clientUser){
            this.animeService.IsFavouriteAnime(anime_id).then(x => this.favAdded = x);
          }
        }).catch(error => this.clientUser = false);
      }
      
      
    });
  }
  
  async manageFavourite(){
    this.api.load();
    if(this.favAdded){
      let removed = await this.animeService.RemoveFavouriteAnime(this.animeInfo.id);
      this.api.loaded();
      if(removed){
        this.msg.success("Anime removed from favourites");
        this.favAdded = false;
      }else{
        this.msg.error("Operation failed");
      }
    }else{
      let added = await this.animeService.AddFavouriteAnime(this.animeInfo.id);
      this.api.loaded();
      if(added){
        this.msg.success("Anime added to favourites");
        this.favAdded = true;
      }else{
        this.msg.error("Operation failed");
      }
    }
  }
}
