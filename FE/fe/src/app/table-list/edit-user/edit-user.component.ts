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
    const regex = /[!@#$%^&*(),.?":{}|<>]/; // Biểu thức chính quy để kiểm tra ký tự đặc biệt
    if (regex.test(this.data.name)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Add User Error',
        text: 'Please do not enter special characters in the name.',
        icon: 'error',
      });
      return;
    }
    if(this.data.name.length < 2){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Add User Error',
        text: 'Please enter a name with at least 2 characters.',
        icon: 'error',
      });
      return
    }
    if(this.data.name.length > 50){
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Add User Error',
        text: 'Please enter a name with max 50 characters.',
        icon: 'error',
      });
      return
    }
    if (!this.data.email.includes('@')) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: 'Add User Error',
        text: 'Please enter a valid email address.',
        icon: 'error',
      });
      return;
    }
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

