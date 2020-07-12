const { formatDate } = require('../utils');

test('A date in the current year should not include the year', () => {
  const dateInCurrentYear = new Date(
    `Jan 10, ${new Date().getFullYear()} 12:34:56Z`
  );
  expect(formatDate(dateInCurrentYear)).toBe('Jan 10 12:34');
});

test('Dates older than current year should include the year', () => {
  const lastYear = new Date().getFullYear() - 1;
  expect(formatDate(new Date(`Jan 10, ${lastYear}Z`))).toBe(
    `Jan 10  ${lastYear}`
  );
});
