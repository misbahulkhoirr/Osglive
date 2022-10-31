const initialState =
{
    data: [],
    error: ''
}

export default function sendMessageReducer(state = initialState, action)
{
    switch(action.type)
    {
        case 'SEND_MESSAGE_SUCCESS':
            return {
                ...state,
                data: action.data
            }
            break
        case 'SEND_MESSAGE_FAILED':
            return {
                ...state,
                error: action.error,
            }
            break
        default:
            return state
    }
}