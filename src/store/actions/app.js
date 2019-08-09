import ACTION_TYPES from "constants/action_types";
import { path_to } from "constants/network_config";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetch_data = () => async dispatch => {
  try {
    dispatch({ type: ACTION_TYPES.APP.FETCH_DATA });

    const burgers = await fetch(path_to("burgers"))
      .then(value => value.json())
      .catch(error => {
        throw String(error);
      });
    const ingredients = await fetch(path_to("ingredients"))
      .then(value => value.json())
      .catch(error => {
        throw error;
      });
    const buns = await fetch(path_to("buns"))
      .then(value => value.json())
      .catch(error => {
        throw error;
      });
    const meats = await fetch(path_to("meats"))
      .then(value => value.json())
      .catch(error => {
        throw error;
      });
    const sauces = await fetch(path_to("sauces"))
      .then(value => value.json())
      .catch(error => {
        throw error;
      });

    await sleep(1000);

    dispatch(fetch_data_success({ burgers, ingredients, buns, meats, sauces }));
  } catch (error) {
    dispatch(fetch_data_error(error));
  }
};

export const fetch_data_success = data => ({
  type: ACTION_TYPES.APP.FETCH_DATA_SUCCESS,
  payload: { data }
});

export const fetch_data_error = isError => ({
  type: ACTION_TYPES.APP.FETCH_DATA_ERROR,
  payload: { isError }
});
