export type ResultType = {
  label: 'POSITIVE' | 'NEGATIVE';
  score: number;
};
export type ErrorStateType = {
  isError: boolean;
  message: string;
};

export type AnalyzeFormType = {
  setErrorState: ({
    isError,
    message
  }: {
    isError: boolean;
    message: string;
  }) => void;
  setLoading: (val: boolean) => void;
  setResult: ({ label, score }: ResultType) => void;
  setModalOpen: (val: boolean) => void;
  setValue: (val: string) => void;
  value: string;
};

export type SentimentAnalysisResponse = {
  label: 'POSITIVE' | 'NEGATIVE';
  score: number;
};

export type SentimentAPIResponse = SentimentAnalysisResponse[][];
