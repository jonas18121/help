/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// viro react
import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
  // VRTARSceneNavigator
} from '@viro-community/react-viro';

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');
var InitialVRScene = require('./js/HelloWorldScene');




const App = () => {

  /*
    TODO: Insert your API key below
    */
    var sharedPropsAR = {
      apiKey:"API_KEY_HERE",
  }

  const [sharedProps, setSharedProps ] = useState(sharedPropsAR);

  const [toggle, setToggle ] = useState(true);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // Returns the ViroARSceneNavigator which will start the AR experience
  const getARNavigator = () => {

    console.log('je suis cliker');
    setToggle(false);
}

  if (!toggle) {
    return (
        // <View style={styles.containerAR}>
            // <Text style={styles.labelText}>HELLO</Text>
            <ViroARSceneNavigator {...sharedProps}
            initialScene={{scene: InitialARScene}} />
        // </View>
    );
  } else{

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          
          <TouchableOpacity onPress={getARNavigator}>
            <Text>Click for AR</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
