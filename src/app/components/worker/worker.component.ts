import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../services/swal.service';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-worker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker.component.html',
  styleUrl: './worker.component.css'
})
export class WorkerComponent {
  workerModel: UserModel = new UserModel();
  id:string = "";
  imageUrl?:string;
  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
    private swal: SwalService,
    private router: Router
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
    this.getWorkerById(this.id!);
    this.imageUrl = this.http.getImageUrl();
  }

  getWorkerById(id:string){
    this.http.get(`Workers/GetById?Id=${id}`, (res) => {
      this.workerModel = res.data;
      console.log(this.workerModel);
      
    });
  }
}
