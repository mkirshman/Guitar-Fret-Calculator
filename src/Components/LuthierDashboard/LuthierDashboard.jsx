import React, { Component } from 'react';
import BasicFretDistanceCalculator from './../BasicFretDistanceCalculator/BasicFretDistanceCalculator';
import MultiscaleFretDistanceCalculator from './../MultiscaleFretDistanceCalculator/MultiScaleFretDistanceCalculator';

class FretCalculator extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: 'basic', // Default to Basic Fret Calculation
    };
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>Choose a Fret Calculation</h2>
        <label>
          <input
            type="radio"
            value="basic"
            checked={this.state.selectedOption === 'basic'}
            onChange={this.handleOptionChange}
          />
          Basic Fret Calculation
        </label>
        <label>
          <input
            type="radio"
            value="multiscale"
            checked={this.state.selectedOption === 'multiscale'}
            onChange={this.handleOptionChange}
          />
          Multiscale Fret Calculation
        </label>

        {this.state.selectedOption === 'basic' ? (
          <BasicFretDistanceCalculator />
        ) : (
          <MultiscaleFretDistanceCalculator />
        )}
      </div>
    );
  }
}

export default FretCalculator;