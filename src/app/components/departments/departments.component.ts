import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { DepartmentModel } from '../../models/department.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-departments',
    standalone:true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './departments.component.html',
    styleUrl: './departments.component.css'
})
export class DepartmentsComponent {
  departmentModel: DepartmentModel = new DepartmentModel();
  departments: DepartmentModel[] = [];
  addCardDiv: boolean = false;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private auth: AuthService
  ){
    this.getAllDepartments();
  }

  getAllDepartments(){
    this.http.get("Departments/GetAll", (res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
  }

  createDepartment(form:NgForm){
    if (form.valid) {
      this.http.post("Departments/Create", this.departmentModel, (res) => {
        console.log(res);
        this.addCardDiv = false;
        this.getAllDepartments();
      });
    }
  }

  updateDepartment(form:NgForm, department: DepartmentModel){
    if(form.valid){
      this.http.post("Departments/Update", department, (res) => {
        console.log(res);
        this.getAllDepartments();
      })
    }
  }

  deleteDepartmentById(id:string){
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`Departments/DeleteById?Id=${id}`, (res) => {
        this.getAllDepartments();
      });
    });
  }

  addCard(){
    this.addCardDiv = !this.addCardDiv;
  }
}
