import React from 'react'
import { View , Text, FlatList } from 'react-native'

const Lineups = ({lineups}) => {
    return(
        <View style={{flex : 1}}>
<Text>{lineups.coach}</Text>
<Text>{lineups.formation}</Text>
<Text>{lineups.coach}</Text>
        <FlatList
            data={lineups.startXI}
            renderItem = {({item}) =>
            <View style = {{flexDirection : 'row'}}>
            <Text>{item.player} </Text>
            <Text>{item.number} </Text>
            <Text>{item.pos} </Text>

            </View>
        }
        keyExtractor = {item => JSON.stringify(item.player_id)}
        />
        </View>
    )
}

export default Lineups