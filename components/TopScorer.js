import React, { Component } from 'react';
import {View, Text, FlatList} from 'react-native'
import {Avatar, Tile,ListItem} from 'react-native-elements'
import axios from 'axios'

function TopScorer (topscorers) {
    return (
        <View style={{flex : 1}}>
            <FlatList 
                    data = {topscorers.topscorers}
                    renderItem = {({item}) => 
                        <View style={{flex : 1}}>
                            <View style={{flex : 1}}>
                            <ListItem
                                    key={item.player_id}
                                    title ={item.player_name}
                                    subtitle={
                                        <View style={{ flexDirection : 'row'}}>
                                            <Text>{item.nationality} </Text>
                                            <Text>{item.games.appearences}경기 </Text>
                                            <Text>{item.goals.total}골 </Text>
                                            <Text>{item.goals.assists}어시스트 </Text>
                                        </View>
                                    }
                                    bottomDiveder
                                />
                                
                            </View>
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.player_id)}
                />
        </View>
    )
}

export default TopScorer;