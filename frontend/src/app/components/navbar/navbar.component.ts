import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  public constructor(private authService: AuthService) {};
  public isLoggedIn: boolean = false;
  public ngOnInit() : void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
