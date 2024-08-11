import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchImages, retrieveImages } from '@/repos/image_ris.jsx';

export const moduleName = 'BIT-IOC-BitCost-Alertas';

const initialState = {
  response: [],
  isLoading: false,
  error: undefined,
};

export const getSimilarImages = createAsyncThunk('result/getSimilarImages', async (image, thunkAPI) => {
  const response = await searchImages(image);
  if (response) {
    return response;
  } else {
    throw new Error(response.msg);
  };
});

export const getImage = createAsyncThunk('result/getImage', async (imagePath, thunkAPI) => {
  const response = await retrieveImages(imagePath);
  if(response.status){
    return response.value;
  } else {
    throw new Error(response.msg);
  };
});

const imageSlice = createSlice({
  name: 'image',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSimilarImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSimilarImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload;
        state.error = undefined;
      })
      .addCase(getSimilarImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;

