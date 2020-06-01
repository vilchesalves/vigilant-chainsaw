import React from 'react';

import logo from './logo.svg';
import './App.css';

import useHorses from './services/useHorses';

function App() {
  const { data: horses, loading, errors } = useHorses();
  const [selectedHorseId, setSelectedHorseId] = React.useState('');
  const selectedHorse = horses?.find((horse) => horse.id === selectedHorseId);

  const selectHorse = (id) => {
    setSelectedHorseId(id);
  };

  return (
    <div className="App">
      <header>
        {loading && (
          <img src={logo} className="App-logo" alt="logo" />
        )}
        {horses && (
          <ul>
            {horses.slice(0, 10).map((horse) => (
              <li key={horse.id}>
                <button
                  type="button"
                  onClick={() => { selectHorse(horse.id); }}
                >
                  {horse.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors && (
          <p>Horses could not be loaded.</p>
        )}
      </header>
      {selectedHorse && (
        <section>
          <h1>Details</h1>
          <label htmlFor="name">
            Name
            <input id="name" value={selectedHorse.name} />
          </label>
          <label htmlFor="favouriteFood">
            favouriteFood
            <input id="favouriteFood" value={selectedHorse.profile.favouriteFood} />
          </label>
          <label htmlFor="weight">
            weight
            <input id="weight" value={selectedHorse.profile.physical.weight} />
          </label>
          <label htmlFor="height">
            height
            <input id="height" value={selectedHorse.profile.physical.height} />
          </label>
        </section>
      )}
    </div>
  );
}

export default App;
