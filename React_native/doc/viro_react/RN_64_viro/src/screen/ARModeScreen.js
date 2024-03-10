import React, { useState, useEffect } from 'react';

import { 
    StyleSheet,
    View,
    Text,
    PermissionsAndroid,
    Image,
    TouchableOpacity
} from 'react-native';

// viro react
import {
    ViroVRSceneNavigator,
    ViroARSceneNavigator
} from '@viro-community/react-viro';

import arrow_vertical from '../../assets/iconsPNG/outline_arrow_back_white_36_verticale.png';

// Définit la scène par défaut que vous voulez pour AR et VR
var InitialARScene = require('../../js/HelloWorldSceneAR');
var InitialVRScene = require('../../js/HelloWorldScene');


const ARModeScreen = (props) => {

    [toogle, setToogle] = useState(true);

    /*
    TODO: Insérez votre clé API ci-dessous
    */
    var sharedPropsAR = {
        apiKey:"API_KEY_HERE",
    }

    const [sharedProps, setSharedProps ] = useState(sharedPropsAR);

    /**
   * Wallky AR a besoin de ta pour accédé à la caméra
   * @returns 
   */
    requestReadAccessPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Wallky AR Permission',
                    'message': 'Wallky AR a besoin de ta pour accédé à la caméra '
                }
            )

            // console.log("resultat pour la permisson de la camera =",granted);

            // console.log(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {

                return granted;

            } else {

                return 'no';
            }

        } catch (err) {
            console.warn("[PermissionsAndroid]" + err)
        }
    }

    useEffect(() => {
        requestReadAccessPermission()
    }, []);


    // Renvoie le ViroARSceneNavigator qui démarrera l'expérience AR
    return (
        
        <View style={styles.container}>

            {toogle ?
                <ViroARSceneNavigator {...sharedProps.apiKey}
                    initialScene={{scene: InitialARScene}} />
            :
                null
            }

            {arrowBack(props)}
        </View>
    );

}

/**
 * Flèche de retour
 * @param {} props 
 * @returns 
 */
const arrowBack = (props) => {
    
    const goHomeMap = () => {
        setToogle(false);
        props.navigation.goBack();
    }

    return (

        <TouchableOpacity 
            style={styles.arrow_vertical_view}
            onPress={() => goHomeMap()}
        >
            <Image style={styles.arrow_vertical} source={arrow_vertical} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },

    arrow_vertical_view: {
        width: 30,
        height: 30,
        position: "absolute",
        top: 10,
        right: 30,
        // elevation: 1,
    }
});

export default ARModeScreen;


