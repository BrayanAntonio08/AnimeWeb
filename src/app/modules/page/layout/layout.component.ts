import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseApiService } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  faExit = faRightFromBracket;
  faUser = faUser;
  
  activeUser: boolean = false;
  adminUser : boolean = false;
  username: string = '';

  constructor(private auth:AuthService, public api:BaseApiService){
    this.activeUser = this.auth.isUserActive();
    if(this.activeUser){
      this.username = sessionStorage['username'];
      this.auth.isUserAdmin().then(x => this.adminUser = x);
    }
  }

  logout(){
    this.auth.logout();
    this.activeUser = false;
  }
}
