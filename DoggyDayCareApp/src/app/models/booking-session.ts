import { Dog } from "./dog";
import { Session } from "./session";

export interface BookingSession {
    id?:number;
    session: Session;
    dogList: Dog[];
}
