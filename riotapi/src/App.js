import React, { useState } from 'react';
import axiosInstance from './axiosInstance';
import SummonerForm from './SummonerForm';
import MatchList from './MatchList';
import MatchDetails from './MatchDetails';

const API_KEY = 'RGAPI-4278be8f-4e24-4ea3-bc98-2528230da0f5'; 
const API_BASE_URL = 'https://eun1.api.riotgames.com/lol';


function App() {
  const [summoner, setSummoner] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const searchSummoner = async (summonerName) => {
    try {
      // Step 1: Retrieve Summoner Information
      const summonerResponse = await axiosInstance.get(
        `/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`
        
      );
      console.log("Probao ovde");

      const summonerData = summonerResponse.data;
      console.log(summonerData);
      setSummoner(summonerData);

      // Step 2: Retrieve Match IDs
      const matchIdsResponse = await axiosInstance.get(
        `/match/v5/matches/by-puuid/${summonerData.puuid}/ids?api_key=${API_KEY}&count=10`
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
      const matchDetailsResponse = await axiosInstance.get(
        `/match/v5/matches/${matchId}?api_key=${API_KEY}`
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
