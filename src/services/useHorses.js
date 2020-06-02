import React from 'react';
import Axios from 'axios';

const useHorses = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

  const saveHorse = async ({ id, horse }) => {
    if (!horse.name) {
      return {
        success: false,
        error: new Error('A horse should have a name'),
      };
    }

    // new horse
    if (!id) {
      try {
        const response = await Axios.put(
          `${process.env.REACT_APP_HORSES}/horse`,
          horse,
        );

        const updatedHorses = [].concat(
          data,
          {
            ...horse,
            id: response.data,
          },
        );

        setData(updatedHorses);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error,
        };
      }
    }

    // existing horse
    try {
      await Axios.put(
        `${process.env.REACT_APP_HORSES}/horse/${id}`,
        horse,
      );

      const updatedHorses = data.map((existingHorse) => {
        if (existingHorse.id === id) {
          return {
            ...horse,
            id,
          };
        }

        return existingHorse;
      });

      setData(updatedHorses);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };

  React.useEffect(() => {
    if (
      data
      || loading
      || errors
    ) return;

    const loadHorses = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`${process.env.REACT_APP_HORSES}/horse`);
        setData(response.data);
      } catch (error) {
        setErrors(error);
      }
      setLoading(false);
    };

    loadHorses();
  });

  return {
    data,
    loading,
    errors,
    saveHorse,
  };
};

export default useHorses;
