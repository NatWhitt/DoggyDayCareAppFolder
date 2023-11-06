import { Dog } from "./dog";

export class Contact {
    id? : number;
    title: string ='';
    forename: string ='';
    surname: string ='';
    email: string ='';
    phoneNumber: string ='';
    contactPriority : number =0;
    dog? : Dog;
}
