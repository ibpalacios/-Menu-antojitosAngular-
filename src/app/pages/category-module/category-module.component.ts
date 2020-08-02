import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/models/category-model';


@Component({
  selector: 'app-category-module',
  templateUrl: './category-module.component.html',
  styleUrls: ['./category-module.component.css']
})
export class CategoryModuleComponent implements OnInit {
 
  categoryStatus: CategoryModel = new CategoryModel();
  categories: CategoryModel [] = []
  idCategory: string;
  activo: Boolean = true;
  edit: boolean = true;
  refresh: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this.categoryService.getCategory().then((res: any) => {
      this.categories = res.cnt;
      console.log('todo bien!');
    }).catch(err => {
      console.log(err)
    });
  }

  editCategory(valueEdit: boolean, _id: string){
    this.edit = valueEdit;
    this.idCategory = _id;
  }

  StatusCategoryTrue(id: string){
    this.categoryStatus.blnStatus = false;
    this.categoryService.updateCategory(id, this.categoryStatus).then(res => {
      this.getCategory();
      console.log(res);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }

  StatusCategoryFalse(id: string){
    this.categoryStatus.blnStatus = true;
    this.categoryService.updateCategory(id, this.categoryStatus).then(res => {
      this.getCategory();
      console.log(res);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }

  editCanceled(e) {
    this.edit = e;
  }

  refreshTable(e){
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }
}
