import { Component } from '@angular/core';
import { Anime, mapApiEntity } from '../../../core/models/AnimeModels';
import { AnimeService } from '../../../core/services/anime.service';
import { Router } from '@angular/router';
import { ImageService } from '../../../core/services/image.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IntegerValueDirective } from '../../../core/directives/integer-value.directive';
import { DecimalValueDirective } from '../../../core/directives/decimal-value.directive';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [FormsModule, ToastrModule, FontAwesomeModule, IntegerValueDirective, DecimalValueDirective],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent {
  iEdit = faPen;
  iDelete = faTrash;
  iView = faEye;

  animeList : Anime[] = [];
  animeInfo: Anime | undefined;

  imgFile: File | undefined;
  imgUrl: string ='';
  isDragging = false;
  deletingId = 0;
  searchingValue: string = '';

  constructor(
    private animeService: AnimeService, 
    private router: Router, 
    private imageService: ImageService, 
    private msg: ToastrService){
    
    this.getList();
  }

  viewDetail(id:number){
    this.router.navigate(['/details'], { queryParams: {animeid: id} });
  }

  selectFile(event: any){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.animeInfo) {
      this.imgFile = input.files[0];
      this.animeInfo.image_url = URL.createObjectURL(this.imgFile);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.imgFile = event.dataTransfer.files[0];
      if(this.animeInfo)
        this.animeInfo.image_url = URL.createObjectURL(this.imgFile);

      // Set the file input's files property to the dropped file
      const input = document.getElementById('imageLoader') as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(this.imgFile);
      input.files = dataTransfer.files;

      // Optionally, trigger the change event on the file input
      input.dispatchEvent(new Event('change'));
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  async getList(){
    if(this.searchingValue.length > 0)
      this.animeList = await this.animeService.SearchAnime(this.searchingValue);
    else
      this.animeList = await this.animeService.ListAnimes();
  }

  createAnime(){
    this.animeInfo = new Anime();
  }

  validate():boolean{
    let valid = true;

    //validate english name
    if(this.animeInfo?.english_title.length == 0){
      valid = false;
      this.msg.warning("English title not provided");
    }
    //validate synopsis
    if(this.animeInfo?.synopsis.length == 0){
      valid = false;
      this.msg.warning("Synopsis not provided");
    }

    return valid;
  }



  async saveAnime(){
    // initialy we have to upload the picture
    if(this.animeInfo && this.validate()){
      
      if(this.imgFile){
        this.imageService.upload(this.imgFile).then(url => {
          if(this.animeInfo){
            this.animeInfo.image_url = url;

            // id = 0 means a new object, else we wanna update the values
            if(this.animeInfo.id === 0){
              this.animeService.CreateAnime(this.animeInfo).then(async value => {
                this.msg.success("Item created successfully");
                this.animeInfo = undefined;
                this.getList();
              }).catch(error => {
                this.msg.error(error.message, "Creation failed")
              })
            }else{
              this.animeService.UpdateAnime(this.animeInfo).then(value => {
                this.msg.success("Item updated successfully");
              }).catch(error => {
                this.msg.error(error.message, "Update of item failed")
              })
            }
          }
        });
      }else if(this.animeInfo.image_url.length > 0 && this.animeInfo.id !== 0){
        this.animeService.UpdateAnime(this.animeInfo).then(value => {
          this.msg.success("Item updated successfully");
        }).catch(error => {
          this.msg.error(error.message, "Update of item failed")
        })
      }else{
        this.msg.warning("No image was given");
      }
    }
  }

  cancel(){
    this.animeInfo = undefined;
    this.getList();
  }

  editAnime(anime: Anime){
    this.animeInfo = anime;
  }

  showDeleteDialog(id:number){
    this.deletingId = id;
  }

  async onConfirmDelete(){
    let removed = await this.animeService.DeleteAnime(this.deletingId).catch(error =>{
      this.msg.error(error.message,"Unexpected error ocurred");
    });

    if(removed){
      this.deletingId = 0;
      this.msg.success("Item deleted successfully");
      this.getList();
    }else{
      this.msg.error("The element may not exist in the system","Delete operation incomplete");
    }
  }

  onCancelDelete(){
    this.deletingId = 0;
  }
}
