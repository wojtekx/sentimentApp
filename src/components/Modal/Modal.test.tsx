import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  const onClose = jest.fn();
  test('should display elements', () => {
    render(
      <Modal result={{ score: 0.8, label: 'POSITIVE' }} onClose={onClose} />
    );

    const modal = screen.getByTestId('modal');
    const closeBtn = screen.getByTestId('close-btn');
    const emoji = screen.getByTestId('emoji');
    const sentiment = screen.getByTestId('sentiment');
    const modalDescription = screen.getByTestId('modal-description');

    expect(modal).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();

    expect(modalDescription).toBeInTheDocument();
    expect(modalDescription.textContent).toBe(
      'Twój tekst wyraża zadowolenie, optymizm i pozytywne emocje. Może odnosić się do przyjemnych doświadczeń, sukcesów lub doceniania czegoś wartościowego'
    );
    expect(sentiment).toBeInTheDocument();
    expect(sentiment.textContent).toBe('Sentyment: POSITIVE');
  });

  test('should close modal when close button is clicked', () => {
    render(
      <Modal result={{ score: 0.8, label: 'POSITIVE' }} onClose={onClose} />
    );

    const closeBtn = screen.getByTestId('close-btn');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('should display hints how to improve the sentiment when it is negative', () => {
    render(
      <Modal result={{ score: 0.8, label: 'NEGATIVE' }} onClose={onClose} />
    );

    const sentiment = screen.getByTestId('sentiment');
    const hintTitle = screen.getByTestId('hint-title');

    expect(sentiment).toBeInTheDocument();
    expect(sentiment.textContent).toBe('Sentyment: NEGATIVE');

    expect(hintTitle).toBeInTheDocument();
    expect(hintTitle.textContent).toBe('Jak można zmienić sentyment?');
  });
});
