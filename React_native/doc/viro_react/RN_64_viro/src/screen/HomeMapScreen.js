import React, { useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Dimensions,
    ActivityIndicator,
    Image,
    Text,
    PermissionsAndroid,
    Platform
} from 'react-native';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { MapSombreStyle } from '../tools/helpers';

// component
import MapProfile from '../components/map/MapProfile';
import MapAR from '../components/map/MapAR';
import MapUserChoose from '../components/map/MapUserChoose';

//image
import music from '../../assets/iconsPNG/icon-music.png';
import peintre from '../../assets/iconsPNG/icon-peintre.png';
import rugby from '../../assets/iconsPNG/icon-rugby.png';

Geolocation.setRNConfiguration({auto: "auto"});


const { width, height } = Dimensions.get("window");

const initialState = { latitude: null, longitude: null };

const HomeMapScreen = (props) => {

    const [toggle, setToggle ] = useState(true);

    const [state, setState ] = useState(initialState);

    /**
     * permettre d'avoir la localisation de l'utilisateur du téléphone
     */
    const getUserLocation = async () => {

        try {
            if (PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {

                await Geolocation.getCurrentPosition(
                    (position) => {
                        console.log(position);

                        setState(prevState => ({
                            ...prevState,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }));

                        
                    },
                    (error) => {
                        // See error code charts below.
                        console.log('Error', error.code, error.message);
                    },
                    Platform.OS === 'android' ? {} : { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
                );
            }

        } catch (error) {
            console.error('Erreur : ', error );
        }
    }

    
    useEffect(() => {
        getUserLocation();
    }, []);


    if (state.latitude == null || state.longitude == null) {
        
        return (
            <View style={styles.container}>
                {/* <ActivityIndicator size='large' /> */}
                <Text>Loading</Text>
            </View>
        );
    }

    
    const getARNavigator = () => {
        props.navigation.navigate('ARMode');
    }

    return (
        <View style={styles.container}>

            <MapView 
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapSombreStyle}
                style={styles.mapStyle} 
                showsUserLocation
                followsUserLocation
                region={{
                    latitude: state.latitude,
                    longitude: state.longitude,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.121
                }}
            > 

            
                <Marker
                    coordinate={{
                        latitude: state.latitude,
                        longitude: state.longitude,
                    }}
                >
                    <View style={styles.mapMarkerCategory}>
                        <Image source={music} />
                    </View>
                </Marker>


                <Marker
                    coordinate={{
                        latitude: state.latitude - 0.010025,
                        longitude: state.longitude - 0.010042,
                    }}
                >
                    <View style={styles.mapMarkerCategory}>
                        <Image source={music} />
                    </View>
                </Marker>

                <Marker
                    coordinate={{
                        latitude: state.latitude - 0.010025,
                        longitude: state.longitude - 0.020042,
                    }}
                >
                    <View style={styles.mapMarkerCategory}>
                        <Image source={peintre} />
                    </View>
                </Marker>

                <Marker
                    coordinate={{
                        latitude: state.latitude - 0.020025,
                        longitude: state.longitude - 0.020042,
                    }}
                >
                    <View style={styles.mapMarkerCategory}>
                        <Image source={rugby} />
                    </View>
                </Marker>



                <Marker
                    coordinate={{
                        latitude: state.latitude - 0.030025,
                        longitude: state.longitude - 0.002042,
                    }}
                >
                    <View style={styles.mapMarkerCategory}>
                        <Image source={music} />
                    </View>
                </Marker> 


            </MapView>

            <MapProfile route={props} />
            <MapAR route={props} onPressAR={getARNavigator} />
            <MapUserChoose route={props} /> 

        </View>
    );
    


}                   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171628",
    },

    containerAR: {
        flex: 1,
        backgroundColor: "#171628",
        position: 'absolute',
    },
    labelText: {
        fontSize: 20,
        marginHorizontal: 40,
        fontFamily: "Roboto-Regular",
        color: '#fff'
    },

    labelView: {
    },
    labelText: {
        textAlign: "left",
        fontSize: 20,
        marginHorizontal: 40,
        fontFamily: "Roboto-Regular",
        color: '#fff'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        marginHorizontal: 40,
        alignItems: "center",
        color: "#fff"
    },

    mapStyle: {
        width: width,
        height: height
    },

    containerImgProfile: {
        position: "absolute",
        top: 10,
        left: 10,
        
    },
    imgProfile: {
        width: 50,
        height: 50,
        borderRadius: 10
    },

    mapMarkerCategory: {
        width: 40,
        height: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default HomeMapScreen;