import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { MachinesComponent } from './components/machines/machines.component';
import { ProductsComponent } from './components/products/products.component';
import { WorkersComponent } from './components/workers/workers.component';
import { WorkerComponent } from './components/worker/worker.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    {
        path: "login",
        component : LoginComponent
    },
    {
        path : "",
        component: LayoutComponent,
        canActivateChild: [() => inject(AuthService).isAuthenticated()],
        children: [
            {
                path: "",
                component: HomeComponent
            },
            {
                path: "departments",
                component: DepartmentsComponent
            },
            {
                path: "machines",
                component: MachinesComponent
            },
            {
                path: "products",
                component: ProductsComponent
            },
            {
                path: "workers",
                component: WorkersComponent
            },
            {
                path: "worker/:id",
                component: WorkerComponent
            },
            {
                path: "settings",
                component: SettingsComponent
            }
        ]
    }
];
