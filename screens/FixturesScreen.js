import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Fixtures from '../components/Fixtures'
import {Calendar} from 'react-native-calendars'
import {AntDesign} from '@expo/vector-icons'
import { Header } from 'react-native-elements'
import {connect} from 'react-redux'
import ActionCreator from '../redux/actions'
const axios = require('axios');

class FixturesScreen extends Component {
    static navigationOptions = {
      header : null
    }

    constructor(props,context) {
        super(props,context)
        this.state = {
            api: null,
            num: 0,
            calVisible: false
        }
        this.onDayPress = this
            .onDayPress
            .bind(this);
        this.getData = this
            .getData
            .bind(this);
    }

    componentDidMount = () => {
        var date = new Date().getDate()
        var month = new Date().getMonth() +1
        var year = new Date().getFullYear()
        const dateNow = year + '-'+month+'-'+date
        this.setState({ selected : dateNow})
        this.getData(524, dateNow)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.num !== nextProps.num){
            this.onLeagueChange(nextProps.num)
        }
    }

    getData(id, date) {
        axios({
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/" + id + "/" +
                    date,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"
            },
            params: {
                timezone: "Asia/Seoul"
            }
        })
            .then(response => {
                this.setState({api: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
        }

    onDayPress = (day) => {
        this.setState({selected: day.dateString});
        this.getData(this.props.league[this.props.num].id, day.dateString)
    }

    onLeagueChange(num) {
        this.getData(this.props.league[num].id,this.state.selected)
    }

    render() {
        return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text : this.props.league[this.props.num].name , style : {fontSize : 18, fontWeight : 'bold'}}}
            rightComponent={<AntDesign name="right" size={18} onPress={() => this.props.changeLeague(1)}/>}
            leftComponent={<AntDesign name="left" size={18} onPress={() => this.props.changeLeague(-1)}/>}
            />
            <View style={{
                    flexDirection: 'row',
                    justifyContent : 'center',
                    alignItems : 'center'
                }}>
                {this.state.selected ?<Text>{this.state.selected}</Text> : null}
                <AntDesign
                    name='calendar'
                    onPress={() => this.setState({ calVisible : !this.state.calVisible})}
                    size = {28}
                />
                </View>
                    {
                    this.state.calVisible
                        ? <Calendar
                                onDayPress={this.onDayPress}
                                style={styles.calendar}
                                hideExtraDays={true}
                                markedDates={{
                                    [this.state.selected] : {
                                        selected: true,
                                        disableTouchEvent: true,
                                        selectedDotColor: 'orange'
                                    }
                                }}/>
                        : null
                }
                {
                    this.state.api
                        ? <Fixtures
                                fixtures={this.state.api.api.fixtures}
                                navigation={this.props.navigation}/>
                        : <Text>Loading</Text>
                }
            </View>
            ); } } 
            
const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#fff'
                }
});

function mapStateToProps(state) {
    return {
        league : state.league.league,
        num : state.league.num
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeLeague : (num) => {
            dispatch(ActionCreator.changeLeague(num))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FixturesScreen);
