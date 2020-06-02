import React from 'react';

import logo from './logo.svg';
import './App.css';

import useHorses from './services/useHorses';

function App() {
  const {
    data: horses, loading, errors,
    saveHorse,
  } = useHorses();
  const [selectedHorseId, setSelectedHorseId] = React.useState('');
  const [selectedHorse, setSelectedHorse] = React.useState(null);

  const handleHorseChange = (e) => {
    const { id, value } = e.target;

    if (id === 'name') {
      setSelectedHorse({
        ...selectedHorse,
        [id]: value,
      });
    } else if (id === 'favouriteFood') {
      setSelectedHorse({
        ...selectedHorse,
        profile: {
          ...selectedHorse.profile,
          [id]: value,
        },
      });
    } else if (
      id === 'weight'
      || id === 'height'
    ) {
      setSelectedHorse({
        ...selectedHorse,
        profile: {
          ...selectedHorse.profile,
          physical: {
            ...selectedHorse.profile.physical,
            [id]: value,
          },
        },
      });
    }
  };

  const handleHorseSave = async (e) => {
    e.preventDefault();

    const {
      id, ...horse
    } = selectedHorse;

    const { success, error } = await saveHorse({ id, horse });

    if (!success) {
      alert(error.message);
    }
  };

  const addNewHorse = () => {
    setSelectedHorseId('');
    setSelectedHorse({});
  };

  React.useEffect(() => {
    if (
      !horses
    ) return;

    const newHorse = horses?.find((horse) => horse.id === selectedHorseId);

    if (newHorse?.id !== selectedHorse?.id) {
      setSelectedHorse(newHorse);
    }
  }, [selectedHorse, selectedHorseId, horses]);

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
                  onClick={() => { setSelectedHorseId(horse.id); }}
                >
                  {horse.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {!loading && (
          <button onClick={addNewHorse} type="button">Add</button>
        )}
        {errors && (
          <p>Horses could not be loaded.</p>
        )}
      </header>
      {selectedHorse && (
        <form onSubmit={handleHorseSave}>
          <h1>Details</h1>
          <label htmlFor="name">
            Name
            <input
              id="name"
              value={selectedHorse.name || ''}
              onChange={handleHorseChange}
            />
          </label>
          <label htmlFor="favouriteFood">
            favouriteFood
            <input
              id="favouriteFood"
              value={selectedHorse.profile?.favouriteFood || ''}
              onChange={handleHorseChange}
            />
          </label>
          <label htmlFor="weight">
            weight
            <input
              id="weight"
              value={selectedHorse.profile?.physical?.weight || ''}
              onChange={handleHorseChange}
            />
          </label>
          <label htmlFor="height">
            height
            <input
              id="height"
              value={selectedHorse.profile?.physical?.height || ''}
              onChange={handleHorseChange}
            />
          </label>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setSelectedHorseId('');
              setSelectedHorse(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
