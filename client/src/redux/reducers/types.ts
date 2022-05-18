import { 
    // FETCH_CITIZENS_SUCCESS, 
    FETCH_DAOS_SUCCESS, 
    FETCH_VOTE_SESSIONS_SUCCESS,
    FETCH_PUBLIC_DAOS_SUCCESS,
    // FETCH_CITIZENS_PENDING, 
    // FETCH_CITIZENS_ERROR, 
    FETCH_NOTE_SUCCESS,
    FETCH_DESCRIPTION_SUCCESS,
    // CLEAR_CITIZEN_NOTE,
    CLEAR_DAO_NOTE,
    CLEAR_ADDRESS_INVITED_MEMBER,
    // ADD_NEW_CITIZEN,
    ADD_NEW_DAO,
    FETCH_ACCOUNT,
    // FETCH_CITIZENS_COUNT,
    FETCH_CHAIN_ID,
    FETCH_CONTRACT,
    FETCH_DAOS_COUNT,
    FETCH_DAOS_ERROR,
    FETCH_DAOS_PENDING,
    CLEAR_VOTE_SESSIONS,
    FETCH_VOTES_SUCCESS
} from './actionTypes';
import { Dao, VoteSession, VoteModule } from '../../types'
import { Contract } from 'web3-eth-contract';

// interface ISetCitizensAction {
//     type: typeof FETCH_CITIZENS_SUCCESS,
//     citizens: Citizen[]
// };

interface ISetDaosAction {
    type: typeof FETCH_DAOS_SUCCESS,
    daos: Dao[]
};

interface ISetVoteSessionsAction {
    type: typeof FETCH_VOTE_SESSIONS_SUCCESS,
    voteSessions: VoteSession[]
};

interface ISetVoteModuleAction {
    type: typeof FETCH_VOTES_SUCCESS,
    voteModule: VoteModule
};


interface ISetPublicDaosAction {
    type: typeof FETCH_PUBLIC_DAOS_SUCCESS,
    daos: Dao[]
};

// interface ISetPendingAction {
//     type: typeof FETCH_CITIZENS_PENDING,
// };

interface ISetDaosPendingAction {
    type: typeof FETCH_DAOS_PENDING,
};

// interface ISetErrorAction {
//     type: typeof FETCH_CITIZENS_ERROR,
// };

interface ISetDaosErrorAction {
    type: typeof FETCH_DAOS_ERROR,
};

// interface ISetCitizenNoteAction {
//     type: typeof FETCH_NOTE_SUCCESS,
//     citizenNote: string
// };

interface ISetDaoNoteAction {
    type: typeof FETCH_NOTE_SUCCESS,
    daoNote: string
};

interface ISetDaoDescriptionAction {
    type: typeof FETCH_DESCRIPTION_SUCCESS,
    daoDescription: string
};

// interface IClearCitizenNoteAction {
//     type: typeof CLEAR_CITIZEN_NOTE
// };

interface IClearDaoNoteAction {
    type: typeof CLEAR_DAO_NOTE
};

interface IClearVoteSessionsAction {
    type: typeof CLEAR_VOTE_SESSIONS
};

interface IClearAddressInvitedMemberAction {
    type: typeof CLEAR_ADDRESS_INVITED_MEMBER
};


// interface IAddNewCitizenAction {
//     type: typeof ADD_NEW_CITIZEN,
//     citizen: Citizen
// };

interface IAddNewDaoAction {
    type: typeof ADD_NEW_DAO,
    dao: Dao
};

interface IAddNewDVoteAction {
    type: typeof ADD_NEW_VOTE,
    voteSession: VoteSession
};

interface ISetAccountAction {
    type: typeof FETCH_ACCOUNT,
    account: string
};

interface ISetChainIdAction {
    type: typeof FETCH_CHAIN_ID,
    chainId: string
};

interface ISetContractAction {
    type: typeof FETCH_CONTRACT,
    contract: Contract
};

// interface ISetCitizensCountAction {
//     type: typeof FETCH_CITIZENS_COUNT,
//     citizensCount: number
// };

interface ISetDaosCountAction {
    type: typeof FETCH_DAOS_COUNT,
    daosCount: number
};

export type ActionTypes = 
    ISetAccountAction |
    ISetDaosCountAction |
    ISetChainIdAction |
    ISetContractAction |
    IAddNewDaoAction |
    ISetDaosAction |
    ISetDaosErrorAction |
    ISetDaosPendingAction |
    ISetDaosAction |
    ISetDaoDescriptionAction |
    IClearDaoNoteAction |
    IClearVoteSessionsAction |
    ISetPublicDaosAction |
    ISetDaoNoteAction |
    IClearAddressInvitedMemberAction |
    ISetVoteSessionsAction |
    ISetVoteModuleAction |
    IAddNewDVoteAction;

export type DaosState = {
    daos: Dao[],
    pending: boolean,
    error: boolean,
    daoNote: string,
    addressMemberToInvite: string,
    daosCount: number,
    voteSessions: VoteSession[],
    voteModule: VoteModule
};

export type ApplicationState = {
    account: string,
    chainId: string,
    contract: Contract
}