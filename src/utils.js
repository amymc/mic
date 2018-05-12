import moment from 'moment';

const maybePluralise = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;

export const parseTimestamp = timestamp => {
  const timePublished = moment(timestamp, 'YYYY-MM-DD HH:mm');
  // mocking a time close to the publication dates
  // so sorting by submitted time will be more meaningful
  const mockCurrentTime = moment('2013-11-09 13:20:00', 'YYYY-MM-DD HH:mm');
  const diff = Math.abs(timePublished.diff(mockCurrentTime, 'minutes'));

  const parsedResult =
    diff > 60
      ? `${maybePluralise(Math.round(diff / 60), 'hour')}`
      : `${maybePluralise(diff, 'minute')}`;
  return parsedResult;
};
