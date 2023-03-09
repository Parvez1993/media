import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';



function UserListItem({ user }) {
    const [doRemoveUser, isRemovingUser, error] = useThunk(removeUser);

    const handleClick = async (user) => {

        await doRemoveUser(user);
    };

    const header = <>
        <Button className="mr-3" loading={isRemovingUser} onClick={() => handleClick(user)}>
            <GoTrashcan />
        </Button>
        {error && <div>Error deleting user.</div>}
        {user.name}
    </>

    return (
        <>
            <ExpandablePanel header={header}>
                <AlbumsList/>
            </ExpandablePanel>
        </>


    )
}

export default UserListItem