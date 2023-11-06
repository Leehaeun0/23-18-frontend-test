import '@testing-library/jest-dom';
import { server } from './src/server/mockServer';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
