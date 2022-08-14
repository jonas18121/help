import { 
    GET_ONE_USER, 
    CHECK_USER,
    UPLOAD_IMAGE_FOR_USER,
    LOGIN_USER 
} from './actionsTypeUser';

//exemple : action = {type: NOM_ACTION, payload: data}


export const actionGetOneUser = (user) => ({
    type: GET_ONE_USER,
    payload: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email,
        phone: user.phone,
        dateCreatedAt: user.dateCreatedAt,
        updatedAt: user.updatedAt,
        fileUrl: user.fileUrl
    }
});

export const actionUploadImageForUser = (fromData, user, dispatch) => ({
    type: UPLOAD_IMAGE_FOR_USER,
    payload: {
        fromData: fromData,
        user: user,
        dispatch: dispatch
    }
});

export const actionCheckUser = (props, dispatch) => ({
    type: CHECK_USER,
    payload: {
        props: props,
        dispatch: dispatch
    }
});

export const actionLoginUser = (pseudo, password, props, dispatch) => ({
    type: LOGIN_USER,
    payload: {
        pseudo: pseudo,
        password: password,
        props: props,
        dispatch: dispatch
    }
});