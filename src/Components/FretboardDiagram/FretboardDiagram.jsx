import React from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';

const FretboardDiagram = () => {
  // Use the useFretboard hook to access fret distances from the context
  const { fretDistances } = useFretboard();
  const fromNutData = fretDistances.fretFromNutPlacements;


  // Convert fret distances to a format suitable for rendering lines (e.g., pixels or other units)
  // You'll need to calculate the appropriate scaling factor based on the measurement unit
  // For this example, let's assume the fret distances are in millimeters

  // Calculate a scaling factor (you can adjust this based on your needs)


const svgWidth = 1500;
const scale="96";
const svgHeight = [fromNutData[fromNutData.length-1]].pop();
  

  return (
    <div className="fretboard-diagram">

<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="200" height={(svgHeight*scale)+100}>
  

  <rect width="100%" height={svgHeight} fill="white" />


  <line x1="0" y1="0" x2={svgWidth} y2="0" stroke="black" stroke-width="2" />


  {fromNutData &&
    fromNutData.map((element, index) => (
      <line
        key={index}
        className="fret-line"
        x1="0" // Adjust this value for your desired horizontal offset
        y1={element*scale}
        x2={svgWidth} // Adjust this value for your desired horizontal offset
        y2={element*scale}
        stroke="gray" // You can adjust the color here
        stroke-width="1" // You can adjust the line thickness here
      />
    ))}
</svg>
    </div>
  );
};

export default FretboardDiagram;