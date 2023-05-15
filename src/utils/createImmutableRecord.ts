import { Record, RecordOf } from 'immutable';

export const createImmutableRecord = <S extends object>(
  initial: S,
): RecordOf<S> => {
  const factory: Record.Factory<S> = Record<S>(initial);
  return factory(initial);
};
