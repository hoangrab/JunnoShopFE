import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  clickAdd= false;

  constructor(private router : Router){}
  ngOnInit(){

  }

  edit(id : number) {
    this.router.navigate(['admin/category/edit'])
  }
}
