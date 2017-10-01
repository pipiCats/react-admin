import types from './ActionTypes';
import * as api from '@util/Api';

export function queryMenuList(){
	return (dispatch) => {
		dispatch(clearMenuList());
		return api.get('/menuList',null,(res) => {
			dispatch(setMenuList(res.data.data));
		},(err) => {
			dispatch(clearMenuList());
		});
	}
}

let setMenuList = (menuList) => {
	return {
		type: types.SET_MENU_LIST,
		menuList
	}
}

let  clearMenuList = () => {
	return {
		type: types.CLEAR_MENU_LIST,
	}
}