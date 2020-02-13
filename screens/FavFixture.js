import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'
import * as firebase from 'firebase'
import { ListItem, Header} from 'react-native-elements'
import { withNavigation} from 'react-navigation'
import Fixtures from '../components/Fixtures';

class FavFixture extends Component {
    static navigationOptions = {
        header : null
      }
    constructor(props) {
        super(props)
        this.state = {
            favFix : []
        }
    }

componentDidMount(){
    const uid = firebase.auth().currentUser.uid
    this.favFixLoad(uid)
}


 favFixLoad(uid){
    firebase.database().ref('users/'+ uid + '/favFix').once('value').then((snapshot) => {
        var items = [];
            snapshot.forEach((child) => {
            items.push({
                homeTeam : child.val().fixtures.homeTeam,
                awayTeam : child.val().fixtures.awayTeam,
                league : child.val().fixtures.league,
                league_id : child.val().fixtures.league_id,
                score : child.val().fixtures.score,
                venue : child.val().fixtures.venue,
                status : child.val().fixtures.status,
                event_date : child.val().fixtures.event_date,
                fixture_id : child.val().fixtures.fixture_id,
                goalsAwayTeam : child.val().fixtures.goalsAwayTeam,
                goalsHomeTeam : child.val().fixtures.goalsHomeTeam,
                })
        })
        this.setState({ favFix : items})

    })
  }

    render() {
        return (
            <View style={{flex : 1}}>
                 <Header
                    centerComponent={{ text : 'Favorite Fixture' , style : {fontSize : 18, fontWeight : 'bold'}}}
                    containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
                    />
                <View style={{ width : '100%', heigh : 20, backgroundColor : 'blue'}}>
                    <Text>FavFixture</Text>
                </View>
                {this.state.favFix ? <Fixtures fixtures={this.state.favFix} navigation={this.props.navigation}/>
                    : <Text>Loading</Text>}
            </View>
        );
    }
}

export default withNavigation(FavFixture);