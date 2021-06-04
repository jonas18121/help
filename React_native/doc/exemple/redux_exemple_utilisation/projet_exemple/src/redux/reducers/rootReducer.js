//On regroupe tous les reducers ici

import { reducerUser } from './reducerUser';
import { combineReducers } from 'redux';


export default combineReducers({
    reducerUser: reducerUser,
});




