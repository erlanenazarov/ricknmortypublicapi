import {
  IFilterFormConfig,
  IFilterConfigContext,
} from 'components/Filters/types';
import { EFieldType } from 'components/Form/types';

export const FORM_NAME = 'episodesFilters';

export const config: IFilterFormConfig<IFilterConfigContext>[] = [
  {
    key: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Search by name...',
    type: EFieldType.TEXT,
    isSearchField: true,
    // need to take the second argument
    // eslint-disable-next-line
    showIf: (_, context) => Boolean(context?.isFixed),
  },
  {
    key: 'episode',
    name: 'episode',
    label: 'Episode',
    placeholder: 'Enter episode code',
    type: EFieldType.TEXT,
  },
];
