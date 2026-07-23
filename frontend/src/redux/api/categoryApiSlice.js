import {apiSlice} from "./apiSlice";
import {CATEGORY_URL} from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => CATEGORY_URL,
            providesTags: ['Category'],
        }),

        createCategory: builder.mutation({
            query: ( newCategory) => ({
                url: CATEGORY_URL,
                method: "POST",
                body: newCategory,
            }),
            invalidatesTags: ["Category"],
        }),

        updateCategory: builder.mutation({
            query: ( {categoryId, updateCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updateCategory,
            }),
            invalidatesTags: ["Category"],
        }),

        deleteCategory: builder.mutation({
            query: ( categoryId) => ({
                url: `${CATEGORY_URL}/$(categoryId)`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
    })
})

export const {useFetchCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation} = categoryApiSlice;
