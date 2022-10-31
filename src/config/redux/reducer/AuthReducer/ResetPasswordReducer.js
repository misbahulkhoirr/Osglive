const initialState =
{
    data: [],
    error: undefined,
}

export default function ResetPasswordReducer(state = initialState, action)
{    
    switch (action.type)
    {
        case 'RESET_PASSWORD_ATTEMPT':
            return {
                ...state,
                isLoading:true,
                data: [],
                error : undefined,
            }
            break
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'RESET_PASSWORD_FAILED':
            return {
                ...state,
                data: [],
                error: action.error,
            }
            break
        default:
            return state
    }
}