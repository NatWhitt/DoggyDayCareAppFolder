import { Dog } from "./dog";

export interface Contact {
    id? : number;
    title: string;
    forename: string;
    surname: string;
    email: string;
    phoneNumber: string;
    contactPrioprity : number;
    dogs : Dog[];
}
