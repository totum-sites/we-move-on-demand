import { useState } from 'react';
import { PHONE_LABEL } from '@/lib/constants';

export type QuoteFields = {
  name: string;
  phone: string;
  email?: string;
  movingDate?: string;
  fromZip?: string;
  toZip?: string;
  smsConsent?: boolean;
};

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function useQuoteSubmit(source: string) {
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function submit(fields: QuoteFields): Promise<boolean> {
    setState('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, source }),
      });
      const data = await res.json().catch(() => ({ ok: false, error: 'Invalid response' }));
      if (!res.ok || !data.ok) {
        setErrorMessage(data?.error || `Something went wrong. Please call us at ${PHONE_LABEL}.`);
        setState('error');
        return false;
      }
      setState('success');
      return true;
    } catch {
      setErrorMessage(`Network error. Please call us at ${PHONE_LABEL}.`);
      setState('error');
      return false;
    }
  }

  function reset() {
    setState('idle');
    setErrorMessage('');
  }

  return { state, errorMessage, submit, reset, isLoading: state === 'loading' };
}
