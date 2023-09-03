import { configureStore } from "@reduxjs/toolkit";

import formEntrySlice from "./slices/formEntrySlice";

const store = configureStore({
	reducer: {
		formEntrySlice
	}
})

export default store;