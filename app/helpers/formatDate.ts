import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat);

export const formatDate = (
  date: string = '',
  format: string = 'DD/MM/YYYY',
): string => {
  let formattedDate = dayjs(date).format(format);

  if (formattedDate === 'Invalid Date') {
    formattedDate = 'N/A';
  }

  return formattedDate;
};
