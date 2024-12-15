import { combineReducers } from "redux";
import billReducer, {billSlice} from "./billSlice";

export const rootReducer = combineReducers({
    [billSlice.name] : billReducer,
})