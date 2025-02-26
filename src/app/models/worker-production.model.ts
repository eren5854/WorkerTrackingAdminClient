export class WorkerProductionModel{
    id?:string;
    appUserId:string = "";
    appUserInfo:any;
    productId:string = "";
    productInfo:any;
    isActive?:boolean;
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
}