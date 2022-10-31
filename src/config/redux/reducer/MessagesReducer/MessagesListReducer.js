const initialState =
{
    data: [],
    error: undefined,
}
  
export default function MessagesListReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'MESSAGES_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}