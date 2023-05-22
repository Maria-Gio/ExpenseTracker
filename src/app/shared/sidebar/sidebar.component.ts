import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private auth: AuthService, private router: Router) { }
  logout(): void {
    this.auth.logout().then(() => { this.router.navigate(['/login']) })
  }
}
