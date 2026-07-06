import {apiSlice} from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => '/category',
            providesTags: ['Category'],
        })
    })
})

export const {useFetchCategoriesQuery} = categoryApiSlice;