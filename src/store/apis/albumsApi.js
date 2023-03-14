import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {faker} from "@faker-js/faker"


const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        // providesTags:["Album"],
        providesTags: (result, error, arg) =>{
            // return [{type:"Album", id:arg.id}]
            const tags = result.map(album=>{
                return {type:"Album", id:album.id}
            })
            tags.push({type:"UsersAlbum", id:arg.id})
            return tags
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
      addAlbum:builder.mutation({
        // invalidatesTags:["Album"],
        invalidatesTags: (result, error, arg) =>{
            return [{type:"UsersAlbum", id:arg.id}]
        },
        query: (user) => {
          return {
            url: '/albums',
            body: {
              userId: user.id,
              title:faker.commerce.productName()
            },
            method: 'POST',
          };
        },
      }),
      removeAlbum:builder.mutation({
        invalidatesTags: (result, error, arg) =>{
            return [{type:"UsersAlbum", id:arg.userId}]
        },
        query: (album) => {
            return {
              url: `/albums/${album.id}`,
              method: 'DELETE',
            };
          },
      })
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} = albumsApi;
export { albumsApi };
