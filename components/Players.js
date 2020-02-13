import React, { Component } from 'react';
import {View, Text, FlatList,TouchableOpacity} from 'react-native'
import {Avatar, Tile, ListItem} from 'react-native-elements'

const Players = ({players,logo,navigation}) => {
    return (
        <View style={{flex : 1}}> 
            <FlatList 
                    data = {players}
                    renderItem = {({item}) => 
                        <View style={{flex : 1}}>
                            <TouchableOpacity onPress={()=> navigation.navigate('PlayerInfo',{id : item.player_id,item : item, logo : logo})}>
                            <View style={{flex : 1}}>
                                <ListItem
                                    key = {item.player_id}
                                    title = {item.player_name}
                                    subtitle = {
                                        <View style={{flexDirection : 'row'}}>
                                            <Text>{item.position} </Text>
                                            <Text>{item.birth_date} </Text>
                                            <Text>{item.nationality} </Text>
                                            <Text>{item.height} </Text>
                                            <Text>{item.weight} </Text>
                                        </View>
                                    }
                                />
                            </View>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.player_id)}
                />    
        </View>
    )
}

export default Players;