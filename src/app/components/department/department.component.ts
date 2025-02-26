import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { DepartmentModel } from '../../models/department.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DepartmentProductionModel } from '../../models/department-production.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  id: string = "";
  departmentModel: DepartmentModel = new DepartmentModel();
  departmentProductionModel: DepartmentProductionModel = new DepartmentProductionModel();
  departmentProductions: DepartmentProductionModel[] = [];
  products: ProductModel[] = [];

  selectedOption: string = 'Select Product...'; // Varsayılan olarak seçilen öğe
  isDropdownOpen: boolean = false;

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
    this.getDepartmentById(this.id!);
    this.getAllDepartmentProductionByDepartmentId(this.id)
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get("Products/GetAll", (res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  getDepartmentById(id: string) {
    this.http.get(`Departments/GetById?Id=${id}`, (res) => {
      this.departmentModel = res.data;
      console.log(this.departmentModel);
    });
  }

  updateDepartment(form: NgForm) {
    if (form.valid) {
      this.http.post("Departments/Update", this.departmentModel, (res) => {
        console.log(res);
        this.getDepartmentById(this.id!);
        this.getAllDepartmentProductionByDepartmentId(this.id)
        this.getAllProducts();
      });
    }
  }

  getAllDepartmentProductionByDepartmentId(id: string) {
    this.http.get(`DepartmentProductions/GetAllByDepartmentId?Id=${id}`, (res) => {
      this.departmentProductions = res.data;
      console.log(this.departmentProductions);
    });
  }

  createDepartmentProduction() {
    this.departmentProductionModel.departmentId = this.id;
    this.departmentProductionModel.productId = this.selectedProductId!;
    this.http.post("DepartmentProductions/Create", this.departmentProductionModel, (res) => {
      console.log(res);
      this.getDepartmentById(this.id!);
      this.getAllDepartmentProductionByDepartmentId(this.id)
      this.getAllProducts();
    });
  }

  deleteDepartmentProductionById(id:string) {
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`Departments/DeleteById?Id=${id}`, (res) => {
        this.getDepartmentById(this.id!);
        this.getAllDepartmentProductionByDepartmentId(this.id)
        this.getAllProducts();
      });
    });
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

  selectProduct(product: ProductModel) {
    this.selectedOption = product.productName;
    this.selectedProductId = product.id!; // Seçilen kategori ID'sini ayarla
    console.log(this.selectedProductId);

    this.isDropdownOpen = false;
    this.toggleDropdown(
      this.elRef.nativeElement.querySelector('.select'),
      this.elRef.nativeElement.querySelector('.caret'),
      this.elRef.nativeElement.querySelector('.menu')
    );
  }
}
