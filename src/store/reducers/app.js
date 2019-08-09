import INITIAL_STATE from "constants/initial_state";
import ACTION_TYPES from "constants/action_types";

export default (state = INITIAL_STATE.APP, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.APP.FETCH_DATA: {
      return { ...state, isLoading: true, isError: false };
    }
    case ACTION_TYPES.APP.FETCH_DATA_SUCCESS: {
      return { ...state, ...payload, isLoading: false, isError: false };
    }
    case ACTION_TYPES.APP.FETCH_DATA_ERROR: {
      return { ...state, isLoading: false, ...payload };
    }
    default: {
      return state;
    }
  }
};
