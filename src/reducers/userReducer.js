import * as types from "../actions";

export default function(
  state = {
    users: []
  },
  action
) {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload.dataUser
      };
    default:
      return state;
  }
}
