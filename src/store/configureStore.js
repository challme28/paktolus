// @flow
import { configureStore as c } from '@reduxjs/toolkit';
import authReducer from '../modules/casino/duck';
import { defaultInitialState } from '../modules';

import type { RootState } from '../modules';

export default function configureStore(initialState?: RootState) {
  return c({
    reducer: {
      casino: authReducer,
    },
    preloadedState: initialState || { ...defaultInitialState },
  });
}