import Start from './components/Start';
import Chat from './components/Chat';
import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
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
          
        />
        {/* end of start screen */}
        {/* chat screen */}
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
        {/* end of char screen */}
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
