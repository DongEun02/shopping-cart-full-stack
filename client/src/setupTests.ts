import '@testing-library/jest-dom';

import { clearQueryCache } from './shared/hooks/useQuery';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  clearQueryCache();
});
afterAll(() => server.close());
