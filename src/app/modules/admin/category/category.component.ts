import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  listCate : any;
  clickAdd= true;
  nameCate = ''

  constructor(private router : Router, private catesv : CategoryService){}
  ngOnInit(){
    this.catesv.getAll().subscribe({
      next : (value) => {
          this.listCate = value
      },
    })
  }

  edit(id : number) {
    this.router.navigate(['/admin/category/edit/' + id]);
  }

  addCate() {
    if(this.nameCate.trim().length > 0) {
      Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Bạn có muốn lưu tên danh mục này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lưu",
        cancelButtonText: 'Quay lại'
      }).then((result) => {
        if (result.isConfirmed) {
          const formdata = new FormData();
          formdata.append('name',this.nameCate)
          this.catesv.create(formdata).subscribe({
            next : (value) => {
              Swal.fire({
                title: "Save!",
                text: "Tên danh mục đã được lưu",
                icon: "success",
                timer: 2000
              });
              this.catesv.getAll().subscribe({
                next : (value) => {
                    this.listCate = value
                },
              })
            },
            error : (err) => {
              console.log(err)
              Swal.fire({
                icon: "error",
                title: "Lưu thất bại",
                text: 'Đã xảy ra lỗi khi lưu',
              });
            },
          })
        }
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Tên danh mục không được để trống',
      });
    }
  }

  delete(id : any) {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể khôi phục danh mục này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText : 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.catesv.delete(id).subscribe({
          next : (value) => {
            this.catesv.getAll().subscribe({
              next : (value) => {
                  this.listCate = value
              },
            })
          },
          error : (err) => {
            Swal.fire({
              title: "Opps",
              text: "Đã xảy ra lỗi khi xóa!!!",
              icon: "error"
            });
          },
        })
      }
    });
  }
}
