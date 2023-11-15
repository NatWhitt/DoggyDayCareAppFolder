import { Staff } from "./staff";

export interface RegistrationDetails {
    id?: number |undefined;
    registrationStaff?: Staff |undefined;
    registrationStatus: string;
    note: string;
}
