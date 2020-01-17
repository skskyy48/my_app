import React, {Component} from 'react';
import {View, Text} from 'react-native'
import axios from 'axios'
import Fixture from '../components/Fixture'
import Prediction from '../components/Prediction'

class FixtureInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixture: null,
            prediction : null
        }
    }

    componentWillMount(){
        this.setState({prediction : null,fixture : null})
    }

    componentDidMount() {
        const id = this
            .props
            .navigation
            .getParam('id');
        const status = this. props.navigation.getParam('status')
        if( status === 'Not Started'){
            this.setState({ fixture : null})
            this.getFixturePrediction(id)
        }else{
            this.setState({prediction : null})
            this.getFixtureInfo(id);
        }
    }

    getFixturePrediction(id){
        axios({
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v2/predictions/" + id,
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
                this.setState({prediction: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getFixtureInfo(id) {
        axios({
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v2/fixtures/id/" + id,
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
                this.setState({fixture: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
        }

    render() {
        return (
            <View style={{
                    flex: 1
                }}>
                {
                    this.state.fixture
                        ? <Fixture fixture={this.state.fixture.api.fixtures}/>
                        : null
                }
                {
                    this.state.prediction ? <Prediction predictions={this.state.prediction.api.predictions}
                    fixture={this.props.navigation.getParam('fixture')}/> : null
                }
            </View>
        );
    }
}

export default FixtureInfo;