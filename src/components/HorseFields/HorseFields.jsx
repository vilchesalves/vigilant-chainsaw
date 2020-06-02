import React from 'react';
import PropTypes from 'prop-types';

const HorseFields = ({
  horseData,
  onChange,
}) => {
  const handleHorseChange = (e) => {
    const { id, value } = e.target;

    if (id === 'name') {
      onChange({
        ...horseData,
        [id]: value,
      });
    } else if (id === 'favouriteFood') {
      onChange({
        ...horseData,
        profile: {
          ...horseData.profile,
          [id]: value,
        },
      });
    } else if (
      id === 'weight'
      || id === 'height'
    ) {
      onChange({
        ...horseData,
        profile: {
          ...horseData.profile,
          physical: {
            ...horseData.profile.physical,
            [id]: parseFloat(value, 10),
          },
        },
      });
    }
  };

  return (
    <>
      <label htmlFor="name">
        Name
        <input
          id="name"
          value={horseData.name || ''}
          onChange={handleHorseChange}
        />
      </label>
      <label htmlFor="favouriteFood">
        favouriteFood
        <input
          id="favouriteFood"
          value={horseData.profile?.favouriteFood || ''}
          onChange={handleHorseChange}
        />
      </label>
      <label htmlFor="weight">
        weight
        <input
          id="weight"
          value={horseData.profile?.physical?.weight || ''}
          onChange={handleHorseChange}
        />
      </label>
      <label htmlFor="height">
        height
        <input
          id="height"
          value={horseData.profile?.physical?.height || ''}
          onChange={handleHorseChange}
        />
      </label>
    </>
  );
};

HorseFields.defaultProps = {
  horseData: {},
  onChange: () => {},
};

HorseFields.propTypes = {
  horseData: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.shape({
      favouriteFood: PropTypes.string,
      physical: PropTypes.shape({
        weight: PropTypes.number,
        height: PropTypes.number,
      }),
    }),
  }),
  onChange: PropTypes.func,
};

export default HorseFields;
