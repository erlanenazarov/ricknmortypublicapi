import { ECharacterStatus } from 'store/characters/types';

export const getStatusColor = (
  status: ECharacterStatus,
): string | undefined => {
  switch (status) {
    case ECharacterStatus.ALIVE:
      return 'green';
    case ECharacterStatus.DEAD:
      return 'red';
    default:
    case ECharacterStatus.UNKNOWN:
      return;
  }
};
