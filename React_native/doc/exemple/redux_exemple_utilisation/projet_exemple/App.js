import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from "expo-font";
import { renderIntialScreen } from './src/tools/helpers';
import { Provider } from 'react-redux';

// dossier redux
import store from './src/redux/store';

//screen
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import ConfirmPasswordScreen from './src/screens/ConfirmPasswordScreen';
import ChooseConnexionScreen from './src/screens/ChooseConnexionScreen';
import HomeMapScreen from './src/screens/HomeMapScreen';

// screen profile
import ProfileGalerieScreen from './src/screens/profile/ProfileGalerieScreen';
import ProfileContactScreen from './src/screens/profile/ProfileContactScreen';
import ProfileWallkiesScreen from './src/screens/profile/ProfileWallkiesScreen';
import ProfileSettingScreen from './src/screens/profile/ProfileSettingScreen';



const { Navigator, Screen } = createStackNavigator();

export default function App() {

    const [ loading, setLoading ] = useState(true);

    const [initialScreen, setInitilaScreen] = useState("ChooseConnexion");

    const loadFont = async () => {
        try {
          
            await Font.loadAsync({
                "Roboto-Regular":       require('./assets/fonts/Roboto-Regular.ttf'),
                "Roboto-Black":         require('./assets/fonts/Roboto-Black.ttf'),
                "Roboto-BlackItalic":   require('./assets/fonts/Roboto-BlackItalic.ttf'),
                "Roboto-Bold":          require('./assets/fonts/Roboto-Bold.ttf'),
                "Roboto-BoldItalic":    require('./assets/fonts/Roboto-BoldItalic.ttf'),
                "Roboto-Italic":        require('./assets/fonts/Roboto-Italic.ttf'),
                "Roboto-Light":         require('./assets/fonts/Roboto-Light.ttf'),
                "Roboto-LightItalic":   require('./assets/fonts/Roboto-LightItalic.ttf'),
                "Roboto-Medium":        require('./assets/fonts/Roboto-Medium.ttf'),
                "Roboto-MediumItalic":  require('./assets/fonts/Roboto-MediumItalic.ttf'),
                "Roboto-Thin":          require('./assets/fonts/Roboto-Thin.ttf'),
                "Roboto-ThinItalic":    require('./assets/fonts/Roboto-ThinItalic.ttf')
            });

            const screen = await renderIntialScreen();
            if(screen) setInitilaScreen(screen);

            setLoading(false);
          
        } catch (error) {
            console.log('erreur', error);
        }
    }

    useEffect(() => {
        // StatusBar.setHidden(true);
        StatusBar.setBackgroundColor(styles.statusbar.backgroundColor)
        loadFont();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>loading...</Text>
            </View>
        )
    }



    return (
      
        <Provider store={store}>
            <NavigationContainer>
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
        // marginTop: Constants.statusBarHeight
    },
    statusbar: {
        backgroundColor: "#171628",
    }
});
