import { useSelector, useDispatch } from "react-redux";
import { onSignInSuccess, onSignOutSuccess } from "../../store/auth/sessionSlice";
import { setUser, addUser, initialState } from "../../store/auth/userSlice";
import { useNavigate } from "react-router-dom";

function useAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { session, user } = useSelector((state) => state.auth);

	const signIn = async ({ email, password }) => {
		try {
			// Find the user with the given email and password
			const validUser = user?.users?.find((u) => u.email === email && u.password === password);

			if (validUser) {
				const token = `dummy-token-${validUser.id}`;
				dispatch(onSignInSuccess(token));
				dispatch(setUser(validUser));
				navigate("/dashboard")

				return {
					status: "success",
					message: "Successfully signed in!",
				};
			} else {
				return {
					status: "failed",
					message: "Invalid email or password.",
				};
			}
		} catch (error) {
			return {
				status: "failed",
				message: "Sign in failed.",
			};
		}
	};

	const signUp = async ({ firstName, lastName, email, password, terms }) => {
		try {
			const existingUser = user?.users?.find((u) => u.email === email);

			if (existingUser) {
				return {
					status: "failed",
					message: "Email already exists.",
				};
			}

			const newUser = {
				id: Date.now(),
				firstName,
				lastName,
				email,
				password,
				terms,
			};

			dispatch(addUser(newUser));

			const token = `dummy-token-${newUser.id}`;
			dispatch(onSignInSuccess(token));
			dispatch(setUser(newUser));
			navigate("/dashboard")

			return {
				status: "success",
				message: "Successfully signed up!",
			};
		} catch (error) {
			return {
				status: "failed",
				message: "Sign up failed.",
			};
		}
	};

	const signOut = () => {
		dispatch(onSignOutSuccess());
		dispatch(setUser({
			email: "",
			firstName: "",
			lastName: "",
			id: ""
		}));
		navigate("/");
	};

	return {
		authenticated: session.token && session.signedIn,
		signIn,
		signUp,
		signOut,
	};
}

export default useAuth;
