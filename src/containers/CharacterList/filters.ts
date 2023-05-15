import { ESelectType } from 'components/Form';
import { EFieldType } from 'components/Form/types';
import {
  IFilterFormConfig,
  IFilterConfigContext,
} from 'components/Filters/types';

export const FORM_NAME = 'charactersFilters';

export const config: IFilterFormConfig<IFilterConfigContext>[] = [
  {
    key: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Search by name...',
    type: EFieldType.TEXT,
    isSearchField: true,
    // Need only second parameter, replaced name of first argument with `_`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showIf: (_, context) => Boolean(context?.isFixed),
  },
  {
    key: 'status',
    name: 'status',
    label: 'Status',
    placeholder: 'Select status',
    type: EFieldType.SELECT,
    selectType: ESelectType.RAW,
    rawOptions: [
      { label: 'Alive', value: 'alive' },
      { label: 'Dead', value: 'dead' },
      { label: 'Unknown', value: 'unknown' },
    ],
  },
  {
    key: 'species',
    name: 'species',
    label: 'Species',
    placeholder: 'Enter species...',
    type: EFieldType.TEXT,
  },
  {
    key: 'gender',
    name: 'gender',
    label: 'Gender',
    placeholder: 'Select gender',
    type: EFieldType.SELECT,
    selectType: ESelectType.RAW,
    rawOptions: [
      { value: 'female', label: 'Female' },
      { value: 'male', label: 'Male' },
      { value: 'genderless', label: 'Genderless' },
      { value: 'unknown', label: 'Unknown' },
    ],
  },
];
