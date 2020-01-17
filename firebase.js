import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook'

const firebaseConfig = {
    apiKey: "AIzaSyA3S-cQkQtJ69AYc7ltg9QK1wu9U9Lbx2I",
    authDomain: "soccerya-31461.firebaseapp.com",
    databaseURL: "https://soccerya-31461.firebaseio.com",
    projectId: "soccerya-31461",
    storageBucket: "soccerya-31461.appspot.com",
    messagingSenderId: "1009831711257",
    appId: "1:1009831711257:web:41871c1d5d6ae3ec"
}

firebase.initializeApp(firebaseConfig)

export async function signInWithFacebook() {
    const appId = "1077913022392519";
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        appId,
        { permissions: ['public_profile'] },
      );
  
      if (type === 'success' && token) {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
  
        // Sign in with credential from the Facebook user.
        await firebase
          .auth()
          .signInWithCredential(credential);
      }
  }

export function articleScrap(article){
  const uid = firebase.auth().currentUser.uid

  firebase.database().ref('users/' + uid).push({
    article
  })

}

export default firebase