import { combineReducers } from "redux";

import daos from "./daos";
import application from "./application";

export default combineReducers({ daos, application });
