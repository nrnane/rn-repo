
import { JStore } from "./interfaces";
import userReducer from '../../reducers/userReducer';
import actionTypeConstants from '../../reducers/actionTypeConstants';

export interface NewJStore {
  userInfo: JStore,

}

export function getInitialState() {

  const INIT_ACTION = {
    type: actionTypeConstants.INIT,
    payload: {
      appLaunch: true
    }
  };

  return {
    userInfo: userReducer({} as JStore, INIT_ACTION),
  };

}