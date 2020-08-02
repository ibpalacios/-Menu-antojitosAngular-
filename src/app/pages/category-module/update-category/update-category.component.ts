import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../models/category-model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  category: CategoryModel = new CategoryModel();
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCategory: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getModalidadesWithId();
  }

  updateCategory(form: NgForm){
    this.categoryService.updateCategory(this.idCategory, this.category).then(res => {
      console.log(this.category);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Ha sido actualizado exitosamente`,
        showConfirmButton: false,
        timer: 2000
      });

      form.controls['strName'].reset(); 
      form.controls['strDescription'].reset();
      this.optionCancel.emit(true);
      this.refresh.emit(true);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.error.msg,
        showConfirmButton: false,
        timer: 2000
      });
    })
  }

  getModalidadesWithId(){
    this.categoryService.getCategoryWithId(this.idCategory).then((res: any) => {
      this.category = res.cnt;
    }).catch(err => {
      console.log(err);
    });
  }

  editCanceled(){
    this.optionCancel.emit(true);
  }

}
