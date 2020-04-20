import { combineReducers } from "redux";
import userReducer from './userReducer';
import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer
});

export default rootReducer