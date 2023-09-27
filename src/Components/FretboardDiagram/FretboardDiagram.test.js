import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FretboardDiagram from './FretboardDiagram';

// Mock the useFretboard hook
jest.mock('../../Utilities/FretboardContext', () => ({
  useFretboard: () => ({
    fretDistances: {
      fretFromNutPlacements: [0, 10, 20], // Sample data for testing
    },
  }),
}));

describe('FretboardDiagram component', () => {
  it('renders without errors', () => {
    render(<FretboardDiagram />);
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  it('downloads a PDF when the button is clicked', () => {
    const { getByText } = render(<FretboardDiagram />);
    const downloadButton = getByText('Download PDF');
    
    // Mock the jsPDF save method
    const saveMock = jest.fn();
    global.jsPDF = { ...global.jsPDF, save: saveMock };

    fireEvent.click(downloadButton);

    expect(saveMock).toHaveBeenCalledWith('fretboard_diagram.pdf');
  });

 
});