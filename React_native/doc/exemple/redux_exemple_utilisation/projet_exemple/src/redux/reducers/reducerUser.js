import { 
    GET_ONE_USER, 
    CHECK_USER,
    UPLOAD_IMAGE_FOR_USER,
    LOGIN_USER   
} from '../actions/users/actionsTypeUser';
import { 
    requestUploadImageForUser,
    requestChekUser,
    requestLoginUser 
} from '../../api/users/requestUser';

const defaultState = [];

export const reducerUser = (state = defaultState, action) => {


    //action = {type: NOM_ACTION, payload}
    switch (action.type) {

        case GET_ONE_USER:
            return action.payload

        case UPLOAD_IMAGE_FOR_USER:
            requestUploadImageForUser(action.payload.fromData, action.payload.user, action.payload.dispatch);
            return null;

        case CHECK_USER:    
            requestChekUser(action.props, action.payload.dispatch);
            return null;

        case LOGIN_USER:
            requestLoginUser(action.payload.pseudo, action.payload.password, action.payload.props, action.payload.dispatch);
            return null;

        default:
            return state;
    }
} 