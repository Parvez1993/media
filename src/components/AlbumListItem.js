import React from 'react'
import { GoTrashcan } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store';
import Button from "./Button"
import ExpandablePanel from './ExpandablePanel'

function AlbumListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const header = <div>
        <Button loading={results.isLoading} onClick={()=>removeAlbum(album)}><GoTrashcan/></Button>
        {album.title}
    </div>
    return <ExpandablePanel key={album.id} header={header}>Lists of photos in the album</ExpandablePanel>
}

export default AlbumListItem