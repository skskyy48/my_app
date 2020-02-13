import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native'
import axios from 'axios'
import Fixtures from '../components/Fixtures'
import { TabView, TabBar } from 'react-native-tab-view'
import Players from '../components/Players'
import { Tile, Header } from 'react-native-elements'
import Team_Info from '../components/Team_Info'
import { favTeam, favTeamDelete } from '../firebase'
import { AntDesign } from '@expo/vector-icons'
import * as firebase from 'firebase'

const initialLayout = { width : Dimensions.get('window').width}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class TeamInfo extends Component {
  static navigationOptions = {
    header : null
  }

    constructor(props){
        super(props)
        this.state = {
            team : null,
            fixtures : null,
            players : null,
            index : 0,
            check : false
        }
    }

    componentDidMount = () => {
        const id = this.props.navigation.getParam('id')
        const league = this.props.navigation.getParam('league');
        const uid = firebase.auth().currentUser.uid
        this.favTeamCheck(uid, id)
        this.setState({uid : uid, id : id})
        this.getTeamData(id)
        this.getTeamFixtures(id,league)
        this.getTeamPlayer(id)
    }

    favTeamCheck(uid, teamid){
      firebase.database().ref('users/'+ uid +'/favTeam').orderByChild('team_id').equalTo(teamid).once('value').then((snapshot) => {
        this.setState({ check : snapshot.exists()})
      })
    }


    getTeamData(id){
        axios({
            method:"GET",
            url:"https://api-football-v1.p.rapidapi.com/v2/teams/team/"+id,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"} 
            ,params : {
                timezone : "Asia/Seoul"
              } })
            .then(response=>{
              this.setState({team : response.data})
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    getTeamFixtures (id,league){
        axios({
            method:"GET",
            url:"https://api-football-v1.p.rapidapi.com/v2/fixtures/team/"+id+"/" + league,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"},
            params : {
                timezone : "Asia/Seoul"
              } 
            })
            .then(response=>{
              this.setState({fixtures : response.data})
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    getTeamPlayer(id){
        axios({
            method:"GET",
            url:"https://api-football-v1.p.rapidapi.com/v2/players/squad/"+id+"/2019-2020",
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"},
            params : {
                timezone : "Asia/Seoul"
              } 
            })
            .then(response=>{
              this.setState({players : response.data})
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    handleIndexChange = index => {
        this.setState({index : index})
    };

    scrapTeam = () => {
      this.setState({check : true})
      favTeam(this.state.uid, this.state.team, this.props.navigation.getParam('league'))
    }

    deleteTeam = () => {
      this.setState({check : false})
      favTeamDelete(this.state.uid, this.state.id)
    }


     routes = [
        {key : 'team', title : '팀 정보'},
        { key: 'fixtures', title: '경기 일정' },
        { key: 'squad', title: '선수단' },
    ];

    renderTabBar = props => (
      <TabBar
        {...props}
        style = {{ backgroundColor : 'blue', height : 40}}
        indicatorStyle = {{ backgroundColor : 'red'}}
        />
    )

    render() {
        return (
            <View style={{flex : 1}}>
              <Header
                centerComponent ={{ text : this.props.navigation.getParam('title'), style : {color : 'white', fontSize : 18, fontWeight : 'bold'} }}
                containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
                rightComponent = {
                this.state.check ?
                <AntDesign
                  name ="star"
                  onPress={() => this.deleteTeam()}
                  size = {20}
                  color="yellow"
                /> : 
                <AntDesign
                  name ="staro"
                  onPress={()=> this.scrapTeam()}
                  size = {20}
                />
              }
              />
                <View style = {{flex : 1}}>
                {this.state.team ? 
                    <Image
                        style={{width : width, height : height * 0.16}}
                        source = {{ uri : this.state.team.api.teams[0].logo}}
                        resizeMode = 'contain'
                    />
                    : <Text>Loading</Text>}
                </View>
                <View style = {{ flex : 4}}>
                <TabView
                renderTabBar={this.renderTabBar}
                navigationState={{ index : this.state.index, routes : this.routes }}
                renderScene={({ route }) => {
                    switch (route.key) {
                        case 'team' : 
                        return <View style={{flex : 1}}>
                        {this.state.team ? 
                        <Team_Info team={this.state.team.api.teams[0]}/>
                        : <Text>Loading</Text>}
                        </View>
                        case 'fixtures' : 
                        return <View style={{flex : 1}}>
                        {this.state.fixtures ?
                        <Fixtures fixtures = {this.state.fixtures.api.fixtures} navigation={this.props.navigation}/>
                        : <Text>Loading</Text>}
                    </View>
                        case 'squad' : 
                        return <View style={{flex : 1}}>
                            {this.state.players && this.state.team ? <Players players={this.state.players.api.players} logo={this.state.team.api.teams[0].logo} navigation={this.props.navigation}/>
                            : <Text>Loading</Text>}
                        </View>
                    }
                }}
                onIndexChange={this.handleIndexChange}
                initialLayout={initialLayout}
              />
              </View>
            </View>
        );
    }
}

export default TeamInfo;