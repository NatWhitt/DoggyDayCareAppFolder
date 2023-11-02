import { Breed } from "./breed";
import { Contact } from "./contact";


export interface Dog {
    id?: number;
    forename : string;
    surname : string;
    breed :Breed;
    description : string;
    dob: Date;
    startDate: Date;
    systemStatus:number;
    contacts? : Contact[]

}
