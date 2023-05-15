import { uuid } from './uuid';

describe('uuid', () => {
  it('should generate a valid UUID', () => {
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const generatedUUID = uuid();
    expect(generatedUUID).toMatch(uuidPattern);
  });

  it('should generate unique UUIDs', () => {
    const iterations = 1000;
    const generatedUUIDs = new Set<string>();

    for (let i = 0; i < iterations; i++) {
      const newUUID = uuid();
      expect(generatedUUIDs.has(newUUID)).toBe(false);
      generatedUUIDs.add(newUUID);
    }
  });
});
