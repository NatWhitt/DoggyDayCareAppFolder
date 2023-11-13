export interface BookingBulk {
    dogID : number;
    startDate: Date;
    endDate: Date;
    weekDaysToInclude: number[];
    sessionType:number;
}
