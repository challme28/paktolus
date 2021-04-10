// @flow
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getName, setName, getBalance, setBalance } from './utils/casino-storage';

import type { RootState } from '../index';

export type CasinoState = {
  name?: string,
  balance?: number,
  initialized?: boolean,
};

export type CasinoAction = {
  name?: string,
  balance?: number,
};

export const initialState: CasinoState = {
  balance: 0,
};

const slice = createSlice<CasinoState>({
  name: 'casino',
  initialState,
  reducers: {
    fetchStorage: (s) => {
      s.name = getName();
      if (getBalance()) s.balance = getBalance();
      s.initialized = true;
    },
    login: (s, { payload }: PayloadAction<CasinoAction>) => {
      s.name = payload.name;
      setName(payload.name);
    },
    logout: (s) => {
      s.name = "";
      setName(undefined);
    },
    addBalance: (s, { payload }: PayloadAction<CasinoAction>) => {
      s.balance = s.balance + payload.balance;
      setBalance(s.balance);
    },
    subtractBalance: (s, { payload }: PayloadAction<CasinoAction>) => {
      s.balance = s.balance - payload.balance;
      setBalance(s.balance);
    },
  },
})

export default slice.reducer;

export const {
  fetchStorage,
  login,
  logout,
  addBalance,
  subtractBalance,
} = slice.actions;

export const selectInitialized = (state: RootState) => state.casino.initialized;
export const selectName = (state: RootState) => state.casino.name;
export const selectBalance = (state: RootState) => state.casino.balance;