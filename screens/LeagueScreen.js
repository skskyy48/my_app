import React, {Component} from 'react';
import {View, Text, Button, Dimensions} from 'react-native'
import LeagueTable from '../components/LeagueTable'
const axios = require('axios');
import {TabView, TabBar} from 'react-native-tab-view'
import TopScorer from '../components/TopScorer'
import {connect} from 'react-redux'
import ActionCreator from '../redux/actions'
import {Header} from 'react-native-elements'
import { withNavigation} from 'react-navigation'
import { AntDesign } from '@expo/vector-icons'

const initialLayout = {
    width: Dimensions
        .get('window')
        .width
}

class LaegueScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            leaguetable: null,
            topscorers: null,
            num: 0,
            index: 0
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.num !== this.props.num){
            this.onLeagueChange(this.props.num)
        }
    }

    componentDidMount() {
        this.getLeagueData(524)
        this.getTopScorer(524)
    }

    onLeagueChange(num) {
        this.getLeagueData(this.props.league[num].id)
        this.getTopScorer(this.props.league[num].id)
    }

    getLeagueData(id) {
        axios({
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + id,
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
                this.setState({leaguetable: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
        }

    getTopScorer(id) {
        axios({
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v2/topscorers/" + id,
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
                this.setState({topscorers: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
        }

    handleIndexChange = index => {
        this.setState({index: index})
    };

    routes = [
        {
            key: 'table',
            title: '리그 순위'
        }, {
            key: 'player',
            title: '득점 순위'
        }
    ];

    renderTabBar = props => (
        <TabBar
          {...props}
          style = {{ backgroundColor : '#381AED', height : 40,paddingTop : 0}}
          indicatorStyle = {{ backgroundColor : 'red'}}
          />
      )

    render() {
        return (
            <View style={{
                    flex: 1
                }}>
                <Header
                    centerComponent={{
                        text: this
                            .props
                            .league[this.props.num]
                            .name
                    , style : {fontSize : 18, fontWeight : 'bold',color : 'white'}
                          }}
                    rightComponent={<AntDesign name = 'right' size={18} onPress = {
                        () => this
                            .props
                            .changeLeague(1)
                    } />}
                    leftComponent={<AntDesign name = "left" size={18} onPress = {
                        () => this
                            .props
                            .changeLeague(-1)
                    } />
                    }
                    containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
                />
                <TabView
                    style={{marginTop : 0}}
                    navigationState={{
                        index: this.state.index,
                        routes: this.routes
                    }}
                    renderTabBar ={this.renderTabBar}
                    renderScene={({route}) => {
                        switch (route.key) {
                            case 'table':
                                return <View
                                    style={{
                                        flex: 1
                                    }}>
                                    {
                                        this.state.leaguetable
                                            ? <LeagueTable
                                                    standings={this.state.leaguetable.api.standings}
                                                    league={this
                                                        .props
                                                        .league[this.props.num]
                                                        .id}
                                                    navigation={this.props.navigation}/>
                                            : null
                                    }
                                </View>
                            case 'player':
                                return <View
                                    style={{
                                        flex: 1
                                    }}>
                                    {
                                        this.state.topscorers
                                            ? <TopScorer topscorers={this.state.topscorers.api.topscorers}/>
                                            : <Text>Loading</Text>
                                    }
                                </View>
                        }
                    }}
                    onIndexChange={this.handleIndexChange}
                    initialLayout={initialLayout}/>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {league: state.league.league, num: state.league.num}
}

function mapDispatchToProps(dispatch) {
    return {
        changeLeague: (num) => {
            dispatch(ActionCreator.changeLeague(num))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LaegueScreen));