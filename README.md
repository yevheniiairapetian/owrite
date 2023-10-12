# owrite

## Description:
This repo contains a chat app called OWrite for mobile devices developed using React Native. The app provides the users with a chat interface and options to:
- send messages
- choose a chat room background color
- set a name for the user for the chat room
- share images from the device's storage
- take a picture and share it with others
- share the location
- make an audio recording, send it and play it

![Screenshot of a chat app](../test-project/assets/2023-10-12_22h15_08.png?raw=true "Main Screen Screenshot")
![Screenshot of a chat app](../test-project/assets/2023-10-12_22h07_10.png?raw=true "Chat Screen Screenshot")

## Key Features
- A screen where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and a submit button.
- The chat that provides users with additional communication features: sending images, taking photos and sending them, make audio recordings/play audio recordings, share user's geolocation information
- Data gets stored online and offline and users can access messages when offline.

## Technologies Used:
- React Native
- Responsive design
  

## Project Dependencies:
- React Native
- Expo
- Gifted Chat
- Firebase Firestore
- React Native Maps
- _Please see package.json for other project dependecies_


## Clone and Preview:
To clone the repo use the following command:
```console git clone git@github.com:yevheniiairapetian/owrite.git```
Or download directly by clicking on <> Code button > Download ZIP. To run the app on a physical device:
- Run ```npm install - expo-cli``` globally
- Install/open the Expo Go app
- Create an account/login to Expo app
- navigate to the project directory in the terminal: ```cd owrite```
- Install the required dependencies: ```npm install```
- Run the App: ```expo start```
- Scan the QR Code with the app on Android device/ with the Camera app on iOS device
  

## Running on an Emulator
To run the app on an emulator/simulator, install:
- Run ```npm install - expo-cli``` globally
- Anroid Studio to test for Android
- X Code to test for iOS
- Install/open the Expo Go app
- Create an account/login to Expo app
- navigate to the project directory in the terminal: ```cd owrite```
- Install the required dependencies: ```npm install```
- Run the App: ```expo start```
- Choose _run on emulator_

## Database Setup
To set up the database for the project:

- Create an account/sign in at https://firebase.google.com/
- install firebase in your project directory: ```npm install firebase```
- import the firebase configuration settings from the project settings tab in the firebase console into your App.js file
- in the firebase database rules, adjust ```allow read, write: if false;``` to ```allow read, write: if true;```
- publish

## Contact:
Feel free to contact me via[ LinkedIn](https://www.linkedin.com/in/yevhenii-airapetian/) or  
[email](mailto:sonkozhenia11@gmail.com) or 
via the contact information on the [website](https://yevheniiairapetian.github.io/portfolio-website/contact.html) 
