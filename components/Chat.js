import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({route, navigation}) => {
  //here user name and chat screen background color are changed
    const { name, backgroundColor } = route.params;
    useEffect(() => {
        navigation.setOptions({ title: name});
      }, []);
 return (
  // chat screen
   <View style={[styles.container, { backgroundColor: backgroundColor }]} >
     <Text>Chat</Text>
   </View>
 );
}

// styles for chat screen
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;