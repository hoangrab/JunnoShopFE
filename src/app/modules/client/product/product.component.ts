import { Component } from '@angular/core';
import { CategoryService } from 'src/app/core/service/category.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  listCates: any;
  listProducts: any;


  constructor(private cateSv : CategoryService, private productSv : ProductService){}

  ngOnInit() {
    this.cateSv.getAll().subscribe(param => this.listCates = param)

    this.productSv.getAll().subscribe(param => this.listProducts = param)
  }

}
