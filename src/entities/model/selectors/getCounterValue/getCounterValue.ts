import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { ICounterSchema } from 'entities';

export const getCounterValue = createSelector(
  getCounter,
  (counter: ICounterSchema) => counter.value,
);
