import { TFormValues, getSingleValue } from 'components/Form';

import { ECharacterStatus, EGender, ICharacter } from 'store/characters/types';

export const submit = (values: TFormValues): Partial<ICharacter> => {
  const result: Partial<ICharacter> = {};

  const name = getSingleValue(values.name);
  if (name) {
    result.name = `${name}`;
  }

  const status = getSingleValue(values.status);
  if (status) {
    result.status = status as ECharacterStatus;
  }

  const gender = getSingleValue(values.gender);
  if (gender) {
    result.gender = gender as EGender;
  }

  const type = getSingleValue(values.type);
  if (type) {
    result.type = `${type}`;
  }

  const species = getSingleValue(values.species);
  if (species) {
    result.species = `${species}`;
  }

  return result;
};
