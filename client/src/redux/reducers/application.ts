import { Contract } from 'web3-eth-contract';
import { FETCH_ACCOUNT, FETCH_CHAIN_ID, FETCH_CONTRACT } from './actionTypes';
import { ActionTypes, ApplicationState } from './types'

const initialState: ApplicationState = {
    account: '',
    chainId: '',
    contract: null,
};

export default function(state = initialState, action: ActionTypes): ApplicationState {
    switch (action.type) {
        case(FETCH_ACCOUNT): {
            return {
                ...state,
                account: action.account
            }
        }
        case(FETCH_CHAIN_ID): {
            return {
                ...state,
                chainId: action.chainId
            }
        }
        case(FETCH_CONTRACT): {
            return {
                ...state,
                contract: action.contract
            }
        }
        default:
            return state;
    }
};
