import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from "@faker-js/faker"


const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder){
        return{
            fetchPhotos:builder.query({
                providesTags: (result, error, arg) =>{
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", result)
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", arg)
                    const tags = result.map(photo=>{
                        return {type:"Photo", id:photo.id}
                    })
                    tags.push({type:"AlbumPhoto", id:arg.id})
                    console.log("tagstagstagstagstagstags", tags)
                    return tags
                },
                query: (album ) => {
                    return {
                      url: '/photos',
                      params: {
                        albumId: album.id,
                      },
                      method: 'GET',
                    };
                  },
            }),
            addPhoto:builder.mutation({
                invalidatesTags: (result, error, arg) =>{
                    return [{type:"AlbumPhoto", id:arg.id}]
                },
                query: (album ) => {
                    
                    return {
                      url: '/photos',
                      body: {
                        albumId: album.id,
                        url:faker.image.abstract(150,150,true)
                      },
                      method: 'POST',
                    };
                  },
            }),
            removePhoto:builder.mutation({
                invalidatesTags: (result, error, arg) =>{
                    return [{type:"AlbumPhoto", id:arg.albumId}]
                },
                query: (photo ) => {
                    return {
                      url: `/photos/${photo.id}`,
                      method: 'DELETE',
                    };
                  },
            }),
        }
    }
})

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation} = photosApi;
export { photosApi };