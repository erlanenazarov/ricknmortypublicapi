import { List, Map } from 'immutable';

import { EFieldType, IFormConfig, TFormValues } from 'components/Form/types';

import { populateFormValues } from './populateFormValues';

describe('populateFormValues', () => {
  const config: IFormConfig[] = [
    { name: 'name', key: 'name', type: EFieldType.TEXT, label: 'Name' },
    { name: 'age', key: 'age', type: EFieldType.TEXT, label: 'Age' },
    { name: 'gender', key: 'gender', type: EFieldType.TEXT, label: 'Gender' },
  ];

  it('should populate form values with initial values', () => {
    const initialValues: TFormValues = {
      name: ['John', 'Doe'],
      age: ['30'],
    };

    const result = populateFormValues(config, initialValues);
    expect(result).toEqual(
      Map({
        name: List(['John', 'Doe']),
        age: List(['30']),
        gender: List([]),
      }),
    );
  });

  it('should populate form values with empty arrays if initial values are not provided', () => {
    const result = populateFormValues(config);
    expect(result).toEqual(
      Map({
        name: List([]),
        age: List([]),
        gender: List([]),
      }),
    );
  });
});
