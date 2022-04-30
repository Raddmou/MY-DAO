export type Citizen = { 
    id: string, 
    age: string, 
    name: string, 
    city: string 
};

export type Dao = { 
    id: string, 
    name: string, 
    //modules: [] 
};

export type AddCitizenFormValues = {
    age: string,
    city: string,
    name: string,
    note: string,
}

export type AddDaoFormValues = {
    name: string
}