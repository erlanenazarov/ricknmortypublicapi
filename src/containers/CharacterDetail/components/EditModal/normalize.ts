import { TFormValues } from 'components/Form/types';

import { ICharacter } from 'store/characters/types';

export const normalize = (character?: ICharacter | null): TFormValues => {
  if (!character) return {};
  return {
    name: [character.name],
    gender: [character.gender],
    status: [character.status],
    type: character.type ? [character.type] : [],
    species: [character.species],
  };
};
