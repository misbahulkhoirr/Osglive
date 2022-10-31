const initialState =
{
    data: [],
    error: undefined,
}
  
export default function getMessageReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'GET_MESSAGES_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
            break
        default:
            return state
    }
}