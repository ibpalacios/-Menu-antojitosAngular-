import { Component, OnInit } from '@angular/core';
import { CymbalService } from '../../services/cymbal.service';
import { CymbalModel } from 'src/app/models/cymbal-model';


@Component({
  selector: 'app-cymbal-module',
  templateUrl: './cymbal-module.component.html',
  styleUrls: ['./cymbal-module.component.css']
})
export class CymbalModuleComponent implements OnInit {

  saucers: CymbalModel [] = [];
  idCymbal: string;
  activo: Boolean = true;
  edit: boolean = true;

  constructor(private cymbalService: CymbalService) { }

  ngOnInit(): void {
  }

  getCymbal(){
    this.cymbalService.getCymbal().then((res: any) => {
      this.saucers = res.cnt
      console.log('todo bien!');
    }).catch(err => {
      console.log(err);
    });
  }

  editCymbal(valueEdit,  _id: string){
    this.edit = valueEdit;
    this.idCymbal = _id;
  }
}
