
import reduce from 'lodash/reduce';

/**
 * Turns an object whose values are reducers into a singular reducer function.
 *
 * Note: This emulates the behavior of redux's combineReducers function.
 *
 * @param  {Object} reducers an object whose values correspond to reducer functions
 * @return {Function}        a reducer function that invokves every reducer inside the passed object
 */
export default function combineReducers(reducers: any) {
  return (state: any = {}, action = {} as any) => {
    let hasChanged = false;
    const newState = reduce(
      reducers,
      (nextState: any, reducer: any, key: string) => {
        const prevStateForKey = state[key];
        const nextStateForKey = reducer(prevStateForKey, action);
        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || prevStateForKey !== nextStateForKey;
        return nextState;
      },
      {}
    );

    return hasChanged ? newState : state;
  };
}
