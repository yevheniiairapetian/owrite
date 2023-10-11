import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// chat screen functional component
// extract props from app
const Chat = ({ route, navigation, db, isConnected }) => {
  //here user name, user id, and chat screen background color are changed
  const { name, backgroundColor, userID } = route.params;

  // here messages state is changed
  const [messages, setMessages] = useState([]);

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

  // conditional to hide/show send button and yexy field if connection is lost/present
  const renderInputToolbar = (props) => {
    if (isConnected === true) 
    return <InputToolbar 
    {...props} />;
    else return null;
  }

return (
  // chat screen
  <View style={[styles.container, { backgroundColor: backgroundColor }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      renderInputToolbar={renderInputToolbar}
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
  }
});

export default Chat;