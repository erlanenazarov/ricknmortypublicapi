import { ICharacter } from 'store/characters/types';

export interface ICharacterCardProps extends ICharacter {
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  testId?: string;
}
