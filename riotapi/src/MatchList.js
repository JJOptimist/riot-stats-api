import React from 'react';

const MatchList = ({ matches, onSelectMatch }) => {
  return (
    <div>
  
      <img src="last10.png" alt="last10" width="300px" />
      <div className="matches">
        {matches.map((match) => (
          <div className="singlematch" key={match} onClick={() => onSelectMatch(match)}>
            {match}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
