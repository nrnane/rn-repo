import actionTypeConstants from "./actionTypeConstants";

function dashboardReducer(state = {}, action = {} as any) {

  switch (action.type) {
    case actionTypeConstants.DASHBOARD_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    case "":
      return state;
    default:
      return state;
  }
}

export default dashboardReducer;