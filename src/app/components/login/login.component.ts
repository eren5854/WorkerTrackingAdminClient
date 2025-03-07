import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../models/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone:true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  // url:string = "https://192.168.68.134:45455/api/"
  url:string = "https://wtapi.erendelibas.xyz/api/"
  loginModel: LoginModel = new LoginModel();
  showModal = false;
  emailModel: ForgotPasswordModel = new ForgotPasswordModel();
  isLoading: boolean = false; // Spinner için değişken

  constructor(
    private http: HttpClient,
    private swal: SwalService,
    private router: Router,
    // private emailService: EmailJsService
  ) {

  }

  login(form: NgForm) {
    if (form.valid) {
      this.isLoading = true; // Spinner başlat
      
      this.http.post(`${this.url}Auth/Login`, this.loginModel)
        .subscribe({
          next: (res: any) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            this.swal.callToast(res.message);
            this.router.navigateByUrl("/");
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.swal.callToast(err.error.errorMessages[0], 'warning');
            this.isLoading = false; // Başarısız girişte butonu eski haline getir
          },
          complete: () => {
            this.isLoading = false; // İşlem tamamlandığında butonu eski haline getir
          }
        });
    }
  }

  // sendForgotMail(form:NgForm){
  //   if(form.valid){
  //     this.emailService.sendEmail(this.emailModel);
  //     this.showModal = false;
  //   }
  // }
}

export class ForgotPasswordModel{
  email: string = "";
}