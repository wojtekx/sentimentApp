import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AnalyzeForm from './AnalyzeForm';
import '@testing-library/jest-dom';

describe('AnalyzeForm', () => {
  let setErrorState, setLoading, setResult, setModalOpen, setValue;

  beforeEach(() => {
    setErrorState = jest.fn();
    setLoading = jest.fn();
    setResult = jest.fn();
    setModalOpen = jest.fn();
    setValue = jest.fn();
  });

  test('should update input value when entering text', () => {
    render(
      <AnalyzeForm
        value=''
        setErrorState={setErrorState}
        setLoading={setLoading}
        setResult={setResult}
        setModalOpen={setModalOpen}
        setValue={setValue}
      />
    );

    const inputElement = screen.getByTestId('analyze-form-input');
    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(setValue).toHaveBeenCalledWith('test');
  });

  test('should set error state when sending a blank form', () => {
    render(
      <AnalyzeForm
        value=''
        setErrorState={setErrorState}
        setLoading={setLoading}
        setResult={setResult}
        setModalOpen={setModalOpen}
        setValue={setValue}
      />
    );

    const form = screen.getByTestId('analyze-form');
    fireEvent.submit(form);

    expect(setErrorState).toHaveBeenCalledWith({
      isError: true,
      message: 'wprowadź tekst'
    });
  });

  test('should display error when sending form with text length > 500 characters', () => {
    const longText = 'a'.repeat(501);
    render(
      <AnalyzeForm
        value={longText}
        setErrorState={setErrorState}
        setLoading={setLoading}
        setResult={setResult}
        setModalOpen={setModalOpen}
        setValue={setValue}
      />
    );

    const form = screen.getByTestId('analyze-form');
    fireEvent.submit(form);

    expect(setErrorState).toHaveBeenCalledWith({
      isError: true,
      message: 'tekst nie może przekraczać 500 znaków'
    });
  });

  test('should check sentiment analysis when sending a form with correct text', async () => {
    const validText = 'Przykładowy tekst';

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            [
              { score: 0.2, label: 'NEGATIVE' },
              { score: 0.8, label: 'POSITIVE' }
            ]
          ])
      })
    ) as jest.Mock;

    render(
      <AnalyzeForm
        value={validText}
        setErrorState={setErrorState}
        setLoading={setLoading}
        setResult={setResult}
        setModalOpen={setModalOpen}
        setValue={setValue}
      />
    );

    const form = screen.getByTestId('analyze-form');
    fireEvent.submit(form);

    expect(setErrorState).toHaveBeenCalledWith({ isError: false, message: '' });
    expect(setLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(setModalOpen).toHaveBeenCalledWith(true);
    });

    expect(setResult).toHaveBeenCalledWith({ score: 0.8, label: 'POSITIVE' });

    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
