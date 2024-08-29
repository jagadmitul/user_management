import { BASE_URL } from "../constants/api.constant";
import ApiService from "./ApiService";

export async function getUserPosts(id) {
	return ApiService.fetchData({
		url: `${BASE_URL}users/${id}/posts`,
		method: "get"
	});
}

export async function getUsersList() {
	return ApiService.fetchData({
		url: `${BASE_URL}users`,
		method: "get"
	});
}

export async function addNewUser(data) {
	return ApiService.fetchData({
		url: `${BASE_URL}users`,
		method: "post",
		data,
	});
}
export async function updateUser(data) {
	return ApiService.fetchData({
		url: `${BASE_URL}users/${data.id}`,
		method: "put",
		data,
	});
}

export async function deleteUser(id) {
	return ApiService.fetchData({
		url: `${BASE_URL}users/${id}`,
		method: "delete"
	});
}
