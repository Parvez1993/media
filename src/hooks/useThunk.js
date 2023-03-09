import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);

    const dispatch = useDispatch()

    const runThunk = useCallback((arg) =>{
        setLoading(true)
        setError(null)
        dispatch(thunk(arg))
          .unwrap()
          .catch(error => {
                setError(error.message)
                setLoading(false)
            })
          .finally(() => setLoading(false))
    },[thunk, dispatch])



    return [runThunk, loading, error]
}

