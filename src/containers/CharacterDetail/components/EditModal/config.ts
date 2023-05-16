import { EFieldType, IFormConfig } from 'components/Form/types';

import { EGender, ECharacterStatus } from 'store/characters/types';

export const FORM_NAME = 'characterEditForm';

export const config: IFormConfig[] = [
  {
    key: 'name',
    name: 'name',
    label: 'Name',
    type: EFieldType.TEXT,
  },
  {
    key: 'gender',
    name: 'gender',
    label: 'Gender',
    type: EFieldType.SELECT,
    rawOptions: [
      { label: `${EGender.MALE}`, value: `${EGender.MALE}` },
      { label: `${EGender.FEMALE}`, value: `${EGender.FEMALE}` },
      { label: `${EGender.GENDERLESS}`, value: `${EGender.GENDERLESS}` },
      { label: `${EGender.UNKNOWN}`, value: `${EGender.UNKNOWN}` },
    ],
  },
  {
    key: 'status',
    name: 'status',
    label: 'Status',
    type: EFieldType.SELECT,
    rawOptions: [
      {
        label: `${ECharacterStatus.ALIVE}`,
        value: `${ECharacterStatus.ALIVE}`,
      },
      { label: `${ECharacterStatus.DEAD}`, value: `${ECharacterStatus.DEAD}` },
      {
        label: `${ECharacterStatus.UNKNOWN}`,
        value: `${ECharacterStatus.UNKNOWN}`,
      },
    ],
  },
  {
    key: 'type',
    name: 'type',
    label: 'Type',
    type: EFieldType.TEXT,
  },
  {
    key: 'species',
    name: 'species',
    label: 'Species',
    type: EFieldType.TEXT,
  },
];
