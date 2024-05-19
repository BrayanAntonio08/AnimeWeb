import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../core/models/AuthModels';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userInfo: User = new User();

  constructor(private auth: AuthService){}

  LoginUser(){
    this.auth.login(this.userInfo);
  }
}
