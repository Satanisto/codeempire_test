import INITIAL_STATE from "constants/initial_state";
import ACTION_TYPES from "constants/action_types";

import update from "react-addons-update";

export default (state = INITIAL_STATE.ORDER, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.ORDER.SET_BURGER: {
      return { ...state, ...payload };
    }
    case ACTION_TYPES.ORDER.CONFIGURE_BURGER: {
      const { config } = payload;
      return { ...state, burger: update(state.burger, config) };
    }
    default: {
      return state;
    }
  }
};
