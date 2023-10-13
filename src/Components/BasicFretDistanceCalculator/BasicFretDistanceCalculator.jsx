import React, { useState } from 'react';
import FretboardDiagram from '../FretboardDiagram/FretboardDiagram';
import { useFretboard } from '../../Utilities/FretboardContext';
import './BasicFretDistanceCalculator.css';

function BasicFretDistanceCalculator() {
  const { storeFretDistances } = useFretboard();

  const initialState = {
    scaleLength: '',
    fretCount: '',
    measurementUnit: 'mm',
    fretToFretPlacements: [],
    fretFromNutPlacements: [],
  };

  const [state, setState] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleUnitChange = (event) => {
    const newUnit = event.target.value;
  
    // Check if the scale length field is not empty
    if (state.scaleLength !== '') {
      const currentUnit = state.measurementUnit;
      let newScaleLength = parseFloat(state.scaleLength);
  
      // Convert the scale length value based on the selected unit
      if (currentUnit === 'mm' && newUnit === 'inches') {
        newScaleLength /= 25.4; // Convert from mm to inches
      } else if (currentUnit === 'inches' && newUnit === 'mm') {
        newScaleLength *= 25.4; // Convert from inches to mm
      }
  
      // Convert the elements in the fret arrays
      const convertedFretToFretPlacements = state.fretToFretPlacements.map((distance) =>
        (newUnit === 'mm' ? parseFloat(distance) * 25.4 : parseFloat(distance) / 25.4).toFixed(2)
      );
  
      const convertedFretFromNutPlacements = state.fretFromNutPlacements.map((distance) =>
        (newUnit === 'mm' ? parseFloat(distance) * 25.4 : parseFloat(distance) / 25.4).toFixed(2)
      );

  
      for(let i = 0 ; i<myArray.length ; i++ ){
        console.log('Number n the iterate: ' + i)
      }
      let myArray = [1, 2, 3 ,4]
  
      setState({
        ...state,
        measurementUnit: newUnit,
        scaleLength: newScaleLength.toString(),
        fretToFretPlacements: convertedFretToFretPlacements,
        fretFromNutPlacements: convertedFretFromNutPlacements,
      });
    } else {
      setState({
        ...state,
        measurementUnit: newUnit,
      });
    }
  };
  

  const calculateFretDistance = () => {
  const { scaleLength, fretCount, measurementUnit } = state;

  const denominator = 17.817;
  let adjustedScaleLength = parseFloat(scaleLength) || 0;

  const conversionFactor = measurementUnit === 'mm' ? 1 : 25.4;

  const fretToFretPlacements = [];
  const fretFromNutPlacements = [];
  let nutPosition = 0;

  for (let i = 0; i < parseInt(fretCount) || 0; i++) {
    const fretSpacingInMillimeters = adjustedScaleLength / denominator;
    const fretSpacingInInches = fretSpacingInMillimeters / 25.4;

    fretToFretPlacements.push(
      (measurementUnit === 'mm'
        ? fretSpacingInMillimeters
        : fretSpacingInInches
      ).toFixed(2)
    );
    nutPosition += fretSpacingInMillimeters;
    fretFromNutPlacements.push(
      (measurementUnit === 'mm'
        ? nutPosition
        : nutPosition / 25.4
      ).toFixed(2)
    );
    adjustedScaleLength -= fretSpacingInMillimeters;
  }

  storeFretDistances({
    ...state,
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
          Scale Length ({state.measurementUnit === 'mm' ? 'mm' : 'inches'}):
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
              {distance} {state.measurementUnit === 'mm' ? 'mm' : 'inches'}
            </li>
          ))}
        </ul>
        <h3>Fret-to-Fret Distance:</h3>
        <ul>
          {state.fretToFretPlacements.map((distance, index) => (
            <li key={index}>
              {distance} {state.measurementUnit === 'mm' ? 'mm' : 'inches'}
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
}

export default BasicFretDistanceCalculator;
