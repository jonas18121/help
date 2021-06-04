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
import { Buffer } from "buffer";
import { BASE_URL } from '../tools/helpers';
import { useSelector, useDispatch } from 'react-redux';

// dossier redux
import { selectorGetOneUser } from '../redux/selectors/selectorsUser';
import { actionLoginUser } from '../redux/actions/users/actionsUser'

// component
import Logo from '../components/Logo';
import TextView from '../components/TextView';

// icon
import Icon_logo_wallky from '../../assets/iconsPNG/logo.png';

const LoginScreen = (props) => {

    const [isSelected, setSelected] = useState(false);

    const dispatch = useDispatch();

    const [user, setUser ] = useState({
        pseudo: "",
        password: ""
    });

    const onLogin = async () => {
        
        const { pseudo, password } = user;
        dispatch(actionLoginUser(pseudo, password, props, dispatch));
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
                    onValueChange={setSelected}
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