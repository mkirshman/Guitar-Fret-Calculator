import React, { useState } from 'react';
import BasicFretDistanceCalculator from './../BasicFretDistanceCalculator/BasicFretDistanceCalculator';
import MultiscaleFretDistanceCalculator from './../MultiscaleFretDistanceCalculator/MultiScaleFretDistanceCalculator';
import FretboardDiagram from './../FretboardDiagram/FretboardDiagram';
import './LuthierDashboard.css';

function FretCalculator() {
  const [selectedOption, setSelectedOption] = useState('basic');
  const [measurementUnit, setMeasurementUnit] = useState('mm');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
