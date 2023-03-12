import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store'
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';
import Button from './Button';
function AlbumsList({user}) {
  const {data, error, isLoading}= useFetchAlbumsQuery(user);

  const [addAlbum, results] = useAddAlbumMutation()

  console.log("results: " , addAlbum, results)

  const handleAddAlbum = () => {
    addAlbum(user)
  }

  let content;
  if(isLoading) {
    content = <Skeleton times={3}/>
  }
  else if(error) {
    content = <p>{error.message}</p>
  }
  else{
    content = data.map(album=>{
        const header = <div>{album.title}</div>
        return <ExpandablePanel key={album.id} header={header}>Lists of photos in the album</ExpandablePanel>
    })
  }
  return (
    <>
    <div>
        Albums for {user?.name}
        <Button onClick={handleAddAlbum}>
            Add new Album
        </Button>
    </div>
    <div>
         {content}
    </div>
    </>
  )
}

export default AlbumsList