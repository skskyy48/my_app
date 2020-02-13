import axios from 'axios'

export function getTeamLogo(id) {
    let logo;
    axios({
        method:"GET",
        url:"https://api-football-v1.p.rapidapi.com/v2/teams/team/"+id,
        headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"api-football-v1.p.rapidapi.com",
        "x-rapidapi-key":"48d6676eccmsh9d52433974ae7c9p1ec430jsne298d5e23f00"} 
        ,params : {
            timezone : "Asia/Seoul"
          } })
        .then(response=>{
          logo = reponse.data
        })
        .catch((error)=>{
          console.log(error)
        })
}