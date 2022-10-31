const initialState =
{
    data: [],
    error: undefined,
}
  
export default function unreadMessageReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'UNREAD_MESSAGE_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}