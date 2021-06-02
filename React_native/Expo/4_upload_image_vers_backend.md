# Upload d'image depuis le stockage du mobile avec Expo dans React Native, vers le backend

site expo-issue : https://snack.expo.io/@bycedric/expo-issue-11422

Dans `ProfileSettingScreen.js`

- On install `expo-image-picker` et on l'importe

    > expo install expo-image-picker

- On install `axios` et on l'importe

    > expo install axios

- On met la constante `user` dans le tableau en deuxième argument de `useEffect` afin de surveiller les mises à jour de la constante `user`  

- On cree la fontion `permissionLibrary()` afin de demander à l'utilisateur l'autorisation pour prendre des images depuis le stockage de son téléphone, si on est sur un mobile `IOS` ou `Android`

- On cree la fontion `pickImage()` 

    - qui va appeler la fontion `permissionLibrary()` pour vérifier les autorisations, 

    - puis `ImagePicker.launchImageLibraryAsync()` récupère l'image depuis le storage du téléphone,

    - `result.uri.substring(result.uri.lastIndexOf('.') + 1)` recupère l'extention de l'image pour mettre le résultat dans `new FormData()`

    - `result.uri.substring(result.uri.lastIndexOf('/') + 1);` recupère le nom de l'image pour mettre le résultat dans `new FormData()`

    - l'image est ensuite mit dans un format `'multipart/form-data'` grace à `new FormData()` qui serat dans la variable `fromData`

    - puis l'image est envoyer en backend avec `axios.post()` car ça ne fonctionne pas avec l'autre fonction `fetch()`

    - en premier argument de `axios.post()`, il y aura l'url qui permet d' upload une image en backend 

    - `const tokenStorage = await AsyncStorage.getItem('token');` recupère le `token` depuis le storage du téléphone pour le mettre dans `axios.post()` dans le headers

    - la variable `formData` sera mit en deuxièmes argument de `axios.post()`


Dans `ProfileSettingScreen.js`

    import React, { useState, useEffect } from 'react';
    import {
        View,
        StyleSheet,
        TouchableOpacity,
        Text,
        Image,
        Platform
    } from 'react-native';
    import Constants from 'expo-constants';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { Ionicons, FontAwesome } from '@expo/vector-icons';
    import { BASE_URL } from '../../tools/helpers';
    import * as ImagePicker from 'expo-image-picker';
    import axios from 'axios';

    //composant
    import ProfileHeaderIcon from '../../components/ProfileHeaderIcon';
    import TextView from '../../components/TextView';

    // images
    import imgDefault from '../../../assets/images/default_3.jpg'

    //tools
    import { logout } from '../../tools/helpers'

    const ProfileSettingScreen = (props) => {

        const [user, setUser ] = useState();

        const [image, setImage] = useState(null);

        useEffect(() => {
            
            chekUser();
        }, [user]);
        
        /**
        * recupère l'user qui est dans le token, 
        * puis le cherche en bdd
        */
        const chekUser = async () => {
        
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

                setUser(responseJsonUser)
            })
            .catch((error) => console.error(error));
        }

        if (user == null) {
            return (
                <View style={styles.container}>
                    <Text>loading...</Text>
                </View>
            )
        }

        const userLogout = () => {
            logout(props);
        }

        const goTo = (route) => props.navigation.navigate(route); 

        /**
        * Demande d'autorisation pour prendre une image depuis le stockage du téléphone 
        */
        const permissionLibrary = async () => {

            if (Platform.OS !== 'web') {

                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                    return false;
                }

                return true;
            }
        }

        /**
        * 
        * Récupère l'image depuis le storage du téléphone, 
        * l'image est mit dans un format 'multipart/form-data' grace a new FormData()
        * puis l'image est envoyer en backend 
        */
        const pickImage = async () => {

            const hasPermission = permissionLibrary();

            if (hasPermission === false) {
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            let extentionImg = result.uri.substring(result.uri.lastIndexOf('.') + 1)

            let imgName = result.uri.substring(result.uri.lastIndexOf('/') + 1);

            let fromData = new FormData();

            fromData.append('file', {
                name:  imgName,
                type: `image/${extentionImg}`,
                uri: result.uri
            });

            const tokenStorage = await AsyncStorage.getItem('token');

            await axios.post(`${ BASE_URL }/api/users/${ user.id }/image`, fromData, {
                headers: {
                    'Accept' : '*/*',
                    'Content-type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${tokenStorage}`
                }
            })
            .then(async (responseJson) => {

                console.log(responseJson);
            })
            .catch((error) => console.error(error));
        };

        

        return (
            <View style={styles.container}>

                <ProfileHeaderIcon  
                    onPressSetting={() => goTo("ProfileSetting")} 
                    onPressHome={() => goTo("HomeMap")}
                    hidden="hidden"
            />

            <View style={styles.containerProfile} >
                    {/* <Image 
                        source={imgDefault}
                        style={styles.image} 
                    /> */}

                    <TouchableOpacity onPress={ pickImage}>
                        {!user.fileUrl ?
                            
                            <Image 
                                style={styles.image}
                                source={imgDefault} 
                            />
                        :
                            <Image 
                                style={styles.image}
                                source={{ uri : `${BASE_URL}/${user.fileUrl}`}}
                            />
                        }
                    </TouchableOpacity>

                    <View style={styles.profileViewText}>
                        <Text style={styles.pseudo}>{user.pseudo}</Text>
                        <Text style={styles.arobasePseudo}>@{user.pseudo}</Text>

                        <View style={styles.follow} >
                            <Text style={styles.followText}>Followers</Text>
                            <Text style={styles.followText}>Following</Text>
                        </View>
                    </View>
            </View>

                {/* Account */}
                <View>
                    <View style={styles.settingView}>
                        <Ionicons
                            name="md-key-outline"
                            size={30}
                            color="white"
                            style={styles.settingStyleIcon}
                        />

                        <View>
                            <TextView 
                                text="Account" 
                                customStyleView={styles.settingStyleView} 
                                customStyleText={styles.settingStyleText} 
                            />

                            <TextView 
                                text="Privacy & security" 
                                customStyleView={styles.settingStyleView_2} 
                                customStyleText={styles.settingStyleText_2} 
                            />
                        </View>
                    </View>
            </View>

                {/* Notification */}
                <View>
                    <View style={styles.settingView}>
                        <Ionicons
                            name="md-notifications-sharp"
                            size={30}
                            color="white"
                            style={styles.settingStyleIcon}
                        />

                        <View>
                            <TextView 
                                text="Notification" 
                                customStyleView={styles.settingStyleView} 
                                customStyleText={styles.settingStyleText} 
                            />

                            <TextView 
                                text="Reactions on wallkies" 
                                customStyleView={styles.settingStyleView_2} 
                                customStyleText={styles.settingStyleText_2} 
                            />
                        </View>
                    </View>
                </View>

                {/* Storage */}
                <View>
                    <View style={styles.settingView}>
                        <Ionicons
                            name="md-sync-circle-outline"
                            size={30}
                            color="white"
                            style={styles.settingStyleIcon}
                        />

                        <View>
                            <TextView 
                                text="Storage and Data usage" 
                                customStyleView={styles.settingStyleView} 
                                customStyleText={styles.settingStyleText} 
                            />

                            <TextView 
                                text="RSaved location, wallkies" 
                                customStyleView={styles.settingStyleView_2} 
                                customStyleText={styles.settingStyleText_2} 
                            />
                        </View>
                    </View>
                </View>

                {/* Deconnexion */}
                <TouchableOpacity onPress={userLogout}>
                    <View style={styles.settingView}>
                        <Ionicons
                            name="md-log-out"
                            size={30}
                            color="white"
                            style={styles.settingStyleIcon}
                        />

                        <View>
                            <TextView 
                                text="Deconnexion" 
                                customStyleView={styles.settingStyleView} 
                                customStyleText={styles.settingStyleText} 
                            />
                        </View>
                    </View>
                </TouchableOpacity>


            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            backgroundColor: "#171628",
            paddingHorizontal: 20,

        },

        containerProfile: {
            flexDirection: 'row',
            marginVertical: 30,
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(255, 255, 255, 0.2)',
            paddingBottom: 40
        },
        profileViewText: {
            flexDirection: 'column',
            justifyContent: 'space-between'
        },

        image: {
            width: 90,
            height: 90,
            marginRight: 20,
            borderRadius: 10
        },

        pseudo: {
            color: '#fff',
            fontSize: 20,
            
        },
        arobasePseudo: {
            color: '#fff',
            fontSize: 20,
            opacity: 0.4
        },
        follow: {
            flexDirection: 'row',
        },
        followText: {
            color: '#fff',
            fontSize: 20,
            opacity: 0.4,
            marginRight: 10
        },

        settingView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 60

        },
        settingStyleView: {
            paddingTop: 0,
        },
        settingStyleText: {
            fontSize: 25,
            textAlign: 'left'
        },
        settingStyleView_2: {
            paddingTop: 0,
        },
        settingStyleText_2: {
            fontSize: 15,
            color: 'rgba(255, 255, 255, 0.4)',
            textAlign: 'left'
        },
        settingStyleIcon: {
            marginRight: 40,
            color: 'rgba(255, 255, 255, 0.4)',
        }
    });

    export default ProfileSettingScreen;