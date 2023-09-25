import React, { Component } from 'react';
import FretboardDiagram from '../FretboardDiagram/FretboardDiagram';

import './BasicFretDistanceCalculator.css';

class BasicFretDistanceCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleLength: '',
      fretCount: '',
      measurementUnit: 'mm',
      fretToFretPlacements: [],
      fretFromNutPlacements: [],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleUnitChange = (event) => {
    this.setState({
      measurementUnit: event.target.value,
    });
  };

  calculateFretDistance = () => {
    const { scaleLength, fretCount, measurementUnit } = this.state;
    const denominator = 17.817;
    let adjustedScaleLength = parseFloat(scaleLength);

    // Conversion factor: 1 inch = 25.4 mm
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

    this.setState({
      fretToFretPlacements,
      fretFromNutPlacements,
    });
  };

  render() {
    return (
      <div className="calculator-container">
        <h2>Basic Fret Distance Calculator {}</h2>
        <div className="input-section">
          <label>
            Scale Length:
            <input
              type="text"
              name="scaleLength"
              value={this.state.scaleLength}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Fret Count:
            <input
              type="text"
              name="fretCount"
              value={this.state.fretCount}
              onChange={this.handleInputChange}
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
              checked={this.state.measurementUnit === 'mm'}
              onChange={this.handleUnitChange}
            />
            mm
          </label>
          <label>
            <input
              type="radio"
              name="measurementUnit"
              value="inches"
              checked={this.state.measurementUnit === 'inches'}
              onChange={this.handleUnitChange}
            />
            inches
          </label>
        </div>
        <button onClick={this.calculateFretDistance}>Calculate</button>
        <div className="result-section">
          <h3>Fret Distance from Nut:</h3>
          <ul>
            {this.state.fretFromNutPlacements.map((distance, index) => (
              <li key={index}>
                {distance} {this.state.measurementUnit}
              </li>
            ))}
          </ul>
          <h3>Fret-to-Fret Distance:</h3>
          <ul>
            {this.state.fretToFretPlacements.map((distance, index) => (
              <li key={index}>
                {distance} {this.state.measurementUnit}
              </li>
            ))}
          </ul>
        </div>
        <div>
      <FretboardDiagram/>
      </div>
      </div>
      
    );
    
  }
}

export default BasicFretDistanceCalculator;