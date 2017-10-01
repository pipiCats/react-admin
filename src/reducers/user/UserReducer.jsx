import types from '@action/ActionTypes';
import { List, Map } from 'immutable';

const initState = Map({
	userList: List(),
	loading: false,
});

export default (state = initState, action) => {
	switch(action.type) {
		case types.QUERY_USER_LIST:
			return state.set('userList', state.get('userList').concat(action.userList))
						.set('loading', action.loading);
		case types.CLEAR_USER_LIST: 
			return 	state.set('userList', state.get('userList').clear())
						 .set('loading', action.loading);		
		default:
        	return state;
	}
}
