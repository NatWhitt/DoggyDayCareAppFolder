import { Staff } from "./staff";

export interface SessionBulk {
    startDateTime: Date;
    endDate: Date;
    weekDaysToInclude: number[];
    sessionName: string;
    sessionType: number;
    sessionLengthInMinutes: number;
    sessionSize: number;
    // bookingList: 
    staffList?: Staff[];
}
