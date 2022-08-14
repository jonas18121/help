import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { renderIntialScreen } from './src/tools/helpers';
import { Provider } from 'react-redux';

// // dossier redux
import store from './src/redux/store';

// //screen
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
import ChooseConnexionScreen from './src/screens/ChooseConnexionScreen';
import HomeMapScreen from './src/screens/HomeMapScreen';
import ARModeScreen from './src/screens/ARModeScreen';

// // screen profile
import ProfileGalerieScreen from './src/screens/profile/ProfileGalerieScreen';
import ProfileContactScreen from './src/screens/profile/ProfileContactScreen';
import ProfileWallkiesScreen from './src/screens/profile/ProfileWallkiesScreen';
import ProfileSettingScreen from './src/screens/profile/ProfileSettingScreen';



const { Navigator, Screen } = createStackNavigator();

export default function App() {

    const [ loading, setLoading ] = useState(true);

    const [initialScreen, setInitilaScreen] = useState("ChooseConnexion");
 

    useEffect(() => {
        // StatusBar.setHidden(true);
        // StatusBar.setBackgroundColor(styles.statusbar.backgroundColor)
        initialScreenWallky();
    }, []);

    

    const initialScreenWallky = async () => {
        const screen = await renderIntialScreen();
        if(screen) setInitilaScreen(screen);
    }

    return (
        
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar backgroundColor="#171628"/>
                <Navigator 
                    screenOptions={{ headerShown: false }}
                    initialRouteName={initialScreen}
                >

                    

                     <Screen 
                        name="ChooseConnexion" 
                        component={ChooseConnexionScreen} 
                        options={{ headerShown: false }}
                    />

                    <Screen 
                        name="Login" 
                        component={LoginScreen} 
                        options={{ headerShown: false }}
                    />

                    <Screen 
                        name="Register" 
                        component={RegisterScreen} 
                        options={{ headerShown: false }}
                    />

                    <Screen 
                        name="PasswordReset" 
                        component={PasswordResetScreen} 
                        options={{ headerShown: false }}
                    />

                    <Screen 
                        name="ConfirmPassword" 
                        component={ConfirmPasswordScreen} 
                        options={{ headerShown: false }}
                    />

                    <Screen 
                        name="ProfileGalerie" 
                        component={ProfileGalerieScreen} 
                    />

                    <Screen 
                        name="ProfileContact" 
                        component={ProfileContactScreen} 
                    />

                    <Screen 
                        name="ProfileWallkies" 
                        component={ProfileWallkiesScreen} 
                    />

                    <Screen 
                        name="ProfileSetting" 
                        component={ProfileSettingScreen} 
                    />

                    <Screen 
                        name="HomeMap" 
                        component={HomeMapScreen} 
                    /> 

                    <Screen 
                        name="ARMode" 
                        component={ARModeScreen} 
                    /> 
                    
                </Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusbar: {
        backgroundColor: "#171628",
    }
});
