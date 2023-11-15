import { Staff } from "./staff";

export interface RegistrationTake {
    id?: number |undefined;
    bookingId: number
    registrationStaffId?: number;
    registrationStatus: string;
    note: string;
}
