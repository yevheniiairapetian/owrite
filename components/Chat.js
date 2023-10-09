import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect, useState } from 'react';

const Chat = ({ route, navigation }) => {
  //here user name and chat screen background color are changed
  const { name, backgroundColor } = route.params;

  // here messages state is changed
  const [messages, setMessages] = useState([]);

  //appends new messages to the array of old ones
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
    setMessages([
      {
        // message itself
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          // user itself
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        // system message
        _id: 2,
        text: 'You have entered the chat room',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //here user name is set to be displayed in the chat screen
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);
  return (
    // chat screen
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        accessibilityLabel="input"
        accessible={true}
        accessibilityHint="Allows you to send a new message."
        user={{
          _id: 1
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