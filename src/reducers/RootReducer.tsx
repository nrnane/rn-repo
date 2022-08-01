import combineReducers from "./combineReducers";
import userReducer from "./userReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
    userInfo: userReducer,
    dashboardInfo: dashboardReducer,
});