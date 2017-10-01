import types from '@action/ActionTypes';
import { fromJS } from 'immutable';

const initState = fromJS({
    menuList: [],
});

export default (state = initState, action) => {
    switch (action.type) {
    case types.SET_MENU_LIST:
        return state.set('menuList', state.get('menuList').merge(action.menuList));
    case types.CLEAR_MENU_LIST:
        return state.set('menuList', state.get('menuList').clear());
    default:
        return state;
    }
}
