import { safeGet } from './safeGet';

describe('safeGet', () => {
  const data = {
    user: {
      name: 'John',
      age: 30,
      isAdmin: true,
      favorites: null,
    },
  };

  it('should get a value from a valid path', () => {
    const result = safeGet(data, 'user.name');
    expect(result).toBe('John');
  });

  it('should return default value for an invalid path', () => {
    const defaultValue = 'Default';
    const result = safeGet(data, 'user.address', defaultValue);
    expect(result).toBe(defaultValue);
  });

  it('should return default value if the retrieved value is falsy', () => {
    const defaultValue = 'Default';
    const result = safeGet(data, 'user.nonExistentProperty', defaultValue);
    expect(result).toBe(defaultValue);
  });

  it('should return 0 if the retrieved value is 0', () => {
    const result = safeGet(data, 'user.age', -1);
    expect(result).toBe(30);
  });

  it('should return boolean values without conversion', () => {
    const result1 = safeGet(data, 'user.isAdmin', false);
    expect(result1).toBe(true);

    const result2 = safeGet(data, 'user.isGuest', true);
    expect(result2).toBe(true);
  });

  it('should return array even if key exists but value null', () => {
    const result = safeGet(data, 'user.favorites', []);
    expect(result).toStrictEqual([]);
  });
});
