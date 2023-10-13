import React, { useRef } from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';
import jsPDF from 'jspdf';

const FretboardDiagram = ({ measurementUnit }) => {
  const { fretDistances } = useFretboard();
  const fromNutData = fretDistances?.fretFromNutPlacements || [];
  const svgRef = useRef(null);

  const svgWidth = 1500;
  const scale = 96 / 25.4; // Convert scale to inches (96 pixels per inch)
  const svgHeight = fromNutData?.[fromNutData.length - 1] || 0;

  const convertToInches = (value, unit) => {
    console.log(unit);
    return "";
    // return unit === 'mm' ? (value / 25.4).toFixed(2) : value;
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    const svgElement = svgRef.current;

    // Create a canvas element and draw the SVG onto it
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a data URL with a proper MIME type
      const canvasDataURL = canvas.toDataURL('image/jpeg', 1.0);

      // Add the canvas image to the PDF
      doc.addImage(canvasDataURL, 'JPEG', 10, 10, 280, 150);

      // Download the PDF
      doc.save('fretboard_diagram.pdf');
    };

    // Set the source of the image to the SVG data
    img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svgElement));
  };

  const generateGCode = () => {
  // Define CNC parameters
  const feedRate = 100; // Feed rate in inches per minute
  const toolDiameter = 0.024; // Tool diameter in inches
  const depthOfCut = 0.08; // Depth of cut in inches

  // Calculate the maximum fret distance
  const maxFretDistance = fromNutData[fromNutData.length - 1];

  // Calculate the cutting area dimensions
  const cuttingAreaWidth = maxFretDistance + 4 + 3;
  const cuttingAreaHeight = depthOfCut;

  // Initialize G-code
  let gCode = '';
  const gCodeUnit = measurementUnit === 'mm' ? 'G21' : 'G20';
  // Set initial position and rapid move to starting point
  gCode += `${gCodeUnit} ; Set units\n`; // Use specified unit
  gCode += 'G90 ; Set to absolute positioning\n';
  gCode += 'G54 ; Work coordinate system\n';
  gCode += `G00 X0.0 Y0.0 Z0.0 ; Rapid move to start point\n`;

  // Loop through measurements and create toolpaths
  fromNutData.forEach((element) => {
    // Loop logic
    gCode += `; Start loop for element ${element}\n`;

    // Goto X coordinate, Y0, Z2
    gCode += `G00 X${element} Y0.0 Z2.0 ; Goto X coordinate, Y0, Z2\n`;

    // Goto Z-0.08
    gCode += `G01 Z-${depthOfCut} F${feedRate} ; Goto Z-${depthOfCut}\n`;

    // Goto Y3
    gCode += `G00 Y3.0 ; Goto Y3\n`;

    // Goto Y0
    gCode += `G00 Y0.0 ; Goto Y0\n`;

    // Goto Z2
    gCode += `G00 Z2.0 ; Goto Z2\n`;

    // End loop
    gCode += `; End loop for element ${element}\n`;
  });

  // End of program
  gCode += 'M30 ; End of program\n';

  // Create a Blob with the G-code content
  const blob = new Blob([gCode], { type: 'text/plain' });

  // Create a URL for the Blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary link element and trigger a download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fretboard.gcode';
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
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
            y1={convertToInches(element, measurementUnit) * scale}
            x2={svgWidth} // Adjust this value for your desired horizontal offset
            y2={convertToInches(element, measurementUnit) * scale}
            stroke="gray" // You can adjust the color here
            strokeWidth="1" // You can adjust the line thickness here
          />
        ))}
      </svg>
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={generateGCode}>Download G-Code</button>
    </div>
  );
};

export default FretboardDiagram;