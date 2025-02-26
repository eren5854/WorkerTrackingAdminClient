export class DepartmentProductionModel{
    id?:string;
    dailyTarget:number = 0;
    weeklyTarget?:number;
    monthlyTarget?:number;
    yearlyTarget?:number;
    dailyActual?:number;
    weeklyActual?:number;
    monthlyActual?:number;
    yearlyActual?:number;
    dailyYield?:number;
    weeklyYield?:number;
    monthlyYield?:number;
    yearlyYield?:number;
    productId:string = "";
    departmentId:string = "";
    productInfo:any;
    departmentInfo:any;
    isActive?:boolean;
}