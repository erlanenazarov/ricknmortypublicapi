import { all, fork } from 'redux-saga/effects';

import characters from './characters/effects';
import locations from './locations/effects';
import episodes from './episodes/effects';
import favorites from './favorites/effects';

function* Saga() {
  yield all([
    fork(characters),
    fork(locations),
    fork(episodes),
    fork(favorites),
  ]);
}

export default Saga;
