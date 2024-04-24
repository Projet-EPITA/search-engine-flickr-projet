import * as Sentry from '@sentry/browser';

window.onerror = function(message, source, lineno, colno, error) {
  // Capture et envoie l'erreur à Sentry
  Sentry.captureException(error);
};
