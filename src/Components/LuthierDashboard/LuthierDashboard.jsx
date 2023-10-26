import React, { useState } from 'react';
import BasicFretDistanceCalculator from './../BasicFretDistanceCalculator/BasicFretDistanceCalculator';
import MultiscaleFretDistanceCalculator from './../MultiscaleFretDistanceCalculator/MultiScaleFretDistanceCalculator';
import FretboardDiagram from './../FretboardDiagram/FretboardDiagram';
import './LuthierDashboard.css';
import { useFretboard } from '../../Utilities/FretboardContext'; // Import the context

function FretCalculator() {
  const [selectedOption, setSelectedOption] = useState('basic');
  const [measurementUnit, setMeasurementUnit] = useState('mm');
  const { updateFretCount, fretCount } = useFretboard(); // Access the context for fretCount

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFretCountChange = (event) => {
    const newFretCount = parseInt(event.target.value);
    updateFretCount(newFretCount); // Update fretCount in the context
  };

  return (
    <div className="luthier-dashboard">
      <div className="sidebar">
        <label>
          <input
            type="radio"
            value="basic"
            checked={selectedOption === 'basic'}
            onChange={handleOptionChange}
          />
          Basic Fret Calculation
        </label>
        <label>
          <input
            type="radio"
            value="multiscale"
            checked={selectedOption === 'multiscale'}
            onChange={handleOptionChange}
          />
          Multiscale Fret Calculation
        </label>

        <h2>Choose a Fret Calculation</h2>

        {selectedOption === 'basic' ? (
          <BasicFretDistanceCalculator />
        ) : (
          <MultiscaleFretDistanceCalculator />
        )}

      </div>
      <div className="main">
        <FretboardDiagram measurementUnit={measurementUnit} />
      </div>
    </div>
  );
}

export default FretCalculator;
