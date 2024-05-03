import axios from "axios";
import { server } from "../../server";

// get all sellers list for admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersFailed",
      payload: error.response.data.message,
    });
  }
};

// top farmers for homepage
export const getTopFarmers = () => async (dispatch) => {
  try {
    dispatch({
      type: "topFarmersRequest",
    });

    const { data } = await axios.get(`${server}/shop/top-farmers`);

    dispatch({
      type: "topFarmersSuccess",
      payload: data.topFarmers,
    });
  } catch (error) {
    dispatch({
      type: "topFarmersFailed",
      payload: error.response.data.message,
    });
  }
};