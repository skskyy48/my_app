import React, { Component } from 'react';
import {View, Text, FlatList} from 'react-native'
import { ListItem } from 'react-native-elements'

const PlayerTrophies = ({trophies}) => {
    return(
            <View>
                <Text>수상 내역</Text>
                <FlatList 
                    data = {trophies}
                    renderItem = {({item}) => 
                        <View style={{flex : 1}}>
                            <ListItem
                                title={item.league}
                                subtitle = {
                                    <View style={{flexDirection : 'row'}}>
                                        <Text>{item.season} </Text>
                                        <Text>{item.country} </Text>
                                        <Text>{item.place} </Text>
                                    </View>
                                }
                            />
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.season + item.league)}
                />                
            </View>
        );
    }
 

 export default PlayerTrophies