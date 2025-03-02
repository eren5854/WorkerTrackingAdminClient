import { WorkerDailyProductionModel } from "./worker-daily-production.model";
import { WorkerMonthlyProductionModel } from "./worker-monthly-production.model";
import { WorkerWeeklyProductionModel } from "./worker-weekly-production.model";
import { WorkerYearlyProductionModel } from "./worker-yearly-production.model";

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
    dailyProductions?:WorkerDailyProductionModel;
    weeklyProductions?:WorkerWeeklyProductionModel;
    monthlyProductions?:WorkerMonthlyProductionModel;
    yearlyProductions?:WorkerYearlyProductionModel;
    total?:number;
    fullName?:string;
}