import { 
  FETCH_CITIZENS_SUCCESS, 
  FETCH_DAOS_SUCCESS, 
  FETCH_CITIZENS_PENDING, 
  FETCH_DAOS_PENDING, 
  FETCH_CITIZENS_ERROR, 
  FETCH_DAOS_ERROR, 
  FETCH_NOTE_SUCCESS,
  CLEAR_CITIZEN_NOTE,
  ADD_NEW_CITIZEN,
  ADD_NEW_DAO,
  FETCH_CITIZENS_COUNT,
  FETCH_DAOS_COUNT
} from './actionTypes';
import { ActionTypes, CitizensState, DaosState } from './types'

const initialState: CitizensState = {
    citizens: [],
    pending: false,
    error: false,
    citizenNote: '',
    citizensCount: 0
};

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
    // case FETCH_NOTE_SUCCESS: {
    //   return {
    //     ...state,
    //     citizenNote: action.citizenNote
    //   };
    // }
    // case CLEAR_CITIZEN_NOTE: {
    //   return {
    //     ...state,
    //     citizenNote: ''
    //   };
    // }
    case ADD_NEW_DAO: {
      const { id, name } = action.dao;
      return {
        ...state,
        daos: [
          { id, name },
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

// export default function(state = initialState, action: ActionTypes): CitizensState {
//   switch (action.type) {
//     case FETCH_CITIZENS_SUCCESS: {
//       const citizens = action.citizens.sort((a: any, b: any) => b.id - a.id);

//       return {
//         ...state,
//         citizens,
//         pending: false,
//         error: false,
//         citizenNote: ''
//       };
//     }
//     case FETCH_CITIZENS_PENDING: {
//       return {
//         ...state,
//         pending: true
//       };
//     }
//     case FETCH_CITIZENS_ERROR: {
//       return {
//         ...state,
//         pending: false,
//         error: true
//       };
//     }
//     case FETCH_NOTE_SUCCESS: {
//       return {
//         ...state,
//         citizenNote: action.citizenNote
//       };
//     }
//     case CLEAR_CITIZEN_NOTE: {
//       return {
//         ...state,
//         citizenNote: ''
//       };
//     }
//     case ADD_NEW_CITIZEN: {
//       const { id, name, age, city } = action.citizen;
//       return {
//         ...state,
//         citizens: [
//           { id, name, age, city },
//           ...state.citizens, 
//         ],
//         citizensCount: state.citizensCount + 1
//       };
//     }
//     case FETCH_CITIZENS_COUNT: {
//       return {
//         ...state,
//         citizensCount: action.citizensCount
//       }
//     }
//     default:
//       return state;
//   }
// };
