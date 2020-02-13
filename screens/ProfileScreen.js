import React,{Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View , Text, Button} from 'react-native';
import * as firebase from 'firebase'
import {signInWithFacebook} from '../firebase'
import { Avatar, Header } from 'react-native-elements'

export default class ProfileScreen extends Component {
  static navigationOptions = {
    header : null
  }
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
      <View style={{flex : 1}}>
        <Header
          centerComponent={{ text : 'User' , style : {fontSize : 18, fontWeight : 'bold'}}}
          containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
        />
        {
            user ? 
            <View>
              <View style={{flexDirection : 'row', margin : 10}}>
                <Avatar
                  source = {{ uri : user.photoURL}}
                  size = {80}
                  rounded
                />
                <View style={{ justifyContent : 'center', marginHorizontal : 10}}>
                  <Text>{user.displayName}</Text>
                  <Text>{user.uid}</Text>
                </View>
              </View>
            <Button
              title="Logout"
              onPress={() => this.signOut()}
            />
           
            <View>
            <Button 
              title="Favorite Team"
              onPress={() => this.props.navigation.navigate('FavTeam')}
            />
            <Button 
              title="Favorite Fixtures"
              onPress={() => this.props.navigation.navigate('FavFixture')}
            />
            </View>
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