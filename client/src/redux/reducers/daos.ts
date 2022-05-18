import { 
  FETCH_DAOS_SUCCESS, 
  FETCH_PUBLIC_DAOS_SUCCESS,
  FETCH_DAOS_PENDING, 
  FETCH_VOTES_SUCCESS,
  FETCH_VOTE_SESSIONS_SUCCESS,
  FETCH_DAOS_ERROR, 
  FETCH_NOTE_SUCCESS,
  CLEAR_DAO_NOTE,
  CLEAR_ADDRESS_INVITED_MEMBER,
  ADD_NEW_DAO,
  ADD_NEW_VOTE,
  FETCH_DAOS_COUNT,
  CLEAR_VOTE_MODULE,
  CLEAR_VOTE_SESSIONS
} from './actionTypes';
import { ActionTypes, DaosState } from './types'

const initialDaoState: DaosState = {
  daos: [],
  pending: false,
  error: false,
  daoNote: '',
  daosCount: 0,
  voteModule: null,
  voteSessions: []
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
    case FETCH_VOTE_SESSIONS_SUCCESS: {
      return {
        ...state,
        voteSessions: action.VoteSession
      };
    }
    case FETCH_VOTES_SUCCESS: {
      return {
        ...state,
        voteModule: action.voteModule
      };
    }
    case CLEAR_DAO_NOTE: {
      return {
        ...state,
        daoNote: ''
      };
    }
    case CLEAR_VOTE_MODULE: {
      return {
        ...state,
        voteModule: null
      };
    }
    case CLEAR_VOTE_SESSIONS: {
      return {
        ...state,
        voteSessions: []
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
    case ADD_NEW_VOTE: {
      const { id, name, description, duration } = action.vote;
      return {
        ...state,
        voteSessions: [
          { id, name, description, duration },
          ...state.voteSessions, 
        ]
        // daosCount: state.daosCount + 1
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
