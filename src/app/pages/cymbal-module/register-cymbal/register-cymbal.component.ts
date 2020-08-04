import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CymbalService } from '../../../services/cymbal.service';
import { CymbalModel } from '../../../models/cymbal-model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-register-cymbal',
  templateUrl: './register-cymbal.component.html',
  styleUrls: ['./register-cymbal.component.css']
})
export class RegisterCymbalComponent implements OnInit {

  cymbal: CymbalModel = new CymbalModel();
  @Output() refresh = new EventEmitter();
  @Input() idCategory: string;

  constructor(private cymbalService: CymbalService) { }

  ngOnInit(): void {
  }

  registerCymbal(form: NgForm){
    this.cymbal.idCategory = this.idCategory; 
    this.cymbalService.postCymbal(this.cymbal).then(res => {
      console.log(res);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Ha sido registrado exitosamente`,
        showConfirmButton: false,
        timer: 2000
      });

      form.reset();
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
}
