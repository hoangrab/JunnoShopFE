import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { storageUtils } from 'src/app/shared/helpers/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router : Router, private userSv : UserService) {}
  currentUser : any;
  ngOnInit() {

    this.currentUser = storageUtils.get('currentUser')

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUser = storageUtils.get('currentUser')
      console.log('chay ne', typeof this.currentUser)
    });
  }

  logout() {
    this.userSv.logout();
    this.router.navigate(['/public/login'])
  }

}
