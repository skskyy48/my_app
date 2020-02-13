import React, { Component } from 'react';
import {View, Text} from 'react-native'


const Team_List = ({team}) => {
    return(
            <View style = {{flex : 1}}>
                <Text>이름 : {team.name}</Text>
                <Text>국가 : {team.country}</Text>
                <Text>설립 연도 : {team.founded}</Text>
                <Text>연고지 : {team.venue_city}</Text>
                <Text>홈 구장 : {team.venue_name}</Text>
                <Text>수용 인원 : {team.venue_capacity}</Text>
            </View>
        );
    }
 

 export default Team_List