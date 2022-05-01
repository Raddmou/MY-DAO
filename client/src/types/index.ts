import { Address } from "cluster";

export type Dao = { 
    address: Address, 
    name: string, 
    id: string,
    visibility: boolean,
    description: string
    //modules: [] 
};

export type AddDaoFormValues = {
    name: string,
    visibility: boolean,
    description: string,
    note: string
}