import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Platform, ImageBackground, View, Text, TextInput } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// function for the button with options
const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {

    useEffect(() => {
        return () => {
            // this is to stop playing recording if the app is in the background
            if (recordingObject) recordingObject.stopAndUnloadAsync();
        }
    }, []);

    // sheet for button with options
    const actionSheet = useActionSheet();
    // recording variable
    let recordingObject = null;
    // allows to start recording
    const startRecording = async () => {
        try {
            let permissions = await Audio.requestPermissionsAsync();
            if (permissions?.granted) {
                // iOS specific config to allow recording on iPhone devices
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY).then(results => {
                    return results.recording;
                }).then(recording => {
                    recordingObject = recording;
                    Alert.alert('You are recording...', undefined, [
                        { text: 'Cancel', onPress: () => { stopRecording() } },
                        {
                            text: 'Stop and Send', onPress: () => {
                                sendRecordedSound()
                            }
                        },
                    ],
                        { cancelable: false }
                    );
                })
            }
        } catch (err) {
            Alert.alert('Failed to record!');
        }
    }
    // stop audio recording
    const stopRecording = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false
        });
        await recordingObject.stopAndUnloadAsync();
    }
    // send recording
    const sendRecordedSound = async () => {
        await stopRecording()
        const uniqueRefString =
            generateReference(recordingObject.getURI());
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(recordingObject.getURI());
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const soundURL = await getDownloadURL(snapshot.ref)
            onSend({ audio: soundURL })
        });
    }



    // this function will show additional features box
    const onActionPress = () => {
        // options for button near the text input box
        const options = ['Choose a Photo', 'Take a Photo', 'Share Location', 'Record a Sound', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        return;
                    case 3:
                        startRecording();
                        return;
                    default:
                }
            },
        );
    }
    // generates name for an image file
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    }
    // upload and send image
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const newUploadRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref)
            onSend({ image: imageURL })
        });
    }
    // pick image from storage
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }
    // allows to take a photo
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }
    // allows to get geolocation
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    }
    // button to show additional features (photos and location)
    return (
        <TouchableOpacity
            // accessibility properties
            accessible={true}
            accessibilityLabel="Tap me!"
            accessibilityHint="Allows to show a screen where you can an option to send a picture, take a picture, send your location, record a sound or cancel."
            accessibilityRole="button"
            style={styles.container} onPress={onActionPress} >
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;