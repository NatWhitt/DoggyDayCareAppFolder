import { Dog } from "./dog";
import { RegistrationDetails } from "./registration-details";
import { Session } from "./session";

export interface BookingWithRegistration {
    id?: number;
    session: Session;
    dog : Dog;
    registrationDetails: RegistrationDetails;
}
