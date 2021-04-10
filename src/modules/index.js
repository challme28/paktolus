// @flow
import {
  initialState as casinoInitialState,
} from './casino/duck';

import type { CasinoState } from './casino/duck';

export type RootState = {
  casino: CasinoState,
};

export const defaultInitialState = Object.freeze({
  casino: casinoInitialState,
});
