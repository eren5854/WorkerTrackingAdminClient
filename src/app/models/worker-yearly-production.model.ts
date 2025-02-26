export class WorkerYearlyProductionModel {
    id?: string;
    workerProductionId: string = "";
    yearlyActual: number = 0;
    yearlyTarget: number = 0;
    yearlyYield: number = 0;
    dateStart:any;
    dateEnd:any;
    isActive?:boolean;
}