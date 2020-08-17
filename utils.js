/**
 * Format a date in ls style: include year if it's not the current, otherwise add HH:MM
 *    May 21  2019
 *    Apr 10 22:03 (current year)
 */
function formatDate(objectDate) {
  const today = new Date();
  const objectYear = objectDate.getUTCFullYear();
  const shortMonthName = objectDate.toLocaleString('default', {
    month: 'short'
  });
  const paddedDayOfMonth = objectDate.getUTCDate().toString().padStart(2, ' ');
  const hours = objectDate.getUTCHours().toString().padStart(2, '0');
  const minutes = objectDate.getUTCMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  const paddedYear = objectYear.toString().padStart(5, ' ');

  if (today.getUTCFullYear() !== objectYear) {
    return `${shortMonthName} ${paddedDayOfMonth} ${paddedYear}`;
  } else {
    return `${shortMonthName} ${paddedDayOfMonth} ${time}`;
  }
}
exports.formatDate = formatDate;
