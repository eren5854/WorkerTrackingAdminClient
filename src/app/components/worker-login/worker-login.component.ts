import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { WorkerAssignmentModel } from '../../models/worker-assignment.model';

@Component({
  selector: 'app-worker-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './worker-login.component.html',
  styleUrl: './worker-login.component.css'
})
export class WorkerLoginComponent {
  workerAssignmentModel: WorkerAssignmentModel = new WorkerAssignmentModel();
  code: string = '';
  quantityCardVisible:boolean = false;
  imageUrl?:string;
  quantity:number = 0;

  constructor(
    private http:HttpService,
    private swal: SwalService
  ){
    this.imageUrl = http.imageUrl;
  }

  workerLogin(){
    this.http.get(`WorkerLogins/WorkerLoginWithCode?WorkerCode=${this.code}`, (res) => {
      this.workerAssignmentModel = res.data;
      console.log(this.workerAssignmentModel);
      this.quantityCardVisible = true;
    });
  }

  workerActualQuantity(){
    this.http.get(`WorkerLogins/WorkerActualQuantity?AppUserId=${this.workerAssignmentModel.userInfo.appUserId}&ActualQuantity=${this.quantity}`, (res) => {
      console.log(res);
      this.swal.callToast(res.data, "success");
    });
  }

  addToInput(value: string) {
    this.code += value;
  }

  deleteLastChar() {
    this.code = this.code.slice(0, -1);
  }

  exit(){
    location.reload();
  }
}
