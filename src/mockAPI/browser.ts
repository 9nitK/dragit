import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

/**
 * Mock Service Worker (MSW) setup for browser environments.
 * This worker intercepts and mocks API requests in the browser,
 * which is useful for development and testing purposes.
 *
 * @see https://mswjs.io/docs/ for more information on MSW.
 */
export const worker = setupWorker(...handlers);

// Usage:
// Import this worker in your main application file or test setup,
// then start it before your application code runs:
//
// import { worker } from './mockAPI/browser';
// worker.start();
//
// Note: Only start the worker in development or testing environments, not in production.
