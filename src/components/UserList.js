import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useThunk } from '../hooks/useThunk';
import { addUser } from '../store/thunks/addUser';
import { fetchUsers } from '../store/thunks/fetchUsers'
import Button from './Button';
import Skeleton from './Skeleton';
import UserListItem from './UserListItem';




function UserList() {
    const { data } = useSelector(state => state.users)
    const [doFetchUsers, isLoadingUsers , loadingUserError]=useThunk(fetchUsers)
    const [doAddUsers, isCreatingUsers,creatingUserError]=useThunk(addUser)

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    if (isLoadingUsers) {
        return <Skeleton times={6} className="h-10 w-full" />;
    }

    if (loadingUserError) {
        return <div>Error fetching data</div>
    }



    const handleAdd = () => {
        doAddUsers()
    }
    const renderedUsers = data.map(user => {
        return <UserListItem key={user.id} user={user}  />
    })

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className='m-2 text-xl'>Users</h1>
                <Button onClick={handleAdd} loading={isCreatingUsers}>
                    + add
                </Button>
                {creatingUserError && 'Error creating user'}
            </div>
            <div className="overflow-scroll h-screen">{renderedUsers}</div>
        </div>
    )
}

export default UserList