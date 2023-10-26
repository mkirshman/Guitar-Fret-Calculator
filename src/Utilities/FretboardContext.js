//setting up global state and context for output from BasicFretDistaceCalculator component
import { createContext, useContext, useState } from 'react';

const FretboardContext = createContext();

export function useFretboard() {
  return useContext(FretboardContext);
}

export function FretboardProvider({ children }) {
  const [fretDistances, setFretDistances] = useState([]);
  const [fretCount, setFretCount] = useState(0); 

  const storeFretDistances = (distances) => {
    setFretDistances(distances);
  };

  const updateFretCount = (count) => {
    setFretCount(count);
  };

  return (
    <FretboardContext.Provider value={{ fretDistances, storeFretDistances, fretCount, updateFretCount }}>
      {children}
    </FretboardContext.Provider>
  );
}