const initialState =
{
    data: [],
    error: undefined,
}

export default function RegisterReducer(state = initialState, action)
{
    switch (action.type)
    {   
        case 'REGISTER_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                data : [],
                error : undefined,
            }
            break
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                data: action.data,
                error: undefined,
            }
            break
        case 'REGISTER_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}