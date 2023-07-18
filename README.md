# FilmExpo
In this project we are using the graphql query endpoint from the https://swapi-graphql.netlify.app/.netlify/functions/index to display a list to film in react native you can explore from here https://studio.apollographql.com/public/star-wars-swapi/variant/current/explorer

## Installtion

Initial to set up the application you do need to install [node](https://nodejs.org/en/download/) in your local system.

Navigate to the root repository.
To install the package run the following command
```bash
npm install 
```

Now you can start the project.

## Running
To start the application you should either in your mobile device with installed expo.
Or You can run the application in Emulator.
```bash
npm run start
```
This will start app. To run the application in your device download expo and scan the QR code visible to you. Then application will bundle up in your device or you start in the IOS simulator or Android Emulator in the PC.

You can build the apk which is bundled by follow steps.
## Step 1
Run following the command in the root directory. By this it will the bundler by which you need not need to have the metro server running to run the application.
This file will be produced in the Expo cloud for which you need to have the account in the Expo. Once it is build over there you can either publish in the playstore.
```bash
npm run expo-build:android
```
Currently this command set up to generate the Android build.

You can also build in local for which you need to have either linux system or Mac. 
Small tip: If you are using the windows system. You will be having the WSL. So from which you can be run and generate in your local as well. 

To Generate in the local you need to install the eas-cli globally or you can use the run this command
```bash
npm run expo-build-local:android
```
