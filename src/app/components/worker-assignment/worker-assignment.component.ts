import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkerAssignmentModel } from '../../models/worker-assignment.model';
import { UserModel } from '../../models/user.model';
import { MachineModel } from '../../models/machine.model';
import { WorkerProductionModel } from '../../models/worker-production.model';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-worker-assignment',
  imports: [FormsModule, CommonModule],
  templateUrl: './worker-assignment.component.html',
  styleUrl: './worker-assignment.component.css'
})
export class WorkerAssignmentComponent {
  id: string = "";
  workerAssignmentModel: WorkerAssignmentModel = new WorkerAssignmentModel();

  // workers: UserModel[] = [];
  machines: MachineModel[] = [];
  workerProductions: WorkerProductionModel[] = [];

  // selectedWorkerId: string | null = null;
  selectedMachineId: string | null = null;
  selectedMachineName: string | null = null;
  currentMachineId?: string;

  selectedWorkerProductionId: string | null = null;
  selectedWorkerProductionName: string | null = null;
  currentWorkerProductionId?: string;

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
    this.getWorkerAssignmentById(this.id);
    this.getAllMachines();
  }

  getWorkerAssignmentById(id: string) {
    this.http.get(`WorkerAssignments/GetById?Id=${id}`, (res) => {
      this.workerAssignmentModel = res.data;
      console.log(this.workerAssignmentModel);

      this.getAllWorkerProductionByWorkerId(this.workerAssignmentModel.userInfo.appUserId);

      this.selectedMachineId = this.workerAssignmentModel.machineInfo.machineId;
      this.currentMachineId = this.workerAssignmentModel.machineInfo.machineId;
      this.selectedMachineName = this.workerAssignmentModel.machineInfo.machineName;

      this.selectedWorkerProductionId = this.workerAssignmentModel.workerProductionInfo.workerProductionId;
      this.currentWorkerProductionId = this.workerAssignmentModel.workerProductionInfo.workerProductionId;
      this.selectedWorkerProductionName = this.workerAssignmentModel.workerProductionInfo.productInfo.productName;
    });
  }

  // getAllWorkers() {
  //   this.http.get("Workers/GetAll", (res) => {
  //     this.workers = res.data;
  //     console.log(this.workers);
  //   });
  // }

  getAllMachines() {
    this.http.get("Machines/GetAll", (res) => {
      this.machines = res.data;
      console.log(this.machines);
    });
  }

  getAllWorkerProductionByWorkerId(id: string) {
    this.http.get(`WorkerProductions/GetAllByUserId?Id=${id}`, (res) => {
      this.workerProductions = res.data;
      console.log(this.workerProductions);
    });
  }

  updateWorkerAssignment() {
    this.workerAssignmentModel.machineId = this.selectedMachineId!;
    this.workerAssignmentModel.workerProductionId = this.selectedWorkerProductionId;
    this.http.post("WorkerAssignments/Update", this.workerAssignmentModel, (res) => {
      console.log(res);
      this.getWorkerAssignmentById(this.id);
      this.getAllMachines();
    });
  }

  deleteWorkerAssignmentById(){
    this.swal.callToastWithButton(`Are you sure you want to delete?`, 'Yes!', () => {
      this.http.get(`WorkerAssignments/DeleteById?Id=${this.id}`, (res) => {
        this.router.navigateByUrl("/workers");
      });
    });
  }

  // onWorkerChange(event: any) {
  //   this.selectedWorkerId = event.target.value;
  //   console.log("Seçilen Çalışan ID:", this.selectedWorkerId);
  //   this.getAllWorkerProductionByWorkerId(this.selectedWorkerId!);
  // }

  onMachineChange(event: any) {
    this.selectedMachineId = event.target.value;
    console.log("Seçilen Makine ID:", this.selectedMachineId);
  }

  onWorkerProductionChange(event: any) {
    this.selectedWorkerProductionId = event.target.value;
    console.log("Seçilen Üretim ID:", this.selectedWorkerProductionId);
  }
}
