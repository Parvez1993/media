import React from 'react'
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from "./Button"
import PhotoListItem from './PhotoListItem'
import Skeleton from './Skeleton'

function PhotosList({album}) {
  useFetchPhotosQuery(album)
  const {data,isFetching,error}=useFetchPhotosQuery(album)
  const [addPhoto, addPhotoResults ]=useAddPhotoMutation();



  let content;
  if (isFetching) {
      content = <Skeleton times={3} />
  }
  else if (error) {
      content = <p>{error.message}</p>
  }
  else {
      content = data.map(photo => {
          return <PhotoListItem key={photo.id} photo={photo}/>
      })
  }


  return (
   <>
    <div className='m-2 flex flex-row items-center justify-between'>
        <h3 className='text-lg'>
            Photos in {album.isLoading}           
        </h3>
        <Button loading={addPhoto.isLoading} onClick={()=>addPhoto(album)}>
            + Add Photos
        </Button>
    </div>
    <div className="flex flex-row flex-wrap justify-center">
        {content}
    </div>
   </>
  )
}

export default PhotosList