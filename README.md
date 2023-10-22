# owrite

## Description:
This repository contains a chat app called OWrite for mobile devices developed using React Native. The app provides the users with a chat interface and options to:
- Send messages
- Choose a chat room background color (4 options)
- Set a username for the chat room
- Share images from the device's storage
- Take a picture and share it
- Share the location
- Make an audio recording, send it, and play it

## Key Features
- A screen where users can enter their name and choose a background color (4 options) for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and a submit button.
- The chat that provides users with additional communication features: sending images, taking photos and sending them, making audio recordings/playing audio recordings, sharing user's geolocation information
- Data gets stored online in the Google Firestore and offline in the AsyncStorage.
- If the user is offline, they cannot write new messages but can view the chat history
- The app was developed with accessibility measures

## Project Screenshot
<a href="https://ibb.co/QjpdrSY"><img src="https://i.ibb.co/vvVYZyL/2023-10-12-22h15-08.png" alt="2023-10-12-22h15-08" border="0"></a>   
## Project In Use Preview
_Please click on the video below to watch it_   

[![Watch the video](https://i.ibb.co/vvVYZyL/2023-10-12-22h15-08.png)](https://streamable.com/77jy2x)

## Technologies Used:
- React Native
- AsyncStorage
- Responsive design
- Google Firestore
- Android Studio
- Expo Go
- Expo CLI
  

## Project Dependencies:
- React Native for native app development
- Expo Go app for serving the app
- Expo CLI for the terminal commands
- AsyncStorage for offline data storage
- Gifted Chat for the chat functionality
- Firebase Firestore for storing user data
- React Native Maps for sharing geolocation
- _Please see package.json for other project dependencies_


## Clone and Preview:
To clone the repo use the following command:
```console git clone git@github.com:yevheniiairapetian/owrite.git```
Or download directly by clicking on <> Code button > Download ZIP.

 
## Running on a physical device
To run the app on a physical device:
- Run ```npm install - expo-cli``` globally
- Install/open the Expo Go app
- Create an account/log in to Expo app
- navigate to the project directory in the terminal: ```cd owrite```
- Install the required dependencies: ```npm install```
- Run the App: ```expo start```
- Scan the QR Code with the app on Android device/ with the Camera app on iOS device
  

## Running on an Emulator
To run the app on an emulator/simulator, install:
- Run ```npm install - expo-cli``` globally
- Android Studio to test for Android
- X Code to test for iOS
- Install/open the Expo Go app
- Create an account/log in to Expo app
- navigate to the project directory in the terminal: ```cd owrite```
- Install the required dependencies: ```npm install```
- Run the App: ```expo start```
- Choose _run on emulator_

## Database Setup
To set up the database for the project:
- Create an account/log in at https://firebase.google.com/
- Install Firebase in your project directory: ```npm install firebase```
- Import the Firebase configuration settings from the project settings tab in the Firebase console into your App.js file
- In the firebase database rules, adjust ```allow read, write: if false;``` to ```allow read, write: if true;```
- Publish

## Contact:
Feel free to contact me via[ LinkedIn](https://www.linkedin.com/in/yevhenii-airapetian/) or  
[email](mailto:sonkozhenia11@gmail.com) or 
via the contact information on the [website](https://yevheniiairapetian.github.io/portfolio-website/contact.html) 
