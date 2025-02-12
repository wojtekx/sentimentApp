import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SentimentalAnalyzer from './SentimentalAnalyzer';

const exampleText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum inventore doloribus mollitia sapiente vitae vel corporis, consequatur delectus illo eaque placeat sequi esse asperiores vero? Voluptate repellendus a nulla nihil!
Debitis, tenetur facilis voluptas, quidem deleniti dicta eos maiores molestias dolorem recusandae, nobis magni iure molestiae assumenda incidunt ea ipsam. Dicta minus necessitatibus voluptas animi ipsam tempore sit molestiae eveniet!
Incidunt nisi eligendi quis aliquam! Fugiat aspernatur consectetur quae sunt, necessitatibus amet voluptatem aliquid aliquam nulla iusto pariatur inventore saepe tempora beatae sint qui error provident ex deserunt nihil repellat!
Architecto officia a laudantium eum dignissimos atque quia magni quisquam sit eius, omnis quod sequi ipsam iure. Dolores ipsum omnis quam voluptatem.`;

describe('SentimentalAnalyzer', () => {
  test('should render title and description', () => {
    render(<SentimentalAnalyzer />);
    expect(screen.getByText('Sentimental Analyzer')).toBeInTheDocument();
    expect(
      screen.getByText('Sprawdź jaki sentyment ma wpisany przez Ciebie tekst')
    ).toBeInTheDocument();
  });

  test('should render AnalyzeForm component', () => {
    render(<SentimentalAnalyzer />);
    expect(screen.getByTestId('analyze-form')).toBeInTheDocument();
  });

  test('should not display loading state', () => {
    render(<SentimentalAnalyzer />);
    expect(screen.queryByText('Trwa ładowanie...')).toBeNull();
  });

  test('should not display Modal', () => {
    render(<SentimentalAnalyzer />);
    expect(screen.queryByTestId('modal')).toBeNull();
  });

  test('should display error message when input was empty', () => {
    render(<SentimentalAnalyzer />);
    fireEvent.click(screen.getByTestId('analyze-form-button'));
    expect(screen.getByText('wprowadź tekst')).toBeInTheDocument();
  });

  test('should display error message when input has more than 500 letters', () => {
    render(<SentimentalAnalyzer />);
    const input = screen.getByTestId('analyze-form-input');
    fireEvent.change(input, {
      target: { value: exampleText }
    });

    fireEvent.click(screen.getByTestId('analyze-form-button'));

    expect(input.getAttribute('value')!.length > 500).toBeTruthy();
    expect(
      screen.getByText('tekst nie może przekraczać 500 znaków')
    ).toBeInTheDocument();
  });
});
