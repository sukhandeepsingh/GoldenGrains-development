import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.event = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all events of a shop
  getAlleventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAlleventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // // delete event
  // deleteeventRequest: (state) => {
  //   state.isLoading = true;
  // },
  // deleteeventSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.message = action.payload;
  // },
  // deleteeventFailed: (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // },

  // get all the events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events by admin
  adminAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  adminAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.adminEvents = action.payload;
  },
  adminAllEventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
