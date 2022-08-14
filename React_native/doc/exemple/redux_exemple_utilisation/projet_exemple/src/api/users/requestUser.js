import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../tools/helpers';
import { Buffer } from "buffer";
import { actionGetOneUser, actionCheckUser } from '../../redux/actions/users/actionsUser'


/**
 * 
 * fait une réquête pour envoyer une image depuis le front vers le back
 * puis appel l'action actionGetOneUser() pour mettre à mise a jour, les données de l'utilisateur dans le store 
 *   
 */
export const requestUploadImageForUser = async (fromData, user, dispatch) => {

    try {
        
        const tokenStorage = await AsyncStorage.getItem('token');
    
        const response = await axios.post(`${ BASE_URL }/api/users/${ user.id }/image`, fromData, {
            headers: {
                'Accept' : '*/*',
                'Content-type' : 'multipart/form-data',
                'Authorization' : `Bearer ${tokenStorage}`
            }
        })

        // console.log('reponse de la requête postes image', response.data);
    
        dispatch(actionGetOneUser(response.data));

    } catch (error) {
        console.error(`Erreur de la requête pour upload une image pour un utilisateur : ${error}`);
    }
}


/**
 * fait une réquête pour recupèrer l'user qui est dans le storage du mobile, 
 * puis le cherche en bdd
 * puis appel l'action actionGetOneUser() pour mettre à mise a jour, les données de l'utilisateur dans le store
 */
export const requestChekUser = async (props, dispatch) => {

    const userStorage = await AsyncStorage.getItem('user');
    const userCurrent = JSON.parse(userStorage);

    if(!userCurrent.email){
        props.navigation.navigate('Login');
    }

    await fetch(`${ BASE_URL }/api/users/${ userCurrent.id }`, {
        method: 'get',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
        }
    })
    .then((response) => response.json())
    .then(async (responseJsonUser) => {

        dispatch(actionGetOneUser(responseJsonUser));
    })
    .catch((error) => console.error(`Erreur de la requête pour check un utilisateur dans le storage du mobile pour le rechercher en bdd : ${error}`));
}


/**
 * fait une réquête pour que l'utilisateur se connecte à l'application, 
 * puis on stocke les données de l'utilisateur + son token dans le storage de son mobile
 */
export const requestLoginUser = async (pseudo, password, props, dispatch) => {

    //il faut l'addresse ip de votre ordinateur (172.27.224.1) à la place (de localhost et de 127.0.0.1) 
    // ou le LAN que expo affiche après avoir fait expo start exp://192.168.43.175:19000 => 192.168.43.175
    await fetch(`${ BASE_URL }/api/login_check`, {
        method: 'post',
        headers: {
            'Accept' : 'application/json',
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            username:   pseudo, 
            password:   password,
        }) 
    })
    .then((response) => response.json())
    .then(async (responseJson) => {

        await AsyncStorage.setItem('token', responseJson.token);

        // décoder le token en 3 parties
        const parts = responseJson.token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString());

        // on met en storage la partie qui nous intéresse
        await AsyncStorage.setItem('user', parts[1]);

        await dispatch(actionCheckUser(props, dispatch));

        if(parts){
            props.navigation.navigate('HomeMap');
        } 
    })
    .catch((error) => console.error(error));
}