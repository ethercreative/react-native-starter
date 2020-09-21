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
    return value
      .toFixed(decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      .replace('.00', '');
  }

  value = value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (!withZeroes) {
    value = value.replace('.00', '');
  }

  return value;
};
