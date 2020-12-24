import firebase from 'firebase';
 
const config = {
  apiKey: "AIzaSyBtOMeTjWT7Z2LpY_IQoHENY1l8hh6m6hQ",
  databaseURL: "https://similarweb-d707d-default-rtdb.firebaseio.com/",
  projectId: "similarweb-d707d",
};
 
firebase.initializeApp(config);
export const db = firebase.database();