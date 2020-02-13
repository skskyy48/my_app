import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native'
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
                                        <Text style={styles.subtitle}>{item.season} </Text>
                                        <Text style={styles.subtitle}>{item.country} </Text>
                                        <Text style={styles.subtitle}>{item.place} </Text>
                                    </View>
                                }
                                titleStyle = {styles.title}
                                containerStyle ={{paddingLeft : 1,paddingTop : 3, paddingBottom : 3}}
                     />
                        </View>
                    }
                    keyExtractor = {item => JSON.stringify(item.season + item.league)}
                />                
            </View>
        );
    }

const styles = StyleSheet.create({
    title : {
        fontSize : 15,
        fontWeight : 'bold'
    },
    subtitle : {
        fontSize : 12
    }
})
 

 export default PlayerTrophies