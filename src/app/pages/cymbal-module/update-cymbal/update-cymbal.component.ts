import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CymbalService } from '../../../services/cymbal.service';
import { CymbalModel } from '../../../models/cymbal-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-cymbal',
  templateUrl: './update-cymbal.component.html',
  styleUrls: ['./update-cymbal.component.css']
})
export class UpdateCymbalComponent implements OnInit {

  cymbal: CymbalModel = new CymbalModel();
  @Output() optionCancel = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Input() idCymbal: string;

  constructor(private cymbalService: CymbalService) { }

  ngOnInit(): void {
    this.getCymbalWithId();
  }

  updateCymbal(form: NgForm){
    this.cymbalService.updateCymbal(this.idCymbal, this.cymbal).then(res => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Ha sido actualizad correctamente`,
        showConfirmButton: false,
        timer: 2000
      });

      form.reset();
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
      })
    });
  }

  getCymbalWithId(){
    this.cymbalService.getCymbalWithId(this.idCymbal).then((res: any) => {
      this.cymbal = res.cnt;
    }).catch(err => {
      console.log(err);
    });
  }

  editCanceled(){
    this.optionCancel.emit(true);
  }

}
