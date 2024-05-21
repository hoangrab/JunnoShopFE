import { Component } from '@angular/core';
import { CategoryService } from 'src/app/core/service/category.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  p : any
  listCates: any;
  listProducts: any;
  title = 'Tất Cả Sản Phẩm'
  sortFilter = ''
  idCate='0'
    
  constructor(private cateSv : CategoryService, private productSv : ProductService){}

  ngOnInit() {
    this.cateSv.getAll().subscribe(param => this.listCates = param)
    this.loadata()
  }

  loadata() {
    this.productSv.getAll('').subscribe(param => this.listProducts = param)
  }

  findByCate(id : string) {
    this.idCate = id;
    this.productSv.getAll(`?idCate=${id}${this.sortFilter}`).subscribe(param => this.listProducts = param)
  }

  changeSort() {
    this.productSv.getAll(`?idCate=${this.idCate}${this.sortFilter}`).subscribe(param => {
      console.log(this.sortFilter)
      return this.listProducts = param
    })
  }

}
