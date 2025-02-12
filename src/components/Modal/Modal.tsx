import React, { MouseEventHandler } from 'react';
import { ResultType } from '../../shared/Types.ts';
import { closeIcon, negativeIcon, positiveIcon } from '../../assets/Icons.tsx';
import './Modal.css';

const Modal = ({
  result,
  onClose
}: {
  result: ResultType;
  onClose: MouseEventHandler<HTMLButtonElement>;
}) => {
  const isHappy = result.label === 'POSITIVE';

  const emoji = isHappy ? positiveIcon : negativeIcon;
  const sentimentDescription = isHappy
    ? 'Twój tekst wyraża zadowolenie, optymizm i pozytywne emocje. Może odnosić się do przyjemnych doświadczeń, sukcesów lub doceniania czegoś wartościowego'
    : 'Twój tekst odzwierciedla niezadowolenie, krytykę lub negatywne emocje. Może wynikać z rozczarowania, trudności lub nieprzyjemnych sytuacji';
  return (
    <div data-testid='modal' className='modal'>
      <button data-testid='close-btn' className='close_btn' onClick={onClose}>
        {closeIcon}
      </button>
      <div data-testid='emoji' className='emoji'>
        {emoji}
      </div>
      <p data-testid='sentiment'>
        <strong>Sentyment:</strong> {result.label}
      </p>
      <p data-testid='modal-description' className='description'>
        {sentimentDescription}
      </p>
      {!isHappy && (
        <div className='hint'>
          <p data-testid='hint-title' className='hint_title'>
            Jak można zmienić sentyment?
          </p>
          <p className='hint_desc'>
            Spróbuj użyć słów wyrażających radość, wdzięczność lub sukces,
            takich jak „I love programming!”
          </p>
        </div>
      )}
    </div>
  );
};

export default Modal;
