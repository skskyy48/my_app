import React, { Component } from 'react';
import {View, Text,ScrollView} from 'react-native'
import PlayerTrophies from '../components/PlayerTrophies'
const axios = require('axios');

class PlayerInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            player : null,
            trophies : null,
            statistic : null
        }
    }

    componentDidMount(){
        const id = this.props.navigation.getParam('id');
        this.getPlayerTrophies(id)
        this.getPlayerStatistic(id)
    }

    getPlayerTrophies(id){
        axios({
            method:"GET",
            url:"https://api-football-v1.p.rapidapi.com/v2/trophies/player/"+id,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
            "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"},
            params : {
              timezone : "Asia/Seoul"
            } 
            })
            .then(response=>{
              this.setState({trophies : response.data})
            })
            .catch((error)=>{
              console.log(error)
            })
    }

    getPlayerStatistic(id){
      axios({
          method:"GET",
          url:"https://api-football-v1.p.rapidapi.com/v2/players/player/"+id + '/2019-2020',
          headers:{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"},
          params : {
            timezone : "Asia/Seoul"
          } 
          })
          .then(response=>{
            this.setState({statistic : response.data})
          })
          .catch((error)=>{
            console.log(error)
          })
  }


    render() {
      const {statistic } = this.state
        const  item  = this.props.navigation.getParam('item');
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex : 1}}>
                  <Text>PlayerInfo</Text>
                  <Text>{item.player_name} </Text>
                  <Text>{item.position} </Text>
                  <Text>{item.birth_date} </Text>
                  <Text>{item.nationality} </Text>
                  <Text>{item.height} </Text>
                  <Text>{item.weight} </Text>
                  {
                    this.state.statistic ?
                    <View>
                      <Text>{JSON.stringify(statistic)}</Text>
                    </View>
                    : null
                  }
                  {this.state.trophies ?
                  <PlayerTrophies trophies={this.state.trophies.api.trophies}/>
                  : null}
                </ScrollView>
            </View>
        );
    }
}

export default PlayerInfo;