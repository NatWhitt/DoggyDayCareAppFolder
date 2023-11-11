import { Staff } from "./staff";

export interface Session {
    id?: number;
    sessionName: string;
    sessionDateTime: Date;
    sessionType: number;
    sessionLengthInMinutes: number;
    sessionSize: number;
    // bookingList: 
    staffList?: Staff[];
}
