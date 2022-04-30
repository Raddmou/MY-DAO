import { 
    FETCH_CITIZENS_SUCCESS, 
    FETCH_DAOS_SUCCESS, 
    FETCH_CITIZENS_PENDING, 
    FETCH_CITIZENS_ERROR, 
    FETCH_NOTE_SUCCESS,
    CLEAR_CITIZEN_NOTE,
    ADD_NEW_CITIZEN,
    ADD_NEW_DAO,
    FETCH_ACCOUNT,
    FETCH_CITIZENS_COUNT,
    FETCH_CHAIN_ID,
    FETCH_CONTRACT,
    FETCH_DAOS_COUNT,
    FETCH_DAOS_ERROR,
    FETCH_DAOS_PENDING
} from './actionTypes';
import { Citizen, Dao } from '../../types'
import { Contract } from 'web3-eth-contract';

interface ISetCitizensAction {
    type: typeof FETCH_CITIZENS_SUCCESS,
    citizens: Citizen[]
};

interface ISetDaosAction {
    type: typeof FETCH_DAOS_SUCCESS,
    daos: Dao[]
};

interface ISetPendingAction {
    type: typeof FETCH_CITIZENS_PENDING,
};

interface ISetDaosPendingAction {
    type: typeof FETCH_DAOS_PENDING,
};

interface ISetErrorAction {
    type: typeof FETCH_CITIZENS_ERROR,
};

interface ISetDaosErrorAction {
    type: typeof FETCH_DAOS_ERROR,
};

interface ISetCitizenNoteAction {
    type: typeof FETCH_NOTE_SUCCESS,
    citizenNote: string
};

interface IClearCitizenNoteAction {
    type: typeof CLEAR_CITIZEN_NOTE
};

interface IAddNewCitizenAction {
    type: typeof ADD_NEW_CITIZEN,
    citizen: Citizen
};

interface IAddNewDaoAction {
    type: typeof ADD_NEW_DAO,
    dao: Dao
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

interface ISetCitizensCountAction {
    type: typeof FETCH_CITIZENS_COUNT,
    citizensCount: number
};

interface ISetDaosCountAction {
    type: typeof FETCH_DAOS_COUNT,
    daosCount: number
};

export type ActionTypes = 
    ISetCitizensAction | 
    ISetPendingAction | 
    ISetErrorAction | 
    ISetCitizenNoteAction | 
    IClearCitizenNoteAction |
    IAddNewCitizenAction |
    ISetAccountAction |
    ISetCitizensCountAction |
    ISetDaosCountAction |
    ISetChainIdAction |
    ISetContractAction |
    IAddNewDaoAction |
    ISetDaosAction |
    ISetDaosErrorAction |
    ISetDaosPendingAction |
    ISetDaosAction;

export type CitizensState = {
    citizens: Citizen[],
    pending: boolean,
    error: boolean,
    citizenNote: string,
    citizensCount: number,
};

export type DaosState = {
    daos: Dao[],
    pending: boolean,
    error: boolean,
    daoNote: string,
    daosCount: number,
};

export type ApplicationState = {
    account: string,
    chainId: string,
    contract: Contract
}