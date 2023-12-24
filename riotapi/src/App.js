import React, { useState } from 'react';
import axios from 'axios';
import SummonerForm from './SummonerForm';
import MatchList from './MatchList';
import MatchDetails from './MatchDetails';

const API_KEY = 'YOUR_API_KEY';
const API_BASE_URL = 'https://na1.api.riotgames.com/lol';

function App() {
  const [summoner, setSummoner] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const searchSummoner = async (summonerName) => {
    try {
      // Step 1: Retrieve Summoner Information
      const summonerResponse = await axios.get(
        `${API_BASE_URL}/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
      );

      const summonerData = summonerResponse.data;
      setSummoner(summonerData);

      // Step 2: Retrieve Match IDs
      const matchIdsResponse = await axios.get(
        `${API_BASE_URL}/match/v5/matches/by-puuid/${summonerData.puuid}/ids?api_key=${API_KEY}&count=10`
      );

      const matchIdsData = matchIdsResponse.data;
      setMatches(matchIdsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const selectMatch = async (matchId) => {
    // Fetch additional details for the selected match
    try {
      const matchDetailsResponse = await axios.get(
        `${API_BASE_URL}/match/v5/matches/${matchId}?api_key=${API_KEY}`
      );

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
