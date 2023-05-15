import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  CombinedState,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  IWithSagaTaskStore,
  ISagaTask,
  IAppState,
  IPayloadAction,
} from './types';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (initialState?: IAppState): IWithSagaTaskStore => {
  const sagaMiddleware = createSagaMiddleware({});
  const middlewares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof Window]
      ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof Window]({
          shouldHotReload: false,
        })
      : compose;

  const store: IWithSagaTaskStore = createStore<
    CombinedState<IAppState>,
    IPayloadAction,
    ISagaTask,
    typeof enhancers
  >(rootReducer, initialState || {}, composeEnhancers(...enhancers));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
