import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  items:any[] = []
  searchParams:any
  constructor(
    public userService: UserService,
    private modalService: NgbModal,
  ) { 

  }

  ngOnInit() {
    this.fetch()
  }

  processResponse(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  addUser(){
    const modalRef = this.modalService.open(AddUserComponent, { centered: true, size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        this.fetch();
      }
      // this.processResponse(result);
    }).catch((error) => {
      // Xử lý lỗi nếu cần thiết
    });
  }

  editUser(item:any){
    const modalRef = this.modalService.open(EditUserComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.data = item;
    modalRef.result.then((result) => {
      if (result) {
        this.fetch();
      }
      // this.processResponse(result);
    }).catch((error) => {
      // Xử lý lỗi nếu cần thiết
    });
  }

  deleteUser(item:any){
    const modalRef = this.modalService.open(DeleteUserComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.data = item;
    modalRef.result.then((result) => {
      // this.processResponse(result);
      if (result) {
        this.fetch();
      }
    }).catch((error) => {
      // Xử lý lỗi nếu cần thiết
    });
  }
  fetch(){
    this.userService.getUsers().subscribe(data => {
      this.items = data;
    });
  }
  searchUsers(item:any): void {
    this.userService.searchUsers(item)
      .subscribe((data: any) => {
        this.items = data;
      });
  }
}
