import firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyC4U75yRSk7tRVmfPuLubHvYQa4KFR5VUM",
    authDomain: "rain-reporter.firebaseapp.com",
    databaseURL: "https://rain-reporter.firebaseio.com/",
    projectId: "rain-reporter",
    storageBucket: "",
    messagingSenderId: "884193376241",
    appId: "1:884193376241:web:60fb46b2f2d5262a"
  };

const Firebase = firebase.initializeApp(Config);

export default Firebase;