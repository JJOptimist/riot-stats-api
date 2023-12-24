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
      const matchDetailsResponse = await axiosInstance.get(`/match/v5/matches/${matchId}`);
      const matchDetailsData = matchDetailsResponse.data;
      setSelectedMatch(matchDetailsData);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  return (
    <div>
      <SummonerForm onSearch={searchSummoner} />
      {summoner && <h1>{summoner.name}</h1>}
      <MatchList matches={matches} onSelectMatch={selectMatch} />
      {selectedMatch && <MatchDetails details={selectedMatch} />}
    </div>
  );
}

export default App;
