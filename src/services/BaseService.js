import axios from "axios";
import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from "../constants/api.constant";
import deepParseJson from "../utils/deepParseJson";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";

const unauthorizedCode = [401];

const BaseService = axios.create({
	timeout: 60000,
	baseURL: "/api",
});

BaseService.interceptors.request.use(
	(config) => {
		const rawPersistData = localStorage.getItem("user");
		const persistData = deepParseJson(rawPersistData);

		// let accessToken = persistData?.auth?.session?.token;
		let accessToken = import.meta.env.VITE_TOKEN;	// when integrating prod api need to replace this with the above

		if (!accessToken) {
			const { auth } = store.getState();
			accessToken = auth.session.token;
		}

		if (accessToken) {
			config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
		}

		config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
		config.headers["Pragma"] = "no-cache";
		config.headers["Expires"] = "0";
		config.headers["Authorization"] = "Bearer " + accessToken;

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

BaseService.interceptors.response.use(
	(response) => response,
	(error) => {
		const { response } = error;

		if (response && unauthorizedCode.includes(response.status)) {
			store.dispatch(onSignOutSuccess());
		}

		return Promise.reject(error);
	}
);

export default BaseService;
