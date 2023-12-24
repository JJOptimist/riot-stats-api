import React, { useState } from 'react';

const SummonerForm = ({ onSearch }) => {
  const [summonerName, setSummonerName] = useState('');

  const handleSearch = () => {
    onSearch(summonerName);
  };

  return (
    <div>
      <input
        type="text"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SummonerForm;
