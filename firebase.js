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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export async function signInWithFacebook() {
  const appId = "1077913022392519";
  const permissions = ['public_profile', 'email'];  // Permissions required, consult Facebook docs
  
  await Facebook.initializeAsync(
    '1077913022392519',
 );

 const { type, token } = await Facebook.logInWithReadPermissionsAsync(
   { permissions: ['public_profile'] }
 );

 if (type === 'success') {
   // Build Firebase credential with the Facebook access token.
   const credential = firebase.auth.FacebookAuthProvider.credential(token);

   // Sign in with credential from the Facebook user.
   firebase.auth().signInWithCredential(credential).catch((error) => {
     // Handle Errors here.
   });
 }
}

export async function favTeam(uid, team, league){
  const teami = team.api.teams[0]
  firebase.database().ref('users/' + uid + '/favTeam/' + teami.team_id).set({
    team_name : teami.name,
    team_id : teami.team_id,
    logo : teami.logo,
    league : league
    
  })
}

export async function favTeamDelete(uid,teamid){
  firebase.database().ref('users/'+ uid + '/favTeam/'+teamid).remove()
}

export async function favFix(uid, fixtures){
  firebase.database().ref('users/'+ uid + '/favFix/'+ fixtures.fixture_id).set({
    fixtures
  })
}

export async function favFixDelete(uid,fixid){
  firebase.database().ref('users/'+uid +'/favFix/'+ fixid).remove()
}



export default firebase