export class WorkerDailyProductionModel {
    id?: string;
    workerProductionId: string = "";
    dailyActual: number = 0;
    dailyTarget: number = 0;
    dailyYield: number = 0;
    dateStart:any;
    dateEnd:any;
    isActive?:boolean;
}

