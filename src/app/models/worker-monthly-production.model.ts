export class WorkerMonthlyProductionModel {
    id?: string;
    workerProductionId: string = "";
    monthlyActual: number = 0;
    monthlyTarget: number = 0;
    monthlyYield: number = 0;
    dateStart:any;
    dateEnd:any;
    isActive?:boolean;
}