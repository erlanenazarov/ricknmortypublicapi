import { IFormConfig, TFormValues } from 'components/Form/types';

export interface IFilterConfigContext {
  isFixed?: boolean;
}

export interface IFilterFormConfig<Context = never>
  extends IFormConfig<Context> {
  isSearchField?: boolean;
}

export interface IFiltersProps {
  name: string;
  config: IFilterFormConfig<IFilterConfigContext>[];
  initialValues?: TFormValues;
  className?: string;
  onSubmit?: (formValues: TFormValues) => void;
  searchField?: string;
}
