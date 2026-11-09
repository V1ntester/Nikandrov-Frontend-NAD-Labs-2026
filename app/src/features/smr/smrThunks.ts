import { classifySmrReadError, type SmrReadError } from '../../api/smrReadError';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../../api/generated/api';
import type { BodyCreateSmrApiSmrsPost, SmrListItem, SmrPublish } from '../../api/generated/api';

const smrApi = new Api({ baseURL: '' }).api;

export type SmrDraft = Omit<SmrListItem, "is_owner" | "is_liked" | "likes_count">;

type SmrFilters = {
  filter_min?: number;
  filter_max?: number;
};

export const fetchSmrs = createAsyncThunk<SmrListItem[], SmrFilters, { rejectValue: SmrReadError }>(
  'smrs/fetchList',
  async (filters, { signal, rejectWithValue }) => {
    try {
      const { data } = await smrApi.getSmrsApiSmrsGet(filters, { signal });
      return data.smrs;
    } catch (error) {
      return rejectWithValue(classifySmrReadError(error));
    }
  },
);

export const fetchSmrDetails = createAsyncThunk<
  SmrListItem, { id: number; selectNext?: boolean }, { rejectValue: SmrReadError }
>(
  'smrs/fetchDetails',
  async ({ id, selectNext }, { signal, rejectWithValue }) => {
    try {
      const { data } = await smrApi.getSmrApiSmrsSmrIdGet(id, { select_next: selectNext }, { signal });
      return data;
    } catch (error) {
      return rejectWithValue(classifySmrReadError(error));
    }
  },
);

export const fetchSmrDraft = createAsyncThunk(
  'smrs/fetchDraft',
  async (_: void, { signal }): Promise<SmrDraft> => {
    const { data } = await smrApi.getDraftApiSmrsDraftGet({ signal });
    return data;
  },
);

export const createSmrDraft = createAsyncThunk(
  'smrs/createDraft',
  async (draft: BodyCreateSmrApiSmrsPost) => {
    const { data } = await smrApi.createSmrApiSmrsPost(draft);
    return data;
  },
);

export const publishSmr = createAsyncThunk(
  'smrs/publish',
  async (draft: SmrPublish) => {
    const { data } = await smrApi.publishSmrApiSmrsDraftPublishPut(draft);
    return data;
  },
);

export const deleteSmr = createAsyncThunk(
  'smrs/delete',
  async (id: number) => {
    await smrApi.deleteSmrApiSmrsSmrIdDelete(id);
    return id;
  },
);

export const toggleSmrLike = createAsyncThunk(
  'smrs/toggleLike',
  async ({ id, liked }: { id: number; liked: boolean }) => {
    await smrApi.likeSmrApiSmrsSmrIdLikePost(id, { action: liked ? 0 : 1 });
    const { data } = await smrApi.getSmrApiSmrsSmrIdGet(id);
    return data;
  },
);
