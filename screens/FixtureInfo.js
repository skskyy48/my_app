import React, {Component} from 'react';
import {View, Text} from 'react-native'
import axios from 'axios'
import Fixture from '../components/Fixture'
import Prediction from '../components/Prediction'
import {Header } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { favFix, favFixDelete } from '../firebase'
import * as firebase from 'firebase'

class FixtureInfo extends Component {
    static navigationOptions = {
        header : null
      }
    constructor(props) {
        super(props)
        this.state = {
            fixture: null,
            prediction : null,
            check : false
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
        const uid = firebase.auth().currentUser.uid
        this.setState({ uid : uid})
        this.favFixCheck(uid, id)

    }

    favFixCheck(uid, fixid){
        firebase.database().ref('users/'+ uid +'/favFix').orderByChild('fixtures/fixture_id').equalTo(fixid).once('value').then((snapshot) => {
          this.setState({ check : snapshot.exists()})
        })
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
    
        scrapFix(){
            this.setState({check : true})
            favFix(this.state.uid,this.props.navigation.getParam('fixture'))
        }

        deleteFix(){
            this.setState({check : false})
            favFixDelete(this.state.uid,this.props.navigation.getParam('id'))
        }



    render() {
        return (
            <View style={{
                    flex: 1
                }}>
                <Header
                    centerComponent={{ text : '경기 정보' , style : {color : 'white', fontSize : 18, fontWeight : 'bold'}}}
                    containerStyle={{marginBottom : 0, backgroundColor : '#381AED'}}
                    rightComponent = {
                        this.state.check ?
                        <AntDesign
                          name ="star"
                          size = {20}
                          onPress={()=> this.deleteFix()}
                          color="yellow"
                        /> : 
                        <AntDesign
                          name ="staro"
                          onPress={()=> this.scrapFix()}
                          size = {20}
                        />
                      }
                    />
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