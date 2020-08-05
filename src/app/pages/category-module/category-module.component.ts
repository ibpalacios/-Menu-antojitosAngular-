import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/models/category-model';
import { ExportDataService } from '../../services/export-to-excel.service';
import { PdfServiceService } from '../../services/export-to-pdf-service.service';


@Component({
  selector: 'app-category-module',
  templateUrl: './category-module.component.html',
  styleUrls: ['./category-module.component.css']
})
export class CategoryModuleComponent implements OnInit {
 
  categoryStatus: CategoryModel = new CategoryModel();
  categories: CategoryModel [] = []
  arrayCategoy = [];
  title: string;
  searchText: any;
  idCategory: string;
  activo: Boolean = true;
  edit: boolean = true;
  refresh: boolean = false;

  constructor(private categoryService: CategoryService, private exportDataService: ExportDataService, private pdfServiceService: PdfServiceService) { }

  ngOnInit(): void {
    this.getCategory();
    this.title = "Reporte de Categorias"
    this.arrayCategoy = [];
  }

  getCategory(){
    this.categoryService.getCategory().then((res: any) => {
      this.categories = res.cnt;
      for(const i of this.categories){
        let element = [
          i.strName.replace(/\:null/gi,':""'),
          i.strDescription.replace(/\:null/gi,':""')
        ];
        this.arrayCategoy.push(element);
      }
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

  actexportPDF () {
    this.exportPDF();
    this.ngOnInit();
  }

  exportPDF() {
    var data =[this.arrayCategoy];
    data=[];
     let header = [
       {
         text: "Nombre de la categoria",
         style: "tableHeader",
         bold: true,
         fillColor: "#2a3e52",
         color: "#ffffff",
         size: 13,
       },
       {
        text: "Descripción",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }
     ]; 
     this.pdfServiceService.generatePdf(
       this.title,
       header,
       this.arrayCategoy,
       "center",
     );
   }

   exportAsXLSX() {
    if (this.categories.length !== 0) {
      let jsonobject = JSON.stringify(this.categories);
      jsonobject = jsonobject.replace(/strName/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strDescription/gi, 'Descripción');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].__v;
      }
      this.exportDataService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }
}
