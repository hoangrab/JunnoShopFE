import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CategoryService } from 'src/app/core/service/category.service';
import { UserService } from 'src/app/core/service/user.service';
import { storageUtils } from 'src/app/shared/helpers/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router : Router, private userSv : UserService, private cateSv : CategoryService) {}
  currentUser : any;
  listCates : any;
  ngOnInit() {

    this.currentUser = storageUtils.get('currentUser')

    this.cateSv.getAll().subscribe(param => this.listCates = param)

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
