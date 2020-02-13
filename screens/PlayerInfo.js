import React, { Component } from 'react';
import {View, Text,ScrollView} from 'react-native'
import PlayerTrophies from '../components/PlayerTrophies'
import { Avatar } from 'react-native-elements'
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
        const  logo  = this.props.navigation.getParam('logo');
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex : 1, marginHorizontal : 30}}>
                  <View style={{flexDirection : 'row',margin : 5, alignItems : 'center'}}>
                    <Avatar
                      rounded
                      source={{uri : logo}}
                      size ={50}
                      containerStyle={{marginRight : 5}}
                      reszieMode = 'contain'
                    />
                    <View>
                      <Text>{item.player_name} </Text>
                        <View style={{flexDirection : 'row'}}>
                          <Text>{item.nationality} </Text>
                          <Text>{item.birth_date} </Text>
                        </View>
                        <View style={{flexDirection : 'row'}}>
                          <Text>{item.position} </Text>
                          <Text>{item.height} </Text>
                          <Text>{item.weight} </Text>
                        </View>
                    </View>
                  </View>
                  {
                    this.state.statistic ?
                    <View style={{margin : 5}}>
                      <Text>2019-2020시즌 기록</Text>

                      <Text>경기수 : {statistic.api.players[0].games.appearences}</Text>
                      <Text>슈팅 : {statistic.api.players[0].shots.total}</Text>
                      <Text>유효 슈팅 : {statistic.api.players[0].shots.on}</Text>
                      <Text>골 : {statistic.api.players[0].goals.total}</Text>
                      <Text>도움 : {statistic.api.players[0].goals.assists}</Text>
                      <Text>패스 횟수 : {statistic.api.players[0].passes.total}</Text>
                      <Text>키 패스 : {statistic.api.players[0].passes.key}</Text>
                      <Text>패스 정확도 : {statistic.api.players[0].passes.accuracy}%</Text>
                      <Text>경고 : {statistic.api.players[0].cards.yellow}</Text>
                      <Text>퇴장 : {statistic.api.players[0].cards.red}</Text>
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