import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot,query, orderBy } from "firebase/firestore";
// chat screen functional component
// extract props from app
const Chat = ({ route, navigation, db }) => {
  //here user name, user id, and chat screen background color are changed
  const { name, backgroundColor, userID } = route.params;

  // here messages state is changed
  const [messages, setMessages] = useState([]);

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
  //creates a test example with a test user and message as by GiftedChat requirements



  
  useEffect(() => {
    
  //set username in title
    navigation.setOptions({ title: name });
      // query firestore database and create messages
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      // clean up to avoid memory leaks
      if (unsubMessages) unsubMessages();
    }
   }, []);

  return (
    // chat screen
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
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