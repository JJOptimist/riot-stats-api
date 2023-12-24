import React from 'react';

const MatchList = ({ matches, onSelectMatch }) => {
  return (
    <div>
      <h2>Last 10 Matches</h2>
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
