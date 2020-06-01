import React from 'react';
import Axios from 'axios';

const useHorses = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

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
    data, loading, errors,
  };
};

export default useHorses;
