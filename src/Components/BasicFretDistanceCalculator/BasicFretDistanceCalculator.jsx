import React, { Component, useState } from 'react';
import FretboardDiagram from '../FretboardDiagram/FretboardDiagram';
import { useFretboard } from '../../Utilities/FretboardContext';
import './BasicFretDistanceCalculator.css';

function BasicFretDistanceCalculator() {
  const {storeFretDistances} = useFretboard();
  const [state, setState] = useState({
    scaleLength: '',
    fretCount: '',
    measurementUnit: 'mm',
    fretToFretPlacements: [],
    fretFromNutPlacements: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleUnitChange = (event) => {
    setState({
      ...state,
      measurementUnit: event.target.value,
    });
  };

  const calculateFretDistance = () => {
    const { scaleLength, fretCount, measurementUnit } = state;
    
    const denominator = 17.817;
    let adjustedScaleLength = parseFloat(scaleLength);

    const conversionFactor = measurementUnit === 'mm' ? 1 : 25.4;
    
    const fretToFretPlacements = [];
    const fretFromNutPlacements = [];
    let nutPosition = 0;

    for (let i = 0; i < parseInt(fretCount); i++) {
      const fretSpacingInMillimeters = adjustedScaleLength / denominator;
      const fretSpacingInInches = fretSpacingInMillimeters / 25.4;

      fretToFretPlacements.push(fretSpacingInMillimeters.toFixed(2));
      nutPosition += fretSpacingInMillimeters;
      fretFromNutPlacements.push(nutPosition.toFixed(2));
      adjustedScaleLength -= fretSpacingInMillimeters;
    }

    storeFretDistances({
      fretToFretPlacements,
      fretFromNutPlacements,
    });

    setState({
      ...state,
      fretToFretPlacements,
      fretFromNutPlacements,
    });
  };

  return (
    <div className="calculator-container">
      <h2>Basic Fret Distance Calculator</h2>
      <div className="input-section">
        <label>
          Scale Length:
          <input
            type="text"
            name="scaleLength"
            value={state.scaleLength}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fret Count:
          <input
            type="text"
            name="fretCount"
            value={state.fretCount}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="unit-section">
        <span>Measurement Unit:</span>
        <label>
          <input
            type="radio"
            name="measurementUnit"
            value="mm"
            checked={state.measurementUnit === 'mm'}
            onChange={handleUnitChange}
          />
          mm
        </label>
        <label>
          <input
            type="radio"
            name="measurementUnit"
            value="inches"
            checked={state.measurementUnit === 'inches'}
            onChange={handleUnitChange}
          />
          inches
        </label>
      </div>
      <button onClick={calculateFretDistance}>Calculate</button>
      <div className="result-section">
        <h3>Fret Distance from Nut:</h3>
        <ul>
          {state.fretFromNutPlacements.map((distance, index) => (
            <li key={index}>
              {distance} {state.measurementUnit}
            </li>
          ))}
        </ul>
        <h3>Fret-to-Fret Distance:</h3>
        <ul>
          {state.fretToFretPlacements.map((distance, index) => (
            <li key={index}>
              {distance} {state.measurementUnit}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <FretboardDiagram />
      </div>
    </div>
  );
}

export default BasicFretDistanceCalculator;
