import mockdate from 'mockdate';

// Set a fixed date for all tests to ensure consistent timestamps
beforeAll(() => {
  mockdate.set(new Date('2025-10-07T00:00:00.000Z'));
});

afterAll(() => {
  mockdate.reset();
});
