import React from 'react';

const MatchList = ({ matches, onSelectMatch }) => {
  return (
    <div>
  
      <img src="last10.png" alt="last10" width="300px" />
      <ul>
        {matches.map((match) => (
          <li key={match} onClick={() => onSelectMatch(match)}>
            {match}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
