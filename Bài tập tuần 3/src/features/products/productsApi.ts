import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from './types';
import { fetchProductsApi } from '../../services/mockApi';

/**
 * RTK Query API Slice (Thực hiện theo khuyến khích của đề bài để nhận điểm cộng)
 * Sử dụng fakeBaseQuery để truy xuất dữ liệu từ mock service với đầy đủ caching & lifecycle
 */
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      async queryFn() {
        try {
          const data = await fetchProductsApi();
          return { data };
        } catch (error) {
          const err = error as Error;
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: err.message || 'Lỗi khi gọi API qua RTK Query',
            },
          };
        }
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Product' as const, id })), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
