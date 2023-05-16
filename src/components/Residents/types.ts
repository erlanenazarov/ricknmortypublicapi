import { ICharacter } from 'store/characters/types';

export interface IResidentsProps {
  residents: ICharacter[];
  title?: string;
  isLoading?: boolean;
  chunkSize?: number;
}
