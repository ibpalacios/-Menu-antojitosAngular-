import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category-model';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent implements OnInit {

  @Output() refresh = new EventEmitter();
  category: CategoryModel = new CategoryModel();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  registerCategory(form: NgForm){
    this.categoryService.postCategory(this.category).then(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Ha sido registrado exitosamente`,
        showConfirmButton: false,
        timer: 2000
      });

      form.controls['strName'].reset(); 
      form.controls['strDescription'].reset();
      this.refresh.emit(true);
    }).catch(err => {
      console.log(err);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err,
        showConfirmButton: false,
        timer: 2000
      })
    });
  }

}
