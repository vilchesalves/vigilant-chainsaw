import React from 'react';
import Axios from 'axios';

const useHorses = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

  const editHorse = async ({ id, horse }) => {
    const response = await Axios.put(
      `${process.env.REACT_APP_HORSES}/horse/${id}`,
      horse,
    );

    return response;
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
      } catch (e) {
        setErrors(e);
      }
      setLoading(false);
    };

    loadHorses();
  });

  return {
    data,
    loading,
    errors,
    editHorse,
  };
};

export default useHorses;
