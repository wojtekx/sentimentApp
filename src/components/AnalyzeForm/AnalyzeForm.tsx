import React, { FormEvent, ChangeEvent } from 'react';
import './AnalyzeForm.css';
import { AnalyzeFormType } from '../../shared/Types';

const AnalyzeForm = ({
  setErrorState,
  setLoading,
  setResult,
  setModalOpen,
  setValue,
  value
}: AnalyzeFormType) => {
  const analyzeSentiment = async (text: string) => {
    try {
      setErrorState({ isError: false, message: '' });
      setLoading(true);
      await fetch(
        'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputs: text })
        }
      )
        .then((response) => {
          if (!response.ok) {
            setErrorState({ isError: true, message: 'Błąd API' });
          }
          return response.json();
        })
        .then((response) => {
          const bestResult = response[0].reduce((prev, current) =>
            prev.score > current.score ? prev : current
          );
          setResult(bestResult);
          setModalOpen(true);
        });
    } catch (error) {
      setErrorState({
        isError: true,
        message: 'Błąd podczas analizy sentymentu'
      });
      throw new Error(error?.message || String(error));
    }
    setLoading(false);
  };

  const handleAnalyze = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      setErrorState({
        isError: true,
        message: 'wprowadź tekst'
      });
      return;
    } else if (value.trim().length > 500) {
      setErrorState({
        isError: true,
        message: 'tekst nie może przekraczać 500 znaków'
      });
      return;
    }
    analyzeSentiment(value);
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form data-testid='analyze-form' className='form' onSubmit={handleAnalyze}>
      <input
        data-testid='analyze-form-input'
        className='input'
        type='text'
        value={value}
        onChange={(event) => {
          handleChangeValue(event);
        }}
      />
      <button className='button' data-testid='analyze-form-button'>
        Analizuj
      </button>
    </form>
  );
};

export default AnalyzeForm;
