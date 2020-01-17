import React from 'react'
import {View, Text, Image, Dimensions} from 'react-native'
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
                <View
                    style={{
                        alignItems: 'center'
                    }}>
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
                    <Text>{fixtureInfo.goalsHomeTeam}</Text>
                </View>
                <View
                    style={{
                        alignItems: 'center'
                    }}>
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
                    <Text>{fixtureInfo.goalsAwayTeam}</Text>
                </View>

            </View>
            <View style={{
                    flex: 4
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
            <View>
                <Text>
                    {JSON.stringify(fixtureInfo.statistics)}
                </Text>
            </View>
        </View>
    )
}

export default Fixture