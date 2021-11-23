import { IS_ANDROID } from '../Constants';

export const toLocaleString = (
  value: string | number,
  decimals: number = 2,
  withZeroes: boolean = false,
): string => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  if (IS_ANDROID) {
    value = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    value = value.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  if (!withZeroes) {
    value = value.replace('.'.padEnd(decimals + 1, '0'), '');
  }

  return value;
};
