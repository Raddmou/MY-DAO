import { combineReducers } from "redux";

import daos from "./daos";
import application from "./application";

const reducers: any = combineReducers({ daos, application });
export default reducers;

