import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { UserModel } from '../../models/user.model';
import { MachineModel } from '../../models/machine.model';
import { DepartmentModel } from '../../models/department.model';
import { ProductModel } from '../../models/product.model';
import { WorkerProductionModel } from '../../models/worker-production.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    workers: UserModel[] = [];
    machines: MachineModel[] = [];
    departments: DepartmentModel[] = [];
    products: ProductModel[] = [];
    workerProductions: WorkerProductionModel[] = [];
    productCounts: ProductCountModel[] = [];

    totalProducts:number = 0;

    constructor(
        private http: HttpService
    ) {
        this.getAllWorkers();
        this.getAllMachines();
        this.getAllDepartments();
        this.getAllProducts();
        this.getAllWorkerProductions();
        this.getAllProductCount();
    }

    getAllWorkers() {
        this.http.get("Workers/GetAll", (res) => {
            this.workers = res.data
            console.log(this.workers);
        });
    }

    getAllMachines() {
        this.http.get("Machines/GetAll", (res) => {
            this.machines = res.data
            console.log(this.machines);
        });
    }

    getAllDepartments() {
        this.http.get("Departments/GetAll", (res) => {
            this.departments = res.data
            console.log(this.departments);
        });
    }

    getAllProducts() {
        this.http.get("Products/GetAll", (res) => {
            this.products = res.data
            console.log(this.products);
        });
    }

    getAllWorkerProductions() {
        this.http.get("WorkerProductions/GetAll", (res) => {
            this.workerProductions = res.data;
            console.log(this.workerProductions); 

            // this.workerProductions = res.data;
            // console.log("Tüm Worker Productions:", this.workerProductions);

            // // appUserId'ye göre gruplayarak yearlyActual toplamını hesaplama
            // const yearlyTotals = this.workerProductions.reduce((acc, workerProduction) => {
            //     const appUserId = workerProduction.appUserId;
            //     const yearlyActual = workerProduction.yearlyActual || 0; // Eğer null ise 0 olarak al

            //     if (!acc[appUserId]) {
            //         acc[appUserId] = 0;
            //     }

            //     acc[appUserId] += yearlyActual;
            //     return acc;
            // }, {} as { [key: string]: number });

            // console.log("Yearly Actual Toplamları:", yearlyTotals);

            // // Her WorkerProductionModel nesnesine totalProduction değerini ekleme
            // this.workerProductions.forEach(workerProduction => {
            //     workerProduction.totalProduction = yearlyTotals[workerProduction.appUserId] || 0;
            // });

            // console.log("Güncellenmiş Worker Productions:", this.workerProductions);
        });
    }

    getAllProductCount(){
        this.http.get("Products/GetAllCount", (res) => {
            this.productCounts = res.data;
            console.log(this.productCounts);
            this.productCounts.forEach(productCount => {
                this.totalProducts += productCount.count!;
            });
        })
    }
}

export class ProductCountModel{
    id?:string;
    productId?:string;
    name?:string;
    count?:number;
}
