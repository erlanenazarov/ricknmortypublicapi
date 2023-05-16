import { ICharacter } from 'store/characters/types';

export interface ICharacterCardProps
  extends Omit<ICharacter, 'id' | 'location'> {
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  testId?: string;
}
