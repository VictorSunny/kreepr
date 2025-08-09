import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useResetStates(statesList) {
  const locator = useLocation();
  useEffect(() => {
    statesList.map((setState) => {
      setState(false);
    });
  }, [locator.pathname]);

  return 'all required states have been reset';
}

export default useResetStates;
