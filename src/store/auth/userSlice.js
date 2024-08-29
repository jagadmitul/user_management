import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	user: {
		email: "",
		firstName: "",
		lastName: "",
		id: ""
	},
	users: []
};

export const userSlice = createSlice({
	name: "auth/user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		addUser: (state, action) => {
			state.users.push(action.payload);
		},
		userLoggedOut: () => initialState,
	},
});

export const { setUser, addUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
