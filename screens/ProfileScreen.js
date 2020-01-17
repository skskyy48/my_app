import React,{Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View , Text, Button} from 'react-native';
import * as firebase from 'firebase'
import {signInWithFacebook} from '../firebase'
export default class ProfileScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      user? this.setState({user : user}) : this.setState({user : false})
  })
  }

  signOut() {
    firebase.auth().signOut().then(() => {
        this.setState({user : null})
    })
  }
  
  render(){
    const { user } = this.state
    return(
      <View>
        <Text>ProfileScreen</Text>
        {
            user ? 
            <View>
            <Text>{JSON.stringify(this. state.user)}</Text>
            <Button
              title="Logout"
              onPress={() => this.signOut()}
            />
            </View>
             : 
            <Button
              title="LoginwithFacebook"
              onPress={() => signInWithFacebook()}
            />
        }
        
      </View>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
