import { citizensAPI } from '../../api';
import { contractFactoryProvider } from '../../api/ContractProvider';
import { 
    FETCH_CITIZENS_SUCCESS, 
    FETCH_CITIZENS_PENDING, 
    FETCH_CITIZENS_ERROR, 
    FETCH_NOTE_SUCCESS,
    FETCH_DESCRIPTION_SUCCESS,
    CLEAR_CITIZEN_NOTE,
    CLEAR_DAO_NOTE,
    ADD_NEW_CITIZEN,
    ADD_NEW_DAO,
    FETCH_ACCOUNT,
    FETCH_CITIZENS_COUNT,
    FETCH_DAOS_COUNT,
    FETCH_CHAIN_ID,
    FETCH_CONTRACT,
    FETCH_DAOS_SUCCESS
} from './actionTypes';
import { Citizen, AddCitizenFormValues, Dao, AddDaoFormValues } from '../../types';
import { ActionTypes } from './types'
import { Contract } from 'web3-eth-contract';
import { Address } from 'cluster';

export const setCitizens = (citizens: Citizen[]): ActionTypes => ({
    type: FETCH_CITIZENS_SUCCESS,
    citizens
});

export const setDaosByUser = (daos: Dao[]): ActionTypes => ({
    type: FETCH_DAOS_SUCCESS,
    daos
});

export const setPending = (): ActionTypes => ({
    type: FETCH_CITIZENS_PENDING,
});

export const setError = (): ActionTypes => ({
    type: FETCH_CITIZENS_ERROR,
});

export const setCitizenNote = (citizenNote: string): ActionTypes => ({
    type: FETCH_NOTE_SUCCESS,
    citizenNote
});

export const setDaoNote = (daoNote: string): ActionTypes => ({
    type: FETCH_NOTE_SUCCESS,
    daoNote
});

export const setDaoDescription = (daoDescription: string): ActionTypes => ({
    type: FETCH_DESCRIPTION_SUCCESS,
    daoDescription
});

export const clearCitizenNote = (): ActionTypes => ({
    type: CLEAR_CITIZEN_NOTE
});

export const clearDaoNote = (): ActionTypes => ({
    type: CLEAR_DAO_NOTE
});

export const addNewCitizenAction = (citizen: Citizen): ActionTypes => ({
    type: ADD_NEW_CITIZEN,
    citizen
})

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

export const setCitizensCount = (citizensCount: number): ActionTypes => ({
    type: FETCH_CITIZENS_COUNT,
    citizensCount
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

export const getCitizensCount = () => async (dispatch: any) => {
    try {
        const count = await citizensAPI.getCitizensCount();
        dispatch(setCitizensCount(count));
    } catch ({ message }) {
        console.error(message);
    }
}

export const getDaosCountByMember = () => async (dispatch: any) => {
    try {
        const count = await citizensAPI.getDaoCountByUser();  
        console.log("daosCount " + count);      
        dispatch(setDaosCountByMember(count));
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

export const addNewCitizen = (formValues: AddCitizenFormValues) => async (dispatch: any) => {
    try {
        const citizen = await citizensAPI.addNewCitizen(formValues);
        dispatch(addNewCitizenAction(citizen));
    } catch ({ message }) {
        console.error(message);
    }
};

export const addNewDao = (formValues: AddDaoFormValues) => async (dispatch: any) => {
    try {
        const dao = await citizensAPI.addNewDao(formValues);
        dispatch(addNewDaoAction(dao));
    } catch ({ message }) {
        console.error(message);
    }
};

export const getCitizens = (page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch(setPending());

        const count = await citizensAPI.getCitizensCount();
        const citizens = await citizensAPI.fetchCitizens(page, limit, count);
        
        dispatch(setCitizens(citizens));
    } catch (error) {
        console.error(error);
        dispatch(setError());
    }
};

export const getDaoByMember = (page: number, limit: number) => async (dispatch: any) => {
    try {
        dispatch(setPending());

        const count = await citizensAPI.getDaoCountByUser();
        const daos = await citizensAPI.fetchDaosByUser(page, limit, count);
        console.log("retour getDaosByMember " + daos[0].isMember);
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

export const getCitizenNote = (id: string) => async (dispatch: any) => {
    try {
        const citizenNote = await citizensAPI.fetchNote(id);
        dispatch(setCitizenNote(citizenNote));
    } catch (error) {
        console.error(error);
    }
};

export const getDaoNote = (address: Address) => async (dispatch: any) => {
    try {
        const daoDescription = await citizensAPI.fetchDescription(address);
        console.log("description ici " + daoDescription);
        dispatch(setDaoNote(daoDescription));
    } catch (error) {
        console.error(error);
    }
};

export const getDaoDescription = (address: Address) => async (dispatch: any) => {
    try {
        const daoDescription = await citizensAPI.fetchDescription(address);
        console.log("description ici " + daoDescription);
        dispatch(setDaoDescription(daoDescription));
    } catch (error) {
        console.error(error);
    }
};
