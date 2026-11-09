import type { SmrReadError } from '../../api/smrReadError';
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import type { SmrListItem } from '../../api/generated/api';
import { signedOut } from '../../store/authSlice';
import {
  createSmrDraft, deleteSmr, fetchSmrDetails, fetchSmrDraft,
  fetchSmrs, publishSmr, toggleSmrLike, type SmrDraft,
} from './smrThunks';

const requests = [
  fetchSmrs, fetchSmrDetails, fetchSmrDraft, createSmrDraft,
  publishSmr, deleteSmr, toggleSmrLike,
] as const;

type RequestState = {
  requestId: string;
  status: 'pending' | 'fulfilled' | 'rejected' | 'idle';
  error: string | null;
  readError?: SmrReadError;
};

type SmrsState = {
  list: SmrListItem[];
  details: SmrListItem | null;
  draft: SmrDraft | null;
  requests: Partial<Record<string, RequestState>>;
};

const initialState: SmrsState = { list: [], details: null, draft: null, requests: {} };

function operation(type: string) {
  return type.slice(0, type.lastIndexOf('/'));
}

const smrsSlice = createSlice({
  name: 'smrs',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(signedOut, () => initialState)
    .addMatcher(isPending(...requests), (state, action) => {
      state.requests[operation(action.type)] = {
        requestId: action.meta.requestId,
        status: 'pending',
        error: null,
      };
    })
    .addMatcher(isFulfilled(...requests), (state, action) => {
      const request = state.requests[operation(action.type)];
      if (request?.requestId !== action.meta.requestId) return;
      request.status = 'fulfilled';

      if (fetchSmrs.fulfilled.match(action)) {
        state.list = action.payload;
      } else if (fetchSmrDetails.fulfilled.match(action)) {
        state.details = action.payload;
      } else if (fetchSmrDraft.fulfilled.match(action) || createSmrDraft.fulfilled.match(action)) {
        state.draft = action.payload;
      } else if (publishSmr.fulfilled.match(action)) {
        state.draft = null;
      } else if (deleteSmr.fulfilled.match(action)) {
        state.list = state.list.filter(({ id }) => id !== action.payload);
        if (state.details?.id === action.payload) state.details = null;
        if (state.draft?.id === action.payload) state.draft = null;
      } else if (toggleSmrLike.fulfilled.match(action)) {
        const updated = action.payload;
        state.list = state.list.map((item) => item.id === updated.id ? updated : item);
        if (state.details?.id === updated.id) state.details = updated;
      }
    })
    .addMatcher(isRejected(...requests), (state, action) => {
      const request = state.requests[operation(action.type)];
      if (request?.requestId !== action.meta.requestId) return;
      if (fetchSmrs.rejected.match(action) || fetchSmrDetails.rejected.match(action)) {
        request.readError = action.payload;
      }
      request.status = action.meta.aborted ? 'idle' : 'rejected';
      request.error = action.meta.aborted ? null : action.error.message ?? 'Ошибка запроса';
    }),
});

export default smrsSlice.reducer;
