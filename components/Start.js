import { useState } from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, ImageBackground, View, Text, TextInput } from 'react-native';

// start screen functional component
const Start = ({ navigation }) => {
  // authentication for firebase
  const auth = getAuth();
  // anonymous authentication
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { userID: result.user.uid, name: name, backgroundColor: bgColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }
  const [name, setName] = useState('');
  //state for changing th users name
  const [bgColor, setbgColor] = useState('');
  //state for changing the bg color of chat screen
  return (
    <ImageBackground source={require('../assets/BackgroundImage.png')} resizeMode="cover" style={styles.image}>
      {/* background image of start screen */}
      <View style={styles.container}>
        {/* container of whole start screen */}
        <View style={[styles.sectionsRow, styles.headingSection]}>
          {/* container of heading section */}
          <Text style={styles.heading}>OWrite</Text>
        </View>
        {/* container of chat sections */}
        <View style={styles.chatWrapper}>
          {/* text input for users name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
            // accessibility props
            accessibilityLabel="input"
            accessible={true}
            accessibilityHint="Allows you to enter your name."
          />
          <Text style={styles.colorsHeading}>Choose Background Color</Text>
          {/* text section for choosing bg colors */}
          <View style={styles.sectionsRow}>
            {/* start bg color 1 button */}
            <TouchableOpacity
              style={[styles.chatBg, styles.chatBg1]}
              bgColor={'#090C08'}
              onPress={() => setbgColor('#090C08')}
              // accessibility props
              accessible={true}
              accessibilityLabel="Tap me!"
              accessibilityHint="Changes the background color of the chat room's screen to black color."
              accessibilityRole="button"
            >
            </TouchableOpacity>
            {/* end bg color 1 button */}
            {/* start bg color 2 button */}
            <TouchableOpacity
              style={[styles.chatBg, styles.chatBg2]}
              bgColor={'#474056'}
              onPress={() => setbgColor('#474056')}
              // accessibility props
              accessible={true}
              accessibilityLabel="Tap me!"
              accessibilityHint="Changes the background color of the chat room's screen to purple color."
              accessibilityRole="button"
            >
            </TouchableOpacity>
            {/* end bg color 2 button */}
            {/* start bg color 3 button */}
            <TouchableOpacity
              style={[styles.chatBg, styles.chatBg3]}
              bgColor={'#707070'}
              onPress={() => setbgColor('#707070')}
              // accessibility props
              accessibilityLabel="Tap me!"
              accessibilityHint="Changes the background color of the chat room's screen to grey color."
              accessibilityRole="button"
            >
            </TouchableOpacity>
            {/* end bg color 3 button */}
            {/* start bg color 4 button */}
            <TouchableOpacity
              style={[styles.chatBg, styles.chatBg4]}
              bgColor={'#cb4343'}
              onPress={() => setbgColor('#cb4343')}
              // accessibility props
              accessible={true}
              accessibilityLabel="Tap me!"
              accessibilityHint="Changes the background color of the chat room's screen to red-pinkish color."
              accessibilityRole="button"
            >
            </TouchableOpacity>
            {/* end bg olor 4 button */}
          </View>
          {/* end for bg colors buttons section */}
          {/* start chat button */}
          <TouchableOpacity
            style={styles.chatButton}
            // sing in user anonymously on button press
            onPress={signInUser}
            // accessibility props
            accessible={true}
            accessibilityLabel="Tap me!"
            accessibilityHint="Navigates to the chat room screen."
            accessibilityRole="button"
            accessibilityLanguage="en-US"
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
          {/* end chat button */}
        </View>
        {/* end chat sections container */}
        {/* this is a fix for displaying the text input field on Android devices as it should be  */}
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
      </View>
      {/* end container  */}
    </ImageBackground>
    // end background image of start screen
  );
}
// styles for start screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  colorsHeading: {
    color: '#757083',
    opacity: 1,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '300',
    fontSize: 16,
  },
  chatWrapper: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    width: '88%',
    height: '200',
  },
  heading: {
    fontSize: 45,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionsRow: {
    flexDirection: 'row',
  },
  chatButton: {
    width: 298,
    height: 50,
    color: '#FFFFFF',
    backgroundColor: '#757083',
    paddingTop: 15,
    marginTop: 40,
    fontSize: 16,
    fontWeight: '600',
  },
  chatButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  chatBg: {
    marginRight: 25,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  // first chat bg button color
  chatBg1: {
    backgroundColor: '#090C08',
  },
  // second chat bg button color
  chatBg2: {
    backgroundColor: '#474056',
  },
  // third chat bg button color
  chatBg3: {
    backgroundColor: '#707070',
  },
  // fourth chat bg button color
  chatBg4: {
    backgroundColor: '#cb4343',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: '#474056',
    width: 298,
    fontSize: 16,
    fontWeight: '300',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  }
});

export default Start;