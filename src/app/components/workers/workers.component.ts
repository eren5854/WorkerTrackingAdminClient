import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { SwalService } from '../../services/swal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DepartmentModel } from '../../models/department.model';
import { RouterLink } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent {
  workers: UserModel[] = [];
  workerModel: UserModel = new UserModel();
  departments: DepartmentModel[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageUrl: string | null = null;

  selectedOption: string = 'Kategori seçiniz...'; // Varsayılan olarak seçilen öğe
  isDropdownOpen: boolean = false;

  selectedDepartmentId: string | null = null;

  constructor(
    private http : HttpService,
    private auth: AuthService,
    private swal: SwalService,
    private renderer: Renderer2,
    private elRef: ElementRef,
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
    formData.append("password", this.workerModel.password!);
    formData.append("dateOfBirth", this.workerModel.dateOfBirth);
    formData.append("gender", this.workerModel.gender);
    formData.append("profilePicture", this.fileInput.nativeElement.files[0]);
    formData.append("departmentId", this.selectedDepartmentId!);
    this.http.post("Workers/Create", formData, (res) => {
      console.log(res);
      
    })


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

  ngAfterViewInit() {
    const selectElement = this.elRef.nativeElement.querySelector('.select');
    const caretElement = this.elRef.nativeElement.querySelector('.caret');
    const menuElement = this.elRef.nativeElement.querySelector('.menu');
    const options = this.elRef.nativeElement.querySelectorAll('.menu li');

    this.renderer.listen(selectElement, 'click', () => {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.toggleDropdown(selectElement, caretElement, menuElement);
    });

    options.forEach((option:any) => {
      this.renderer.listen(option, 'click', () => {
        this.selectedOption = option.innerHTML;
        this.isDropdownOpen = false;
        this.toggleDropdown(selectElement, caretElement, menuElement);
        this.clearActiveOptions(options);
        this.renderer.addClass(option, 'active');
      });
    });
  }

  toggleDropdown(selectElement: HTMLElement, caretElement: HTMLElement, menuElement: HTMLElement) {
    if (this.isDropdownOpen) {
      this.renderer.addClass(selectElement, 'select-clicked');
      this.renderer.addClass(caretElement, 'caret-rotate');
      this.renderer.addClass(menuElement, 'menu-open');
    } else {
      this.renderer.removeClass(selectElement, 'select-clicked');
      this.renderer.removeClass(caretElement, 'caret-rotate');
      this.renderer.removeClass(menuElement, 'menu-open');
    }
  }

  clearActiveOptions(options: NodeListOf<Element>) {
    options.forEach(option => {
      this.renderer.removeClass(option, 'active');
    });
  }

  selectCategory(department: DepartmentModel) {
    this.selectedOption = department.departmentName;
    this.selectedDepartmentId = department.id!; // Seçilen kategori ID'sini ayarla
    console.log(this.selectedDepartmentId);
    
    this.isDropdownOpen = false;
    this.toggleDropdown(
      this.elRef.nativeElement.querySelector('.select'),
      this.elRef.nativeElement.querySelector('.caret'),
      this.elRef.nativeElement.querySelector('.menu')
    );
  }
}
