import React from 'react'
import {View, Text, Image, Dimensions,ScrollView} from 'react-native'
import Lineups from './Lineups'
import {TabView, SceneMap} from 'react-native-tab-view'

const initialLayout = {
    width: Dimensions
        .get('window')
        .width
};

const Fixture = ({fixture}) => {
    const fixtureInfo = fixture[0]

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: fixtureInfo.homeTeam.team_name,
            title: fixtureInfo.homeTeam.team_name
        }, {
            key: fixtureInfo.awayTeam.team_name,
            title: fixtureInfo.awayTeam.team_name
        }
      ]);

    return (
        <View style={{
                flex: 1
            }}>
            <ScrollView style={{flex : 1}}>
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
                        uri: fixtureInfo.league.logo
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
                <View style={{ flex : 3 ,flexDirection : "row", justifyContent : 'space-between'}}>
                    <View style = {{alignItems : "center",justifyContent : 'center',flex : 2}}>
                        <Text style={{ fontWeight : 'bold'}}>Home</Text>
                            <Text>{fixtureInfo.homeTeam.team_name}</Text>
                            <Image
                                style={{
                                    width: 80,
                                    height: 50
                                }}
                                source={{
                                    uri: fixtureInfo.homeTeam.logo
                                }}
                                resizeMode="contain"/>
                    </View>
                    <View style={{alignItems : 'center', justifyContent : 'center', flex : 1}}>
                            <Text style={{fontSize : 18, fontWeight : 'bold'}}>{fixtureInfo.goalsHomeTeam} : {fixtureInfo.goalsAwayTeam}</Text>
                    </View>
                    <View style={{alignItems : "center",justifyContent : 'center', flex : 2}}>
                    <Text style={{ fontWeight : 'bold'}}>Away</Text>
                        <Text>{fixtureInfo.awayTeam.team_name}</Text>
                        <Image
                        style={{
                            width: 80,
                            height: 50
                        }}
                        source={{
                            uri: fixtureInfo.awayTeam.logo
                        }}
                        resizeMode="contain"/>
                    </View>
                </View>
                {/*
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection : 'row'
                    }}>
                    <View>
                    <Text>Home</Text>
                    <Image
                        style={{
                            width: 80,
                            height: 50
                        }}
                        source={{
                            uri: fixtureInfo.homeTeam.logo
                        }}
                        resizeMode="contain"/>
                    <Text>{fixtureInfo.homeTeam.team_name}</Text>
                    </View>
                    <Text>{fixtureInfo.goalsHomeTeam}</Text>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection : 'row'
                    }}>
                    <Text>{fixtureInfo.goalsAwayTeam}</Text>
                    <View>
                    <Text>Away</Text>
                    <Image
                        style={{
                            width: 80,
                            height: 50
                        }}
                        source={{
                            uri: fixtureInfo.awayTeam.logo
                        }}
                        resizeMode="contain"/>
                    <Text>{fixtureInfo.awayTeam.team_name}</Text>
                    </View>
                </View>
                            */}

            </View>
            <View style={{flex:3 ,flexDirection : 'row',justifyContent : 'center',marginHorizontal : 15}}>
                <View style={{ flex : 2}}>
                    <Text>슈팅 개수 </Text>
                    <Text>유효 슈팅 </Text>
                    <Text>파울 </Text>
                    <Text>코너킥 </Text>
                    <Text>오프사이드 </Text>
                    <Text>점유율 </Text>
                    <Text>세이브 </Text>
                    <Text>경고 </Text>
                    <Text>퇴장 </Text>
                </View>
                <View style={{ flex : 2}}>
                    <Text>{fixtureInfo.statistics["Total Shots"].home}</Text>
                    <Text>{fixtureInfo.statistics["Shots on Goal"].home}</Text>
                    <Text>{fixtureInfo.statistics["Fouls"].home}</Text>
                    <Text>{fixtureInfo.statistics["Corner Kicks"].home}</Text>
                    <Text>{fixtureInfo.statistics["Offsides"].home}</Text>
                    <Text>{fixtureInfo.statistics["Ball Possession"].home}</Text>
                    <Text>{fixtureInfo.statistics["Goalkeeper Saves"].home}</Text>
                    <Text>{fixtureInfo.statistics["Yellow Cards"].home}</Text>
                    <Text>{fixtureInfo.statistics["Red Cards"].home}</Text>
                </View>
                <View style={{ flex : 2}}>
                    <Text>{fixtureInfo.statistics["Total Shots"].away}</Text>
                    <Text>{fixtureInfo.statistics["Shots on Goal"].away}</Text>
                    <Text>{fixtureInfo.statistics["Fouls"].away}</Text>
                    <Text>{fixtureInfo.statistics["Corner Kicks"].away}</Text>
                    <Text>{fixtureInfo.statistics["Offsides"].away}</Text>
                    <Text>{fixtureInfo.statistics["Ball Possession"].away}</Text>
                    <Text>{fixtureInfo.statistics["Goalkeeper Saves"].away}</Text>
                    <Text>{fixtureInfo.statistics["Yellow Cards"].away}</Text>
                    <Text>{fixtureInfo.statistics["Red Cards"].away}</Text>
                </View>
            </View>
            <View>
                <Text>경기 기록</Text>
                {fixtureInfo.events.map((data,i) => {
                    return (
                        <View key={i} style={{flexDirection : 'row'}}>
                            <Text>{data.elapsed} 분 </Text>
                            <Text>{data.teamName} </Text>
                            <Text>{data.player} </Text>
                            <Text>{data.type} </Text>
                            <Text>{data.detail} </Text>
                        </View>
                    )
                })}
            </View>
            <View style={{
                    flex: 5
                }}>
                <TabView
                    navigationState={{
                        index,
                        routes
                    }}
                    renderScene={({route}) => {
                        switch (route.key) {
                            case fixtureInfo.homeTeam.team_name:
                                return <View
                                    style={{
                                        flex: 1
                                    }}>
                                    <Lineups lineups={fixtureInfo.lineups[fixtureInfo.homeTeam.team_name]}/>
                                </View>
                            case fixtureInfo.awayTeam.team_name:
                                return <View
                                    style={{
                                        flex: 1
                                    }}>
                                    <Lineups lineups={fixtureInfo.lineups[fixtureInfo.awayTeam.team_name]}/>
                                </View>
                        }
                    }}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}/>
            </View>
            </ScrollView>
        </View>
    )
}

export default Fixture