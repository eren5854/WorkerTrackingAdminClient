import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DepartmentModel } from '../../models/department.model';
import { RouterLink } from '@angular/router';
import { FlexiGridModule } from 'flexi-grid';

@Component({
    selector: 'app-workers',
    standalone:true,
    imports: [CommonModule, FormsModule, RouterLink, FlexiGridModule],
    templateUrl: './workers.component.html',
    styleUrl: './workers.component.css'
})
export class WorkersComponent {
  workers: UserModel[] = [];
  workerModel: UserModel = new UserModel();
  departments: DepartmentModel[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageUrl: string | null = null;

  selectedDepartmentId: string | null = null;

  constructor(
    private http : HttpService,
  ){
    this.getAllWorkers();
    this.getAllDepartments();
  }

  getAllWorkers(){
    this.http.get("Workers/GetAll", (res) => {
      this.workers = res.data;
      console.log(this.workers);
    });
  }

  getAllDepartments(){
    this.http.get("Departments/GetAll", (res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
  }

  createUser(){
    const formData = new FormData();
    formData.append("firstName", this.workerModel.firstName!);
    formData.append("lastName", this.workerModel.lastName!);
    formData.append("userName", this.workerModel.userName!);
    formData.append("dateOfBirth", this.workerModel.dateOfBirth);
    formData.append("profilePicture", this.fileInput.nativeElement.files[0]);
    formData.append("departmentId", this.selectedDepartmentId!);
    this.http.post("Workers/Create", formData, (res) => {
      console.log(res);
      this.getAllWorkers();
      this.getAllDepartments();
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  setImage(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.workerModel.profilePicture = file.name;
      console.log(this.workerModel.profilePicture);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProductChange(event: any) {
    this.selectedDepartmentId = event.target.value;
    console.log("Seçilen Ürün ID:", this.selectedDepartmentId);
  }
}
