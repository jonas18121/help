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
import maison from '../../assets/iconsPNG/icon-maison.png';
import photo from '../../assets/iconsPNG/icon-appareil_photo.png';
import etoile from '../../assets/iconsPNG/icon-etoile.png';

Geolocation.setRNConfiguration({auto: "auto"});


const { width, height } = Dimensions.get("window");

const initialState = { 
    latitude: null, 
    longitude: null,
    filter_categories: {
        all: null,
        music: null,
        rugby: null,
        etoile: null,
        peintre: null,
        maison: null,
        photo: null
    },
    categories: [
        {//langueux
            id: 1,
            latitude: 48.494842,
            longitude: -2.6949256,
            image: photo,
            category: 'photo'
        },
        {
            id: 2,
            latitude: 48.494842 - 0.010025,
            longitude: -2.6949256 - 0.010042,
            image: music,
            category: 'music'
        },
        {
            id: 3,
            latitude: 48.494842 - 0.010025,
            longitude: -2.6949256 - 0.020042,
            image: peintre,
            category: 'peintre'
        },
        {
            id: 4,
            latitude: 48.494842 - 0.020025,
            longitude: -2.6949256 - 0.004042,
            image: rugby,
            category: 'rugby'
        },
        {
            id: 5,
            latitude: 48.494842 - 0.024025,
            longitude: -2.6949256 - 0.014042,
            image: maison,
            category: 'maison'
        },
        {
            id: 6,
            latitude: 48.494842 - 0.021025,
            longitude: -2.6949256 - 0.044042,
            image: etoile,
            category: 'etoile'
        },
        {   //Nantes
            id: 7,
            latitude: 47.218371 - 0.010025,
            longitude: -1.553621 - 0.010042,
            image: peintre,
            category: 'peintre'
        },
        {
            id: 8,
            latitude: 47.218371 - 0.010025,
            longitude: -1.553621 - 0.020042,
            image: rugby,
            category: 'rugby'
        },
        {
            id: 9,
            latitude: 47.218371 - 0.020025,
            longitude: -1.553621 - 0.020042,
            image: photo,
            category: 'photo'
        },
        {
            id: 10,
            latitude: 47.218371 - 0.030025,
            longitude: -1.553621 - 0.002042,
            image: music,
            category: 'music'
        },
        {
            id: 11,
            latitude: 47.218371 - 0.022025,
            longitude: -1.553621 - 0.014042,
            image: maison,
            category: 'maison'
        },
        {
            id: 12,
            latitude: 47.218371 - 0.020425,
            longitude: -1.553621- 0.014042,
            image: etoile,
            category: 'etoile'
        }
    ]
}



const HomeMapScreen = (props) => {

    const [toggle, setToggle ] = useState(true);

    const [state, setState ] = useState(initialState);


    // const [categoryTab, setCategoryTab] = useState([]);

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

    
    /**
     * selectionne une ou plusieurs categories selon ceux que l'utilisateur a cliquer depuis la flèche de navigation de la map
     * 
     * phrase d'exemple de la condition ci-dessous
     * 
     *      prevState.filter_categories.music != null ?  
     *              (nameCategory == 'music' ?  null  : prevState.filter_categories.music)   
     *      : 
     *              (nameCategory == 'music' ? state.categories.filter(category => category.category == nameCategory ) : null),
     *
     * 
     * 
     * 
     * 
     * 
     * 
     * Si la propriété music de filter_categories (qui ce trouve dans le state) est diférente de null (donc qu'il y a du contenu dedans),
     * 
     *      - On dit que c'est true et on fait une deuxièmes condition
     * 
     *          - Si la valeur de la variable nameCategory est égale à music, 
     * 
     *              - alors on dit que c'est true et on retourne null (car l'utisateur a cliquer une deuxièmes fois sur cette catégory pour l'enlevé de l'affichage)
     * 
     *          - Si la valeur de la variable nameCategory est différente de music, 
     *              
     *              - on dit que c'est false, on retourne le contenu qui existe déjà dans la propriété music (car l'utisateur a cliquer sur une autre catégory pour les affichés en même temps )
     * 
     * 
     * 
     * 
     * 
     * 
     * Si la propriété music de filter_categories est égale à null (donc qu'il n'y a pas de contenu dedans),
     * 
     *      - On dit que c'est false et on fait une deuxièmes condition
     * 
     *          - Si la valeur de la variable nameCategory est égale à music, 
     * 
     *              - alors on dit que c'est true et on retourne tout les wallky qui sont dans la categorie 'music' (car l'utilisateur a cliquer une première fois sur cette category pour l'afficher )
     * 
     *          - Si la valeur de la variable nameCategory est différente de music,
     * 
     *              - on dit que c'est false, on retourne null (car l'utilisateur a cliquer sur une autre category )
     * 
     * @param {*} nameCategory 
     */
    const selecteCategory = (nameCategory = null ) => {

        setState(prevState => ({
            ...prevState,
            filter_categories: {
                music: prevState.filter_categories.music != null ?          nameCategory == 'music' ?  null  : prevState.filter_categories.music            :           nameCategory == 'music' ? state.categories.filter(category => category.category == nameCategory ) : null,

                rugby: prevState.filter_categories.rugby != null ?          nameCategory == 'rugby' ?  null : prevState.filter_categories.rugby             :           nameCategory == 'rugby' ? state.categories.filter(category => category.category == nameCategory ) : null,

                photo: prevState.filter_categories.photo != null ?          nameCategory == 'photo' ? null : prevState.filter_categories.photo              :           nameCategory == 'photo' ? state.categories.filter(category => category.category == nameCategory ) : null,

                peintre: prevState.filter_categories.peintre != null ?      nameCategory == 'peintre' ? null : prevState.filter_categories.peintre          :           nameCategory == 'peintre' ? state.categories.filter(category => category.category == nameCategory ) : null,

                etoile: prevState.filter_categories.etoile != null ?        nameCategory == 'etoile' ? null : prevState.filter_categories.etoile            :           nameCategory == 'etoile' ? state.categories.filter(category => category.category == nameCategory ) : null,

                maison: prevState.filter_categories.maison != null ?        nameCategory == 'maison' ? null : prevState.filter_categories.maison            :           nameCategory == 'maison' ? state.categories.filter(category => category.category == nameCategory ) : null,
            }
        }));
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
                

                { !state.filter_categories.all 
                    && !state.filter_categories.music 
                    && !state.filter_categories.rugby
                    && !state.filter_categories.photo 
                    && !state.filter_categories.etoile 
                    && !state.filter_categories.maison 
                    && !state.filter_categories.peintre  ?

                    state.categories.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

                { state.filter_categories.music ?

                    state.filter_categories.music.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }


                { state.filter_categories.rugby ?

                    state.filter_categories.rugby.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

                { state.filter_categories.photo ?

                    state.filter_categories.photo.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

                { state.filter_categories.etoile ?

                    state.filter_categories.etoile.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

                { state.filter_categories.maison ?

                    state.filter_categories.maison.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

                { state.filter_categories.peintre ?

                    state.filter_categories.peintre.map(marker => (


                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            key={marker.id}
                        >
                            <View style={styles.mapMarkerCategory}>
                                <Image source={marker.image} />
                            </View>
                        </Marker>
                    ))

                :
                    null
                }

            
                {/* <Marker
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
                </Marker>  */}

                {/* <Marker
                    coordinate={{
                        latitude: state.latitude,
                        longitude: state.longitude,
                    }}
                > */}
                    {/* <MapUserChoose route={props} selecteCategory={selecteCategory}/> */}
                {/* </Marker>    */}
                

            </MapView>

            <MapProfile route={props} />
            <MapAR route={props} onPressAR={getARNavigator} />

            <MapUserChoose 
                route={props} 
                selecteCategory={selecteCategory}
            />
                   {/* <Marker
                        coordinate={{
                            latitude: state.latitude,
                            longitude: state.longitude,
                        }}
                    />
                
                </MapUserChoose>  */}
            {/* </Marker> */}

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


