import { Component, signal } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WorkerProductionModel } from '../../models/worker-production.model';
import { ProductModel } from '../../models/product.model';
import { WorkerDailyProductionModel } from '../../models/worker-daily-production.model';
import { WorkerWeeklyProductionModel } from '../../models/worker-weekly-production.model';
import { WorkerMonthlyProductionModel } from '../../models/worker-monthly-production.model';
import { WorkerYearlyProductionModel } from '../../models/worker-yearly-production.model';
import { FlexiGridModule } from 'flexi-grid';

@Component({
  selector: 'app-worker-production',
  standalone: true,
  imports: [CommonModule, FormsModule, FlexiGridModule],
  templateUrl: './worker-production.component.html',
  styleUrl: './worker-production.component.css'
})
export class WorkerProductionComponent {
  id: string = "";

  // dateOfBirthFilterable = signal<boolean>(true);
  // dateOfBirthFilterType = signal<FilterType>("date");
  // themeClass = signal<string>("dark");

  workerProductionModel: WorkerProductionModel = new WorkerProductionModel();
  workerDailyProductions: WorkerDailyProductionModel[] = [];
  workerWeeklyProductions: WorkerWeeklyProductionModel[] = [];
  workerMonthlyProductions: WorkerMonthlyProductionModel[] = [];
  workerYearlyProductions: WorkerYearlyProductionModel[] = [];
  products: ProductModel[] = [];

  selectedProductId: string | null = null;
  currentProductId?: string;
  selectedProductName: string | null = null;

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });

    this.getWorkerProductionById(this.id);
    this.getAllProducts();
  }

  getWorkerProductionById(id: string) {
    this.http.get(`WorkerProductions/GetById?Id=${id}`, (res) => {
      if (res && res.data) {
        this.workerProductionModel = res.data;
        console.log(this.workerProductionModel);


        if (Array.isArray(this.workerProductionModel.dailyProductions)) {
          this.workerDailyProductions = [...this.workerProductionModel.dailyProductions];
        } else {
          this.workerDailyProductions = [];
        }

        if (Array.isArray(this.workerProductionModel.weeklyProductions)) {
          this.workerWeeklyProductions = [...this.workerProductionModel.weeklyProductions];
        } else {
          this.workerWeeklyProductions = [];
        }

        if (Array.isArray(this.workerProductionModel.monthlyProductions)) {
          this.workerMonthlyProductions = [...this.workerProductionModel.monthlyProductions];
        } else {
          this.workerMonthlyProductions = [];
        }

        if (Array.isArray(this.workerProductionModel.yearlyProductions)) {
          this.workerYearlyProductions = [...this.workerProductionModel.yearlyProductions];
        } else {
          this.workerYearlyProductions = [];
        }

        this.selectedProductName = this.workerProductionModel.productInfo.productName;
        this.selectedProductId = this.workerProductionModel.productInfo.productId;
        this.currentProductId = this.selectedProductId!;
      }
    });
  }

  getAllProducts() {
    this.http.get("Products/GetAll", (res) => {
      this.products = res.data;
      console.log(this.products);
    });
  }

  updateWorkerProduction(form: NgForm) {
    this.workerProductionModel.appUserId = this.workerProductionModel.appUserInfo.appUserId;
    this.workerProductionModel.productId = this.selectedProductId!;
    if (form.valid) {
      this.http.post("WorkerProductions/Update", this.workerProductionModel, (res) => {
        console.log(res);
        this.getWorkerProductionById(this.id);
        this.getAllProducts();
      });
    }
  }

  updateWorkerDailyProduction(workerDailyProduction: WorkerDailyProductionModel) {

  }

  deleteWorkerDailyProductionById(id: string) {

  }

  onProductChange(event: any) {
    this.selectedProductId = event.target.value;
    console.log("Seçilen Ürün ID:", this.selectedProductId);
  }
}
