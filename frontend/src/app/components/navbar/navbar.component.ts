import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  public constructor(private authService: AuthService, private router: Router) {};
  public isLoggedIn: boolean = false;
  public ngOnInit() : void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public goBack(): void {
    const path = this.router.url.split('/');
    const without2last = path.slice(0, path.length - 2);
    if(path.length > 2){
      this.router.navigate([without2last]);
    }else{
      this.router.navigate(['/']);
    }
  }
}
