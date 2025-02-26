import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WorkerProductionModel } from '../../models/worker-production.model';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-worker-production',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker-production.component.html',
  styleUrl: './worker-production.component.css'
})
export class WorkerProductionComponent {
  id: string = "";
  workerProductionModel: WorkerProductionModel = new WorkerProductionModel();
  products: ProductModel[] = [];

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

    this.getWorkerProductionById(this.id);
    this.getAllProducts();
  }

  getWorkerProductionById(id:string){
    this.http.get(`WorkerProductions/GetById?Id=${id}`, (res) => {
      this.workerProductionModel = res.data;
      console.log(this.workerProductionModel);
    });
  }

  getAllProducts() {
    this.http.get("Products/GetAll", (res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  updateWorkerProduction(form:NgForm){
    
  }

  onProductChange(event: any) {
    this.selectedProductId = event.target.value;
    console.log("Seçilen Ürün ID:", this.selectedProductId);
  }
}
