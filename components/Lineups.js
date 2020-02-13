import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import { ListItem } from 'react-native-elements'

const Lineups = ({lineups}) => {
    return (
        <View style={{
                flex: 1
            }}>
            <Text>coach : {lineups.coach}</Text>
            <Text>formation : {lineups.formation}</Text>
            <Text>StartXI</Text>
            <FlatList
                data={lineups.startXI}
                renderItem = 
                {({item}) =>
                <View>
                <ListItem
                    key={item.team_id}
                    title ={item.player}
                    subtitle={
                    <Text style={styles.subtitle}>{item.pos}</Text>
                    }
                    leftElement = {
                        <Text style={styles.subtitle}>{item.number}</Text>
                        }
                        bottomDiveder
                        titleStyle = {styles.title}/>
                </View>
                    }
                    containerStyle ={{paddingLeft : 1,paddingTop : 3, paddingBottom : 3}}
                    keyExtractor= {item => JSON.stringify(item.player_id)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title : {
        fontSize : 12
    },
    subtitle : {
        fontSize : 12
    }
})

export default Lineups