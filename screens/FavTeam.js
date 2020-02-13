import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'
import * as firebase from 'firebase'
import { ListItem, Header} from 'react-native-elements'
import { withNavigation} from 'react-navigation'

class FavTeam extends Component {
    static navigationOptions = {
        header : null
      }
    constructor(props) {
        super(props)
        this.state = {
            favTeam : []
        }
    }

componentDidMount(){
    const uid = firebase.auth().currentUser.uid
    this.favTeamLoad(uid)
}

 favTeamLoad(uid){
    firebase.database().ref('users/'+ uid + '/favTeam').once('value').then((snapshot) => {
        var items = [];
            snapshot.forEach((child) => {
            items.push({
                team_name : child.val().team_name,
                team_id : child.val().team_id,
                logo : child.val().logo,
                league : child.val().league
                })
        })
        this.setState({ favTeam : items})

    })
  }

    render() {
        return (
            <View style={{flex : 1}}>
                 <Header
                    centerComponent={{ text : 'Favorite Team' , style : {fontSize : 18, fontWeight : 'bold'}}}
                    containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
                    />
                <View style={{ width : '100%', heigh : 20, backgroundColor : 'blue'}}>
                    <Text style={{color : 'white', marginLeft : 5, fontSize : 15}}>Favorite Team</Text>
                </View>
                {this.state.favTeam ? 
                <View>
                
                <FlatList 
                    data = {this.state.favTeam}
                    renderItem = {({item}) => 
                              <ListItem
                                    key = {item.team_id}
                                    leftAvatar ={{source : {uri : item.logo}}}
                                    title = {item.team_name}
                                    bottomDivider
                                    onPress={() => this.props.navigation.navigate('TeamInfo',{id : item.team_id, league : item.league, title : item.team_name})}
                                />
                    }
                    keyExtractor = {item => JSON.stringify(item.team_id)}
                />  
                </View>
                : <Text>Loading</Text>}
            </View>
        );
    }
}

export default withNavigation(FavTeam);