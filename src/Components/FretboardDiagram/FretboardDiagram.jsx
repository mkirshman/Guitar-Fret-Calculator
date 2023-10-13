import React, { useRef, useState, useEffect } from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';
import jsPDF from 'jspdf';

const FretboardDiagram = ({ measurementUnit }) => {
  const { fretDistances } = useFretboard();
  const fromNutData = fretDistances?.fretFromNutPlacements || [];
  const svgRef = useRef(null);
  const canvasRef = useRef(null);

  const svgWidth = 1500;
  const scale = 96 / 25.4; // Convert scale to inches (96 pixels per inch)
  const svgHeight = fromNutData?.[fromNutData.length - 1] || 0;

  const [zoomFactor, setZoomFactor] = useState(1);

  const convertToInches = (value, unit) => {
    let measurement = value;
    if (unit === 'mm') {
      measurement = (value / 25.4) * 96;
      return measurement;
    } else {
      measurement = value * 96;
      return measurement;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas size to match the scaled SVG
    canvas.width = svgWidth * zoomFactor;
    canvas.height = (svgHeight * scale) * zoomFactor;

    // Draw the SVG onto the canvas with the new size
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Set the source of the image to the SVG data
    img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svgRef.current));
  }, [zoomFactor]);

  const handleZoomIn = () => {
    if (zoomFactor < 2) {
      setZoomFactor(zoomFactor + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomFactor > 0.2) {
      setZoomFactor(zoomFactor - 0.1);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    // Convert the canvas to a data URL with a proper MIME type
    const canvasDataURL = canvasRef.current.toDataURL('image/jpeg', 1.0);

    // Add the canvas image to the PDF
    doc.addImage(canvasDataURL, 'JPEG', 10, 10, 280, 150);

    // Download the PDF
    doc.save('fretboard_diagram.pdf');
  };

  const generateGCode = () => {
    // Your G-code generation logic here...
  };

  return (
    <div className="fretboard-diagram">
      <canvas ref={canvasRef}>
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
            y1={convertToInches(element, measurementUnit)}
            x2={svgWidth} // Adjust this value for your desired horizontal offset
            y2={convertToInches(element, measurementUnit)}
            stroke="gray" // You can adjust the color here
            strokeWidth="1" // You can adjust the line thickness here
          />
        ))}
      </svg>

      </canvas>
      <div className="zoom-buttons">
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
      
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={generateGCode}>Download G-Code</button>
      </div>
    </div>
  );
};

export default FretboardDiagram;
