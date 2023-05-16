import { ICharacter } from 'store/characters/types';

export interface IEditModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  character: ICharacter | null;
}
