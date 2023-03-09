import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/thunks/addUser';
import { fetchUsers } from '../store/thunks/fetchUsers'
import Button from './Button';
import Skeleton from './Skeleton';

function UserList() {

    const dispatch = useDispatch();
    const { data } = useSelector(state => state.users)
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)
    const [loadingUserError, setLoadingUserError] = useState(null)
    const [isCreatingUsers, setIsCreatingUsers] = useState(false);
    const [creatingUserError, setCreatingUserError] = useState(null);

    useEffect(() => {
        setIsLoadingUsers(true)
        dispatch(fetchUsers())
            .unwrap()
            .catch(error => {
                setLoadingUserError(error.message)
                setIsLoadingUsers(false)
            })
            .finally(() => setIsLoadingUsers(false))
    }, [dispatch])

    if (isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full" />;
    }

    if (loadingUserError) {
        return <div>Error fetching data</div>
    }



    const handleAdd = () => {
        setIsCreatingUsers(true)
        dispatch(addUser())
            .unwrap()
            .catch((err) => {
                setIsCreatingUsers(false)
                setCreatingUserError(err.message)
            })
            .finally(() => {
                setIsCreatingUsers(false)
            })
    }
    const renderedUsers = data.map(user => {
        return <div key={user.id} className="mb-2 border rounded my-4">
            <div className="flex items-center p-2 justify-between cursor-pointer">{user.name}</div>
        </div>
    })

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className='m-2 text-xl'>Users</h1>
                {isCreatingUsers ? "Creating Users......" : <Button onClick={handleAdd}>
                    + add
                </Button>}
                {creatingUserError && 'Error creating user'}
            </div>
            <div>{renderedUsers}</div>
        </div>
    )
}

export default UserList