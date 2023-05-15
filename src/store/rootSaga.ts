import { all, fork } from 'redux-saga/effects';

import characters from './characters/effects';
import locations from './locations/effects';
import episodes from './episodes/effects';

function* Saga() {
  yield all([fork(characters), fork(locations), fork(episodes)]);
}

export default Saga;
