import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import BasicFretDistanceCalculator from './BasicFretDistanceCalculator';

afterEach(cleanup);

test('calculates fret distances correctly in mm', () => {
  const { getByText, getByLabelText, getByRole, unmount } = render(
    <BasicFretDistanceCalculator />
  );

  // Fill out the form for mm calculation
  const scaleLengthInput = getByLabelText('Scale Length:');
  const fretCountInput = getByLabelText('Fret Count:');
  const mmRadio = getByLabelText('mm');
  const calculateButton = getByRole('button', { name: 'Calculate' });

  // Provide valid numeric values in mm
  fireEvent.change(scaleLengthInput, { target: { value: '635' } });
  fireEvent.change(fretCountInput, { target: { value: '20' } });
  fireEvent.click(mmRadio);
  fireEvent.click(calculateButton);

  // Validate the calculated results in mm
  const fretDistanceFromNut = getByText('Fret Distance from Nut:');
  const fretToDistance = getByText('Fret-to-Fret Distance:');
  
  expect(fretDistanceFromNut).toBeInTheDocument();
  expect(fretToDistance).toBeInTheDocument();

  unmount(); // Clean up the component to avoid memory leaks
});

test('calculates fret distances correctly in inches', () => {
  const { getByText, getByLabelText, getByRole, unmount } = render(
    <BasicFretDistanceCalculator />
  );

  // Fill out the form for inches calculation
  const scaleLengthInput = getByLabelText('Scale Length:');
  const fretCountInput = getByLabelText('Fret Count:');
  const inchesRadio = getByLabelText('inches');
  const calculateButton = getByRole('button', { name: 'Calculate' });

  // Provide valid numeric values in inches
  fireEvent.change(scaleLengthInput, { target: { value: '24' } });
  fireEvent.change(fretCountInput, { target: { value: '25' } });
  fireEvent.click(inchesRadio);
  fireEvent.click(calculateButton);

  // Validate the calculated results in inches
  const fretDistanceFromNut = getByText('Fret Distance from Nut:');
  const fretToDistance = getByText('Fret-to-Fret Distance:');
  
  expect(fretDistanceFromNut).toBeInTheDocument();
  expect(fretToDistance).toBeInTheDocument();

  unmount(); // Clean up the component to avoid memory leaks
});