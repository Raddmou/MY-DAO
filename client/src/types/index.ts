import { Address } from "cluster";

export type Dao = { 
    address: Address, 
    name: string, 
    id: string,
    visibility: boolean,
    note: string,
    // membershipMode: string,
    description: string,
    member: number,
    Members: [],
    modules: []
};

export type VoteModule = { 
    isCharged: boolean
};

export type VoteSession = { 
    address: Address, 
    creationTime: number,
    creatorAddress: Address,
    name: string,
    description: string,
    isTerminated: boolean,
    votersCount: number,
    voters: [],
    voteResult: VoteResult[],
    duration: string,
    id: string,
};

export type VoteResult = { 
    response: number, 
    voter: Address,
    voted: boolean
};

export type Member = { 
    address: Address, 
    id: number,
    status: number
};

export type Module = { 
    address: Address, 
    type: string,
    code: string
};

export type AddVoteFormValues = {
    name: string,
    description: string,
    duration: string
};

export type AddDaoFormValues  = {
    name: string,
    visibility: boolean,
    //membershipMode: string,
    description: string,
    note: string,
    // member: string,
    // vote: string,
    // modules: { member: any, vote: any }
};

export type InviteDaoFormValues = {
    address: string
}