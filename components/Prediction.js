import React from 'react'
import {View, Text, Image, Dimensions} from 'react-native'

const Prediction = ({predictions,fixture}) => {
    const prediction = predictions[0]
    return (
        <View style={{
                flex: 1,
                alignItems : 'center',
                justifyContent : 'center'
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                <Image
                    style={{
                        width: 100,
                        height: 65
                    }}
                    source={{
                        uri: fixture.league.logo
                    }}
                    resizeMode="contain"/>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    margin: 50
                }}>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Text>Home</Text>
                    <Image
                        style={{
                            width: 80,
                            height: 50
                        }}
                        source={{
                            uri: fixture.homeTeam.logo
                        }}
                        resizeMode="contain"/>
                    <Text>{fixture.homeTeam.team_name}</Text>
                </View>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
                    <Text>Away</Text>
                    <Image
                        style={{
                            width: 80,
                            height: 50
                        }}
                        source={{
                            uri: fixture.awayTeam.logo
                        }}
                        resizeMode="contain"/>
                    <Text>{fixture.awayTeam.team_name}</Text>
                </View>
                
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                <Text>날짜 : {fixture.event_date}</Text>
                <Text>승률</Text>
                <Text> 홈 승리 : {prediction.winning_percent.home} 무 : {prediction.winning_percent.draws} 원정 승리 : {prediction.winning_percent.away}</Text>
                <Text>최근 5 경기 상대 전적</Text>
                <Text>{prediction.teams.home.team_name} : {prediction.teams.home.last_h2h.played.total}경기  {prediction.teams.home.last_h2h.wins.total}승 {prediction.teams.home.last_h2h.draws.total}무 {prediction.teams.home.last_h2h.loses.total}패</Text>
                <Text>{prediction.teams.away.team_name} : {prediction.teams.away.last_h2h.played.total}경기  {prediction.teams.away.last_h2h.wins.total}승 {prediction.teams.away.last_h2h.draws.total}무 {prediction.teams.away.last_h2h.loses.total}패</Text>
                </View>
        </View>
    )
}

export default Prediction