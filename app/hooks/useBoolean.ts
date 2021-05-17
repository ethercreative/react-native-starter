import * as React from 'react';

export const useBoolean = (
  defaultStatus?: boolean,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [boolean, setBoolean] = React.useState<boolean>(defaultStatus ?? false);
  return [boolean, setBoolean];
};
