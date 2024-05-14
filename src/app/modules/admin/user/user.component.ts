import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  listUser !: Observable<any>

  constructor(private userSv : UserService){}

  ngOnInit() {
    this.userSv.getAll().subscribe({
      next: (value) => {
        console.log(value)
          this.listUser = of(value);
      },
      error(err) {
          console.log('Error : ',err)
      },
    })
  }

  updateEnabled(id : string) {
    
  }
}
