import React, { useRef, useState, useEffect } from 'react';
import { useFretboard } from '../../Utilities/FretboardContext';
import './FretboardDiagram.css';
import jsPDF from 'jspdf';
// import neckOutline from '../../NECK-outline-SVG.svg';

const FretboardDiagram = ({ measurementUnit, fretCount }) => {
  const { fretDistances } = useFretboard();
  const fromNutData = fretDistances?.fretFromNutPlacements || [];
  const svgRef = useRef(null);
  
  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    // Convert the canvas to a data URL with a proper MIME type
    const canvasDataURL = svgRef.current.toDataURL('image/jpeg', 1.0);

    // Add the canvas image to the PDF
    doc.addImage(canvasDataURL, 'JPEG', 10, 10, 280, 150);

    // Download the PDF
    doc.save('fretboard_diagram.pdf');
  };

  const generateGCode = () => {
    // Your G-code generation logic here...
  };

  const initialX1 = 53.36;
  const finalX1 = 45.36;
  const x1Increment = (finalX1 - initialX1) / (fretCount - 1);
  let x1 = initialX1;

  const initialX2 = 185.36;
  const finalX2 = 196.36;
  const x2Increment = (finalX2 - initialX2) / (fretCount - 1);
  let x2 = initialX2;

  const incrementX = (xCoordinate, increment) => {
    let output = xCoordinate -= increment;
    return output;
  }

  const cumulativeDistance = fromNutData[fromNutData.length - 1] || 0;

  const percentages = fromNutData.map((distance) => (distance / cumulativeDistance) * 98);
  const totalHeight = fromNutData[fromNutData.length-1]

  return (

    <div className="fretboard-diagram">
      <div className="zoom-buttons">
      
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={generateGCode}>Download G-Code</button>
      </div>
  
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.19 2135.78" id="fretSvg">

        <g id="Layer_2" data-name="Layer 2">
        <g id="svg2">
        <g id="_0cf9e02c-255e-4cd6-a565-3a4cbe85c558" data-name="0cf9e02c-255e-4cd6-a565-3a4cbe85c558">
        <path className="cls-1 outline" d="M155.81,395.79l-.23.1a2.74,2.74,0,0,1-1.22.29,2.79,2.79,0,0,1-2.78-2.75h0V363.75l-27.3,26.16L97,363.8v29.59h0v0a2.79,2.79,0,0,1-2.79,2.78,2.66,2.66,0,0,1-.9-.15l-.22-.06,12.72,12.08V384.35l18.5,17.55,18.45-17.68v23.84l13.08-12.27"/>
        <path className="cls-1 outline" d="M148.94,424.08a5.44,5.44,0,0,1-2.45-1.23l-22.21-21v0l-22.21,21a5.43,5.43,0,0,1-2.45,1.22,2.89,2.89,0,0,1-2.6-1.62V440l27.26-26v0L151.54,440V422.46a2.89,2.89,0,0,1-2.6,1.62"/>
        <path className="cls-1 outline" d="M155.47,124.57a14.08,14.08,0,1,1-14.07-14.08,14.08,14.08,0,0,1,14.07,14.08"/>
        <path className="cls-1 outline" d="M180.46,196.57a14.08,14.08,0,1,1-14.08-14.08,14.08,14.08,0,0,1,14.08,14.08"/>
        <path className="cls-1 outline" d="M204.85,268.07A14.08,14.08,0,1,1,190.77,254a14.07,14.07,0,0,1,14.08,14.08"/>
        <path className="cls-1 outline" d="M83.64,268.07A14.08,14.08,0,1,0,97.71,254a14.07,14.07,0,0,0-14.07,14.08"/>
        <path className="cls-1 outline" d="M59.05,340.57a14.08,14.08,0,1,0,14.07-14.08,14.08,14.08,0,0,0-14.07,14.08"/>
        <path className="cls-1 outline" d="M33.65,412.57a14.08,14.08,0,1,0,14.08-14.08,14.08,14.08,0,0,0-14.08,14.08"/>
        </g>
        <g id="_4a7e8b8e-4e17-4234-b908-591343cbd72c" data-name="4a7e8b8e-4e17-4234-b908-591343cbd72c">
        <path className="cls-1 outline" d="M79.93,1.33C98.74-9.38,135.7,71.8,158.5,70.72c2.08-.1,99.28,283.29,96.26,285.57-63.54,47.89-68.77,65.58-69.14,135.2-.05,9.58.11,46,.35,88.15L197,2116.75v.07a18.29,18.29,0,0,1-18,18.6H59.26a18,18,0,0,1-18-18l0-2.36L51.35,737.33H50.7c.15-15,1.34-110.19,1.95-178.14L53,516.58h0c.08-12.33.08-21.27,0-25.09.06-15.05-20.65-41.67-52.56-49-1.93-.44,73.51-211.47,74.09-213.61,73.45-2.11,5.38-225.31,5.44-227.59"/>
        </g>
        <line className="cls-1 outline" x1={53.36} y1={`${23.6}%`} x2={185.36} y2={`${23.6}%`} />
        {percentages.map((yCoordinate, index) => (
          <React.Fragment key={index}> 
          
          <line 
                className="cls-1 outline" 
                x1={index == 0 ? 56.36 : incrementX(x1, x1Increment)} 
                y1={`${23.6 + yCoordinate * 0.776}%`} 
                x2={index == 0 ? 185.36: incrementX(x2, x2Increment)} 
                y2={`${23.6 + yCoordinate * 0.776}%`} />
          </React.Fragment>
        ))}

      </g>
      </g>
      </svg>

     
      
    </div>
  );
};

export default FretboardDiagram;
