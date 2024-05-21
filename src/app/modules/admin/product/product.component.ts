import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  listPro : any;

  constructor(private productSv : ProductService){}

  ngOnInit() {
    this.productSv.getAll('').subscribe( e => this.listPro = of(e))
  }
}
