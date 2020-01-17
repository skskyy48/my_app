import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import {Avatar, ListItem} from 'react-native-elements'

const LeagueTable = ({standings,league,navigation}) => {
    return (
        <View style={{flex : 1}}>
            <FlatList
                    data = {standings[0]}
                    renderItem = {({item}) => 
                        <View style={{flex : 1}}>
                            <TouchableOpacity style={{flex : 1}}
                                onPress={()=> navigation.navigate('TeamInfo',{id : item.team_id, league : league, title : item.teamName})}
                            >
                            <View style={{flex : 1}}>
                                <ListItem
                                    key={item.team_id}
                                    leftAvatar={{ source : { uri : item.logo}}}
                                    title ={item.teamName}
                                    subtitle={
                                        <View style={{flexDirection : 'row'}}>
                                            <Text>{item.all.matchsPlayed}경기 </Text>
                                            <Text>승점 {item.points}    </Text>
                                            <Text>{item.all.win}승 </Text>
                                            <Text>{item.all.draw}무 </Text>
                                            <Text>{item.all.lose}패 </Text>
                                        </View>
                                    }
                                    leftElement = {
                                    <Text>{item.rank}</Text>
                                    }
                                    bottomDiveder
                                />
                            </View>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.team_id)}
                />
        </View>
    )
}

export default LeagueTable;