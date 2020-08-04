import { Component, OnInit } from '@angular/core';
import { CymbalService } from '../../services/cymbal.service';
import { CymbalModel } from 'src/app/models/cymbal-model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cymbal-module',
  templateUrl: './cymbal-module.component.html',
  styleUrls: ['./cymbal-module.component.css']
})
export class CymbalModuleComponent implements OnInit {

  cymbalStatus: CymbalModel = new CymbalModel();
  cymbalArray: CymbalModel [] = [];
  saucers: CymbalModel [] = [];
  searchText: any;
  idCategory: string; 
  idCymbal: string;
  refresh: boolean = false;
  activo: Boolean = true;
  edit: boolean = true;
  

  constructor(private cymbalService: CymbalService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.idCategory = this.activatedRoute.snapshot.params.id;
  this.getCymbal(this.idCategory);
  }

  getCymbal(idCategory: string){
    this.cymbalService.getCymbalByCategory(idCategory).then((res: any) => {
      this.saucers = res.cnt
      console.log(res.cnt);
      console.log('todo bien!');
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
}
