import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/core/service/category.service';
import { ProductService } from 'src/app/core/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  numbersArray: number[] = [];
  formVip!: FormGroup;
  fileImage: any;
  fieldProduct: any = [];
  urlPreview: string[] = [];
  listCate : any;


  constructor(
    private builder: FormBuilder,
    private categorySv: CategoryService,
    private productSv : ProductService
  ) { }

  ngOnInit() {
    this.formVip = this.builder.group({
      name: ['', Validators.compose([])],
      categoryId: ['', Validators.compose([])],
      priceCurrent: ['', Validators.compose([])],
      priceReduced: ['', Validators.compose([])],
      flashSale: ['', Validators.compose([])],
      description: ['', Validators.compose([])],
    });
    this.categorySv.getAll().subscribe(param => this.listCate = of(param)) 
  }

  addInput() {
    const newControl = {
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      sl: new FormControl('', Validators.required),
    };

    this.formVip.addControl(
      `color${this.numbersArray.length > 0
        ? this.numbersArray[this.numbersArray.length - 1] + 1
        : 1
      }`,
      newControl.color
    );
    this.formVip.addControl(
      `size${this.numbersArray.length > 0
        ? this.numbersArray[this.numbersArray.length - 1] + 1
        : 1
      }`,
      newControl.size
    );
    this.formVip.addControl(
      `sl${this.numbersArray.length > 0
        ? this.numbersArray[this.numbersArray.length - 1] + 1
        : 1
      }`,
      newControl.sl
    );
    this.numbersArray.push(
      this.numbersArray.length == 0 ? 1 : Math.max(...this.numbersArray) + 1
    );
  }

  removeInput(index: number) {
    this.formVip.removeControl(`color${index}`);
    this.formVip.removeControl(`size${index}`);
    this.formVip.removeControl(`sl${index}`);
    console.log('gtri index', index);
    this.numbersArray = this.numbersArray.filter((number) => number !== index);
    console.log('gtri ', this.numbersArray);
  }

  changeImage(event: any) {
    const files: File[] = event.target.files;
    this.fileImage = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.urlPreview.push(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }

  onsubm() {
    if (this.formVip.invalid) {
      alert('form khong hop le');
    } else {
      const formData = new FormData()
      const allValues = this.formVip.getRawValue();
      this.numbersArray.forEach((e) => {
        // console.log('gia tri e: ', e)
        // this.fieldProduct.push({
        //   size: allValues['size' + e],
        //   color: allValues['color' + e],
        //   quantity: allValues['sl' + e]
        // });
        formData.append('fieldProducts',JSON.stringify({
          size: allValues['size' + e],
          color: allValues['color' + e],
          quantity: allValues['sl' + e]
        }))
      });
      formData.append('name',allValues.name),
      formData.append('categoryId',allValues.categoryId),
      formData.append('priceCurrent',allValues.priceCurrent),
      formData.append('priceReduced',allValues.priceReduced)
      formData.append('flashSale',allValues.flashSale)
      formData.append('description',allValues.description)
      // formData.append('fieldProducts',)
      // formData.append('fieldProducts', JSON.stringify(this.fieldProduct));
      // this.fieldProduct.forEach((element: any) => {
      //   formData.append('fieldProducts',JSON.stringify(element))
      // });
      // console.log('gia file ne',this.fileImage)
      // formData.append('image',this.fileImage)
      for (let i = 0; i < this.fileImage.length; i++) {
        formData.append('image', this.fileImage.item(i));
    }
      formData.append('description',allValues.description)
      console.log('fomr da',formData)
      this.productSv.create(formData).subscribe({
        next(value) {
          Swal.fire({
            title: "Save!",
            text: "Sản phẩm đã được lưu",
            icon: "success",
            timer: 2000
          });
        },
        error(err) {
            console.log('co loi xay ra',err)
            Swal.fire({
              icon: "error",
              title: "Lưu thất bại",
              text: 'Đã xảy ra lỗi khi lưu',
            });
        },
      })
    }
  }
}
