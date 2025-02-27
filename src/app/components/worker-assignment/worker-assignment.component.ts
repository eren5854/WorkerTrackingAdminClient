import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worker-assignment',
  imports: [FormsModule, CommonModule],
  templateUrl: './worker-assignment.component.html',
  styleUrl: './worker-assignment.component.css'
})
export class WorkerAssignmentComponent {
  id:string = "";
  constructor(
    private http: HttpService,
    private activated: ActivatedRoute
  ){
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
    });
  }

  
}
