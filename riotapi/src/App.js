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
      // Step 1: Retrieve Summoner Information
      const summonerResponse = await axiosInstance.get(`/summoner/v4/summoners/by-name/${summonerName}`);
      const summonerData = summonerResponse.data;
      console.log(summonerData);
      setSummoner(summonerData);

      // Step 2: Retrieve Match IDs
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

      // Check if summoner is not null
      if (summoner) {
        // Find the participant corresponding to the summoner
        const participant = matchDetailsData.info.participants.find(
          (p) => p.puuid === summoner.puuid
        );

        if (participant) {
          // Extract kills, deaths, assists, and goldEarned
          const kills = participant.kills;
          const deaths = participant.deaths;
          const assists = participant.assists;
          const goldEarned = participant.goldEarned;

          // Update the state to trigger a re-render
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
        <p>Kills: {stats.kills}</p>
        <p>Deaths: {stats.deaths}</p>
        <p>Assists: {stats.assists}</p>
        <p>Gold Earned: {stats.goldEarned}</p>
      </div>
      </div>
    </div>
  );
}

export default App;
