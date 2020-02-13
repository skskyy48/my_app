import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {Avatar, ListItem} from 'react-native-elements'

const LeagueTable = ({standings,league,navigation}) => {
    return (
        <View style={{flex : 1}}>
            <FlatList
                    data = {standings[0]}
                    renderItem = {({item}) => 
                        <View style={{flex : 1}}>
                            <TouchableOpacity style={{flex : 1, marginLeft : 30, marginRight : 30}}
                                onPress={()=> navigation.navigate('TeamInfo',{id : item.team_id, league : league, title : item.teamName})}
                            >
                            <View style={{flex : 1}}>
                                <ListItem
                                    key={item.team_id}
                                    leftAvatar={{ source : { uri : item.logo}}}
                                    title ={item.teamName}
                                    subtitle={
                                        <View style={{flexDirection : 'row'}}>
                                            <Text style={styles.subtitle}>{item.all.matchsPlayed}경기 </Text>
                                            <Text style={styles.subtitle}>승점 {item.points}    </Text>
                                            <Text style={styles.subtitle}>{item.all.win}승 </Text>
                                            <Text style={styles.subtitle}>{item.all.draw}무 </Text>
                                            <Text style={styles.subtitle}>{item.all.lose}패 </Text>
                                        </View>
                                    }
                                    leftElement = {
                                    <Text>{item.rank}</Text>
                                    }
                                    bottomDiveder
                                    titleStyle = {styles.title}
                                    containerStyle ={{paddingLeft : 3,paddingTop : 10, paddingBottom : 10}}
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

const styles = StyleSheet.create({
    subtitle : {
        fontSize : 12
    },
    title : {
        fontSize : 15,
        fontWeight : 'bold'
    }
})

export default LeagueTable;