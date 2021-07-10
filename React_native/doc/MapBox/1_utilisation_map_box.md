# Utilisation de MapBox

Github MapBox pour React Native : https://github.com/react-native-mapbox-gl/maps

Site MapBox : https://www.mapbox.com/

Site MapBox Studio : https://www.mapbox.com/mapbox-studio 

## Implémentation 

1) S'inscrire dans MapBox a cette adresse https://www.mapbox.com/ et récupéré le token

2) Dans `android/build.gradle` 

    allprojects {

        repositories {
            mavenLocal()
            maven {
                // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
                url("$rootDir/../node_modules/react-native/android")
            }
            maven {
                // Android JSC is installed from npm
                url("$rootDir/../node_modules/jsc-android/dist")
            }

            google()
            jcenter()
            maven { url 'https://www.jitpack.io' }

            // Pour MapBox
            maven {
                url 'https://api.mapbox.com/downloads/v2/releases/maven'
                authentication {
                    basic(BasicAuthentication)
                }
                credentials {
                    // Ne modifiez pas le nom d'utilisateur ci-dessous.
                    // Cela devrait toujours être `mapbox` (pas votre nom d'utilisateur).
                    username = 'mapbox'
                    // Utilisez le jeton secret que vous avez stocké dans gradle.properties comme mot de passe
                    password = project.properties['MAPBOX_DOWNLOADS_TOKEN'] ?: ""
                }
            }
        }
    }

3) Dans `android/gradle.properties` on stock le jeton secert

    MY_ACCESSTOKEN=<THE_JETON_SECRET>


4) Dans `android/app/build.gradle` on implemente certaine dépendance

    implementation 'com.mapbox.mapboxsdk:mapbox-android-telemetry:6.1.0'
    implementation 'com.mapbox.mapboxsdk:mapbox-sdk-services:5.8.0'
    implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-markerview-v9:0.4.0'


5) Dans `android/app/src/main/AndroidManifest.xml`

    <!-- Accès à la géolocalisation -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps"/>

6) Dans `src/tools/helpers.js`

    /** MapBoxToken */
    
    export const MAPBOX_TOKEN = "< THE_JETON_SECRET>";

    /** style MapBox customiser dans mapbox studio https://www.mapbox.com/mapbox-studio  */

    export const STYLE_URL_MAPBOX = 'mapbox://styles/NAME_PROFILE_MAPBOX/iyibzbduezklzejiikejmmda53' 


7) Dans le fichier js qui devra afficher la carte

- On installe `@react-native-mapbox-gl/maps`

    > yarn add @react-native-mapbox-gl/maps

    - On importe `MapboxGL` depuis `@react-native-mapbox-gl/maps`

- On installe `@mapbox/mapbox-sdk`

    > yarn add @mapbox/mapbox-sdk

    - On importe `MapboxClient` depuis `@mapbox/mapbox-sdk`

- On installe `@mapbox/mapbox-sdk/services/directions`

    > yarn add @mapbox/mapbox-sdk/services/directions

    - On importe `MapboxDirections` depuis `@mapbox/mapbox-sdk/services/directions`

- On installe `@mapbox/mapbox-sdk/services/directions`

    > yarn add @mapbox/mapbox-sdk/services/directions

    - On importe `MapboxDirections` depuis `@mapbox/mapbox-sdk/services/directions`

- On installe `@turf/helpers`

    > yarn add @turf/helpers

    - On importe `lineString as makeLineString` depuis `@turf/helpers`


- On importe `MAPBOX_TOKEN` et `STYLE_URL_MAPBOX` depuis  `helpers`

    import { MAPBOX_TOKEN, STYLE_URL_MAPBOX } from '../tools/helpers';

- `MapboxGL.setAccessToken(MAPBOX_TOKEN);` on utilise notre token dans `MapboxGL`

- `MapboxGL.setConnected(true);` on vérifie la connection

- on va utiliser la direction de mapBox, pour tracer des itinéraires

    const baseClient = MapboxClient({ accessToken: MAPBOX_TOKEN });

    const mapboxDirectionClient = MapboxDirections(baseClient);

- Télémétrie sur false dans le hook useEffect

    MapboxGL.setTelemetryEnabled(false);

- Voir la fonction `getItinary()` pour Définir un itinéraire

- Voir la fonction `renderRoadDirections()` pour Afficher/tracer un itinéraire sur la carte

- `{renderRoadDirections()}` Dans `MapboxGL.MapView ` on appel `renderRoadDirections()`

Dans le fichier js qui devra afficher la carte


    import React, { useEffect, useState } from 'react';
    import { 
        View, 
        StyleSheet, 
        Dimensions,
        ActivityIndicator,
        Image,
        Text,
        PermissionsAndroid,
        Platform,
        TouchableOpacity
    } from 'react-native';
    // import Constants from 'expo-constants';
    // import * as Location from 'expo-location';
    import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
    import Geolocation from '@react-native-community/geolocation';
    import { MapSombreStyle, MAPBOX_TOKEN, STYLE_URL_MAPBOX } from '../tools/helpers';

    import MapboxGL from "@react-native-mapbox-gl/maps";
    import MapboxClient from '@mapbox/mapbox-sdk'
    import MapboxDirections from '@mapbox/mapbox-sdk/services/directions'
    import { lineString as makeLineString } from '@turf/helpers'

    // component
    import MapProfile from '../components/map/MapProfile';
    import MapAR from '../components/map/MapAR';
    import MapUserChoose from '../components/map/MapUserChoose';

    //image
    import IconNavigation from '../../assets/iconsPNG/icon-navigation.png'
    import music from '../../assets/iconsPNG/icon-music.png';
    import peintre from '../../assets/iconsPNG/icon-peintre.png';
    import rugby from '../../assets/iconsPNG/icon-rugby.png';
    import maison from '../../assets/iconsPNG/icon-maison.png';
    import photo from '../../assets/iconsPNG/icon-appareil_photo.png';
    import etoile from '../../assets/iconsPNG/icon-etoile.png';

    Geolocation.setRNConfiguration({auto: "auto"});

    MapboxGL.setAccessToken(MAPBOX_TOKEN);
    MapboxGL.setConnected(true);

    const baseClient = MapboxClient({ accessToken: MAPBOX_TOKEN });
    const mapboxDirectionClient = MapboxDirections(baseClient);



    const { width, height } = Dimensions.get("window");

    const initialState = { 
        latitude: null, 
        longitude: null,
        route: null,
        routeCategorieId: null,
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
            {
                id: 7,
                latitude: 48.494842 - 0.031025,
                longitude: -2.6949256 - 0.048042,
                image: photo,
                category: 'photo'
            },
            {
                id: 8,
                latitude: 48.494842 - 0.015025,
                longitude: -2.6949256 - 0.013042,
                image: music,
                category: 'music'
            },
            {
                id: 9,
                latitude: 48.494842 - 0.018025,
                longitude: -2.6949256 - 0.120042,
                image: peintre,
                category: 'peintre'
            },
            {
                id: 10,
                latitude: 48.494842 - 0.060025,
                longitude: -2.6949256 - 0.0104042,
                image: rugby,
                category: 'rugby'
            },
            {
                id: 11,
                latitude: 48.494842 - 0.074025,
                longitude: -2.6949256 - 0.114042,
                image: maison,
                category: 'maison'
            },
            {
                id: 12,
                latitude: 48.494842 - 0.022500,
                longitude: -2.6949256 - 0.099042,
                image: etoile,
                category: 'etoile'
            },
            {   //Nantes
                id: 13,
                latitude: 47.218371 - 0.010025,
                longitude: -1.553621 - 0.010042,
                image: peintre,
                category: 'peintre'
            },
            {
                id: 14,
                latitude: 47.218371 - 0.010025,
                longitude: -1.553621 - 0.020042,
                image: rugby,
                category: 'rugby'
            },
            {
                id: 15,
                latitude: 47.218371 - 0.020025,
                longitude: -1.553621 - 0.020042,
                image: photo,
                category: 'photo'
            },
            {
                id: 16,
                latitude: 47.218371 - 0.030025,
                longitude: -1.553621 - 0.002042,
                image: music,
                category: 'music'
            },
            {
                id: 17,
                latitude: 47.218371 - 0.022025,
                longitude: -1.553621 - 0.014042,
                image: maison,
                category: 'maison'
            },
            {
                id: 18,
                latitude: 47.218371 - 0.020425,
                longitude: -1.553621- 0.014042,
                image: etoile,
                category: 'etoile'
            },
            {
                id: 19,
                latitude: 47.218371 - 0.990025,
                longitude: -1.553621 - 0.210042,
                image: peintre,
                category: 'peintre'
            },
            {
                id: 20,
                latitude: 47.218371 - 0.050025,
                longitude: -1.553621 - 0.020042,
                image: rugby,
                category: 'rugby'
            },
            {
                id: 21,
                latitude: 47.218371 - 0.020025,
                longitude: -1.553621 - 0.90042,
                image: photo,
                category: 'photo'
            },
            {
                id: 22,
                latitude: 47.218371 - 0.039025,
                longitude: -1.553621 - 0.042042,
                image: music,
                category: 'music'
            },
            {
                id: 23,
                latitude: 47.218371 - 0.026225,
                longitude: -1.553621 - 0.017089,
                image: maison,
                category: 'maison'
            },
            {
                id: 24,
                latitude: 47.218371 - 0.029999,
                longitude: -1.553621- 0.019999,
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
            MapboxGL.setTelemetryEnabled(false);
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

        let _map = MapboxGL.MapView | null;
        let _camera = MapboxGL.Camera | null;

        /**
        * Définir un itinéraire pour mettre un tableau de plusieurs longitude et latitude afin de former une route
        * on le met dans la propriété route du state
        * 
        * on compare les id du wallky afin d'afficher son itinéraire ou pas
        * 
        * @param {Array} locationOrigin [ longitude, latitude ]
        * @param {Array} locationDestination [ longitude, latitude ]
        * @param {number} idWallky
        */
        const getItinary = async (locationOrigin, locationDestination, idWallky) => {

            const requestOptions = {
                waypoints: [
                    { coordinates: locationOrigin },
                    { coordinates: locationDestination }
                ],
                profile: 'driving',
                geometries: 'geojson'
            }

            const response = await mapboxDirectionClient.getDirections(requestOptions).send();

            const route = makeLineString(response.body.routes[0].geometry.coordinates)

            // console.log( JSON.stringify(route) );

            console.log(state.routeCategorieId);

            console.log(idWallky);

            if (state.routeCategorieId != null && state.routeCategorieId == idWallky) {
                setState(prevState => ({
                    ...prevState,
                    route: null,
                    routeCategorieId: null
                }));
            }
            else {

                setState(prevState => ({
                    ...prevState,
                    route: route,
                    routeCategorieId: idWallky
                }));
            }
        }


        /**
        * rendu de l'itinéraire
        * @returns 
        */
        const renderRoadDirections = () => {

            const { route } = state

            return route ? (

                <MapboxGL.ShapeSource id="routeSource" shape={route.geometry}>
                    <MapboxGL.LineLayer id="routeFill"  style={{lineColor: "#ff8109", lineWidth: 3.2, lineCap: MapboxGL.LineJoin.Round, lineOpacity: 1.84}} />
                </MapboxGL.ShapeSource>
                ) 
            : 
                null;
        };

        return (
            <View style={styles.container}>

                <MapboxGL.MapView 
                    style={styles.container}
                    styleURL={STYLE_URL_MAPBOX}
                    ref={(map = MapboxGL.MapView) => (_map = map)}
                    compassEnabled={false}
                    logoEnabled={false}
                >

                    {renderRoadDirections()}
                    
                    <MapboxGL.UserLocation
                        renderMode='normal'
                        androidRenderMode='gps'
                        showsUserHeadingIndicator
                    >

                        <MapboxGL.SymbolLayer
                            id={'custom-user-symbol'}
                            style={{
                                iconImage: IconNavigation,
                                iconRotationAlignment: 'map',
                                iconAllowOverlap: true,
                                symbolPlacement: 'point',
                                iconIgnorePlacement: true,
                                iconPitchAlignment:'map'
                            }}
                        />
                    </MapboxGL.UserLocation>


                    {/* Affiche toutes les categories en même temps */}
                    { !state.filter_categories.all 
                        && !state.filter_categories.music 
                        && !state.filter_categories.rugby
                        && !state.filter_categories.photo 
                        && !state.filter_categories.etoile 
                        && !state.filter_categories.maison 
                        && !state.filter_categories.peintre  ?

                        state.categories.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }


                    {/* Affiche seulement les categories music */}
                    { state.filter_categories.music ?

                        state.filter_categories.music.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-music'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }


                    {/* Affiche seulement les categories rugby */}
                    { state.filter_categories.rugby ?

                        state.filter_categories.rugby.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-rugby'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }


                    {/* Affiche seulement les categories photo */}
                    { state.filter_categories.photo ?

                        state.filter_categories.photo.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-photo'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }


                    {/* Affiche seulement les categories etoile */}
                    { state.filter_categories.etoile ?

                        state.filter_categories.etoile.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-etoile'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }


                    {/* Affiche seulement les categories maison */}
                    { state.filter_categories.maison ?

                        state.filter_categories.maison.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-maison'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }



                    {/* Affiche seulement les categories peintre */}
                    { state.filter_categories.peintre ?

                        state.filter_categories.peintre.map(marker => (


                            <MapboxGL.MarkerView
                                coordinate={[
                                    marker.longitude,
                                    marker.latitude
                                ]}
                                key={marker.id}
                                id={'marker-peintre'}
                            >
                                <TouchableOpacity 
                                    style={styles.mapMarkerCategory}
                                    onPress={() => getItinary([state.longitude, state.latitude], [marker.longitude, marker.latitude], marker.id)}
                                >
                                    <Image source={marker.image} />
                                </TouchableOpacity>
                            </MapboxGL.MarkerView>
                        ))

                    :
                        null
                    }



                </MapboxGL.MapView>            

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



