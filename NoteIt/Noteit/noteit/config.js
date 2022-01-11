import firebase from 'firebase';
 var firebaseConfig = {
    apiKey: "AIzaSyARVa5GVUShiAZQZ32-DQepTsTVN88_fmc",
    authDomain: "todo-app-49733.firebaseapp.com",
    databaseURL: "https://todo-app-49733.firebaseio.com",
    projectId: "todo-app-49733",
    storageBucket: "todo-app-49733.appspot.com",
    messagingSenderId: "484913575548",
    appId: "1:484913575548:web:9541a0a26b862223bb3bf9"
  };
firebase.initializeApp(firebaseConfig);
export default firebase.database();
