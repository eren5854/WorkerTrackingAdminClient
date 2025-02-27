import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';

@Component({
    selector: 'app-products',
    standalone:true,
    imports: [CommonModule, FormsModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: ProductModel[] = [];
  prodcutModel: ProductModel = new ProductModel();

  constructor(
    private http: HttpService,
    private swal: SwalService
  ) {
    this.getAllProduct();
  }

  getAllProduct(){
    this.http.get("Products/GetAll", (res) => {
      this.products = res.data;
      console.log(this.products);
      
    });
  }

  createProduct(){
    this.http.post("Products/Create", this.prodcutModel, (res) => {
      console.log(res);
      this.getAllProduct();
    });
  }

  updateProduct(product:ProductModel){
    this.http.post("Products/Update", product, (res) => {
      console.log(res);
      this.getAllProduct();
    });
  }

  deleteProductById(id: string) {
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`Products/DeleteById?Id=${id}`, (res) => {
        this.getAllProduct();
      });
    });
  }

  updateProductIsActive(id:string){
    this.swal.callToastWithButton('Are you sure you want to change the product status?', 'Yes!', () => {
      this.http.get(`Products/UpdateStatus?Id=${id}`, (res) => {
        this.getAllProduct();
      });
    });
  }

  toggleEditMode(product: ProductModel) {
    product.isEditing = !product.isEditing;
  }
}
