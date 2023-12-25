// App.js
import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import SummonerForm from './SummonerForm';
import MatchList from './MatchList';
import MatchDetails from './MatchDetails';



function App() {
  const [summoner, setSummoner] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [stats, setStats] = useState({
    kills: null,
    deaths: null,
    assists: null,
    goldEarned: null,
  });

  const searchSummoner = async (summonerName) => {
    try {
      
      const summonerResponse = await axiosInstance.get(`/summoner/v4/summoners/by-name/${summonerName}`);
      const summonerData = summonerResponse.data;
      console.log(summonerData);
      setSummoner(summonerData);

     
      const matchIdsResponse = await axiosInstance.get(`/match/v5/matches/by-puuid/${summonerData.puuid}/ids`);
      const matchIdsData = matchIdsResponse.data;
      setMatches(matchIdsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const selectMatch = async (matchId) => {
    try {
      const matchDetailsResponse = await axiosInstance.get(
        `/match/v5/matches/${matchId}`
      );

      const matchDetailsData = matchDetailsResponse.data;
      setSelectedMatch(matchDetailsData);

      
      if (summoner) {
 
        const participant = matchDetailsData.info.participants.find(
          (p) => p.puuid === summoner.puuid
        );

        if (participant) {
         
          const kills = participant.kills;
          const deaths = participant.deaths;
          const assists = participant.assists;
          const goldEarned = participant.goldEarned;

         
          setStats({
            kills: kills,
            deaths: deaths,
            assists: assists,
            goldEarned: goldEarned,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };
  

  return (
    <div className='content'>
      <div className='stats'>
      <SummonerForm onSearch={searchSummoner} />
      {summoner && <h1>{summoner.name}</h1>}
      <MatchList matches={matches} onSelectMatch={selectMatch} />
      {selectedMatch && <MatchDetails details={selectedMatch} />}
      

      {/* Display stats */}
      <div>
      <div className='stat'><p className="golden">Kills:</p><p>{stats.kills}</p></div>
      <div className='stat'><p className="golden">Deaths:</p><p>{stats.deaths}</p></div>
      <div className='stat'><p className="golden">Assists: </p><p>{stats.assists}</p></div>
      <div className='stat'><p className="golden">Gold Earned: </p><p>{stats.goldEarned}</p></div>
      </div>
      </div>
    </div>
  );
}

export default App;
