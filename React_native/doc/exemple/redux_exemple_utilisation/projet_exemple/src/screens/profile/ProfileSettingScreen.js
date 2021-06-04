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
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../tools/helpers';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


// dossier redux
import { selectorGetOneUser } from '../../redux/selectors/selectorsUser';
import { 
    actionUploadImageForUser
} from '../../redux/actions/users/actionsUser'

//composant
import ProfileHeaderIcon from '../../components/ProfileHeaderIcon';
import TextView from '../../components/TextView';

// images
import imgDefault from '../../../assets/images/default_3.jpg'

//tools
import { logout } from '../../tools/helpers'

const ProfileSettingScreen = (props) => {

    const dispatch = useDispatch();

    const user = useSelector(selectorGetOneUser);
    
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

        if (result === null || result.uri === undefined) {
            return;
        }

        let extentionImg = result.uri.substring(result.uri.lastIndexOf('.') + 1);

        let imgName = result.uri.substring(result.uri.lastIndexOf('/') + 1);

        let fromData = new FormData();

        fromData.append('file', {
            name:  imgName,
            type: `image/${extentionImg}`,
            uri: result.uri
        });

        dispatch(actionUploadImageForUser(fromData, user, dispatch));
    };

    

    return (
        <View style={styles.container}>

            <ProfileHeaderIcon  
                onPressSetting={() => goTo("ProfileSetting")} 
                onPressHome={() => goTo("HomeMap")}
                hidden="hidden"
           />

           <View style={styles.containerProfile} >

                <TouchableOpacity onPress={ pickImage}>
                    {!user.fileUrl ?
                        
                        <Image 
                            style={styles.image}
                            source={imgDefault} 
                        />
                    :
                        <Image 
                            style={styles.image}
                            source={{ uri: `${BASE_URL}/${user.fileUrl}` }} 
                        />
                    }
                </TouchableOpacity>

                <View style={styles.profileViewText}>
                    <Text style={styles.pseudo}>{user.pseudo}</Text>
                    <Text style={styles.arobasePseudo}>@{user.pseudo.split(' ')}</Text>

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