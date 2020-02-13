import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import {FontAwesome5} from '@expo/vector-icons'

import FixturesScreen from '../screens/FixturesScreen';
import FixtureInfo from '../screens/FixtureInfo'

import ProfileScreen from '../screens/ProfileScreen';
import FavTeam from '../screens/FavTeam'
import FavFixture from '../screens/FavFixture'

import TeamInfo from '../screens/TeamInfo'
import PlayerInfo from '../screens/PlayerInfo'

import LeagueScreen from '../screens/LeagueScreen'




const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FixtureStack = createStackNavigator(
  {
    Fixture: FixturesScreen,
    FixtureInfo : FixtureInfo
  },
  config
);

FixtureStack.navigationOptions = {
  tabBarLabel: 'Fixture',
  tabBarIcon : () => (
    <FontAwesome5 name ="table" size={22}/>
  )
};

FixtureStack.path = '';

const LeagueStack = createStackNavigator(
  {
    League : LeagueScreen,
    TeamInfo : TeamInfo,
    PlayerInfo : PlayerInfo,
  },
  config
);

LeagueStack.navigationOptions = {
  tabBarLabel: 'League',
  tabBarIcon : () => (
    <FontAwesome5 name ="futbol" size={22}/>
  )
};

LeagueStack.path = '';


const ProfileStack = createStackNavigator(
  {
    Profile : ProfileScreen,
    FavTeam : FavTeam,
    FavFixture : FavFixture
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon : () => (
    <FontAwesome5 name ="user-alt" size={22}/>
  )
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  FixtureStack,
  LeagueStack,
  ProfileStack,
  
});

tabNavigator.path = '';

export default tabNavigator;
