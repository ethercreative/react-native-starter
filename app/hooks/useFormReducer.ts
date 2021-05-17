import * as React from 'react';

type AllowedValues = string | string[] | number | number[] | boolean;

interface KeyVal {
  [x: string]: AllowedValues;
}

export const useFormReducer = <FormTypes extends KeyVal>(
  initialValues: FormTypes,
) => {
  type FieldName = keyof typeof initialValues;

  interface UpdatedValue {
    key: FieldName;
    value: AllowedValues;
  }

  const reducer = (prevState: FormTypes, { key, value }: UpdatedValue) => ({
    ...prevState,
    [key]: value,
  });

  const [state, dispatch] = React.useReducer(reducer, initialValues);

  const onChange = (key: FieldName, value: AllowedValues) => {
    dispatch({
      key,
      value,
    });
  };

  return { state, onChange };
};
