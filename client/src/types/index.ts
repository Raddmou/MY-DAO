import { Address } from "cluster";

export type Dao = { 
    address: Address, 
    name: string, 
    id: string,
    visibility: boolean,
    membershipMode: string,
    description: string,
    member: number
    //modules: [] 
};

export type AddDaoFormValues = {
    name: string,
    visibility: boolean,
    membershipMode: string,
    description: string,
    note: string
}