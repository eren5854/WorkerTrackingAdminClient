import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { WorkerAssignmentModel } from '../../models/worker-assignment.model';
import { UserModel } from '../../models/user.model';
import { MachineModel } from '../../models/machine.model';
import { WorkerProductionModel } from '../../models/worker-production.model';

@Component({
  selector: 'app-worker-assignments',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './worker-assignments.component.html',
  styleUrl: './worker-assignments.component.css'
})
export class WorkerAssignmentsComponent {
  workerAssignmentModel: WorkerAssignmentModel = new WorkerAssignmentModel();
  workerAssignments: WorkerAssignmentModel[] = []

  workers: UserModel[] = [];
  machines: MachineModel[] = [];
  workerProductions: WorkerProductionModel[] = [];

  selectedWorkerId: string | null = null;
  selectedMachinetId: string | null = null;
  selectedWorkerProductionId: string | null = null;


  constructor(
    private http: HttpService
  ) {
    this.getAllWorkerAssignments();
    this.getAllWorkers();
    this.getAllMachines();
  }

  getAllWorkerAssignments() {
    this.http.get("WorkerAssignments/GetAll", (res) => {
      this.workerAssignments = res.data.filter((assignment: WorkerAssignmentModel) => assignment.isActive);
      console.log(this.workerAssignments);
    });
  }

  getAllWorkers() {
    this.http.get("Workers/GetAll", (res) => {
      this.workers = res.data;
      console.log(this.workers);

    });
  }

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

  createWorkerAssignment() {
    this.workerAssignmentModel.appUserId = this.selectedWorkerId!;
    this.workerAssignmentModel.machineId = this.selectedMachinetId!;
    this.workerAssignmentModel.workerProductionId = this.selectedWorkerProductionId!;
    this.http.post("WorkerAssignments/Create", this.workerAssignmentModel, (res) => {
      console.log(res);
      this.getAllWorkerAssignments();
      this.getAllWorkers();
      this.getAllMachines();
    });
  }

  onWorkerChange(event: any) {
    this.selectedWorkerId = event.target.value;
    console.log("Seçilen Çalışan ID:", this.selectedWorkerId);
    this.getAllWorkerProductionByWorkerId(this.selectedWorkerId!);
  }

  onMachineChange(event: any) {
    this.selectedMachinetId = event.target.value;
    console.log("Seçilen Makine ID:", this.selectedMachinetId);
  }

  onWorkerProductionChange(event: any) {
    this.selectedWorkerProductionId = event.target.value;
    console.log("Seçilen Üretim ID:", this.selectedWorkerProductionId);
  }
}
