import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from './types';
import { fetchProductsApi } from '../../services/mockApi';

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCategory: 'Tất cả',
  searchTerm: '',
  sortBy: 'default',
};

// Async Thunk lấy danh sách sản phẩm từ API giả lập theo yêu cầu bài tập
export const fetchProducts = createAsyncThunk<Product[], boolean | void, { rejectValue: string }>(
  'products/fetchProducts',
  async (shouldFail = false, { rejectWithValue }) => {
    try {
      const data = await fetchProductsApi(Boolean(shouldFail));
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Đã xảy ra lỗi không xác định khi tải sản phẩm');
    }
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'Tất cả';
      state.searchTerm = '';
      state.sortBy = 'default';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Không thể tải danh sách sản phẩm';
      });
  },
});

export const { setSelectedCategory, setSearchTerm, setSortBy, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
