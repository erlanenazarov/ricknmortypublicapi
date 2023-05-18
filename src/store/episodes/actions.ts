import { createAction, populateRequestActions } from 'utils/createAction';

import {
  IRequestEpisodesListPayload,
  ISuccessEpisodesListPayload,
  IEpisodeDetailRequestPayload,
  IEpisodeExpanded,
} from './types';

const STATE_KEY = '@episodes';

export const LIST_EPISODES = populateRequestActions(STATE_KEY, 'LIST_EPISODES');

export const EPISODES_TOTAL_COUNT = populateRequestActions(
  STATE_KEY,
  'EPISODES_TOTAL_COUNT',
);

export const CLEAR_LIST_EPISODES = `${STATE_KEY}/CLEAR_LIST_EPISODES`;

export const EPISODE_DETAIL = populateRequestActions(
  STATE_KEY,
  'EPISODE_DETAIL',
);

export const CLEAR_EPISODE_DETAIL = `${STATE_KEY}/CLEAR_EPISODE_DETAIL`;

export const listEpisodesRequest = createAction<IRequestEpisodesListPayload>(
  LIST_EPISODES.request,
);
export const listEpisodesSuccess = createAction<ISuccessEpisodesListPayload>(
  LIST_EPISODES.success,
);
export const listEpisodesFailure = createAction(LIST_EPISODES.failure);

export const episodesTotalCountRequest = createAction(
  EPISODES_TOTAL_COUNT.request,
);

export const episodesTotalCountSuccess = createAction<number>(
  EPISODES_TOTAL_COUNT.success,
);

export const episodesTotalCountFailure = createAction<unknown>(
  EPISODES_TOTAL_COUNT.failure,
);

export const clearListEpisodes = createAction(CLEAR_LIST_EPISODES);

export const episodeDetailRequest = createAction<IEpisodeDetailRequestPayload>(
  EPISODE_DETAIL.request,
);
export const episodeDetailSuccess = createAction<IEpisodeExpanded>(
  EPISODE_DETAIL.success,
);
export const episodeDetailFailure = createAction(EPISODE_DETAIL.failure);

export const clearEpisodeDetail = createAction(CLEAR_EPISODE_DETAIL);
