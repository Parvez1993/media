import React from 'react'
import { GoTrashcan } from 'react-icons/go'
import { useRemovePhotoMutation } from '../store'


function PhotoListItem({photo}) {
    const [removePhoto, results] = useRemovePhotoMutation();

  return (
    <div className='relative m-3 cursor-pointer'>
        <img src={photo.url} alt="photo_name"/>
        <div className='absolute inset-0 flex items-center justify-center hover:bg-gray-300 opacity-0 hover:opacity-100'>
            <GoTrashcan className='text-red-600 text-[35px]' onClick={()=>removePhoto(photo)}/>
        </div>
    </div>
  )
}

export default PhotoListItem