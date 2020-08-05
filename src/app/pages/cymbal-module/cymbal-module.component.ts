import { Component, OnInit } from '@angular/core';
import { CymbalService } from '../../services/cymbal.service';
import { CymbalModel } from 'src/app/models/cymbal-model';
import { ActivatedRoute } from '@angular/router';
import { ExportDataService } from '../../services/export-to-excel.service';
import { PdfServiceService } from '../../services/export-to-pdf-service.service';


@Component({
  selector: 'app-cymbal-module',
  templateUrl: './cymbal-module.component.html',
  styleUrls: ['./cymbal-module.component.css']
})
export class CymbalModuleComponent implements OnInit {

  cymbalStatus: CymbalModel = new CymbalModel();
  cymbalArray: CymbalModel [] = [];
  saucers: CymbalModel [] = [];
  arrayCymbal = [];
  searchText: any;
  idCategory: string; 
  idCymbal: string;
  title: string;
  refresh: boolean = false;
  activo: Boolean = true;
  edit: boolean = true;
  

  constructor(private cymbalService: CymbalService, private activatedRoute: ActivatedRoute, private exportDataService: ExportDataService, private pdfServiceService: PdfServiceService) { }

  ngOnInit(): void {
  this.idCategory = this.activatedRoute.snapshot.params.id;
  this.title = "Reporte de Platillos"
  this.getCymbal(this.idCategory);
  this.arrayCymbal = [];
  }

  getCymbal(idCategory: string){
    this.cymbalService.getCymbalByCategory(idCategory).then((res: any) => {
      this.saucers = res.cnt
      console.log(res.cnt);
      for(const i of this.saucers){
        let strPieces = i.nmbPieces.toString();
        let strPrice = i.nmbPrice.toString();
        let element = [
          i.strName.replace(/\:null/gi,':""'),
          i.strDescription.replace(/\:null/gi,':""'),
          i.strIngredients.replace(/\:null/gi,':""'),
          strPieces.replace(/\:null/gi,':""'),
          strPrice.replace(/\:null/gi,':""')
        ];
        this.arrayCymbal.push(element);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  StatusCymbalFalse(id: string){
    this.cymbalStatus.blnStatus = true;
    this.cymbalService.updateCymbal(id, this.cymbalStatus).then(res => {
     this.getCymbal(this.idCategory);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }

  StatusCymbalTrue(id: string){
    this.cymbalStatus.blnStatus = false;
    this.cymbalService.updateCymbal(id, this.cymbalStatus).then(res => {
      console.log(this.idCategory);
      this.getCymbal(this.idCategory);
    }).catch(err => {
      console.log(err.error.msg);
    });
  }

  editCymbal(valueEdit,  _id: string){
    this.edit = valueEdit;
    this.idCymbal = _id;
  }

  refreshTable(e){
    this.refresh = e;
    if (this.refresh){
      this.ngOnInit();
    }
  }

  editCanceled(e) {
    this.edit = e;
  }

  actexportPDF () {
    this.exportPDF();
    this.ngOnInit();
  }

  exportPDF() {
    var data =[this.arrayCymbal];
    data=[];
     let header = [
       {
         text: "Platillo",
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
      },
      {
        text: "Ingredientes",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Piezas",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "Precio",
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
       this.arrayCymbal,
       "center",
     );
   }

   exportAsXLSX() {
    if (this.saucers.length !== 0) {
      let jsonobject = JSON.stringify(this.saucers);
      jsonobject = jsonobject.replace(/strName/gi, 'Nombre');
      jsonobject = jsonobject.replace(/strDescription/gi, 'Descripción');
      jsonobject = jsonobject.replace(/strIngredients/gi, 'Ingredientes');
      jsonobject = jsonobject.replace(/nmbPieces/gi, 'Pieza');
      jsonobject = jsonobject.replace(/nmbPrice/gi, 'Precio');
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].createdAt;
        delete jsonobject2[i].updatedAt;
        delete jsonobject2[i].blnStatus;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].idCategory;
        delete jsonobject2[i].__v;
      }
      this.exportDataService.exportAsExcelFile(jsonobject2, `${this.title}`);
    }

  }
}
