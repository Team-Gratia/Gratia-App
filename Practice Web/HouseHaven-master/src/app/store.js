import { HouseHaven } from "./api/api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    [HouseHaven.reducerPath]: HouseHaven.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HouseHaven.middleware),
});

setupListeners(store.dispatch);

export { store };
