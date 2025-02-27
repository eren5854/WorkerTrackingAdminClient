import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MachineModel } from '../../models/machine.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-machines',
    standalone:true,
    imports: [CommonModule, FormsModule],
    templateUrl: './machines.component.html',
    styleUrl: './machines.component.css'
})
export class MachinesComponent {
  machineModel: MachineModel = new MachineModel();
  machines: MachineModel[] = [];
  addCardDiv: boolean = false;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private auth: AuthService
  ) {
    this.getAllMachines();
  }

  getAllMachines() {
    this.http.get("Machines/GetAll", (res) => {
      this.machines = res.data;
      console.log(this.machines);
    });
  }

  createMachine(form: NgForm) {
    if (form.valid) {
      this.http.post("Machines/Create", this.machineModel, (res) => {
        console.log(res);
        this.addCardDiv = false;
        this.getAllMachines();
      });
    }
  }

  updateMachine(form: NgForm, machine: MachineModel) {
    if (form.valid) {
      this.http.post("Machines/Update", machine, (res) => {
        console.log(res);
        this.getAllMachines();
      })
    }
  }

  deleteMachineById(id: string) {
    this.swal.callToastWithButton('Are you sure you want to delete?', 'Yes!', () => {
      this.http.get(`Machines/DeleteById?Id=${id}`, (res) => {
        this.getAllMachines();
      });
    });
  }

  updateMachineIsActive(id:string){
    this.swal.callToastWithButton('Are you sure you want to change the machine status?', 'Yes!', () => {
      this.http.get(`Machines/UpdateStatus?Id=${id}`, (res) => {
        this.getAllMachines();
      });
    });
  }

  addCard() {
    this.addCardDiv = !this.addCardDiv;
  }
}
