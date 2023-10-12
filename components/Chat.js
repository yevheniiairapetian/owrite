import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import CustomActions from './CustomActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from "expo-av"
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
// chat screen functional component
// extract props from app
const Chat = ({ route, navigation, db, storage, isConnected }) => {
  //here user name, user id, and chat screen background color are changed
  const { name, backgroundColor, userID } = route.params;

  // here messages state is changed
  const [messages, setMessages] = useState([]);

  // sound variable
  let soundObject = null;





// render user location with a map

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }
  // prevent memory leak variable init
  let unsubMessages;

  useEffect(() => {
    // setting user name in the chat
    navigation.setOptions({ title: name });
    // if internet connection is true
    if (isConnected === true) {
      // clear call back function
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      // pushing new messages to db
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        // setting cached meessages if internet connection is lost
        cachedMessages(newMessages);
        setMessages(newMessages);
      })
      // loading messages from firestore if internet connection is present
    } else loadCachedMessages();
    // prevent memory leaks
    return () => {
      if (unsubMessages) unsubMessages();
      if (soundObject) soundObject.unloadAsync();

    }
    // dependency array checking internet connection
  }, [isConnected]);

  // load cached messages from local storage and parse them
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }
  // try to set messages with cached messages 
  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }



  //appends new messages to the array of old ones
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }
  // function to change bubble colors of users
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        // user bubble color
        right: {
          backgroundColor: "#000"
        },
        // sender bubble color
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }
  // message bubble with audio recording

  const renderAudioBubble = (props) => {
    return <View {...props}>
      <TouchableOpacity
        style={{
          backgroundColor: "#FF0", borderRadius: 10, margin: 5
        }}
        onPress={async () => {
          if (soundObject) soundObject.unloadAsync();
          const { sound } = await Audio.Sound.createAsync({
            uri:
              props.currentMessage.audio
          });
          soundObject = sound;
          await sound.playAsync();
        }}>
        <Text style={{
          textAlign: "center", color: 'black', padding:
            5
        }}>Play Sound</Text>
      </TouchableOpacity>
    </View>
  }


  // conditional to hide/show send button and text field if connection is lost/present
  const renderInputToolbar = (props) => {
    if (isConnected === true)
      return <InputToolbar
        {...props} />;
    else return null;
  }
  // circular button to access additional features (upload, take image, geolocation)
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />;
  };

  return (
    // chat screen
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderBubble={renderBubble}
        renderMessageAudio={renderAudioBubble}

        // accessibility props
        accessibilityLabel="input"
        accessible={true}
        accessibilityHint="Allows you to send a new message."
        // set user id and name
        user={{
          _id: userID,
          name: name,
        }}
      />




      {/* this is a fix for displaying the text input field on Android devices as it should be  */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

// styles for chat screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    flex: 1,
    justifyContent: 'center',
  }

});

export default Chat;