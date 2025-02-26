
export class WorkerWeeklyProductionModel {
    id?: string;
    workerProductionId: string = "";
    weeklyActual: number = 0;
    weeklyTarget: number = 0;
    weeklyYield: number = 0;
    dateStart: any;
    dateEnd: any;
    isActive?: boolean;
}
