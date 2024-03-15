import { Dayjs } from 'dayjs';

function formatHours(hours: number): string {
  const hourString = Math.floor(hours);
  const minuteString = Math.round((hours % 1) * 60);
  return `${hourString}:${minuteString.toString().padStart(2, '0')}`;
}

function formatDateWithSuffix(date: Dayjs) {
  const day = date.date();
  if (day % 10 === 1 && day !== 11) return `${date.format('dddd D')}st`;
  if (day % 10 === 2 && day !== 12) return `${date.format('dddd D')}nd`;
  if (day % 10 === 3 && day !== 13) return `${date.format('dddd D')}rd`;
  return `${date.format('dddd D')}th`;
}

export { formatHours, formatDateWithSuffix };
