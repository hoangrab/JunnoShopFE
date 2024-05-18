import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { ReviewService } from 'src/app/core/service/review.service';
import { WishlistService } from 'src/app/core/service/wishlist.service';
import { storageUtils } from 'src/app/shared/helpers/storage';
import { cartModel } from 'src/app/shared/model/cartModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  formReview !: FormGroup;

  id = ''
  product : any
  islogin = false;

  pselectDefault= 0;
  sl = 1


  constructor(private route: ActivatedRoute, 
    private productSv  : ProductService, private wishlistSv : WishlistService,
    private builder : FormBuilder, private reviewSv : ReviewService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.productSv.getById(this.id).subscribe(param => {
        this.product = param
      })
    });
    if(storageUtils.get('currentUser')) {
      this.islogin = true;
    }

    this.formReview = this.builder.group({
      rating :  ['1'],
      content : ['']
    })
  }

  changeSl(id : number) {
    if(id == 1 && this.sl < this.product.productItems[this.pselectDefault].quantity) {
      this.sl++
    }
    if(id == 0 && this.sl > 1) {
      this.sl--
    }
  }

  addwishlist() {
    this.wishlistSv.add(storageUtils.get('currentUser').id,this.product.id).subscribe({
      next : (value) => {
        Swal.fire({
          title: "Save!",
          text: "Đã thêm sản phẩm vào danh sách yêu thích!",
          icon: "success",
          timer: 2000
        });
      },
      error : (err) => {
        Swal.fire({
          title: "Oop!",
          text: "Sản phẩm đã có trong danh sách yêu thích",
          icon: "error",
          timer: 2000
        });
      },
    })
  }

  addToCart() {
    const cartM : cartModel = {
      numchoose : this.sl,
      name : this.product.name,
      productId: this.product.id,
      productItemId: this.product.productItems[this.pselectDefault].id,
      image: this.product.productImages[0].imageUrl,
      size: this.product.productItems[this.pselectDefault].size,
      color: this.product.productItems[this.pselectDefault].color,
      price: this.product.salePrice,
      quantity: this.product.productItems[this.pselectDefault].quantity
    }
    let list : cartModel[] = []
    if(storageUtils.get('cart')) {
      list = storageUtils.get('cart')
      let check = true
      list.forEach(e => {
        if(e.productId == cartM.productId && e.productItemId == cartM.productItemId) {
          check = false
          Swal.fire({
            title: "Oop!",
            text: "Sản phẩm đã có trong giỏ hàng",
            icon: "error",
            timer: 2000
          });
        }
      })
      if(check) {
        list.push(cartM)
        Swal.fire({
          title: "Save!",
          text: "Đã thêm sản phẩm vào giỏ hàng!",
          icon: "success",
          timer: 2000
        });
      }
    }
    else {
      list.push(cartM)
      Swal.fire({
        title: "Save!",
        text: "Đã thêm sản phẩm vào giỏ hàng!",
        icon: "success",
        timer: 2000
      });
    }
    storageUtils.set('cart',list)
  }

  sbmReview() {
    const user = storageUtils.get('currentUser')
    if(this.formReview.valid && user) {
      const values = this.formReview.getRawValue();
      this.reviewSv.addReviewInProduct(user.id,this.product.id,values.content,values.rating).subscribe({
        next : (value) =>{
          this.productSv.getById(this.id).subscribe(param => {
            this.product = param
          })
          this.formReview.patchValue({
            conntent : '',
            rating : 1
          })
        },
        error(err) {
            console.log('Co loi ',err)
        },
      })
    }
  }

  
  counter(i: number) {
    return new Array(i);
}
}
