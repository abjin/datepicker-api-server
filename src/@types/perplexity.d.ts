export interface PerplexityMessage {
  role: string;
  content: string;
}

export interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface PerplexityErrorResponse {
  error?: {
    message?: string;
  };
}
