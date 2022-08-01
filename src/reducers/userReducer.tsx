import actionTypeConstants from "./actionTypeConstants";

function userReducer(state = {}, action = {} as any) {
console.log("action",action)
  switch (action.type) {
    case actionTypeConstants.PROVIDER_DETAILS:
      console.log("Reducer:",action.payload)
      return {
        ...state,
        ...action.payload
      };
    case actionTypeConstants.INIT:
      return {...action.payload};
      case actionTypeConstants.CLIENT_REVIEW_DETAILS:
        return {
            ...state,
            ambClientReviews: action?.payload?.ambClientReviews
        };
    default:
      return state;
  }
}

export default userReducer;
