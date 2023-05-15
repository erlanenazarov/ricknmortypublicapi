import { ICharacter } from 'store/characters/types';

export interface ICharactersGridProps {
  characters: ICharacter[];
  loading?: boolean;
  className?: string;
  cardClassName?: string;
  onClick?: (id: string) => void;
}
