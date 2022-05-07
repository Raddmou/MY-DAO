import { 
  FETCH_DAOS_SUCCESS, 
  FETCH_PUBLIC_DAOS_SUCCESS,
  FETCH_DAOS_PENDING, 
  FETCH_DAOS_ERROR, 
  FETCH_NOTE_SUCCESS,
  CLEAR_DAO_NOTE,
  CLEAR_ADDRESS_INVITED_MEMBER,
  ADD_NEW_DAO,
  FETCH_DAOS_COUNT
} from './actionTypes';
import { ActionTypes, DaosState } from './types'

const initialDaoState: DaosState = {
  daos: [],
  pending: false,
  error: false,
  daoNote: '',
  daosCount: 0
};

export default function(state = initialDaoState, action: ActionTypes): DaosState {
  switch (action.type) {
    case FETCH_DAOS_SUCCESS: {
      const daos = action.daos.sort((a: any, b: any) => b.id - a.id);

      return {
        ...state,
        daos,
        pending: false,
        error: false,
        daoNote: ''
      };
    }
    case FETCH_PUBLIC_DAOS_SUCCESS: {
      const daos = action.daos.sort((a: any, b: any) => b.id - a.id);
      return {
        ...state,
        daos,
        pending: false,
        error: false,
      };
    }
    case FETCH_DAOS_PENDING: {
      return {
        ...state,
        pending: true
      };
    }
    case FETCH_DAOS_ERROR: {
      return {
        ...state,
        pending: false,
        error: true
      };
    }
    case FETCH_NOTE_SUCCESS: {
      return {
        ...state,
        daoNote: action.daoNote
      };
    }
    case CLEAR_DAO_NOTE: {
      return {
        ...state,
        daoNote: ''
      };
    }
    case CLEAR_ADDRESS_INVITED_MEMBER: {
      return {
        ...state,
        addressMemberToInvite: ''
      };
    }
    case ADD_NEW_DAO: {
      const { id, name, visibility, membershipMode, description, address } = action.dao;
      return {
        ...state,
        daos: [
          { id, name, visibility, membershipMode, description, address },
          ...state.daos, 
        ],
        daosCount: state.daosCount + 1
      };
    }
    case FETCH_DAOS_COUNT: {
      return {
        ...state,
        daosCount: action.daosCount
      }
    }
    default:
      return state;
  }
};
