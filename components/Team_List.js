import React, { Component } from 'react';
import {View, Text, FlatList, ScrollView,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import { withNavigation} from 'react-navigation'


const Team_List = ({teams,league,navigation}) => {
    return(
            <View style = {{flex : 1}}>
                <FlatList 
                    data = {teams}
                    renderItem = {({item}) => 
                        <View style={{flex : 1, margin : 30}}>
                            <TouchableOpacity style={{flex : 1}} onPress={() => navigation.navigate('TeamInfo',{id : item.team_id, league : league, title : item.team_name})}>
                            <View style={{flex : 1}}>
                                <View style={{ flex : 1, flexDirection : "row"}}>
                                    <Avatar
                                        rounded
                                        source={{ uri : item.logo}}
                                    />
                                    <Text>{item.name}</Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.team_id)}
                />                
            </View>
        );
    }
 

 export default Team_List