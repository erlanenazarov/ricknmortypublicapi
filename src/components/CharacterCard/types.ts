import { ICharacter } from 'store/characters/types';

// Extend Character schema instead of passing individual prop
// React.memo makes shallow compare of prop object, so let's make it flat as much as we can
export interface ICharacterCardProps
  extends Omit<ICharacter, 'id' | 'location'> {
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}
