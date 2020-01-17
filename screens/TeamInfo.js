import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native'
import axios from 'axios'
import Team_Info from '../components/Team_Info'
import Fixtures from '../components/Fixtures'
import { TabView, TabBar } from 'react-native-tab-view'
import Players from '../components/Players'
import { Tile, Header } from 'react-native-elements'

const initialLayout = { width : Dimensions.get('window').width}
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class TeamInfo extends Component {
    static navigationOptions = ({navigation}) => {
      return {
        title : navigation.getParam('title')
      }
    }
    constructor(props){
        super(props)
        this.state = {
            team : null,
            fixtures : null,
            players : null,
            index : 0
        }
    }

    componentDidMount = async () => {
        const id = this.props.navigation.getParam('id')
        const league = this.props.navigation.getParam('league');
        await this.getTeamData(id)
        await this.getTeamFixtures(id,league)
        await this.getTeamPlayer(id)
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


     routes = [
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
                        case 'fixtures' : 
                        return <View style={{flex : 1}}>
                        {this.state.fixtures ?
                        <Fixtures fixtures = {this.state.fixtures.api.fixtures} navigation={this.props.navigation}/>
                        : <Text>Loading</Text>}
                    </View>
                        case 'squad' : 
                        return <View style={{flex : 1}}>
                            {this.state.players ? <Players players={this.state.players.api.players} navigation={this.props.navigation}/>
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