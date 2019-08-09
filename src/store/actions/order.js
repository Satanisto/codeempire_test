import ACTION_TYPES from "constants/action_types";

export const set_burger = burger => ({
  type: ACTION_TYPES.ORDER.SET_BURGER,
  payload: { burger }
});

export const configure_burger = config => ({
  type: ACTION_TYPES.ORDER.CONFIGURE_BURGER,
  payload: { config }
});
