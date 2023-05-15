export const uuid = (): string => {
  const pattern = `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`;
  return pattern.replace(/[018]/g, (c: string) => {
    const char = Number(c);
    return (
      char ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (char / 4)))
    ).toString(16);
  });
};
