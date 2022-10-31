const initialState =
{
    data: [],
    isLoading: false,
    error: undefined
}

export default function EditUserReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'EDIT_USER_ATTEMPT':
            return {
                ...state,
                isLoading: true,
                error: undefined,
                data: []
            }
            break
        case 'EDIT_USER_SUCCESS':
            return {
                ...state,
                data: action.data,
                isLoading: false,
                error: null
            }
            break
        case 'EDIT_USER_FAILED':
            return {
                ...state,
                error: action.error,
                isLoading: true,
                data: []
            }
            break
        default:
            return state
    }
}