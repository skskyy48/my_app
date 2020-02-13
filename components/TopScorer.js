import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {Avatar, Tile,ListItem} from 'react-native-elements'
import axios from 'axios'

function TopScorer (topscorers) {
    return (
        <View style={{flex : 1}}>
            <FlatList 
                    data = {topscorers.topscorers}
                    renderItem = {({item,index}) => 
                        <View style={{flex : 1}}>
                            <View style={{flex : 1, mariginRight : 30, marginLeft : 30}}>
                            <ListItem
                                    key={item.player_id}
                                    title ={item.player_name}
                                    subtitle={
                                        <View>
                                        <Text style={styles.subtitle}>{item.team_name} </Text>
                                            <View style={{ flexDirection : 'row'}}>
                                                <Text style={styles.subtitle}>{item.games.appearences} 경기 </Text>
                                                <Text style={styles.subtitle}>{item.goals.total} 골 </Text>
                                                <Text style={styles.subtitle}>{item.goals.assists} 어시스트 </Text>
                                            </View>
                                        </View>
                                    }
                                    leftElement = {
                                        <Text>{index + 1}</Text>
                                    }
                                    bottomDiveder
                                    titleStyle = {styles.title}
                                    containerStyle ={{paddingLeft : 3,paddingTop : 10, paddingBottom : 10}}
                                    />
                                
                            </View>
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.player_id)}
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

export default TopScorer;