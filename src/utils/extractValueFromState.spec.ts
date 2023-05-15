import { extractValueFromState } from './extractValueFromState';

describe('extractValueFromState', () => {
  const state = {
    getIn: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(() => {
    state.getIn.mockClear();
    state.get.mockClear();
  });

  it('should extract value using getIn method for array path', () => {
    const path = ['user', 'name'];
    const defaultValue = 'Unknown';

    state.getIn.mockReturnValue('John Doe');

    const extractValue = extractValueFromState<string>(path, defaultValue);
    const result = extractValue(state);

    expect(state.getIn).toHaveBeenCalledWith(path);
    expect(result).toBe('John Doe');
  });

  it('should extract value using get method for string path', () => {
    const path = ['user', 'name'];
    const defaultValue = 'Unknown';

    state.getIn.mockReturnValue('John Doe');

    const extractValue = extractValueFromState<string>(path, defaultValue);
    const result = extractValue(state);

    expect(state.getIn).toHaveBeenCalledWith(path);
    expect(state.get).not.toBeCalled();
    expect(result).toBe('John Doe');
  });

  it('should return default value if extracted value is boolean', () => {
    const path = ['user', 'isAdmin'];
    const defaultValue = false;

    state.getIn.mockReturnValue(true);

    const extractValue = extractValueFromState<boolean>(path, defaultValue);
    const result = extractValue(state);

    expect(state.getIn).toHaveBeenCalledWith(path);
    expect(state.get).not.toBeCalled();
    expect(result).toBe(true);
  });

  it('should return default value if extracted value is 0', () => {
    const path = 'age';
    const defaultValue = 0;

    state.get.mockReturnValue(25);

    const extractValue = extractValueFromState<number>(path, defaultValue);
    const result = extractValue(state);

    expect(state.get).toHaveBeenCalledWith(path);
    expect(state.getIn).not.toBeCalled();
    expect(result).toBe(25);
  });

  it('should return default value if extracted value is falsy', () => {
    const path = 'user.name';
    const defaultValue = 'Unknown';

    state.get.mockReturnValue(null);

    const extractValue = extractValueFromState<string>(path, defaultValue);
    const result = extractValue(state);

    expect(state.get).toHaveBeenCalledWith(path);
    expect(result).toBe(defaultValue);
  });
});
