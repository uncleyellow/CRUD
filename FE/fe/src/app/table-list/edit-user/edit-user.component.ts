import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() data: any;
  constructor(
    public activeModal: NgbActiveModal,
    public userService: UserService,
  ) {

  }

  ngOnInit(): void {
  }
  processResponse() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Edit User Done',
      icon: 'success',
    });
  }
  save() {
    const user = {
      id: this.data.id,
      name: this.data.name,
      email: this.data.email
    };
    this.userService.updateUser(user).subscribe(
      response => {
        console.log(response); // Xử lý phản hồi từ server
        this.activeModal.close(user)
        this.processResponse()
      },
      error => {
        console.error(error); // Xử lý lỗi (nếu có)
        this.activeModal.close()
      }
    );
  }
}

