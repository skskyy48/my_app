import types from './types'

export function changeLeague(num){
    return {
    type : types.CHANGE_LEAGUE,
    payload : num
    }
};

