import React, { useState } from 'react';
import Modal from '../Modal/Modal.tsx';
import { ErrorStateType, ResultType } from '../../shared/Types.ts';
import AnalyzeForm from '../AnalyzeForm/AnalyzeForm.tsx';
import './SentimentalAnalyzer.css';

const SentimentalAnalyzer = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<ResultType>();
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [errorState, setErrorState] = useState<ErrorStateType>({
    isError: false,
    message: ''
  });

  return (
    <section className='sentimental_analyzer'>
      <header>
        <h1 className='title'>Sentimental Analyzer</h1>
        <p className='description'>
          Sprawdź jaki sentyment ma wpisany przez Ciebie tekst
        </p>
      </header>
      <AnalyzeForm
        setValue={setValue}
        value={value}
        setErrorState={setErrorState}
        setLoading={setLoading}
        setResult={setResult}
        setModalOpen={setModalOpen}
      />
      {isLoading && <div className='loading_state'> Trwa ładowanie... </div>}
      {errorState.isError && (
        <div className='error_message'> {errorState.message} </div>
      )}
      {isModalOpen && result && (
        <Modal result={result} onClose={() => setModalOpen(false)} />
      )}
    </section>
  );
};

export default SentimentalAnalyzer;
