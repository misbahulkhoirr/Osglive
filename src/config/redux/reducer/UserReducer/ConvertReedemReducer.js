const initialState =
{
    data: [],
    error: ''
}

export default function ConvertReedemReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'CONVERT_REEDEM_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'CONVERT_REEDEM_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}