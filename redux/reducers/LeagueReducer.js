import types from '../actions/types'

const initialState = {
    num : 0,
    league : [
        {
            name: "PremierLeague",
            id: 524
        }, {
            name: "Laliga",
            id: 775
        }, {
            name: "BundesLiga",
            id: 754
        }, {
            name: "Legue 1",
            id: 525
        }, {
            name: "Seria A",
            id: 891
        }, {
            name: "Campions League",
            id: 520
        }
    ]
}

export default ( state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LEAGUE:
            if( action.payload == 1){
                if( (state.num + action.payload) == 5){
                    return {
                        ...state,
                        num : 0,
                    }
                }
                else{
                    return {
                        ...state,
                        num : state.num + action.payload,
                    }
                }
            }
            else if( action.payload == -1){
                if( (state.num + action.payload) == -1){
                    return {
                        ...state,
                        num : 4,
                    }
                }
                else{
                    return {
                        ...state,
                        num : state.num + action.payload,
                    }
                }
            }
           
        default : 
            return {
                ...state,
                num : state.num,
            }
    }
}