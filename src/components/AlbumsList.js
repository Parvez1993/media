import React from 'react'
import { useAddAlbumMutation, useFetchAlbumsQuery, useRemoveAlbumMutation } from '../store'
import ExpandablePanel from './ExpandablePanel';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumListItem from './AlbumListItem';
function AlbumsList({ user }) {
    const { data, error, isLoading } = useFetchAlbumsQuery(user);

    const [addAlbum, results] = useAddAlbumMutation()


    console.log("................................", results)

    const handleAddAlbum = () => {
        addAlbum(user)
    }

    let content;
    if (isLoading) {
        content = <Skeleton times={3} />
    }
    else if (error) {
        content = <p>{error.message}</p>
    }
    else {
        content = data.map(album => {
            return <AlbumListItem key={album.id} album={album}/>
        })
    }
    return (
        <>
            <div>
                Albums for {user?.name}
                <Button onClick={handleAddAlbum} loading={results.isLoading}>
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