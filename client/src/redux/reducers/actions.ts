import { daosAPI } from '../../api';
import { contractFactoryProvider } from '../../api/ContractProvider';
import { 
    FETCH_DAOS_PENDING,
    FETCH_PUBLIC_DAOS_SUCCESS,
    FETCH_DAOS_ERROR,
    FETCH_NOTE_SUCCESS,
    FETCH_VOTES_SUCCESS,
    FETCH_DESCRIPTION_SUCCESS,
    CLEAR_DAO_NOTE,
    CLEAR_VOTE_SESSIONS,
    CLEAR_ADDRESS_INVITED_MEMBER,
    ADD_NEW_DAO,
    FETCH_ACCOUNT,
    FETCH_DAOS_COUNT,
    FETCH_CHAIN_ID,
    FETCH_CONTRACT,
    FETCH_DAOS_SUCCESS,
    FETCH_VOTE_SESSIONS_SUCCESS,
    CLEAR_VOTE_MODULE
} from './actionTypes';
 import { Dao, AddDaoFormValues, VoteSession, VoteModule } from '../../types';
import { ActionTypes } from './types'
import { Contract } from 'web3-eth-contract';
import { Address } from 'cluster';

export const setDaosByUser = (daos: Dao[]): ActionTypes => ({
    type: FETCH_DAOS_SUCCESS,
    daos
});

export const setPublicDaos = (daos: Dao[]): ActionTypes => ({
    type: FETCH_PUBLIC_DAOS_SUCCESS,
    daos
});

export const setPending = (): ActionTypes => ({
    type: FETCH_DAOS_PENDING,
});

export const setError = (): ActionTypes => ({
    type: FETCH_DAOS_ERROR,
});

export const setDaoNote = (daoNote: Dao): ActionTypes => ({
    type: FETCH_NOTE_SUCCESS,
    daoNote
});

export const setVoteSessions = (voteSessions: VoteSession[]): ActionTypes => ({
    type: FETCH_NOTE_SUCCESS,
    voteSessions
});

export const setVoteModule = (voteModule: VoteModule): ActionTypes => ({
    type: FETCH_VOTES_SUCCESS,
    voteModule
});

export const setDaoDescription = (daoDescription: string): ActionTypes => ({
    type: FETCH_DESCRIPTION_SUCCESS,
    daoDescription
});

export const clearDaoNote = (): ActionTypes => ({
    type: CLEAR_DAO_NOTE
});

export const clearVoteSessions = (): ActionTypes => ({
    type: CLEAR_VOTE_SESSIONS
});

export const clearVoteModule = (): ActionTypes => ({
    type: CLEAR_VOTE_MODULE
});

export const clearAddressInvitedMember = (): ActionTypes => ({
    type: CLEAR_ADDRESS_INVITED_MEMBER
});

export const addNewDaoAction = (dao: Dao): ActionTypes => ({
    type: ADD_NEW_DAO,
    dao
})

export const setAccount = (account: string): ActionTypes => ({
    type: FETCH_ACCOUNT,
    account
});

export const setChainId = (chainId: string): ActionTypes => ({
    type: FETCH_CHAIN_ID,
    chainId
});

export const setContract = (contract: Contract): ActionTypes => ({
    type: FETCH_CONTRACT,
    contract
});

export const setDaosCountByMember = (daosCount: number): ActionTypes => ({
    type: FETCH_DAOS_COUNT,
    daosCount
});

export const getContract = () => async (dispatch: any) => {
    try {
        const contract = await contractFactoryProvider.getContract();
        dispatch(setContract(contract));
    } catch ({ message }) {
        console.error(message);
    }
}

export const getDaosCountByMember = () => async (dispatch: any) => {
    try {
        const count = await daosAPI.getDaoCountByUser();  
        console.log("daosCount " + count);      
        dispatch(setDaosCountByMember(count));
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

export const addNewDao = (formValues: AddDaoFormValues, module: any) => async (dispatch: any) => {
    try {
        const dao = await daosAPI.addNewDao(formValues, module);
        dispatch(addNewDaoAction(dao));
    } catch ({ message }) {
        console.error(message);
    }
};

// export const inviteToDao = (formValues: InviteDaoFormValues) => async (dispatch: any) => {
//     try {
//         const dao = await daosAPI.addNewDao(formValues);
//         dispatch(addNewDaoAction(dao));
//     } catch ({ message }) {
//         console.error(message);
//     }
// };

export const getDaoByMember = (page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch(setPending());

        const count = await daosAPI.getDaoCountByUser();
        const daos = await daosAPI.fetchDaosByUser(page, limit, count);
        // const dao = await daosAPI.fetchDao(daos[0].address);
        // console.log("BBB", dao);
        //console.log("retour getDaosByMember " + daos[0].isMember);
        dispatch(setDaosByUser(daos));
        // console.log("AAA", daos);
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

export const getPublicDaos = (page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch(setPending());

        const count = await daosAPI.getPublicDaoCount();
        const daos = await daosAPI.fetchPublicDaos(page, limit, count);
        dispatch(setDaosByUser(daos));
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

// export const getDaoNote = (address: Address) => async (dispatch: any) => {
//     try {
//         const daoNote = await citizensAPI.fetchDescription(address);
//         dispatch(setCitizenNote(daoNote));
//     } catch (error) {
//         console.error(error);
//     }
// };

export const getDaoNote = (address: Address) => async (dispatch: any) => {
    try {
        const dao = await daosAPI.fetchDao(address);
        dispatch(setDaoNote(dao));
    } catch (error) {
        console.error(error);
    }
};

export const fetchVoteSessions = (address: Address) => async (dispatch: any) => {
    try {
        const voteSessions = await daosAPI.fetchVoteSessions(address);
        dispatch(setVoteSessions(voteSessions));
        var voteModule = {isCharged: true};
        dispatch(setVoteModule(voteModule));
    } catch (error) {
        console.error(error);
    }
};

export const joinDao = (address: Address) => async (dispatch: any) => {
    try {
        const success = await daosAPI.joinDao(address);
        if(success)
            await getDaoNote(address);
    } catch (error) {
        console.error(error);
    }
};

export const acceptMember = (address: Address, addressMember: Address) => async (dispatch: any) => {
    try {
        const success = await daosAPI.acceptMember(address, addressMember);
        if(success)
            await getDaoNote(address);
    } catch (error) {
        console.error(error);
    }
};

export const requestJoinDao = (address: Address) => async (dispatch: any) => {
    try {
        const success = await daosAPI.requestJoinDao(address);
        if(success)
            await getDaoNote(address);
    } catch (error) {
        console.error(error);
    }
};

export const inviteToDao = (address: Address, addressToInvite: Address) => async (dispatch: any) => {
    try {
        console.log("inviteToDao " + addressToInvite);
        const success = await daosAPI.inviteToDao(address, addressToInvite);
        console.log("inviteToDao success" + success);
        if(success)
        {         
            await getDaoByMember(0, 10);
        }
            
    } catch (error) {
        console.error(error);
    }
};

export const getDaoDescription = (address: Address) => async (dispatch: any) => {
    try {
        const daoDescription = await daosAPI.fetchDescription(address);
        console.log("description ici " + daoDescription);
        dispatch(setDaoDescription(daoDescription));
    } catch (error) {
        console.error(error);
    }
};
