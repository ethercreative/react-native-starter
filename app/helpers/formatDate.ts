import dayjs, { OpUnitType } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export const formatDate = ({
  date = '',
  format = 'DD/MM/YYYY',
  relative,
  add,
  subtract,
  difference,
}: {
  date: string;
  format?: string;
  relative?: boolean;
  add?: {
    amount: number;
    unit: OpUnitType;
  };
  subtract?: {
    amount: number;
    unit: OpUnitType;
  };
  difference?: {
    date: string;
    unit: OpUnitType;
  };
}): string => {
  if (relative) {
    return dayjs(date).fromNow();
  }

  if (add) {
    return dayjs(date).add(add.amount, add.unit).format(format);
  }

  if (subtract) {
    return dayjs(date).subtract(subtract.amount, subtract.unit).format(format);
  }

  if (difference) {
    return String(dayjs(date).diff(difference.date, difference.unit));
  }

  return dayjs(date).format(format);
};
