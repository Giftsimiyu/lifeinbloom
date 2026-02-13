// Error monitoring stub (Sentry or similar)
export function initErrorMonitoring() {
  if (typeof window === 'undefined') return;
  // TODO: initialize Sentry or another monitoring service with DSN from env
  console.info('Error monitoring initialized (stub)');
}

export function captureException(err: any) {
  // Send to monitoring service in production
  console.error('Captured exception (stub):', err);
}

export default { initErrorMonitoring, captureException };
