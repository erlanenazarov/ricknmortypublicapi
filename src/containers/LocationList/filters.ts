import {
  IFilterFormConfig,
  IFilterConfigContext,
} from 'components/Filters/types';
import { EFieldType } from 'components/Form/types';

export const FORM_NAME = 'locationsFilter';

export const config: IFilterFormConfig<IFilterConfigContext>[] = [
  {
    key: 'name',
    name: 'name',
    label: 'Name',
    type: EFieldType.TEXT,
    isSearchField: true,
    placeholder: 'Search by name...',
    // Need to take just second argument
    // eslint-disable-next-line
    showIf: (_, context) => Boolean(context?.isFixed),
  },
  {
    key: 'type',
    name: 'type',
    label: 'Type',
    type: EFieldType.TEXT,
    placeholder: 'Enter type...',
  },
  {
    key: 'dimension',
    name: 'dimension',
    label: 'Dimension',
    type: EFieldType.TEXT,
    placeholder: 'Enter dimension...',
  },
];
