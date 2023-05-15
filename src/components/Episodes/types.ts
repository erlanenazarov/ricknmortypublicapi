import { IEpisode } from 'store/episodes/types';

export interface IEpisodesProps {
  data: IEpisode[];
  isLoading?: boolean;
  className?: string;
  itemsCountOnLoading?: number;
  onClick?: (id: string) => void;
}
