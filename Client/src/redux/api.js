
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addMyInfo, addUser, setAllPosts } from './features/service/serviceSlice';

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include' //it will also send cookies with requests
    }),
    keepUnusedDataFor: 60 * 60 * 24 * 7,
    tagTypes: ['Post', 'User', 'Me'],
    //declares a set of identifiers (tags) that can be associated with the cached data.
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/user/login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Me']
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: '/user/signup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Me']
        }),
        myInfo: builder.query({
            query: () => ({
                url: '/user/myInfo',
                method: 'GET'
            }),
            providesTags: ['Me'],
            //pessimistic update
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('resposne on myInfo request', data);
                    dispatch(addMyInfo(data));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST'
            }),
            invalidatesTags: ['Me']
        }),
        userDetails: builder.query({
            query: ({ id }) => ({
                url: `/user/info/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, { id }) => [{ type: 'User', id:id }],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addUser(data));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        getAllPosts: builder.query({
            query: (page) => ({
                url: `/post/?page=${page}`,
                method: 'GET'
            }),
            providesTags: (result, error, args) => {
                return result ? [
                    ...result.posts.map(({ _id }) => ({
                        type: 'Post',
                        id: _id
                    }))
                ] : [{ type: "Post", id: 'LIST' }]
            },
            async onQueryStarted(dispatch,queryFulfilled){
              try{
                  const {data} =await queryFulfilled;
                  dispatch(setAllPosts(data));
              }catch(err){
                console.log(err);
              }
            }
        }),
        searchUsers: builder.query({
            query:(query)=>({
                url:`user/search/${query}`,
                method:'GET'
            })
        }),
        followUser:builder.mutation({
            query:(id)=>({
                url:`/user/follow/${id}`,
                method:'POST'
            }),
            invalidatesTags:(result,error,args)=>[{type:'User',id:args.id}],
        }),

    })
})

export const { useGetAllPostsQuery,useSearchUsersQuery,useUserDetailsQuery, useLogoutMutation, useLoginMutation, useSignupMutation, useMyInfoQuery } = serviceApi;