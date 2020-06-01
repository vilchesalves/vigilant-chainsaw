import React from 'react';

import logo from './logo.svg';
import './App.css';

import useHorses from './services/useHorses';

function App() {
  const { data, loading, errors } = useHorses();

  return (
    <div className="App">
      {loading && (
        <img src={logo} className="App-logo" alt="logo" />
      )}
      {data && (
        <ul>
          {data.map((horse) => (
            <li key={horse.id}>{horse.name}</li>
          ))}
        </ul>
      )}
      {errors && (
        <p>Horses could not be loaded.</p>
      )}
    </div>
  );
}

export default App;
