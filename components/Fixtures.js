import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {Avatar} from 'react-native-elements'

const Fixtures = ({fixtures, navigation}) => {
    return (
        <View style={{
                flex: 1,
                justifyContent : 'center',
                alignItems : 'center'
            }}>
            {
                fixtures[0] ? 
                <FlatList
                    data={fixtures}
                    renderItem = 
                    {({item}) => 
                            <View style={{flex : 1, margin : 5}}>
                                    <TouchableOpacity style={{flex:1}} onPress={()=> navigation.navigate('FixtureInfo',{id : item.fixture_id , status : item.status, fixture : item})}>
                                    <View style={{flex : 1}}>
                                    <View style={{ flex : 1, flexDirection : "row"}}>
                                        <Image 
                                            style={{width : 100,height:65}}
                                            source={{ uri : item.league.logo}}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </View>
                                <Text>경기 일시 : { item.event_date }</Text>
                                <Text>경기 장소 : { item.venue }</Text>
                                <View style={{ flex : 3 ,flexDirection : "row", justifyContent : 'space-between'}}>
                                <View style = {{alignItems : "flex-start"}}>
                                    <Text>Home</Text>
                                    <Text>{item.homeTeam.team_name}</Text>
                                    <Avatar 
                                    rounded 
                                    source={{ uri : item.homeTeam.logo}}
                                    />
                                </View>
                                <View style={{alignItems : "flex-end"}}>
                                    <Text>Away</Text>
                                    <Text>{item.awayTeam.team_name}</Text>
                                    <Avatar 
                                    rounded 
                                    source={{ uri : item.awayTeam.logo}}
                                    />
                                </View>
                                <Text>{item.score.fulltime}</Text>
                                </View>
                                </TouchableOpacity>
                            </View>
                        }
                    keyExtractor = {item => JSON.stringify(item.fixture_id)}/>
                    : <Text>No fixtures</Text>
            }    
                    </View>
    );
}

export default Fixtures;