import { Booking } from "./booking";
import { Staff } from "./staff";

export interface Registration {
    id?: number;
    booking: Booking;
    registrationStaff: Staff;
    present: string;
    note: string;
}
