import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() data: any;
  constructor(
    public activeModal: NgbActiveModal,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }
  processResponse() {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: 'Delete User Done',
      icon: 'success',
    });
  }
  save(item:any){
    this.userService.deleteUser(this.data.id).subscribe(
      response => {
        console.log(response); // Xử lý phản hồi từ server
        this.activeModal.close(response)
        this.processResponse()
      },
      error => {
        console.error(error); // Xử lý lỗi (nếu có)
      }
    );
  }
}
