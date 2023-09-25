import React, { useRef } from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';
import jsPDF from 'jspdf';

const FretboardDiagram = () => {
  // Use the useFretboard hook to access fret distances from the context
  const { fretDistances } = useFretboard();

  // Ensure that fretDistances and fretFromNutPlacements are defined before using them
  const fromNutData = fretDistances?.fretFromNutPlacements || [];
  const svgRef = useRef(null);

  const svgWidth = 1500;
  const scale = 96;

  // Use optional chaining to safely access the last element in the array
  const svgHeight = fromNutData?.[fromNutData.length - 1] || 0;

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    // Get the SVG element
    const svgElement = svgRef.current;

    // Convert the SVG element to a data URL
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgDataURL = `data:image/svg+xml;base64,${btoa(svgData)}`;

    // Add the SVG to the PDF
    doc.addImage(svgDataURL, 'JPEG', 10, 10, 280, 150);

    // Download the PDF
    doc.save('fretboard_diagram.pdf');
  };

  return (
    <div className="fretboard-diagram">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height={(svgHeight * scale) + 100}
        ref={svgRef}
      >
        <rect width="100%" height={svgHeight} fill="white" />
        <line x1="0" y1="0" x2={svgWidth} y2="0" stroke="black" strokeWidth="2" />
        {fromNutData.map((element, index) => (
          <line
            key={index}
            className="fret-line"
            x1="0" // Adjust this value for your desired horizontal offset
            y1={element * scale}
            x2={svgWidth} // Adjust this value for your desired horizontal offset
            y2={element * scale}
            stroke="gray" // You can adjust the color here
            strokeWidth="1" // You can adjust the line thickness here
          />
        ))}
      </svg>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default FretboardDiagram;