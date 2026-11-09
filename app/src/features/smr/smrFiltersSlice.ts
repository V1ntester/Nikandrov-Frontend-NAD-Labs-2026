import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { signedOut } from '../../store/authSlice';

type PowerRange = { filter_min: number; filter_max: number };

const defaultRange: PowerRange = { filter_min: 100, filter_max: 500 };
const initialState = { selected: defaultRange, applied: defaultRange };

const smrFiltersSlice = createSlice({
  name: 'smrFilters',
  initialState,
  reducers: {
    selectRange(state, action: PayloadAction<PowerRange>) {
      state.selected = action.payload;
    },
    applyRange(state) {
      state.applied = state.selected;
    },
  },
  extraReducers: (builder) => builder.addCase(signedOut, () => initialState),
});

export const { selectRange, applyRange } = smrFiltersSlice.actions;
export default smrFiltersSlice.reducer;
