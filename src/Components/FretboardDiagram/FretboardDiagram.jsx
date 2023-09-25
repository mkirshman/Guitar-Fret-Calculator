import React from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';

const FretboardDiagram = () => {
  const { fretDistances } = useFretboard(); // Assuming fretDistances is an array or object with numeric keys
  const fromNutData = Object.keys(fretDistances || {}); // Use empty object as fallback

  const scale = 1; // Adjust this value to control the scale of the SVG

  // Calculate the width and height of the SVG based on the number of frets and the scale
  const svgHeight = fromNutData.length * scale;
  const svgWidth = 500; // Adjust the height as needed

  return (
    <div className="fretboard-diagram">
      <ul>
        {fromNutData.map((element, index) => (
          <li
            key={index}
            className="fret-line"
            style={{
              height: `${element * scale}px`, // Adjust the styling as needed
            }}
          >
            {element}
          </li>
        ))}
      </ul>
      <svg width={svgWidth} height={svgHeight} xmlns="http://www.w3.org/2000/svg">
        {/* Draw a line at 0 */}
        <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke="black" strokeWidth="2" />

        {/* Draw fret placements */}
        {fromNutData.map((placement, index) => (
          <line
            key={index}
            x1={placement * scale}
            y1="0"
            x2={placement * scale}
            y2={svgHeight}
            stroke="black"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  );
};

export default FretboardDiagram;