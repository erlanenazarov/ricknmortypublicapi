import { combineReducers, CombinedState } from 'redux';

import forms from './forms/reducer';
import characters from './characters/reducer';
import locations from './locations/reducer';
import episodes from './episodes/reducer';
import favorites from './favorites/reducer';
import { IAppState } from './types';

const rootReducer = combineReducers<CombinedState<IAppState>>({
  forms,
  characters,
  locations,
  episodes,
  favorites,
});

export default rootReducer;
