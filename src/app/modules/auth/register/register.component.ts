import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../core/models/AuthModels';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userInfo: User = new User();
  adminRegister: boolean = false;

  constructor(private auth: AuthService){}

  CreateUser(){
    this.userInfo.roleId = this.adminRegister?1:2;
    this.auth.register(this.userInfo);
  }
}
