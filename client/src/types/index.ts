import { Address } from "cluster";

export type Citizen = { 
    id: string, 
    age: string, 
    name: string, 
    city: string 
};

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
    description: string
}