import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  item: any[] = []
  name: any
  email: any
  @Input() data: any;
  isEdit: boolean = false
  constructor(
    public activeModal: NgbActiveModal,
    public userService: UserService,

  ) {
    if (this.data) {
      this.isEdit = true
    }
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
      title: 'Add User Done',
      icon: 'success',
    });
  }
  save(item: any) {
    const user = {
      name: this.name,
      email: this.email
    };
    this.userService.addUser(user).subscribe(
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
