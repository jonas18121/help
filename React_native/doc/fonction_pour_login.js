/// Tous en bas il y a la version longue et le version minimaliste


import React, { useState, useEffect } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput,
    CheckBox,
    TouchableOpacity, 
    ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from "buffer"

// component
import Logo from '../components/Logo';
import TextView from '../components/TextView';

// icon
import Icon_logo_wallky from '../assets/iconsPNG/logo.png';

const LoginScreen = (props) => {

    const [isSelected, setSelection] = useState(false);

    const [user, setUser ] = useState({
        pseudo: "",
        password: ""
        
    });

    const onLogin = async () => {
        
        const { pseudo, password } = user;

        //il faut l'addresse ip de votre ordinateur à la place (de localhost et de 127.0.0.1)
        await fetch('http://172.27.224.1:8971/api/login_check', {
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

            AsyncStorage.setItem('token', responseJson.token);
            const token = await AsyncStorage.getItem('token');

            // décoder le token en 3 parties
            const parts = responseJson.token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString());

            // on met en storage la partie qui nous intéresse
            AsyncStorage.setItem('user', parts[1]);
            const user = await AsyncStorage.getItem('user');

            console.log(user);
        })
        .catch((error) => console.error(error));

        // props.navigation.navigate('Login');
    }

    /**
     * Aller à la page d'inscription
     */
    const goRegister = () => props.navigation.navigate('Register');

    /**
     * Aller à la page de mot de passe oublier
     */
     const goPasswordReset = () => props.navigation.navigate('PasswordReset');
    

    return (

        <ScrollView style={styles.container}>

            <View style={styles.logo}>
                <Logo image={Icon_logo_wallky} />
            </View>

            <TextView text="Se connecter" />

            <TextView 
                text="Nom d'utilisateur" 
                customStyleView={styles.labelView} 
                customStyleText={styles.labelText} 
            />
            <TextInput 
                style={styles.input} 
                name="pseudo" 
                value={user.pseudo}
                onChangeText={pseudo => { setUser(preUser => {
                    return {
                        ...preUser,
                        pseudo: pseudo
                    }
                })}}
            />

            <TextView 
                text="Mot de passe" 
                customStyleView={styles.labelView} 
                customStyleText={styles.labelText} 
            />
            <TextInput 
                style={styles.input} 
                name="password" 
                value={user.password}
                onChangeText={password => { setUser(preUser => {
                    return {
                        ...preUser,
                        password: password
                    }
                })}}
            />

            <View style={styles.stay_connect}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                    tintColors={{ tintColor: "#fff" }}
                />
                <TextView 
                    text="Rester connecté" 
                    customStyleView={styles.view_text_stay_connect} 
                    customStyleText={styles.text_stay_connect} 
                />
            </View>

            <TouchableOpacity onPress={goPasswordReset}>
                <TextView 
                    text="Mot de passe oublié ?" 
                    customStyleView={styles.view_password_reset} 
                    customStyleText={styles.text_password_reset} 
                />
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress={onLogin}>
                <TextView 
                    text="Se connecter" 
                    customStyleView={styles.btnView} 
                    customStyleText={styles.btnText} 
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={goRegister}>
                <TextView 
                    text="Creer un compte" 
                    customStyleView={styles.view_create_account} 
                    customStyleText={styles.text_create_account} 
                />
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "#171628",
    },


    logo: {
        marginTop: 90,
        alignItems: "center" 
    },


    labelView: {
    },
    labelText: {
        textAlign: "left",
        fontSize: 20,
        marginHorizontal: 20,
        fontFamily: "Roboto-Regular"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        marginHorizontal: 20,
        alignItems: "center",
        color: "#fff"
    },


    btnView: {
        marginTop: 30,
        marginHorizontal: 120,
        backgroundColor: "#6C2398",
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    btnText: {
        fontSize: 20,
        fontFamily: "Roboto-Regular",
    },


    checkbox: {
        marginLeft: 15,
    }, 
    stay_connect: {
        flexDirection: "row",
        marginTop: 30,
    },
    text_stay_connect: {
        textAlign: "left",
        fontSize: 20,
        fontFamily: "Roboto-Regular",
    },
    view_text_stay_connect: {
        paddingTop: 0
    },


    text_password_reset: {
        textAlign: "left",
        fontSize: 15,
        marginHorizontal: 20,
        fontFamily: "Roboto-Regular",
        textDecorationLine: "underline",
        color: "#C489E7"
    },
    view_password_reset: {
        
    },

    text_create_account: {
        textAlign: "center",
        fontSize: 15,
        marginHorizontal: 20,
        fontFamily: "Roboto-Regular",
        textDecorationLine: "underline",
        color: "#C489E7"
    },
    view_create_account: {
        paddingBottom: 10
    },
    
    
    statusbar: {
        backgroundColor: "#6C2398",
    }
});

export default LoginScreen





///////////// version longue  ////////////////////

const onLogin = async () => {
        
    const { pseudo, password } = user;

    //il faut l'addresse ip de votre ordinateur à la place (de localhost et de 127.0.0.1)
    await fetch('http://172.27.224.1:8971/api/login_check', {
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
        // console.log(responseJson);

        AsyncStorage.setItem('token', responseJson.token);
        const token = await AsyncStorage.getItem('token');

        // décoder le token en 3 parties
        const parts = responseJson.token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString());

        // transformé la partie qui nous intéresse en objet
        const token_decode = JSON.parse(parts[1]);

        console.log(parts[1]);
        
        // on récupère le user
        await fetch('http://172.27.224.1:8971/api/users/' + token_decode.id, {
            method: 'get',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then(async (responseJson) => {

            const userString = JSON.stringify(responseJson)
            
            AsyncStorage.setItem('user', userString);
            const user = await AsyncStorage.getItem('user');
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));

    // props.navigation.navigate('Login');
}








//////////////////// version minimaliste ////////////////////

const onLogin = async () => {
        
    const { pseudo, password } = user;

    //il faut l'addresse ip de votre ordinateur à la place (de localhost et de 127.0.0.1)
    await fetch('http://172.27.224.1:8971/api/login_check', {
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

        AsyncStorage.setItem('token', responseJson.token);
        const token = await AsyncStorage.getItem('token');

        // décoder le token en 3 parties
        const parts = responseJson.token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString());

        // on met en storage la partie qui nous intéresse
        AsyncStorage.setItem('user', parts[1]);
        const user = await AsyncStorage.getItem('user');

        console.log(user);
    })
    .catch((error) => console.error(error));

    // props.navigation.navigate('Login');
}