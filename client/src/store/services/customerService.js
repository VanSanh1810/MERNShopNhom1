import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const customerService = createApi({
    reducerPath: 'customers',
    tagTypes: 'customers',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cnpmm-none-e031c10e2f8a.herokuapp.com/api/',
        prepareHeaders: (headers, {getState}) => {
            const reducers = getState();
            const token = reducers?.authReducer?.adminToken;
            console.log(token)
            headers.set('authorization', token ? `Bearer ${token}` : '');
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getCustomers: builder.query({
                query: (page) => {
                 return {
                     url: `/customers/${page}`,
                     method: 'GET'
                 }
                },
                providesTags: ['customers']
            }),
        }
    }
})
export const {useGetCustomersQuery} = customerService;
export default customerService