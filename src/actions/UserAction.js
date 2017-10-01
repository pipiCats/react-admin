import types from './ActionTypes';
import * as api from '@util/Api';

export function queryUserList(param){
	return (dispatch) => {
		dispatch(clearUserList());
		return api.get(`/queryUserList`, param, (res) => {
			dispatch(setUserList(res.data.result, false));
		},(err) => {
			dispatch(setUserList([], false));
		});
	}
}

let setUserList = (userList, loading) => {
	return {
		type: types.QUERY_USER_LIST,
		userList,
		loading
	}
}
let clearUserList = () => {
	return {
		type: types.CLEAR_USER_LIST,
		userList: [],
		loading: true,
	}
}