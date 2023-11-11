export interface SessionStaffBulk {
    staffID : number;
    startDate: Date;
    endDate: Date;
    weekDaysToInclude: number[];
    sessionType:number;
}
