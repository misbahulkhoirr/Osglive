const initialState = {
    data: {},
    error: undefined,
}

export default function LogoutReducer(state = initialState, action)
{    
    switch(action.type)
    {
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'LOGOUT_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}