import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/thunks/addUser';
import { fetchUsers } from '../store/thunks/fetchUsers'
import Button from './Button';
import Skeleton from './Skeleton';

function UserList() {

    const dispatch = useDispatch();
    const { isLoading, data, error } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (isLoading) {
        return <Skeleton times={6} className="h-10 w-full" />;
    }

    if (error) {
        return <div>Error fetching data</div>
    }



    const handleAdd = () =>{
        dispatch(addUser())
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
                <Button onClick={handleAdd}>
                    + add
                </Button>
            </div>
            <div>{renderedUsers}</div>
        </div>
    )
}

export default UserList