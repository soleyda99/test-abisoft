import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interface/users';
import { UserService } from '../../../../services/user.services';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true })
  modalComponent!: ModalComponent;
  public title: string = '';
  public users: User[] = [];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this._userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  openModal(title: any, data?: any) {
    this.title = title;
    this.modalComponent.openModal(data);
  }

  guardar(data: any) {
    this._userService.saveData(data).subscribe((res: any) => {
      this.alertSuccess(res.message);
      this.getAllUser();
    });
  }

  actualizar(data: any) {
    this._userService.actData(data.data, data.id).subscribe((res: any) => {
      this.alertSuccess(res.message);
      this.getAllUser();
    });
  }

  alertSuccess(res: any) {
    Swal.fire({
      icon: 'success',
      title: res,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
