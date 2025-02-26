import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DepartmentModel } from '../../models/department.model';
import { WorkerProductionModel } from '../../models/worker-production.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.css'
})
export class WorkerComponent {
  workerModel: UserModel = new UserModel();
  departments: DepartmentModel[] = [];
  workerProductions: WorkerProductionModel[] = [];
  workerProductionModel: WorkerProductionModel = new WorkerProductionModel();
  products: ProductModel[] = [];
  id: string = "";
  imageUrl?: string;

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageUrl: string | null = null;

  selectedOption: string = 'Select Department...';
  isDropdownOpen: boolean = false;

  selectedDepartmentId: string | null = null;
  selectedProductId: string | null = null;
  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
    private swal: SwalService,
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    this.imageUrl = this.http.getImageUrl();
    this.getWorkerById(this.id!);
    this.getAllDepartments();
    this.getAllWorkerProductionsByUserId(this.id);
    this.getAllProducts();
  }

  getWorkerById(id: string) {
    this.http.get(`Workers/GetById?Id=${id}`, (res) => {
      this.workerModel = res.data;
      console.log(this.workerModel);
      this.selectedOption = this.workerModel.departmentInfo.departmentName;
      this.selectedDepartmentId = this.workerModel.departmentInfo.departmentId!;
      this.selectedImageUrl = this.imageUrl + "ProfilePictures/" + this.workerModel.profilePicture;
    });
  }

  getAllWorkerProductionsByUserId(id: string) {
    this.http.get(`WorkerProductions/GetAllByUserId?Id=${id}`, (res) => {
      this.workerProductions = res.data;
      console.log(this.workerProductions);
    });
  }

  getAllDepartments() {
    this.http.get("Departments/GetAll", (res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
  }

  getAllProducts() {
    this.http.get("Products/GetAll", (res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  updateWorker() {
    const formData = new FormData();
    formData.append("id", this.workerModel.id!);
    formData.append("firstName", this.workerModel.firstName!);
    formData.append("lastName", this.workerModel.lastName!);
    formData.append("userName", this.workerModel.userName!);
    formData.append("dateOfBirth", this.workerModel.dateOfBirth);
    formData.append("gender", this.workerModel.gender);
    formData.append("departmentId", this.selectedDepartmentId!);
    formData.append("profilePicture", this.fileInput.nativeElement.files[0]);
    this.http.post("Workers/Update", formData, (res) => {
      console.log(res);
      this.getWorkerById(this.id!);
      this.getAllDepartments();
      this.getAllWorkerProductionsByUserId(this.id);
      this.getAllProducts();
    });
  }

  createWorkerProduction(form: NgForm) {
    this.workerProductionModel.appUserId = this.id;
    this.workerProductionModel.productId = this.selectedProductId!;
    if (form.valid) {
      this.http.post("WorkerProductions/Create", this.workerProductionModel, (res) => {
        console.log(res);
        this.getWorkerById(this.id!);
        this.getAllDepartments();
        this.getAllWorkerProductionsByUserId(this.id);
        this.getAllProducts();
      });
    }
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

    options.forEach((option: any) => {
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

  selectDepartment(department: DepartmentModel) {
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

  onProductChange(event: any) {
    this.selectedProductId = event.target.value;
    console.log("Seçilen Ürün ID:", this.selectedProductId);
  }
}
