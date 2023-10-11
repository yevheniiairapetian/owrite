import Start from './components/Start';
import Chat from './components/Chat';
import React from 'react';
import {StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Alert } from 'react-native';
// ignore console messages
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
const Stack = createNativeStackNavigator();

export default function App() {
  //  Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqFrHbs15U5VAQZqbZ7963yqdjgpwfAlg",
  authDomain: "meetapp-9cf5a.firebaseapp.com",
  projectId: "meetapp-9cf5a",
  storageBucket: "meetapp-9cf5a.appspot.com",
  messagingSenderId: "122514956572",
  appId: "1:122514956572:web:5f05c05cc10b0f51fb5ad9",
  measurementId: "G-9KQ0272JMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  return (
    // routes for screens container
      <NavigationContainer>
       
        <Stack.Navigator
        initialRouteName="Start"
        // this screen opens when app is opened
      >
      {/* start screen */}
        <Stack.Screen
        
          name="Start"
          component={Start}
          
        >
        </Stack.Screen>
        {/* end of start screen */}
        {/* chat screen */}
        <Stack.Screen
          name="Chat"
        >
        {/* db prop containig the messages and user */}
        {props => <Chat
            db={db}
            {...props}
          />}
        </Stack.Screen>
        {/* end of chat screen */}
      </Stack.Navigator>
      
      </NavigationContainer>
      //end of routes
    );
}

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
