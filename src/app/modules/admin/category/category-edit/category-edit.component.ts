import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent {
  id = ''
  category : any

  constructor(private route: ActivatedRoute, private cateSv : CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.cateSv.getById(this.id).subscribe({
        next: (value) => {
            this.category = value
        },
      })
    });
  }
}
