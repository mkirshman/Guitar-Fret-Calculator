import React, { useRef } from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';
import jsPDF from 'jspdf';

const FretboardDiagram = () => {
  const { fretDistances } = useFretboard();
  const fromNutData = fretDistances?.fretFromNutPlacements || [];
  const svgRef = useRef(null);

  const svgWidth = 1500;
  const scale = 96;
  const svgHeight = fromNutData?.[fromNutData.length - 1] || 0;

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