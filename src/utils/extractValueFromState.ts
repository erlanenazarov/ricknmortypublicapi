interface IImmutableRecord {
  getIn: (path: string[]) => unknown;
  get: (path: string) => unknown;
}

export const extractValueFromState =
  <ReturnType, State extends IImmutableRecord = IImmutableRecord>(
    path: string | string[],
    defaultValue?: ReturnType,
  ) =>
  (state: State): ReturnType => {
    const value = Array.isArray(path) ? state.getIn(path) : state.get(path);
    if (typeof value === 'boolean' || value === 0) {
      return value as ReturnType;
    }
    return (value || defaultValue) as ReturnType;
  };
