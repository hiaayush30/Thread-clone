
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addMyInfo, addSinglePost, addUser, deletePost, setAllPosts } from './features/service/serviceSlice';

export const serviceApi = createApi({
    reducerPath: 'serviceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        credentials: 'include' //it will also send cookies with requests
    }),
    keepUnusedDataFor: 60 * 60 * 24 * 7,
    tagTypes: ['Post', 'User', 'Me'],
    // declares a set of identifiers (tags) that can be associated with the cached data.
    // refetchOnFocus:true,  //comming back to this tab in web browser 
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
            // transformErrorResponse,
            // transformResponse
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
            query: (id) => ({
                url: `/user/info/${id}`,
                method: 'GET'
            }),
            providesTags: (result, error, { id }) => [{ type: 'User', id: id }],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addUser(data.user));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        getAllPosts: builder.query({
            query: (page) => ({
                url: `/post/?page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Post'],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAllPosts(data.posts));
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        searchUsers: builder.query({
            query: (query) => ({
                url: `user/search/${query}`,
                method: 'GET'
            })
        }),
        followUser: builder.mutation({
            query: (id) => ({
                url: `/user/follow/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: (result, error, args) => [{ type: 'User', id: args.id }],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/update',
                method: "PUT",
                body: data
            }),
            invalidatesTags: ['Me'],
        }),

        addPost: builder.mutation({
            query: (data) => ({
                url: '/post/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Post'],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addSinglePost(data.post));
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Post', id: args._id }],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(deletePost(data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        likePost: builder.mutation({
            query: (id) => ({
                url: `/post/like/${id}`,
                method: "PUT"
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Post', id: args._id }]
        }),
        singlePost: builder.query({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'GET'
            }),

        }),
        repost: builder.mutation({
            query: (id) => ({
                url: `/post/repost/${id}`,
                method: 'POST'
            }),
            invalidatesTags: ['User']  //any user if reposts will invalidate this
        }),

        addComment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['User','Post']
        }),
        deleteComment: builder.mutation({
            query: ({ postId, id }) => ({
                url: `/comment/${postId}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, args) => [{ type: 'Post', id: args.postId }]
            //args are the same as passed to the query
        })
    })
})

export const {
    useDeleteCommentMutation,
    useAddCommentMutation,
    useRepostMutation,
    useSinglePostQuery,
    useLikePostMutation,
    useDeletePostMutation,
    useAddPostMutation,
    useFollowUserMutation,
    useGetAllPostsQuery,
    useSearchUsersQuery,
    useUserDetailsQuery,
    useLogoutMutation,
    useLoginMutation,
    useSignupMutation,
    useMyInfoQuery,
    useUpdateProfileMutation } = serviceApi;