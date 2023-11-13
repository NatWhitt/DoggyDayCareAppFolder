import { Dog } from "./dog";
import { Session } from "./session";

export interface BookingDog {
    dog: Dog;
    sessionList: Session[];
}
